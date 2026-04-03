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
  normalizeToPercentage,
  normalizeToTScore,
} from "./base";

/**
 * 360-Degree Feedback Scoring Strategy
 *
 * Aggregates ratings from multiple rater groups (self, manager, peers, direct reports).
 * For individual rater responses, this strategy computes per-dimension scores.
 * The multi-rater aggregation (comparing self vs. others, blind spot detection)
 * is handled at the aggregate/campaign level, not per individual response.
 */
export class ThreeSixtyScoringStrategy implements IScoringStrategy {
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
    return normalizeToPercentage(scores, dimensions);
  }

  generateProfile(
    scores: TAssessmentScores,
    normalizedScores: TAssessmentScores,
    interpretations: TAssessmentInterpretation[],
    dimensions: TAssessmentDimension[]
  ): TAssessmentProfile {
    // For individual raters, generate a simple profile
    const sorted = [...dimensions].sort(
      (a, b) => (normalizedScores[b.key] ?? 0) - (normalizedScores[a.key] ?? 0)
    );

    const topDims = sorted.slice(0, 3);
    const bottomDims = sorted.slice(-3).reverse();

    const strengths: string[] = topDims.map(
      (dim) => `${dim.name}: ${normalizedScores[dim.key] ?? 0}%`
    );
    const devAreas: string[] = bottomDims.map(
      (dim) => `${dim.name}: ${normalizedScores[dim.key] ?? 0}%`
    );

    const avgScore = Math.round(
      Object.values(normalizedScores).reduce((sum, v) => sum + v, 0) / Math.max(dimensions.length, 1)
    );

    return {
      primaryType: "360-feedback",
      profileLabel: `360 Feedback Score: ${avgScore}%`,
      summary: `Average feedback score across all dimensions is ${avgScore}%. Highest rated areas: ${topDims.map((d) => d.name).join(", ")}. Areas for development: ${bottomDims.map((d) => d.name).join(", ")}.`,
      tags: ["360-feedback", ...topDims.map((d) => d.name)],
      strengths,
      developmentAreas: devAreas,
    };
  }
}

/**
 * Aggregate 360-degree results across multiple raters.
 * This is used at the campaign/report level, not per individual response.
 */
export function aggregate360Results(
  raterResults: Array<{
    relationship: string;
    scores: TAssessmentScores;
  }>,
  dimensions: TAssessmentDimension[]
): {
  raterGroupAverages: Record<string, TAssessmentScores>;
  overallAverage: TAssessmentScores;
  blindSpots: Array<{ dimensionKey: string; selfScore: number; othersAverage: number; gap: number }>;
  hiddenStrengths: Array<{ dimensionKey: string; selfScore: number; othersAverage: number; gap: number }>;
} {
  // Group scores by relationship
  const groups: Record<string, TAssessmentScores[]> = {};
  for (const result of raterResults) {
    if (!groups[result.relationship]) {
      groups[result.relationship] = [];
    }
    groups[result.relationship].push(result.scores);
  }

  // Average scores per group
  const raterGroupAverages: Record<string, TAssessmentScores> = {};
  for (const [relationship, scoresList] of Object.entries(groups)) {
    const avg: TAssessmentScores = {};
    for (const dim of dimensions) {
      const values = scoresList.map((s) => s[dim.key] ?? 0);
      avg[dim.key] = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
    }
    raterGroupAverages[relationship] = avg;
  }

  // Overall average (excluding self)
  const othersScores = raterResults.filter((r) => r.relationship !== "self");
  const overallAverage: TAssessmentScores = {};
  for (const dim of dimensions) {
    if (othersScores.length > 0) {
      const values = othersScores.map((r) => r.scores[dim.key] ?? 0);
      overallAverage[dim.key] = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
    } else {
      overallAverage[dim.key] = 0;
    }
  }

  // Blind spots: self rates much higher than others
  const selfScores = raterGroupAverages["self"];
  const blindSpots: Array<{ dimensionKey: string; selfScore: number; othersAverage: number; gap: number }> =
    [];
  const hiddenStrengths: Array<{
    dimensionKey: string;
    selfScore: number;
    othersAverage: number;
    gap: number;
  }> = [];

  if (selfScores) {
    for (const dim of dimensions) {
      const selfScore = selfScores[dim.key] ?? 0;
      const othersAvg = overallAverage[dim.key] ?? 0;
      const gap = selfScore - othersAvg;

      // Blind spot: self-rating significantly higher than others (>15% gap)
      if (gap > 15) {
        blindSpots.push({ dimensionKey: dim.key, selfScore, othersAverage: othersAvg, gap });
      }
      // Hidden strength: others rate significantly higher than self (>15% gap)
      else if (gap < -15) {
        hiddenStrengths.push({
          dimensionKey: dim.key,
          selfScore,
          othersAverage: othersAvg,
          gap: Math.abs(gap),
        });
      }
    }
  }

  return { raterGroupAverages, overallAverage, blindSpots, hiddenStrengths };
}
