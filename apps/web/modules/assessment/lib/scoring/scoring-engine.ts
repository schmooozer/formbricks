import type {
  TAssessmentConfig,
  TAssessmentProfile,
  TAssessmentResult,
  TAssessmentScores,
  TNormGroupStatistics,
} from "@formbricks/types/assessments";

import type { IScoringStrategy } from "./base";
import { BigFiveScoringStrategy } from "./big-five";
import { CustomScoringStrategy } from "./custom";
import { DiscScoringStrategy } from "./disc";
import { SkillsScoringStrategy } from "./skills";
import { ThreeSixtyScoringStrategy } from "./three-sixty";

export interface ScoringEngineResult {
  scores: TAssessmentScores;
  normalizedScores: TAssessmentScores;
  profile: TAssessmentProfile;
}

/**
 * Get the appropriate scoring strategy for an assessment type.
 */
function getStrategy(config: TAssessmentConfig): IScoringStrategy {
  switch (config.type) {
    case "disc":
      return new DiscScoringStrategy();
    case "bigFive":
      return new BigFiveScoringStrategy();
    case "skillsCompetency":
      return new SkillsScoringStrategy();
    case "threeSixtyFeedback":
      return new ThreeSixtyScoringStrategy();
    case "myersBriggs":
      // Myers-Briggs uses a similar approach to DISC (dichotomy pairs)
      return new DiscScoringStrategy();
    case "custom":
      return new CustomScoringStrategy(config.scoringRules?.weights);
    default:
      return new CustomScoringStrategy();
  }
}

/**
 * Main scoring engine entry point.
 *
 * Takes an assessment configuration and the response's calculated variables,
 * computes scores, normalizes them, and generates a profile classification.
 *
 * @param config - The assessment configuration with dimensions, interpretations, scoring rules
 * @param responseVariables - The survey response's calculated variable values
 * @param normStats - Optional norm group statistics for percentile/T-score normalization
 * @returns Computed scores, normalized scores, and profile
 */
export function computeAssessmentResult(
  config: TAssessmentConfig,
  responseVariables: Record<string, string | number>,
  normStats?: TNormGroupStatistics
): ScoringEngineResult {
  const strategy = getStrategy(config);

  // 1. Compute raw scores from response variables
  const scores = strategy.computeScores(config.dimensions, responseVariables);

  // 2. Handle inverted dimensions (reverse scoring)
  if (config.scoringRules?.invertedDimensions) {
    for (const dimKey of config.scoringRules.invertedDimensions) {
      const dim = config.dimensions.find((d) => d.key === dimKey);
      if (dim && scores[dimKey] !== undefined) {
        scores[dimKey] = dim.maxScore - scores[dimKey] + dim.minScore;
      }
    }
  }

  // 3. Normalize scores
  const resolvedNormStats = normStats ?? resolveNormStats(config);
  const normalizedScores = strategy.normalizeScores(scores, config.dimensions, resolvedNormStats);

  // 4. Generate profile
  const profile = strategy.generateProfile(
    scores,
    normalizedScores,
    config.interpretations,
    config.dimensions
  );

  return { scores, normalizedScores, profile };
}

/**
 * Resolve norm group statistics from the assessment config.
 * Returns the first matching norm group's statistics, or undefined.
 */
function resolveNormStats(config: TAssessmentConfig): TNormGroupStatistics | undefined {
  if (config.scoringRules?.normGroupId && config.normGroups?.length > 0) {
    const normGroup = config.normGroups.find((ng) => ng.id === config.scoringRules.normGroupId);
    return normGroup?.statistics;
  }
  return undefined;
}

/**
 * Validate that the assessment config has all required dimensions
 * and that each dimension's variableId exists in the survey variables.
 */
export function validateAssessmentConfig(
  config: TAssessmentConfig,
  surveyVariableIds: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (config.dimensions.length === 0) {
    errors.push("Assessment must have at least one dimension.");
  }

  for (const dim of config.dimensions) {
    if (!surveyVariableIds.includes(dim.variableId)) {
      errors.push(
        `Dimension "${dim.name}" references variable "${dim.variableId}" which does not exist in the survey.`
      );
    }
    if (dim.minScore >= dim.maxScore) {
      errors.push(`Dimension "${dim.name}" has invalid score range: min (${dim.minScore}) >= max (${dim.maxScore}).`);
    }
  }

  // Validate interpretations reference valid dimensions
  const dimKeys = new Set(config.dimensions.map((d) => d.key));
  for (const interp of config.interpretations) {
    if (!dimKeys.has(interp.dimensionKey)) {
      errors.push(`Interpretation references unknown dimension key: "${interp.dimensionKey}".`);
    }
  }

  return { valid: errors.length === 0, errors };
}
