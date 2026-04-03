import "server-only";

import { Prisma } from "@prisma/client";
import { cache as reactCache } from "react";
import { prisma } from "@formbricks/database";
import type {
  TAssessmentCampaign,
  TAssessmentCampaignInput,
  TAssessmentInvitation,
} from "@formbricks/types/assessments";

const selectCampaign = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  status: true,
  assessmentConfigId: true,
  environmentId: true,
  segmentId: true,
  scheduledAt: true,
  deadlineAt: true,
  reminderIntervals: true,
} satisfies Prisma.AssessmentCampaignSelect;

const selectInvitation = {
  id: true,
  createdAt: true,
  campaignId: true,
  contactId: true,
  status: true,
  sentAt: true,
  completedAt: true,
  responseId: true,
} satisfies Prisma.AssessmentInvitationSelect;

function transformCampaign(
  data: Prisma.AssessmentCampaignGetPayload<{ select: typeof selectCampaign }>
): TAssessmentCampaign {
  return {
    ...data,
    status: data.status as TAssessmentCampaign["status"],
    reminderIntervals: data.reminderIntervals as number[],
  };
}

function transformInvitation(
  data: Prisma.AssessmentInvitationGetPayload<{ select: typeof selectInvitation }>
): TAssessmentInvitation {
  return {
    ...data,
    status: data.status as TAssessmentInvitation["status"],
  };
}

export const getCampaign = reactCache(async (campaignId: string): Promise<TAssessmentCampaign | null> => {
  const campaign = await prisma.assessmentCampaign.findUnique({
    where: { id: campaignId },
    select: selectCampaign,
  });
  return campaign ? transformCampaign(campaign) : null;
});

export const getCampaignsByAssessment = reactCache(
  async (assessmentConfigId: string): Promise<TAssessmentCampaign[]> => {
    const campaigns = await prisma.assessmentCampaign.findMany({
      where: { assessmentConfigId },
      select: selectCampaign,
      orderBy: { createdAt: "desc" },
    });
    return campaigns.map(transformCampaign);
  }
);

export const getCampaignsByEnvironment = reactCache(
  async (environmentId: string): Promise<TAssessmentCampaign[]> => {
    const campaigns = await prisma.assessmentCampaign.findMany({
      where: { environmentId },
      select: selectCampaign,
      orderBy: { createdAt: "desc" },
    });
    return campaigns.map(transformCampaign);
  }
);

export async function createCampaign(input: TAssessmentCampaignInput): Promise<TAssessmentCampaign> {
  const campaign = await prisma.assessmentCampaign.create({
    data: {
      name: input.name,
      status: input.status,
      assessmentConfigId: input.assessmentConfigId,
      environmentId: input.environmentId,
      segmentId: input.segmentId ?? null,
      scheduledAt: input.scheduledAt ?? null,
      deadlineAt: input.deadlineAt ?? null,
      reminderIntervals: input.reminderIntervals as unknown as Prisma.InputJsonValue,
    },
    select: selectCampaign,
  });
  return transformCampaign(campaign);
}

export async function updateCampaign(
  campaignId: string,
  data: Partial<TAssessmentCampaignInput>
): Promise<TAssessmentCampaign> {
  const updateData: Prisma.AssessmentCampaignUpdateInput = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.segmentId !== undefined) updateData.segmentId = data.segmentId;
  if (data.scheduledAt !== undefined) updateData.scheduledAt = data.scheduledAt;
  if (data.deadlineAt !== undefined) updateData.deadlineAt = data.deadlineAt;
  if (data.reminderIntervals !== undefined) {
    updateData.reminderIntervals = data.reminderIntervals as unknown as Prisma.InputJsonValue;
  }

  const campaign = await prisma.assessmentCampaign.update({
    where: { id: campaignId },
    data: updateData,
    select: selectCampaign,
  });
  return transformCampaign(campaign);
}

export async function deleteCampaign(campaignId: string): Promise<void> {
  await prisma.assessmentCampaign.delete({ where: { id: campaignId } });
}

// ---- Invitations ----

export const getInvitationsByCampaign = reactCache(
  async (campaignId: string): Promise<TAssessmentInvitation[]> => {
    const invitations = await prisma.assessmentInvitation.findMany({
      where: { campaignId },
      select: selectInvitation,
      orderBy: { createdAt: "desc" },
    });
    return invitations.map(transformInvitation);
  }
);

export async function createInvitations(
  campaignId: string,
  contactIds: string[]
): Promise<TAssessmentInvitation[]> {
  await prisma.assessmentInvitation.createMany({
    data: contactIds.map((contactId) => ({
      campaignId,
      contactId,
      status: "pending",
    })),
    skipDuplicates: true,
  });

  return getInvitationsByCampaign(campaignId);
}

export async function updateInvitationStatus(
  invitationId: string,
  status: string,
  extra?: { sentAt?: Date; completedAt?: Date; responseId?: string }
): Promise<TAssessmentInvitation> {
  const invitation = await prisma.assessmentInvitation.update({
    where: { id: invitationId },
    data: {
      status,
      ...(extra?.sentAt && { sentAt: extra.sentAt }),
      ...(extra?.completedAt && { completedAt: extra.completedAt }),
      ...(extra?.responseId && { responseId: extra.responseId }),
    },
    select: selectInvitation,
  });
  return transformInvitation(invitation);
}

export async function getCampaignStats(campaignId: string) {
  const [total, pending, sent, started, completed, expired] = await Promise.all([
    prisma.assessmentInvitation.count({ where: { campaignId } }),
    prisma.assessmentInvitation.count({ where: { campaignId, status: "pending" } }),
    prisma.assessmentInvitation.count({ where: { campaignId, status: "sent" } }),
    prisma.assessmentInvitation.count({ where: { campaignId, status: "started" } }),
    prisma.assessmentInvitation.count({ where: { campaignId, status: "completed" } }),
    prisma.assessmentInvitation.count({ where: { campaignId, status: "expired" } }),
  ]);

  return { total, pending, sent, started, completed, expired };
}
