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
 * Skills & Competency Assessment Scoring Strategy
 *
 * Scores are typically averages of rated items per competency dimension.
 * Supports gap analysis against target scores.
 */
export class SkillsScoringStrategy implements IScoringStrategy {
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
    // Sort dimensions by normalized score descending
    const sorted = [...dimensions].sort(
      (a, b) => (normalizedScores[b.key] ?? 0) - (normalizedScores[a.key] ?? 0)
    );

    const topStrengths = sorted.slice(0, 3);
    const developmentAreas = sorted.slice(-3).reverse();

    const strengths: string[] = [];
    const blindSpots: string[] = [];
    const devAreas: string[] = [];

    for (const dim of topStrengths) {
      const interp = findInterpretation(interpretations, dim.key, scores[dim.key] ?? 0);
      strengths.push(
        interp ? `${dim.name}: ${interp.label}` : `${dim.name} (${normalizedScores[dim.key] ?? 0}%)`
      );
    }

    for (const dim of developmentAreas) {
      const interp = findInterpretation(interpretations, dim.key, scores[dim.key] ?? 0);
      if (interp?.recommendations) {
        devAreas.push(...interp.recommendations.map((r) => `${dim.name}: ${r}`));
      } else {
        devAreas.push(`${dim.name} - current proficiency: ${normalizedScores[dim.key] ?? 0}%`);
      }
      if (interp?.blindSpots) blindSpots.push(...interp.blindSpots);
    }

    const avgScore = Math.round(
      Object.values(normalizedScores).reduce((sum, v) => sum + v, 0) / Math.max(dimensions.length, 1)
    );

    let overallLevel = "Developing";
    if (avgScore >= 80) overallLevel = "Expert";
    else if (avgScore >= 60) overallLevel = "Proficient";
    else if (avgScore >= 40) overallLevel = "Competent";

    return {
      primaryType: overallLevel.toLowerCase(),
      profileLabel: `Overall: ${overallLevel} (${avgScore}%)`,
      summary: `Your overall competency level is **${overallLevel}** with an average score of ${avgScore}%. Your top strengths are ${topStrengths.map((d) => d.name).join(", ")}. Key development areas include ${developmentAreas.map((d) => d.name).join(", ")}.`,
      tags: [overallLevel, ...topStrengths.map((d) => d.name)],
      strengths,
      blindSpots: blindSpots.length > 0 ? blindSpots : undefined,
      developmentAreas: devAreas.length > 0 ? devAreas : undefined,
    };
  }
}
