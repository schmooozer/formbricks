import type {
  TAssessmentConfig,
  TAssessmentDimension,
  TAssessmentInterpretation,
  TAssessmentProfile,
  TAssessmentScores,
  TNormGroupStatistics,
} from "@formbricks/types/assessments";

export interface IScoringStrategy {
  /**
   * Compute raw scores from survey response variables.
   * Maps dimension variableIds to their computed values.
   */
  computeScores(
    dimensions: TAssessmentDimension[],
    variables: Record<string, string | number>
  ): TAssessmentScores;

  /**
   * Normalize raw scores (e.g. to percentages, T-scores, or percentiles).
   */
  normalizeScores(
    scores: TAssessmentScores,
    dimensions: TAssessmentDimension[],
    normStats?: TNormGroupStatistics
  ): TAssessmentScores;

  /**
   * Generate a profile classification from normalized scores.
   */
  generateProfile(
    scores: TAssessmentScores,
    normalizedScores: TAssessmentScores,
    interpretations: TAssessmentInterpretation[],
    dimensions: TAssessmentDimension[]
  ): TAssessmentProfile;
}

/**
 * Look up the interpretation for a given dimension key and score.
 */
export function findInterpretation(
  interpretations: TAssessmentInterpretation[],
  dimensionKey: string,
  score: number
) {
  const dimInterp = interpretations.find((i) => i.dimensionKey === dimensionKey);
  if (!dimInterp) return undefined;

  return dimInterp.ranges.find((r) => score >= r.min && score <= r.max);
}

/**
 * Extract raw variable values for each dimension from survey response variables.
 */
export function extractDimensionScores(
  dimensions: TAssessmentDimension[],
  variables: Record<string, string | number>
): TAssessmentScores {
  const scores: TAssessmentScores = {};
  for (const dim of dimensions) {
    const val = variables[dim.variableId];
    scores[dim.key] = typeof val === "number" ? val : Number(val) || 0;
  }
  return scores;
}

/**
 * Normalize scores to percentage of max score per dimension.
 */
export function normalizeToPercentage(
  scores: TAssessmentScores,
  dimensions: TAssessmentDimension[]
): TAssessmentScores {
  const normalized: TAssessmentScores = {};
  for (const dim of dimensions) {
    const raw = scores[dim.key] ?? 0;
    const range = dim.maxScore - dim.minScore;
    normalized[dim.key] = range > 0 ? Math.round(((raw - dim.minScore) / range) * 100) : 0;
  }
  return normalized;
}

/**
 * Convert raw scores to T-scores using norm group statistics.
 * T-score = 50 + 10 * (raw - mean) / stdDev
 */
export function normalizeToTScore(
  scores: TAssessmentScores,
  normStats: TNormGroupStatistics
): TAssessmentScores {
  const normalized: TAssessmentScores = {};
  for (const [key, raw] of Object.entries(scores)) {
    const stats = normStats[key];
    if (stats && stats.stdDev > 0) {
      normalized[key] = Math.round(50 + 10 * ((raw - stats.mean) / stats.stdDev));
    } else {
      normalized[key] = raw;
    }
  }
  return normalized;
}

/**
 * Compute percentile rank from norm group statistics.
 */
export function computePercentile(score: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 50;
  const zScore = (score - mean) / stdDev;
  // Approximate percentile using error function approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989422804014327;
  const p =
    d *
    Math.exp((-zScore * zScore) / 2) *
    (t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))));
  return Math.round((zScore >= 0 ? 1 - p : p) * 100);
}

/**
 * Find the dimension with the highest score.
 */
export function findPrimaryDimension(
  scores: TAssessmentScores,
  dimensions: TAssessmentDimension[]
): TAssessmentDimension | undefined {
  let maxScore = -Infinity;
  let primary: TAssessmentDimension | undefined;
  for (const dim of dimensions) {
    const score = scores[dim.key] ?? 0;
    if (score > maxScore) {
      maxScore = score;
      primary = dim;
    }
  }
  return primary;
}

/**
 * Find the dimension with the second highest score.
 */
export function findSecondaryDimension(
  scores: TAssessmentScores,
  dimensions: TAssessmentDimension[],
  primaryKey: string
): TAssessmentDimension | undefined {
  let maxScore = -Infinity;
  let secondary: TAssessmentDimension | undefined;
  for (const dim of dimensions) {
    if (dim.key === primaryKey) continue;
    const score = scores[dim.key] ?? 0;
    if (score > maxScore) {
      maxScore = score;
      secondary = dim;
    }
  }
  return secondary;
}
