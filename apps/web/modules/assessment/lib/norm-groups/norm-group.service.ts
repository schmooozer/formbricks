import "server-only";

import { Prisma } from "@prisma/client";
import { cache as reactCache } from "react";
import { prisma } from "@formbricks/database";
import type {
  TAssessmentNormGroup,
  TAssessmentScores,
  TAssessmentType,
  TNormGroupDimensionStats,
  TNormGroupStatistics,
} from "@formbricks/types/assessments";

const selectNormGroup = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  description: true,
  assessmentType: true,
  organizationId: true,
  sampleSize: true,
  statistics: true,
  isGlobal: true,
} satisfies Prisma.AssessmentNormGroupSelect;

function transformNormGroup(
  data: Prisma.AssessmentNormGroupGetPayload<{ select: typeof selectNormGroup }>
): TAssessmentNormGroup {
  return {
    ...data,
    assessmentType: data.assessmentType as TAssessmentType,
    statistics: data.statistics as TNormGroupStatistics,
  };
}

export const getNormGroup = reactCache(async (id: string): Promise<TAssessmentNormGroup | null> => {
  const ng = await prisma.assessmentNormGroup.findUnique({
    where: { id },
    select: selectNormGroup,
  });
  return ng ? transformNormGroup(ng) : null;
});

export const getNormGroupsByType = reactCache(
  async (assessmentType: TAssessmentType, organizationId?: string): Promise<TAssessmentNormGroup[]> => {
    const where: Prisma.AssessmentNormGroupWhereInput = {
      assessmentType,
      OR: [{ isGlobal: true }, ...(organizationId ? [{ organizationId }] : [])],
    };

    const groups = await prisma.assessmentNormGroup.findMany({
      where,
      select: selectNormGroup,
      orderBy: { createdAt: "desc" },
    });
    return groups.map(transformNormGroup);
  }
);

export async function createNormGroup(data: {
  name: string;
  description?: string;
  assessmentType: TAssessmentType;
  organizationId?: string;
  isGlobal?: boolean;
}): Promise<TAssessmentNormGroup> {
  const ng = await prisma.assessmentNormGroup.create({
    data: {
      name: data.name,
      description: data.description,
      assessmentType: data.assessmentType,
      organizationId: data.organizationId ?? null,
      isGlobal: data.isGlobal ?? false,
      sampleSize: 0,
      statistics: {} as Prisma.InputJsonValue,
    },
    select: selectNormGroup,
  });
  return transformNormGroup(ng);
}

/**
 * Recompute norm group statistics from all assessment results
 * matching the given assessment type and organization.
 */
export async function recomputeNormGroupStatistics(
  normGroupId: string,
  assessmentConfigIds: string[],
  dimensionKeys: string[]
): Promise<TAssessmentNormGroup> {
  // Fetch all results for the given assessment configs
  const results = await prisma.assessmentResult.findMany({
    where: { assessmentConfigId: { in: assessmentConfigIds } },
    select: { normalizedScores: true },
  });

  const sampleSize = results.length;
  const statistics: TNormGroupStatistics = {};

  for (const dimKey of dimensionKeys) {
    const values: number[] = [];
    for (const result of results) {
      const scores = result.normalizedScores as TAssessmentScores;
      const val = scores[dimKey];
      if (typeof val === "number") values.push(val);
    }

    if (values.length === 0) {
      statistics[dimKey] = { mean: 0, stdDev: 0 };
      continue;
    }

    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
    const stdDev = Math.sqrt(variance);

    const sorted = [...values].sort((a, b) => a - b);
    const percentiles: Record<string, number> = {};
    for (const p of [10, 25, 50, 75, 90]) {
      const idx = Math.min(Math.floor((p / 100) * sorted.length), sorted.length - 1);
      percentiles[String(p)] = sorted[idx];
    }

    statistics[dimKey] = {
      mean: Math.round(mean * 10) / 10,
      stdDev: Math.round(stdDev * 10) / 10,
      median: sorted[Math.floor(sorted.length / 2)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
      percentiles,
    };
  }

  const ng = await prisma.assessmentNormGroup.update({
    where: { id: normGroupId },
    data: {
      sampleSize,
      statistics: statistics as unknown as Prisma.InputJsonValue,
    },
    select: selectNormGroup,
  });

  return transformNormGroup(ng);
}
