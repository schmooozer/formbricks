import { z } from "zod";

// ============================================================================
// Assessment Type Enum
// ============================================================================

export const ZAssessmentType = z.enum([
  "disc",
  "bigFive",
  "myersBriggs",
  "skillsCompetency",
  "threeSixtyFeedback",
  "custom",
]);
export type TAssessmentType = z.infer<typeof ZAssessmentType>;

// ============================================================================
// Assessment Dimensions
// ============================================================================

export const ZAssessmentDimension = z.object({
  id: z.string().cuid2(),
  key: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  variableId: z.string().min(1),
  minScore: z.number().default(0),
  maxScore: z.number().default(100),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  icon: z.string().optional(),
});
export type TAssessmentDimension = z.infer<typeof ZAssessmentDimension>;

export const ZAssessmentDimensions = z.array(ZAssessmentDimension);
export type TAssessmentDimensions = z.infer<typeof ZAssessmentDimensions>;

// ============================================================================
// Assessment Interpretation Ranges
// ============================================================================

export const ZAssessmentInterpretationRange = z.object({
  min: z.number(),
  max: z.number(),
  label: z.string().min(1).max(100),
  description: z.string().max(5000),
  strengths: z.array(z.string()).optional(),
  blindSpots: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional(),
});
export type TAssessmentInterpretationRange = z.infer<typeof ZAssessmentInterpretationRange>;

export const ZAssessmentInterpretation = z.object({
  dimensionKey: z.string().min(1),
  ranges: z.array(ZAssessmentInterpretationRange),
});
export type TAssessmentInterpretation = z.infer<typeof ZAssessmentInterpretation>;

export const ZAssessmentInterpretations = z.array(ZAssessmentInterpretation);
export type TAssessmentInterpretations = z.infer<typeof ZAssessmentInterpretations>;

// ============================================================================
// Assessment Report Config
// ============================================================================

export const ZAssessmentReportConfig = z.object({
  title: z.string().min(1).max(200).default("Assessment Report"),
  subtitle: z.string().max(500).optional(),
  logoUrl: z.string().url().optional(),
  showRadarChart: z.boolean().default(true),
  showBarChart: z.boolean().default(true),
  showDimensionDetails: z.boolean().default(true),
  showNormComparison: z.boolean().default(false),
  showStrengthsAndBlindSpots: z.boolean().default(true),
  showRecommendations: z.boolean().default(true),
  brandColors: z
    .object({
      primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      secondary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    })
    .optional(),
  customCss: z.string().max(10000).optional(),
  footerText: z.string().max(500).optional(),
});
export type TAssessmentReportConfig = z.infer<typeof ZAssessmentReportConfig>;

// ============================================================================
// Assessment Scoring Rules
// ============================================================================

export const ZAssessmentScoringMethod = z.enum([
  "variableSum", // Sum of survey variable values (default)
  "weighted", // Weighted scoring with multipliers
  "ipsative", // Forced-choice / ipsative (DISC style)
  "normative", // Likert scale normative (Big Five style)
  "average", // Average of items per dimension (skills)
  "multiRater", // 360-degree multi-rater aggregation
]);
export type TAssessmentScoringMethod = z.infer<typeof ZAssessmentScoringMethod>;

export const ZAssessmentScoringRules = z.object({
  method: ZAssessmentScoringMethod.default("variableSum"),
  weights: z.record(z.string(), z.number()).optional(),
  normGroupId: z.string().cuid2().optional(),
  normalizeToPercentage: z.boolean().default(true),
  invertedDimensions: z.array(z.string()).optional(),
});
export type TAssessmentScoringRules = z.infer<typeof ZAssessmentScoringRules>;

// ============================================================================
// Assessment Scores & Profile
// ============================================================================

export const ZAssessmentScores = z.record(z.string(), z.number());
export type TAssessmentScores = z.infer<typeof ZAssessmentScores>;

export const ZAssessmentProfile = z.object({
  primaryType: z.string().optional(),
  secondaryType: z.string().optional(),
  profileLabel: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  strengths: z.array(z.string()).optional(),
  blindSpots: z.array(z.string()).optional(),
  developmentAreas: z.array(z.string()).optional(),
});
export type TAssessmentProfile = z.infer<typeof ZAssessmentProfile>;

