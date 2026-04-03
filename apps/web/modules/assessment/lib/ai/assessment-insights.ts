import { prisma } from "@formbricks/database";
import { logger } from "@formbricks/logger";
import type {
  TAssessmentConfig,
  TAssessmentResult,
  TAssessmentScores,
} from "@formbricks/types/assessments";

import { updateAssessmentResultAiInsights } from "../assessment-result.service";

/**
 * AI-Powered Assessment Insights Generator
 *
 * Generates personalised narrative insights from assessment results.
 * Requires the organization to have AI data analysis enabled.
 *
 * This module is designed to work with any LLM provider.
 * The actual LLM call should be configured via environment variables.
 */

interface InsightGenerationContext {
  config: TAssessmentConfig;
  result: TAssessmentResult;
  respondentName?: string;
  organizationContext?: string;
}

/**
 * Build a prompt for generating assessment insights.
 */
function buildInsightsPrompt(ctx: InsightGenerationContext): string {
  const { config, result } = ctx;

  const dimensionSummary = config.dimensions
    .map((dim) => {
      const raw = result.scores[dim.key] ?? 0;
      const normalized = result.normalizedScores[dim.key] ?? 0;
      return `- ${dim.name} (${dim.key}): Raw=${raw}, Normalized=${normalized}%\n  ${dim.description ?? ""}`;
    })
    .join("\n");

  const profile = result.profile;

  return `You are an expert organizational psychologist and assessment specialist.
Generate a personalised, insightful narrative report based on the following assessment results.

## Assessment Type: ${config.type}
## Report Title: ${config.reportConfig.title ?? "Assessment Report"}

## Respondent: ${ctx.respondentName ?? "Anonymous"}

## Profile
- Primary Type: ${profile.primaryType ?? "N/A"}
- Secondary Type: ${profile.secondaryType ?? "N/A"}
- Profile Label: ${profile.profileLabel ?? "N/A"}

## Dimension Scores
${dimensionSummary}

## Instructions
1. Write a 3-4 paragraph personalised narrative interpreting these results
2. Highlight key strengths and how they manifest in the workplace
3. Identify potential blind spots with empathy and constructive framing
4. Provide 3-5 specific, actionable development recommendations
5. If applicable, suggest how this person might best collaborate with different personality types
6. Use a warm, professional, encouraging tone
7. Do NOT use clinical or judgmental language
8. Format with markdown headers: ## Key Insights, ## Strengths, ## Growth Areas, ## Recommendations, ## Working With Others

${ctx.organizationContext ? `\n## Organization Context\n${ctx.organizationContext}` : ""}`;
}

/**
 * Generate AI insights for an assessment result.
 *
 * This is a placeholder implementation. In production, this would call
 * an LLM API (OpenAI, Anthropic, etc.) configured via environment variables.
 *
 * @param ctx - The context for generating insights
 * @returns Generated insights text
 */
export async function generateAssessmentInsights(ctx: InsightGenerationContext): Promise<string> {
  const prompt = buildInsightsPrompt(ctx);
  const { config, result } = ctx;

  // Check if AI is enabled for the organization
  // In production, this would verify the org's isAIDataAnalysisEnabled flag

  try {
    // Placeholder: Generate structured insights from the data without an LLM call.
    // Replace this with actual LLM integration when available.
    const insights = generateStructuredInsights(config, result, ctx.respondentName);

    // Store the insights
    await updateAssessmentResultAiInsights(result.id, insights);

    return insights;
  } catch (error) {
    logger.error(error, `Failed to generate AI insights for result ${result.id}`);
    throw error;
  }
}

/**
 * Generate structured insights without an LLM (rule-based fallback).
 * This provides meaningful output even without AI integration.
 */
