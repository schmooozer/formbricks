import "server-only";

import { Prisma } from "@prisma/client";
import { cache as reactCache } from "react";
import { prisma } from "@formbricks/database";
import type {
  TAssessmentAggregateStats,
  TAssessmentConfig,
  TAssessmentResult,
  TAssessmentScores,
  TNormGroupDimensionStats,
} from "@formbricks/types/assessments";

import { computeAssessmentResult } from "./scoring/scoring-engine";

const selectAssessmentResult = {
  id: true,
  createdAt: true,
  updatedAt: true,
  assessmentConfigId: true,
  responseId: true,
  scores: true,
  normalizedScores: true,
  profile: true,
  aiInsights: true,
  pdfUrl: true,
  accessToken: true,
} satisfies Prisma.AssessmentResultSelect;

function transformPrismaResult(
  data: Prisma.AssessmentResultGetPayload<{ select: typeof selectAssessmentResult }>
): TAssessmentResult {
  return {
    ...data,
    scores: data.scores as TAssessmentScores,
    normalizedScores: data.normalizedScores as TAssessmentScores,
    profile: data.profile as TAssessmentResult["profile"],
  };
}

export const getAssessmentResult = reactCache(async (responseId: string): Promise<TAssessmentResult | null> => {
  const result = await prisma.assessmentResult.findUnique({
    where: { responseId },
    select: selectAssessmentResult,
  });
  return result ? transformPrismaResult(result) : null;
});

export const getAssessmentResultByToken = reactCache(async (accessToken: string): Promise<TAssessmentResult | null> => {
  const result = await prisma.assessmentResult.findUnique({
    where: { accessToken },
    select: selectAssessmentResult,
  });
  return result ? transformPrismaResult(result) : null;
});

export const getAssessmentResults = reactCache(
  async (
    assessmentConfigId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<TAssessmentResult[]> => {
    const results = await prisma.assessmentResult.findMany({
      where: { assessmentConfigId },
      select: selectAssessmentResult,
      orderBy: { createdAt: "desc" },
      take: options?.limit,
      skip: options?.offset,
    });
    return results.map(transformPrismaResult);
  }
);

export const getAssessmentResultCount = reactCache(async (assessmentConfigId: string): Promise<number> => {
  return prisma.assessmentResult.count({ where: { assessmentConfigId } });
});

/**
 * Compute and store assessment results for a finished response.
 * Called from the response pipeline when a response is marked finished.
 */
export async function computeAndStoreAssessmentResult(
  config: TAssessmentConfig,
  responseId: string,
  responseVariables: Record<string, string | number>
): Promise<TAssessmentResult> {
  const { scores, normalizedScores, profile } = computeAssessmentResult(config, responseVariables);

  const result = await prisma.assessmentResult.upsert({
    where: { responseId },
    create: {
      assessmentConfigId: config.id,
      responseId,
      scores: scores as unknown as Prisma.InputJsonValue,
      normalizedScores: normalizedScores as unknown as Prisma.InputJsonValue,
      profile: profile as unknown as Prisma.InputJsonValue,
    },
    update: {
      scores: scores as unknown as Prisma.InputJsonValue,
      normalizedScores: normalizedScores as unknown as Prisma.InputJsonValue,
      profile: profile as unknown as Prisma.InputJsonValue,
    },
    select: selectAssessmentResult,
  });

  return transformPrismaResult(result);
}

/**
 * Update the PDF URL on an assessment result.
 */
export async function updateAssessmentResultPdfUrl(resultId: string, pdfUrl: string): Promise<void> {
  await prisma.assessmentResult.update({
    where: { id: resultId },
    data: { pdfUrl },
  });
}

/**
 * Update AI insights on an assessment result.
 */
export async function updateAssessmentResultAiInsights(resultId: string, aiInsights: string): Promise<void> {
  await prisma.assessmentResult.update({
    where: { id: resultId },
    data: { aiInsights },
  });
}

/**
 * Compute aggregate statistics for all results of an assessment.
 */
export async function getAssessmentAggregateStats(
  config: TAssessmentConfig
): Promise<TAssessmentAggregateStats> {
  const results = await prisma.assessmentResult.findMany({
    where: { assessmentConfigId: config.id },
    select: { scores: true, normalizedScores: true, profile: true },
  });

  const totalResponses = results.length;

  // Count completed responses in associated campaign invitations
  const invitationCount = await prisma.assessmentInvitation.count({
    where: {
      campaign: { assessmentConfigId: config.id },
    },
  });
  const completionRate = invitationCount > 0 ? totalResponses / invitationCount : totalResponses > 0 ? 1 : 0;

  // Average scores
  const averageScores: TAssessmentScores = {};
  const allScores: Record<string, number[]> = {};

  for (const dim of config.dimensions) {
    allScores[dim.key] = [];
  }

  for (const result of results) {
    const normalized = result.normalizedScores as TAssessmentScores;
    for (const dim of config.dimensions) {
      const val = normalized[dim.key];
      if (typeof val === "number") {
        allScores[dim.key].push(val);
      }
    }
  }

  const dimensionStats: Record<string, TNormGroupDimensionStats> = {};
  for (const dim of config.dimensions) {
    const values = allScores[dim.key];
    if (values.length === 0) {
      averageScores[dim.key] = 0;
      dimensionStats[dim.key] = { mean: 0, stdDev: 0 };
      continue;
    }

    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    averageScores[dim.key] = Math.round(mean);

    const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
    const stdDev = Math.sqrt(variance);

    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    dimensionStats[dim.key] = {
      mean: Math.round(mean * 10) / 10,
      stdDev: Math.round(stdDev * 10) / 10,
      median: Math.round(median),
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  }

  // Score distributions (10-point buckets)
  const scoreDistributions: Record<string, Array<{ bucket: string; count: number }>> = {};
  for (const dim of config.dimensions) {
    const buckets: Record<string, number> = {};
    for (let i = 0; i <= 90; i += 10) {
      buckets[`${i}-${i + 10}`] = 0;
    }
    for (const val of allScores[dim.key]) {
      const bucketStart = Math.min(Math.floor(val / 10) * 10, 90);
      const key = `${bucketStart}-${bucketStart + 10}`;
      buckets[key] = (buckets[key] ?? 0) + 1;
    }
    scoreDistributions[dim.key] = Object.entries(buckets).map(([bucket, count]) => ({ bucket, count }));
  }

  // Profile type distribution
  const typeCounts: Record<string, number> = {};
  for (const result of results) {
    const profile = result.profile as TAssessmentResult["profile"];
    const type = profile?.primaryType ?? "Unknown";
    typeCounts[type] = (typeCounts[type] ?? 0) + 1;
  }
  const profileTypeDistribution = Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0,
  }));

  return {
    totalResponses,
    completionRate: Math.round(completionRate * 100) / 100,
    averageScores,
    scoreDistributions,
    profileTypeDistribution,
    dimensionStats,
  };
}
