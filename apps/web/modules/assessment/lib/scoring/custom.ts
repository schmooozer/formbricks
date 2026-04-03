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

/**
 * Custom Assessment Scoring Strategy
 *
 * Supports user-defined weighted scoring with optional norm group comparison.
 * Weights are applied as multipliers to raw dimension scores.
 */
export class CustomScoringStrategy implements IScoringStrategy {
  constructor(private weights?: Record<string, number>) {}

  computeScores(
    dimensions: TAssessmentDimension[],
    variables: Record<string, string | number>
  ): TAssessmentScores {
    const raw = extractDimensionScores(dimensions, variables);

    if (!this.weights) return raw;

    const weighted: TAssessmentScores = {};
    for (const dim of dimensions) {
      const weight = this.weights[dim.key] ?? 1;
      weighted[dim.key] = Math.round((raw[dim.key] ?? 0) * weight * 100) / 100;
    }
    return weighted;
  }

  normalizeScores(
    scores: TAssessmentScores,
    dimensions: TAssessmentDimension[],
    normStats?: TNormGroupStatistics
  ): TAssessmentScores {
    if (normStats) {
      return normalizeToTScore(scores, normStats);
    }
    return normalizeToPercentage(scores, dimensions);
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

    const strengths: string[] = [];
    const blindSpots: string[] = [];

    for (const dim of dimensions) {
      const interp = findInterpretation(interpretations, dim.key, scores[dim.key] ?? 0);
      if (interp?.strengths) strengths.push(...interp.strengths);
      if (interp?.blindSpots) blindSpots.push(...interp.blindSpots);
    }

    const primaryInterp = findInterpretation(interpretations, primary.key, scores[primary.key] ?? 0);

    return {
      primaryType: primary.key,
      secondaryType: secondary?.key,
      profileLabel: primaryInterp?.label ?? primary.name,
      summary:
        primaryInterp?.description ??
        `Your strongest dimension is ${primary.name} (${normalizedScores[primary.key] ?? 0}%).`,
      tags: [primary.name, ...(secondary ? [secondary.name] : [])],
      strengths: strengths.length > 0 ? strengths : undefined,
      blindSpots: blindSpots.length > 0 ? blindSpots : undefined,
    };
  }
}
