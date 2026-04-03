import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

interface AssessmentReportEmailProps {
  assessmentTitle: string;
  respondentName: string;
  profileLabel: string;
  primaryType: string;
  summary: string;
  dimensions: Array<{
    name: string;
    score: number;
    color: string;
  }>;
  resultsUrl: string;
  pdfUrl?: string;
  organizationName?: string;
}

export function AssessmentReportEmail({
  assessmentTitle = "DISC Personality Assessment",
  respondentName = "Participant",
  profileLabel = "Driver",
  primaryType = "D",
  summary = "Your primary DISC type is Dominance.",
  dimensions = [
    { name: "Dominance", score: 75, color: "#DC2626" },
    { name: "Influence", score: 45, color: "#F59E0B" },
    { name: "Steadiness", score: 30, color: "#10B981" },
    { name: "Conscientiousness", score: 50, color: "#3B82F6" },
  ],
  resultsUrl = "https://app.formbricks.com/results/example",
  pdfUrl,
  organizationName,
}: AssessmentReportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your {assessmentTitle} results are ready - {profileLabel}
      </Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-50 p-0 font-sans">
          <Container className="mx-auto max-w-[600px] rounded-lg bg-white p-8">
            {/* Header */}
            <Section className="mb-6 text-center">
              <Heading className="mb-2 text-2xl font-bold text-slate-800">{assessmentTitle}</Heading>
              <Text className="text-sm text-slate-500">
                Results for {respondentName}
                {organizationName ? ` | ${organizationName}` : ""}
              </Text>
            </Section>

            <Hr className="mb-6 border-slate-200" />

            {/* Profile Summary */}
            <Section className="mb-6 rounded-lg bg-slate-50 p-6 text-center">
              <Text className="mb-1 text-sm font-medium uppercase tracking-wider text-slate-500">
                Your Profile Type
              </Text>
              <Heading className="mb-2 text-3xl font-bold text-slate-800">{profileLabel}</Heading>
              <Text className="text-sm text-slate-600">{summary}</Text>
            </Section>

            {/* Dimension Scores */}
            <Section className="mb-6">
              <Heading className="mb-4 text-lg font-semibold text-slate-800">Your Scores</Heading>
              {dimensions.map((dim) => (
                <Row key={dim.name} className="mb-3">
                  <Column className="w-[120px]">
                    <Text className="text-sm font-medium text-slate-700">{dim.name}</Text>
                  </Column>
                  <Column className="w-[80px] text-right">
                    <Text className="text-sm font-bold text-slate-800">{dim.score}%</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Hr className="mb-6 border-slate-200" />

            {/* CTA Buttons */}
            <Section className="mb-6 text-center">
              <Button
                className="rounded-md bg-slate-800 px-8 py-3 text-sm font-medium text-white"
                href={resultsUrl}>
                View Full Results
              </Button>
            </Section>

            {pdfUrl && (
              <Section className="mb-6 text-center">
                <Button
                  className="rounded-md border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700"
                  href={pdfUrl}>
                  Download PDF Report
                </Button>
              </Section>
            )}

            {/* Footer */}
            <Hr className="mb-4 border-slate-200" />
            <Text className="text-center text-xs text-slate-400">
              This assessment was powered by Formbricks. Your results are confidential.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default AssessmentReportEmail;
