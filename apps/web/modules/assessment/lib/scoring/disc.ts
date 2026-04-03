import type {
  TAssessmentDimension,
  TAssessmentInterpretation,
  TAssessmentProfile,
  TAssessmentScores,
  TNormGroupStatistics,
} from "@formbricks/types/assessments";

import {
  type IScoringStrategy,
  extractDimensionScores,
  findInterpretation,
  findPrimaryDimension,
  findSecondaryDimension,
  normalizeToPercentage,
  normalizeToTScore,
} from "./base";

const DISC_PROFILE_LABELS: Record<string, string> = {
  D: "Dominance",
  I: "Influence",
  S: "Steadiness",
  C: "Conscientiousness",
  DI: "Driver",
  DI_alt: "Inspiring",
  DS: "Determined",
  DC: "Challenger",
  ID: "Persuader",
  IS: "Harmonizer",
  IC: "Communicator",
  SD: "Stabilizer",
  SI: "Supporter",
  SC: "Planner",
  CD: "Analyst",
  CI: "Evaluator",
  CS: "Perfectionist",
};

/**
 * DISC Assessment Scoring Strategy
 *
 * DISC uses ipsative (forced-choice) scoring where respondents distribute
 * points across four dimensions. The total score across all dimensions
 * is typically constant, and the profile is determined by relative strengths.
 */
export class DiscScoringStrategy implements IScoringStrategy {
  computeScores(
    dimensions: TAssessmentDimension[],
    variables: Record<string, string | number>
  ): TAssessmentScores {
    return extractDimensionScores(dimensions, variables);
  }

  normalizeScores(
    scores: TAssessmentScores,
    dimensions: TAssessmentDimension[],
    normStats?: TNormGroupStatistics
  ): TAssessmentScores {
    if (normStats) {
      return normalizeToTScore(scores, normStats);
    }

    // For ipsative DISC, normalize to percentage of total
    const total = Object.values(scores).reduce((sum, v) => sum + v, 0);
    if (total === 0) return normalizeToPercentage(scores, dimensions);

    const normalized: TAssessmentScores = {};
    for (const dim of dimensions) {
      normalized[dim.key] = Math.round(((scores[dim.key] ?? 0) / total) * 100);
    }
    return normalized;
  }

  generateProfile(
    scores: TAssessmentScores,
    normalizedScores: TAssessmentScores,
    interpretations: TAssessmentInterpretation[],
    dimensions: TAssessmentDimension[]
  ): TAssessmentProfile {
    const primary = findPrimaryDimension(normalizedScores, dimensions);
    if (!primary) return { summary: "Insufficient data to generate profile." };

    const secondary = findSecondaryDimension(normalizedScores, dimensions, primary.key);

    const primaryKey = primary.key.toUpperCase();
    const secondaryKey = secondary?.key.toUpperCase() ?? "";
    const profileKey = `${primaryKey}${secondaryKey}`;
    const profileLabel = DISC_PROFILE_LABELS[profileKey] ?? DISC_PROFILE_LABELS[primaryKey] ?? primaryKey;

    const primaryInterp = findInterpretation(interpretations, primary.key, scores[primary.key] ?? 0);

    const strengths: string[] = [];
    const blindSpots: string[] = [];

    for (const dim of dimensions) {
      const interp = findInterpretation(interpretations, dim.key, scores[dim.key] ?? 0);
      if (interp?.strengths) strengths.push(...interp.strengths);
      if (interp?.blindSpots) blindSpots.push(...interp.blindSpots);
    }

    return {
      primaryType: primaryKey,
      secondaryType: secondaryKey || undefined,
      profileLabel,
      summary:
        primaryInterp?.description ??
        `Your primary DISC type is ${primary.name} (${primaryKey})${secondary ? `, with ${secondary.name} (${secondaryKey}) as your secondary style` : ""}.`,
      tags: [primaryKey, profileLabel],
      strengths: strengths.length > 0 ? strengths : undefined,
      blindSpots: blindSpots.length > 0 ? blindSpots : undefined,
      developmentAreas: primaryInterp?.recommendations ?? undefined,
    };
  }
}
