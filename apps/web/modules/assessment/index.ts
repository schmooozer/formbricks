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
export { DISC_ASSESSMENT_PRESET, DISC_QUESTIONS, getDiscSurveyVariables } from "./lib/templates/disc-template";
