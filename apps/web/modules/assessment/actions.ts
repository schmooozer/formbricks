"use server";

import { z } from "zod";
import { authenticatedActionClient } from "@/lib/utils/action-client";
import { checkAuthorizationUpdated } from "@/lib/utils/action-client/action-client-middleware";
import { getOrganizationIdFromEnvironmentId } from "@/lib/utils/helper";
import {
  ZAssessmentCampaignInput,
  ZAssessmentConfigInput,
} from "@formbricks/types/assessments";

import {
  createAssessmentConfig,
  deleteAssessmentConfig,
  getAssessmentConfig,
  updateAssessmentConfig,
  upsertAssessmentConfig,
} from "./lib/assessment-config.service";
import {
  createCampaign,
  createInvitations,
  deleteCampaign,
  getCampaign,
  getCampaignStats,
  getCampaignsByEnvironment,
  getInvitationsByCampaign,
  updateCampaign,
} from "./lib/assessment-campaign.service";
import {
  getAssessmentAggregateStats,
  getAssessmentResult,
  getAssessmentResultByToken,
  getAssessmentResultCount,
  getAssessmentResults,
} from "./lib/assessment-result.service";

// ============================================================================
// Assessment Config Actions
// ============================================================================

export const getAssessmentConfigAction = authenticatedActionClient
  .inputSchema(z.object({ surveyId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return getAssessmentConfig(parsedInput.surveyId);
  });

export const upsertAssessmentConfigAction = authenticatedActionClient
  .inputSchema(ZAssessmentConfigInput)
  .action(async ({ ctx, parsedInput }) => {
    return upsertAssessmentConfig(parsedInput);
  });

export const deleteAssessmentConfigAction = authenticatedActionClient
  .inputSchema(z.object({ surveyId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return deleteAssessmentConfig(parsedInput.surveyId);
  });

// ============================================================================
// Assessment Result Actions
// ============================================================================

export const getAssessmentResultAction = authenticatedActionClient
  .inputSchema(z.object({ responseId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return getAssessmentResult(parsedInput.responseId);
  });

export const getAssessmentResultByTokenAction = authenticatedActionClient
  .inputSchema(z.object({ accessToken: z.string() }))
  .action(async ({ parsedInput }) => {
    return getAssessmentResultByToken(parsedInput.accessToken);
  });

export const getAssessmentResultsAction = authenticatedActionClient
  .inputSchema(
    z.object({
      assessmentConfigId: z.string().cuid2(),
      limit: z.number().int().positive().optional(),
      offset: z.number().int().min(0).optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    return getAssessmentResults(parsedInput.assessmentConfigId, {
      limit: parsedInput.limit,
      offset: parsedInput.offset,
    });
  });

export const getAssessmentAggregateStatsAction = authenticatedActionClient
  .inputSchema(z.object({ surveyId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    const config = await getAssessmentConfig(parsedInput.surveyId);
    if (!config) throw new Error("Assessment config not found");
    return getAssessmentAggregateStats(config);
  });

// ============================================================================
// Campaign Actions
// ============================================================================

export const getCampaignsByEnvironmentAction = authenticatedActionClient
  .inputSchema(z.object({ environmentId: z.string().cuid2() }))
  .action(async ({ ctx, parsedInput }) => {
    const organizationId = await getOrganizationIdFromEnvironmentId(parsedInput.environmentId);
    await checkAuthorizationUpdated({
      userId: ctx.user.id,
      organizationId,
      access: [{ type: "organization", roles: ["owner", "manager"] }],
    });
    return getCampaignsByEnvironment(parsedInput.environmentId);
  });

export const createCampaignAction = authenticatedActionClient
  .inputSchema(ZAssessmentCampaignInput)
  .action(async ({ ctx, parsedInput }) => {
    const organizationId = await getOrganizationIdFromEnvironmentId(parsedInput.environmentId);
    await checkAuthorizationUpdated({
      userId: ctx.user.id,
      organizationId,
      access: [{ type: "organization", roles: ["owner", "manager"] }],
    });
    return createCampaign(parsedInput);
  });

export const updateCampaignAction = authenticatedActionClient
  .inputSchema(
    z.object({
      campaignId: z.string().cuid2(),
      data: ZAssessmentCampaignInput.partial(),
    })
  )
  .action(async ({ parsedInput }) => {
    return updateCampaign(parsedInput.campaignId, parsedInput.data);
  });

export const deleteCampaignAction = authenticatedActionClient
  .inputSchema(z.object({ campaignId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return deleteCampaign(parsedInput.campaignId);
  });

export const sendCampaignInvitationsAction = authenticatedActionClient
  .inputSchema(
    z.object({
      campaignId: z.string().cuid2(),
      contactIds: z.array(z.string().cuid2()),
    })
  )
  .action(async ({ parsedInput }) => {
    return createInvitations(parsedInput.campaignId, parsedInput.contactIds);
  });

export const getCampaignStatsAction = authenticatedActionClient
  .inputSchema(z.object({ campaignId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return getCampaignStats(parsedInput.campaignId);
  });

export const getInvitationsByCampaignAction = authenticatedActionClient
  .inputSchema(z.object({ campaignId: z.string().cuid2() }))
  .action(async ({ parsedInput }) => {
    return getInvitationsByCampaign(parsedInput.campaignId);
  });
