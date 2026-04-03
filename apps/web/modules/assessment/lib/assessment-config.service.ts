import "server-only";

import { Prisma } from "@prisma/client";
import { cache as reactCache } from "react";
import { prisma } from "@formbricks/database";
import type { TAssessmentConfig, TAssessmentConfigInput } from "@formbricks/types/assessments";

const selectAssessmentConfig = {
  id: true,
  createdAt: true,
  updatedAt: true,
  surveyId: true,
  type: true,
  dimensions: true,
  interpretations: true,
  reportConfig: true,
  normGroups: true,
  scoringRules: true,
} satisfies Prisma.AssessmentConfigSelect;

function transformPrismaConfig(data: Prisma.AssessmentConfigGetPayload<{ select: typeof selectAssessmentConfig }>): TAssessmentConfig {
  return {
    ...data,
    type: data.type as TAssessmentConfig["type"],
    dimensions: data.dimensions as TAssessmentConfig["dimensions"],
    interpretations: data.interpretations as TAssessmentConfig["interpretations"],
    reportConfig: data.reportConfig as TAssessmentConfig["reportConfig"],
    normGroups: data.normGroups as TAssessmentConfig["normGroups"],
    scoringRules: data.scoringRules as TAssessmentConfig["scoringRules"],
  };
}

export const getAssessmentConfig = reactCache(async (surveyId: string): Promise<TAssessmentConfig | null> => {
  const config = await prisma.assessmentConfig.findUnique({
    where: { surveyId },
    select: selectAssessmentConfig,
  });
  return config ? transformPrismaConfig(config) : null;
});

export const getAssessmentConfigById = reactCache(async (id: string): Promise<TAssessmentConfig | null> => {
  const config = await prisma.assessmentConfig.findUnique({
    where: { id },
    select: selectAssessmentConfig,
  });
  return config ? transformPrismaConfig(config) : null;
});

export async function createAssessmentConfig(input: TAssessmentConfigInput): Promise<TAssessmentConfig> {
  const config = await prisma.assessmentConfig.create({
    data: {
      surveyId: input.surveyId,
      type: input.type,
      dimensions: input.dimensions as unknown as Prisma.InputJsonValue,
      interpretations: input.interpretations as unknown as Prisma.InputJsonValue,
      reportConfig: input.reportConfig as unknown as Prisma.InputJsonValue,
      normGroups: input.normGroups as unknown as Prisma.InputJsonValue,
      scoringRules: input.scoringRules as unknown as Prisma.InputJsonValue,
    },
    select: selectAssessmentConfig,
  });
  return transformPrismaConfig(config);
}

export async function updateAssessmentConfig(
  surveyId: string,
  data: Partial<TAssessmentConfigInput>
): Promise<TAssessmentConfig> {
  const updateData: Prisma.AssessmentConfigUpdateInput = {};
  if (data.type !== undefined) updateData.type = data.type;
  if (data.dimensions !== undefined) updateData.dimensions = data.dimensions as unknown as Prisma.InputJsonValue;
  if (data.interpretations !== undefined) updateData.interpretations = data.interpretations as unknown as Prisma.InputJsonValue;
  if (data.reportConfig !== undefined) updateData.reportConfig = data.reportConfig as unknown as Prisma.InputJsonValue;
  if (data.normGroups !== undefined) updateData.normGroups = data.normGroups as unknown as Prisma.InputJsonValue;
  if (data.scoringRules !== undefined) updateData.scoringRules = data.scoringRules as unknown as Prisma.InputJsonValue;

  const config = await prisma.assessmentConfig.update({
    where: { surveyId },
    data: updateData,
    select: selectAssessmentConfig,
  });
  return transformPrismaConfig(config);
}

export async function upsertAssessmentConfig(input: TAssessmentConfigInput): Promise<TAssessmentConfig> {
  const data = {
    type: input.type,
    dimensions: input.dimensions as unknown as Prisma.InputJsonValue,
    interpretations: input.interpretations as unknown as Prisma.InputJsonValue,
    reportConfig: input.reportConfig as unknown as Prisma.InputJsonValue,
    normGroups: input.normGroups as unknown as Prisma.InputJsonValue,
    scoringRules: input.scoringRules as unknown as Prisma.InputJsonValue,
  };

  const config = await prisma.assessmentConfig.upsert({
    where: { surveyId: input.surveyId },
    create: { surveyId: input.surveyId, ...data },
    update: data,
    select: selectAssessmentConfig,
  });
  return transformPrismaConfig(config);
}

export async function deleteAssessmentConfig(surveyId: string): Promise<void> {
  await prisma.assessmentConfig.delete({ where: { surveyId } });
}
