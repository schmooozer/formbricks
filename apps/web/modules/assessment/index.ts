/**
 * Formbricks Assessment Module
 *
 * Enterprise-grade assessment engine supporting:
 * - DISC personality assessments
 * - Big Five (OCEAN) personality assessments
 * - Myers-Briggs Type Indicator
 * - Skills & competency evaluations
 * - 360-degree feedback
 * - Custom assessment frameworks
 *
 * Features:
 * - Multi-dimension scoring engine with pluggable strategies
 * - Norm group benchmarking and percentile ranking
 * - AI-powered narrative insights
 * - Rich results pages with radar/bar charts
 * - Branded PDF report generation
 * - Campaign management for bulk assessment issuance
 * - Longitudinal tracking across assessment cycles
 * - Team composition analysis and heatmaps
 *
 * Key entry points:
 * - Scoring: ./lib/scoring/scoring-engine.ts
 * - Pipeline: ./lib/assessment-pipeline.ts
 * - Templates: ./lib/templates/disc-template.ts
 * - Services: ./lib/assessment-config.service.ts, ./lib/assessment-result.service.ts
 * - Actions: ./actions.ts
 * - Components: ./components/results/, ./components/dashboard/
 * - PDF: ./lib/pdf/
 * - AI: ./lib/ai/assessment-insights.ts
 */

export { computeAssessmentResult, validateAssessmentConfig } from "./lib/scoring/scoring-engine";
export { processAssessmentForResponse } from "./lib/assessment-pipeline";
export {
  DISC_ASSESSMENT_PRESET,
  DISC_QUESTIONS,
  getDiscSurveyVariables,
} from "./lib/templates/disc-template";
export {
  BIG_FIVE_ASSESSMENT_PRESET,
  BIG_FIVE_QUESTIONS,
  getBigFiveSurveyVariables,
} from "./lib/templates/big-five-template";
export {
  MYERS_BRIGGS_ASSESSMENT_PRESET,
  MYERS_BRIGGS_QUESTIONS,
  getMyersBriggsSurveyVariables,
} from "./lib/templates/myers-briggs-template";
export {
  LEARNING_STYLES_ASSESSMENT_PRESET,
  LEARNING_STYLES_QUESTIONS,
  getLearningStylesSurveyVariables,
} from "./lib/templates/learning-styles-template";
export {
  LITERACY_ASSESSMENT_PRESET,
  LITERACY_QUESTIONS,
  getLiteracySurveyVariables,
} from "./lib/templates/literacy-template";
export {
  NUMERACY_ASSESSMENT_PRESET,
  NUMERACY_QUESTIONS,
  getNumeracySurveyVariables,
} from "./lib/templates/numeracy-template";
export {
  LOGICAL_REASONING_ASSESSMENT_PRESET,
  LOGICAL_REASONING_QUESTIONS,
  getLogicalReasoningSurveyVariables,
} from "./lib/templates/logical-reasoning-template";
export { EIQ_ASSESSMENT_PRESET, EIQ_QUESTIONS, getEiqSurveyVariables } from "./lib/templates/eiq-template";
export {
  MOTIVATORS_ASSESSMENT_PRESET,
  MOTIVATORS_QUESTIONS,
  getMotivatorsSurveyVariables,
} from "./lib/templates/motivators-template";
