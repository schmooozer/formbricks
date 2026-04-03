import { renderToBuffer } from "@react-pdf/renderer";
import type { TAssessmentConfig, TAssessmentResult } from "@formbricks/types/assessments";
import { PdfDocument } from "./pdf-document";

export async function generateAssessmentPdf(
  result: TAssessmentResult,
  config: TAssessmentConfig,
  respondentName?: string
): Promise<Buffer> {
  const document = PdfDocument({ result, config, respondentName });
  const buffer = await renderToBuffer(document);
  return Buffer.from(buffer);
}