// ============================================================================
// Norm Group Statistics
// ============================================================================

export const ZNormGroupDimensionStats = z.object({
  mean: z.number(),
  stdDev: z.number(),
  median: z.number().optional(),
  percentiles: z.record(z.string(), z.number()).optional(), // e.g. { "10": 23, "25": 35, "50": 50, "75": 65, "90": 78 }
  min: z.number().optional(),
  max: z.number().optional(),
});
export type TNormGroupDimensionStats = z.infer<typeof ZNormGroupDimensionStats>;

export const ZNormGroupStatistics = z.record(z.string(), ZNormGroupDimensionStats);
export type TNormGroupStatistics = z.infer<typeof ZNormGroupStatistics>;

export const ZAssessmentNormGroup = z.object({
  id: z.string().cuid2(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  assessmentType: ZAssessmentType,
  sampleSize: z.number().int().min(0).default(0),
  statistics: ZNormGroupStatistics,
  isGlobal: z.boolean().default(false),
});
export type TAssessmentNormGroup = z.infer<typeof ZAssessmentNormGroup>;

// ============================================================================
// Assessment Config (Full Model)
// ============================================================================

export const ZAssessmentConfig = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  surveyId: z.string().cuid2(),
  type: ZAssessmentType,
  dimensions: ZAssessmentDimensions,
  interpretations: ZAssessmentInterpretations,
  reportConfig: ZAssessmentReportConfig,
  normGroups: z.array(ZAssessmentNormGroup).default([]),
  scoringRules: ZAssessmentScoringRules,
});
export type TAssessmentConfig = z.infer<typeof ZAssessmentConfig>;

export const ZAssessmentConfigInput = ZAssessmentConfig.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type TAssessmentConfigInput = z.infer<typeof ZAssessmentConfigInput>;

// ============================================================================
// Assessment Result (Full Model)
// ============================================================================

export const ZAssessmentResult = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  assessmentConfigId: z.string().cuid2(),
  responseId: z.string().cuid2(),
  scores: ZAssessmentScores,
  normalizedScores: ZAssessmentScores,
  profile: ZAssessmentProfile,
  aiInsights: z.string().nullable().optional(),
  pdfUrl: z.string().nullable().optional(),
  accessToken: z.string(),
});
export type TAssessmentResult = z.infer<typeof ZAssessmentResult>;

// ============================================================================
// Assessment Campaign
// ============================================================================

export const ZAssessmentCampaignStatus = z.enum([
  "draft",
  "active",
  "paused",
  "completed",
  "archived",
]);
export type TAssessmentCampaignStatus = z.infer<typeof ZAssessmentCampaignStatus>;

export const ZAssessmentCampaign = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(1).max(200),
  status: ZAssessmentCampaignStatus,
  assessmentConfigId: z.string().cuid2(),
  environmentId: z.string().cuid2(),
  segmentId: z.string().cuid2().nullable().optional(),
  scheduledAt: z.date().nullable().optional(),
  deadlineAt: z.date().nullable().optional(),
  reminderIntervals: z.array(z.number().int().positive()).default([]),
});
export type TAssessmentCampaign = z.infer<typeof ZAssessmentCampaign>;

export const ZAssessmentCampaignInput = ZAssessmentCampaign.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type TAssessmentCampaignInput = z.infer<typeof ZAssessmentCampaignInput>;

// ============================================================================
// Assessment Invitation
// ============================================================================

export const ZAssessmentInvitationStatus = z.enum([
  "pending",
  "sent",
  "opened",
  "started",
  "completed",
  "expired",
]);
export type TAssessmentInvitationStatus = z.infer<typeof ZAssessmentInvitationStatus>;

export const ZAssessmentInvitation = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  campaignId: z.string().cuid2(),
  contactId: z.string().cuid2(),
  status: ZAssessmentInvitationStatus,
  sentAt: z.date().nullable().optional(),
  completedAt: z.date().nullable().optional(),
  responseId: z.string().cuid2().nullable().optional(),
});
export type TAssessmentInvitation = z.infer<typeof ZAssessmentInvitation>;

// ============================================================================
// Aggregate Analytics Types
// ============================================================================

