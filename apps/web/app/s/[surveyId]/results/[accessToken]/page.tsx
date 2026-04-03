import { notFound } from "next/navigation";
import { prisma } from "@formbricks/database";
import { getAssessmentConfigById } from "@/modules/assessment/lib/assessment-config.service";
import { getAssessmentResultByToken } from "@/modules/assessment/lib/assessment-result.service";
import { AssessmentResultsPage } from "@/modules/assessment/components/results/AssessmentResultsPage";

interface PageProps {
  params: Promise<{
    surveyId: string;
    accessToken: string;
  }>;
}

export default async function PublicAssessmentResultsPage({ params }: PageProps) {
  const { accessToken } = await params;

  const result = await getAssessmentResultByToken(accessToken);
  if (!result) {
    notFound();
  }

  const config = await getAssessmentConfigById(result.assessmentConfigId);
  if (!config) {
    notFound();
  }

  // Optionally fetch respondent name from contact
  let respondentName: string | undefined;
  const response = await prisma.response.findUnique({
    where: { id: result.responseId },
    select: {
      contact: {
        select: {
          attributes: {
            select: {
              value: true,
              attributeKey: {
                select: { key: true },
              },
            },
          },
        },
      },
    },
  });

  if (response?.contact?.attributes) {
    const nameAttr = response.contact.attributes.find(
      (a) => a.attributeKey.key === "name" || a.attributeKey.key === "firstName"
    );
    if (nameAttr) {
      respondentName = nameAttr.value;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <AssessmentResultsPage
          result={result}
          config={config}
          respondentName={respondentName}
        />
      </div>
    </div>
  );
}
