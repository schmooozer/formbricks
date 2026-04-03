import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

interface AssessmentInvitationEmailProps {
  assessmentTitle: string;
  recipientName: string;
  organizationName: string;
  assessmentUrl: string;
  deadlineDate?: string;
  customMessage?: string;
  estimatedMinutes?: number;
}

export function AssessmentInvitationEmail({
  assessmentTitle = "DISC Personality Assessment",
  recipientName = "Team Member",
  organizationName = "Your Organization",
  assessmentUrl = "https://app.formbricks.com/s/example",
  deadlineDate,
  customMessage,
  estimatedMinutes = 15,
}: AssessmentInvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        You've been invited to take the {assessmentTitle}
      </Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-50 p-0 font-sans">
          <Container className="mx-auto max-w-[600px] rounded-lg bg-white p-8">
            {/* Header */}
            <Section className="mb-6 text-center">
              <Heading className="mb-2 text-2xl font-bold text-slate-800">
                Assessment Invitation
              </Heading>
              <Text className="text-sm text-slate-500">{organizationName}</Text>
            </Section>

            <Hr className="mb-6 border-slate-200" />

            {/* Body */}
            <Section className="mb-6">
              <Text className="mb-4 text-base text-slate-700">Hi {recipientName},</Text>
              <Text className="mb-4 text-base text-slate-700">
                You have been invited to complete the <strong>{assessmentTitle}</strong>.
                This assessment typically takes about {estimatedMinutes} minutes to complete.
              </Text>

              {customMessage && (
                <Section className="mb-4 rounded-lg bg-slate-50 p-4">
                  <Text className="text-sm italic text-slate-600">{customMessage}</Text>
                </Section>
              )}

              {deadlineDate && (
                <Text className="mb-4 text-sm font-medium text-amber-600">
                  Please complete this by: {deadlineDate}
                </Text>
              )}

              <Text className="mb-4 text-sm text-slate-600">
                Your responses are confidential and will be used to help you and your team
                better understand working styles and preferences.
              </Text>
            </Section>

            {/* CTA */}
            <Section className="mb-6 text-center">
              <Button
                className="rounded-md bg-slate-800 px-8 py-3 text-sm font-medium text-white"
                href={assessmentUrl}>
                Start Assessment
              </Button>
            </Section>

            {/* Footer */}
            <Hr className="mb-4 border-slate-200" />
            <Text className="text-center text-xs text-slate-400">
              If you have questions about this assessment, please contact your manager or HR team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default AssessmentInvitationEmail;
