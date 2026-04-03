import { prisma } from "@formbricks/database";
import { logger } from "@formbricks/logger";

import { getAssessmentConfig } from "./assessment-config.service";
import { computeAndStoreAssessmentResult } from "./assessment-result.service";

/**
 * Process assessment scoring when a survey response is finished.
 *
 * This function should be called from the response pipeline handler
 * when a `responseFinished` event occurs. It checks if the survey
 * has an assessment configuration and, if so, computes and stores
 * the assessment result.
 *
 * Integration point: /apps/web/app/api/(internal)/pipeline/route.ts
 * Add after existing responseFinished handling:
 *
 *   import { processAssessmentForResponse } from "@/modules/assessment/lib/assessment-pipeline";
 *   await processAssessmentForResponse(surveyId, responseId);
 */
export async function processAssessmentForResponse(
  surveyId: string,
  responseId: string
): Promise<void> {
  try {
    // Check if this survey has an assessment config
    const config = await getAssessmentConfig(surveyId);
    if (!config) return;

    // Fetch the response's variables
    const response = await prisma.response.findUnique({
      where: { id: responseId },
      select: { variables: true, finished: true },
    });

    if (!response || !response.finished) return;

    const variables = (response.variables as Record<string, string | number>) ?? {};

    // Compute and store the assessment result
    const result = await computeAndStoreAssessmentResult(config, responseId, variables);

    logger.info(`Assessment result computed for response ${responseId}: ${result.profile.profileLabel ?? "N/A"}`);

    // Update campaign invitation status if applicable
    await prisma.assessmentInvitation.updateMany({
      where: { responseId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });
  } catch (error) {
    logger.error(error, `Failed to process assessment for response ${responseId}`);
  }
}