function generateStructuredInsights(
  config: TAssessmentConfig,
  result: TAssessmentResult,
  respondentName?: string
): string {
  const profile = result.profile;
  const name = respondentName ?? "This individual";
  const scores = result.normalizedScores;

  // Sort dimensions by score
  const sorted = [...config.dimensions].sort(
    (a, b) => (scores[b.key] ?? 0) - (scores[a.key] ?? 0)
  );

  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const sections: string[] = [];

  // Key Insights
  sections.push(`## Key Insights\n`);
  sections.push(
    `${name}'s assessment reveals a **${profile.profileLabel ?? strongest?.name ?? "balanced"}** profile. ` +
    `The strongest dimension is **${strongest?.name}** at ${scores[strongest?.key ?? ""] ?? 0}%, ` +
    `while **${weakest?.name}** scored ${scores[weakest?.key ?? ""] ?? 0}%. ` +
    `This pattern suggests someone who ${profile.summary ?? "has a distinctive approach to work and communication"}.`
  );

  // Strengths
  sections.push(`\n## Strengths\n`);
  if (profile.strengths && profile.strengths.length > 0) {
    for (const strength of profile.strengths) {
      sections.push(`- ${strength}`);
    }
  } else {
    for (const dim of sorted.slice(0, 2)) {
      sections.push(`- Strong **${dim.name}** (${scores[dim.key] ?? 0}%): ${dim.description ?? ""}`);
    }
  }

  // Growth Areas
  sections.push(`\n## Growth Areas\n`);
  if (profile.blindSpots && profile.blindSpots.length > 0) {
    for (const blindSpot of profile.blindSpots) {
      sections.push(`- ${blindSpot}`);
    }
  } else {
    for (const dim of sorted.slice(-2)) {
      sections.push(`- **${dim.name}** (${scores[dim.key] ?? 0}%): Consider developing this area further.`);
    }
  }

  // Recommendations
  sections.push(`\n## Recommendations\n`);
  if (profile.developmentAreas && profile.developmentAreas.length > 0) {
    for (const rec of profile.developmentAreas) {
      sections.push(`- ${rec}`);
    }
  } else {
    sections.push(`- Seek feedback from colleagues on how your ${strongest?.name?.toLowerCase()} style impacts the team.`);
    sections.push(`- Find a mentor or colleague strong in ${weakest?.name?.toLowerCase()} to learn from.`);
    sections.push(`- Set specific development goals around your growth areas with measurable milestones.`);
  }

  // Working With Others
  sections.push(`\n## Working With Others\n`);
  sections.push(
    `When collaborating, ${name?.split(" ")[0] ?? "they"} will naturally lead with their ` +
    `${strongest?.name?.toLowerCase()} style. For best results, pair with team members ` +
    `who complement the ${weakest?.name?.toLowerCase()} dimension. ` +
    `Be mindful that others may have very different communication preferences and work styles.`
  );

  return sections.join("\n");
}

/**
 * Generate team dynamics insights from multiple assessment results.
 */
export async function generateTeamInsights(
  config: TAssessmentConfig,
  results: TAssessmentResult[]
): Promise<string> {
  if (results.length === 0) return "No results available for team analysis.";

  const typeDistribution: Record<string, number> = {};
  for (const result of results) {
    const type = result.profile.primaryType ?? "Unknown";
    typeDistribution[type] = (typeDistribution[type] ?? 0) + 1;
  }

  const sections: string[] = [];

  sections.push(`## Team Composition\n`);
  sections.push(`The team consists of ${results.length} members with the following distribution:\n`);
  for (const [type, count] of Object.entries(typeDistribution)) {
    const pct = Math.round((count / results.length) * 100);
    sections.push(`- **${type}**: ${count} members (${pct}%)`);
  }

  // Average scores
  const avgScores: TAssessmentScores = {};
  for (const dim of config.dimensions) {
    const values = results.map((r) => r.normalizedScores[dim.key] ?? 0);
    avgScores[dim.key] = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
  }

  sections.push(`\n## Team Averages\n`);
  for (const dim of config.dimensions) {
    sections.push(`- **${dim.name}**: ${avgScores[dim.key]}%`);
  }

  // Identify gaps
  const sortedDims = [...config.dimensions].sort(
    (a, b) => (avgScores[b.key] ?? 0) - (avgScores[a.key] ?? 0)
  );
  const teamStrength = sortedDims[0];
  const teamGap = sortedDims[sortedDims.length - 1];

  sections.push(`\n## Team Dynamics\n`);
  sections.push(
    `The team's collective strength is **${teamStrength?.name}** (${avgScores[teamStrength?.key ?? ""]}% average), ` +
    `while **${teamGap?.name}** (${avgScores[teamGap?.key ?? ""]}% average) represents a potential blind spot. ` +
    `Consider whether this gap might affect team performance in areas requiring ${teamGap?.name?.toLowerCase()}.`
  );

  return sections.join("\n");
}
