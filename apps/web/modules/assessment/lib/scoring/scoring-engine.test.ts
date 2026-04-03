import { describe, expect, it } from "vitest";
import type { TAssessmentConfig } from "@formbricks/types/assessments";
import { computeAssessmentResult, validateAssessmentConfig } from "./scoring-engine";

const mockDiscConfig: TAssessmentConfig = {
  id: "test-config-id",
  createdAt: new Date(),
  updatedAt: new Date(),
  surveyId: "test-survey-id",
  type: "disc",
  dimensions: [
    { id: "dim-d", key: "D", name: "Dominance", description: "", variableId: "disc_d", minScore: 0, maxScore: 28, color: "#DC2626" },
    { id: "dim-i", key: "I", name: "Influence", description: "", variableId: "disc_i", minScore: 0, maxScore: 28, color: "#F59E0B" },
    { id: "dim-s", key: "S", name: "Steadiness", description: "", variableId: "disc_s", minScore: 0, maxScore: 28, color: "#10B981" },
    { id: "dim-c", key: "C", name: "Conscientiousness", description: "", variableId: "disc_c", minScore: 0, maxScore: 28, color: "#3B82F6" },
  ],
  interpretations: [
    {
      dimensionKey: "D",
      ranges: [
        { min: 0, max: 9, label: "Low D", description: "Low dominance" },
        { min: 10, max: 18, label: "Moderate D", description: "Moderate dominance" },
        { min: 19, max: 28, label: "High D", description: "High dominance" },
      ],
    },
    {
      dimensionKey: "I",
      ranges: [
        { min: 0, max: 9, label: "Low I", description: "Low influence" },
        { min: 10, max: 18, label: "Moderate I", description: "Moderate influence" },
        { min: 19, max: 28, label: "High I", description: "High influence" },
      ],
    },
    {
      dimensionKey: "S",
      ranges: [
        { min: 0, max: 9, label: "Low S", description: "Low steadiness" },
        { min: 10, max: 18, label: "Moderate S", description: "Moderate steadiness" },
        { min: 19, max: 28, label: "High S", description: "High steadiness" },
      ],
    },
    {
      dimensionKey: "C",
      ranges: [
        { min: 0, max: 9, label: "Low C", description: "Low conscientiousness" },
        { min: 10, max: 18, label: "Moderate C", description: "Moderate conscientiousness" },
        { min: 19, max: 28, label: "High C", description: "High conscientiousness" },
      ],
    },
  ],
  reportConfig: {
    title: "DISC Assessment",
    showRadarChart: true,
    showBarChart: true,
    showDimensionDetails: true,
    showNormComparison: false,
    showStrengthsAndBlindSpots: true,
    showRecommendations: true,
  },
  normGroups: [],
  scoringRules: {
    method: "ipsative",
    normalizeToPercentage: true,
  },
};

describe("Scoring Engine", () => {
  describe("computeAssessmentResult", () => {
    it("should compute DISC scores from response variables", () => {
      const variables = { disc_d: 20, disc_i: 12, disc_s: 8, disc_c: 16 };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      expect(result.scores.D).toBe(20);
      expect(result.scores.I).toBe(12);
      expect(result.scores.S).toBe(8);
      expect(result.scores.C).toBe(16);
    });

    it("should normalize DISC scores to percentages of total", () => {
      const variables = { disc_d: 20, disc_i: 12, disc_s: 8, disc_c: 16 };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      // Total = 56, D = 20/56 = 35.7%, I = 12/56 = 21.4%, S = 8/56 = 14.3%, C = 16/56 = 28.6%
      expect(result.normalizedScores.D).toBe(36); // rounded
      expect(result.normalizedScores.I).toBe(21);
      expect(result.normalizedScores.S).toBe(14);
      expect(result.normalizedScores.C).toBe(29);
    });

    it("should identify D as primary type when D score is highest", () => {
      const variables = { disc_d: 20, disc_i: 12, disc_s: 8, disc_c: 16 };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      expect(result.profile.primaryType).toBe("D");
      expect(result.profile.secondaryType).toBe("C");
    });

    it("should handle all-zero scores gracefully", () => {
      const variables = { disc_d: 0, disc_i: 0, disc_s: 0, disc_c: 0 };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      expect(result.scores.D).toBe(0);
      expect(result.normalizedScores.D).toBe(0);
    });

    it("should handle equal scores", () => {
      const variables = { disc_d: 14, disc_i: 14, disc_s: 14, disc_c: 14 };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      expect(result.normalizedScores.D).toBe(25);
      expect(result.normalizedScores.I).toBe(25);
    });

    it("should handle string variable values", () => {
      const variables = { disc_d: "15", disc_i: "10", disc_s: "8", disc_c: "12" };
      const result = computeAssessmentResult(mockDiscConfig, variables);

      expect(result.scores.D).toBe(15);
      expect(result.scores.I).toBe(10);
    });
  });

  describe("validateAssessmentConfig", () => {
    it("should validate a correct config", () => {
      const result = validateAssessmentConfig(mockDiscConfig, [
        "disc_d",
        "disc_i",
        "disc_s",
        "disc_c",
      ]);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should fail when dimension references missing variable", () => {
      const result = validateAssessmentConfig(mockDiscConfig, ["disc_d", "disc_i"]);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should fail when no dimensions", () => {
      const emptyConfig = { ...mockDiscConfig, dimensions: [] };
      const result = validateAssessmentConfig(emptyConfig, []);
      expect(result.valid).toBe(false);
    });
  });
});
