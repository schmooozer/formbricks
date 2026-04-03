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
  normalizeToPercentage,
  normalizeToTScore,
} from "./base";

const BIG_FIVE_DIMENSION_DESCRIPTIONS: Record<string, { high: string; low: string }> = {
  openness: {
    high: "You are imaginative, creative, and open to new experiences. You enjoy exploring new ideas and appreciate art, emotion, and adventure.",
    low: "You tend to be practical, conventional, and grounded. You prefer routine and familiarity over novelty.",
  },
  conscientiousness: {
    high: "You are organized, disciplined, and goal-oriented. You plan ahead and follow through on commitments.",
    low: "You are flexible, spontaneous, and adaptable. You prefer to keep your options open rather than follow strict plans.",
  },
  extraversion: {
    high: "You are energetic, sociable, and assertive. You draw energy from being around others and enjoy being the center of attention.",
    low: "You are reserved, introspective, and independent. You prefer smaller groups and quiet environments to recharge.",
  },
  agreeableness: {
    high: "You are compassionate, cooperative, and trusting. You prioritize harmony and are considerate of others' feelings.",
    low: "You are direct, competitive, and skeptical. You prioritize getting results over maintaining social harmony.",
  },
  neuroticism: {
    high: "You tend to experience emotional intensity and may be more sensitive to stress. You are perceptive to potential problems.",
    low: "You are emotionally stable, calm, and resilient. You handle stress well and tend to remain composed under pressure.",
  },
};

/**
 * Big Five (OCEAN) Assessment Scoring Strategy
 *
 * Uses normative scoring with Likert scales (typically 1-5).
 * Each dimension is scored by averaging items, then normalizing
 * to T-scores using population norms.
 */
export class BigFiveScoringStrategy implements IScoringStrategy {
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
    const strongest = findPrimaryDimension(normalizedScores, dimensions);
    if (!strongest) return { summary: "Insufficient data to generate profile." };

    // Build summary from all dimensions
    const summaryParts: string[] = [];
    const strengths: string[] = [];
    const blindSpots: string[] = [];

    for (const dim of dimensions) {
      const score = normalizedScores[dim.key] ?? 50;
      const isHigh = score >= 60;
      const isLow = score <= 40;

      const interp = findInterpretation(interpretations, dim.key, scores[dim.key] ?? 0);
      if (interp) {
        if (isHigh || isLow) {
          summaryParts.push(`**${dim.name}**: ${interp.description}`);
        }
        if (interp.strengths) strengths.push(...interp.strengths);
        if (interp.blindSpots) blindSpots.push(...interp.blindSpots);
      } else {
        const descriptions = BIG_FIVE_DIMENSION_DESCRIPTIONS[dim.key.toLowerCase()];
        if (descriptions) {
          if (isHigh) summaryParts.push(`**${dim.name}** (High): ${descriptions.high}`);
          else if (isLow) summaryParts.push(`**${dim.name}** (Low): ${descriptions.low}`);
        }
      }
    }

    // Generate profile tags based on high/low dimensions
    const tags: string[] = [];
    for (const dim of dimensions) {
      const score = normalizedScores[dim.key] ?? 50;
      if (score >= 60) tags.push(`High ${dim.name}`);
      else if (score <= 40) tags.push(`Low ${dim.name}`);
    }

    return {
      primaryType: strongest.key,
      profileLabel: `Strongest trait: ${strongest.name}`,
      summary:
        summaryParts.length > 0
          ? summaryParts.join("\n\n")
          : `Your Big Five profile shows ${strongest.name} as your most prominent trait.`,
      tags,
      strengths: strengths.length > 0 ? strengths : undefined,
      blindSpots: blindSpots.length > 0 ? blindSpots : undefined,
    };
  }
}