export const ZAssessmentAggregateStats = z.object({
  totalResponses: z.number().int(),
  completionRate: z.number(),
  averageScores: ZAssessmentScores,
  scoreDistributions: z.record(
    z.string(),
    z.array(
      z.object({
        bucket: z.string(),
        count: z.number().int(),
      })
    )
  ),
  profileTypeDistribution: z.array(
    z.object({
      type: z.string(),
      count: z.number().int(),
      percentage: z.number(),
    })
  ),
  dimensionStats: z.record(z.string(), ZNormGroupDimensionStats),
});
export type TAssessmentAggregateStats = z.infer<typeof ZAssessmentAggregateStats>;

// ============================================================================
// 360-Degree Feedback Types
// ============================================================================

export const ZRaterRelationship = z.enum([
  "self",
  "manager",
  "peer",
  "directReport",
  "external",
]);
export type TRaterRelationship = z.infer<typeof ZRaterRelationship>;

export const ZThreeSixtyRaterGroup = z.object({
  relationship: ZRaterRelationship,
  scores: ZAssessmentScores,
  responseCount: z.number().int(),
});
export type TThreeSixtyRaterGroup = z.infer<typeof ZThreeSixtyRaterGroup>;

export const ZThreeSixtyResult = z.object({
  subjectContactId: z.string().cuid2(),
  raterGroups: z.array(ZThreeSixtyRaterGroup),
  blindSpots: z.array(
    z.object({
      dimensionKey: z.string(),
      selfScore: z.number(),
      othersAverage: z.number(),
      gap: z.number(),
    })
  ),
  hiddenStrengths: z.array(
    z.object({
      dimensionKey: z.string(),
      selfScore: z.number(),
      othersAverage: z.number(),
      gap: z.number(),
    })
  ),
});
export type TThreeSixtyResult = z.infer<typeof ZThreeSixtyResult>;

// ============================================================================
// Longitudinal Tracking Types
// ============================================================================

export const ZAssessmentHistoryPoint = z.object({
  resultId: z.string().cuid2(),
  date: z.date(),
  scores: ZAssessmentScores,
  normalizedScores: ZAssessmentScores,
  milestone: z.string().optional(),
});
export type TAssessmentHistoryPoint = z.infer<typeof ZAssessmentHistoryPoint>;

export const ZAssessmentHistory = z.object({
  contactId: z.string().cuid2(),
  assessmentType: ZAssessmentType,
  dataPoints: z.array(ZAssessmentHistoryPoint),
  trends: z.record(
    z.string(),
    z.object({
      direction: z.enum(["improving", "declining", "stable"]),
      changePercent: z.number(),
      isSignificant: z.boolean(),
    })
  ),
});
export type TAssessmentHistory = z.infer<typeof ZAssessmentHistory>;

// ============================================================================
// Adaptive Assessment Types (IRT - Item Response Theory)
// ============================================================================

export const ZAdaptiveItemParams = z.object({
  elementId: z.string(),
  discrimination: z.number(), // 'a' parameter
  difficulty: z.number(), // 'b' parameter
  guessing: z.number().default(0), // 'c' parameter
  dimensionKey: z.string(),
});
export type TAdaptiveItemParams = z.infer<typeof ZAdaptiveItemParams>;

export const ZAdaptiveAssessmentState = z.object({
  currentTheta: z.record(z.string(), z.number()), // ability estimate per dimension
  standardError: z.record(z.string(), z.number()), // SE per dimension
  itemsAdministered: z.array(z.string()),
  remainingItems: z.array(z.string()),
  terminationCriteria: z.object({
    maxItems: z.number().int().positive(),
    minSE: z.number().positive(),
  }),
});
export type TAdaptiveAssessmentState = z.infer<typeof ZAdaptiveAssessmentState>;

// ============================================================================
// Template Preset (extends survey template system)
// ============================================================================

export const ZAssessmentTemplatePreset = z.object({
  type: ZAssessmentType,
  dimensions: ZAssessmentDimensions,
  interpretations: ZAssessmentInterpretations,
  reportConfig: ZAssessmentReportConfig,
  scoringRules: ZAssessmentScoringRules,
});
export type TAssessmentTemplatePreset = z.infer<typeof ZAssessmentTemplatePreset>;
