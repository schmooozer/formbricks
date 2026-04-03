-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('disc', 'bigFive', 'myersBriggs', 'skillsCompetency', 'threeSixtyFeedback', 'custom');

-- CreateEnum
CREATE TYPE "AssessmentCampaignStatus" AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');

-- CreateTable
CREATE TABLE "AssessmentConfig" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "surveyId" TEXT NOT NULL,
    "type" "AssessmentType" NOT NULL,
    "dimensions" JSONB NOT NULL DEFAULT '[]',
    "interpretations" JSONB NOT NULL DEFAULT '[]',
    "reportConfig" JSONB NOT NULL DEFAULT '{}',
    "normGroups" JSONB NOT NULL DEFAULT '[]',
    "scoringRules" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "AssessmentConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentResult" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "assessmentConfigId" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "scores" JSONB NOT NULL DEFAULT '{}',
    "normalizedScores" JSONB NOT NULL DEFAULT '{}',
    "profile" JSONB NOT NULL DEFAULT '{}',
    "aiInsights" TEXT,
    "pdfUrl" TEXT,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "AssessmentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentCampaign" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "status" "AssessmentCampaignStatus" NOT NULL DEFAULT 'draft',
    "assessmentConfigId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "segmentId" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "deadlineAt" TIMESTAMP(3),
    "reminderIntervals" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "AssessmentCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentInvitation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sentAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "responseId" TEXT,

    CONSTRAINT "AssessmentInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentNormGroup" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assessmentType" "AssessmentType" NOT NULL,
    "organizationId" TEXT,
    "sampleSize" INTEGER NOT NULL DEFAULT 0,
    "statistics" JSONB NOT NULL DEFAULT '{}',
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AssessmentNormGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentConfig_surveyId_key" ON "AssessmentConfig"("surveyId");
CREATE INDEX "AssessmentConfig_surveyId_idx" ON "AssessmentConfig"("surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentResult_responseId_key" ON "AssessmentResult"("responseId");
CREATE UNIQUE INDEX "AssessmentResult_accessToken_key" ON "AssessmentResult"("accessToken");
CREATE INDEX "AssessmentResult_assessmentConfigId_idx" ON "AssessmentResult"("assessmentConfigId");
CREATE INDEX "AssessmentResult_responseId_idx" ON "AssessmentResult"("responseId");

-- CreateIndex
CREATE INDEX "AssessmentCampaign_assessmentConfigId_idx" ON "AssessmentCampaign"("assessmentConfigId");
CREATE INDEX "AssessmentCampaign_environmentId_idx" ON "AssessmentCampaign"("environmentId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentInvitation_responseId_key" ON "AssessmentInvitation"("responseId");
CREATE UNIQUE INDEX "AssessmentInvitation_campaignId_contactId_key" ON "AssessmentInvitation"("campaignId", "contactId");
CREATE INDEX "AssessmentInvitation_campaignId_idx" ON "AssessmentInvitation"("campaignId");
CREATE INDEX "AssessmentInvitation_contactId_idx" ON "AssessmentInvitation"("contactId");

-- CreateIndex
CREATE INDEX "AssessmentNormGroup_assessmentType_idx" ON "AssessmentNormGroup"("assessmentType");
CREATE INDEX "AssessmentNormGroup_organizationId_idx" ON "AssessmentNormGroup"("organizationId");

-- AddForeignKey
ALTER TABLE "AssessmentConfig" ADD CONSTRAINT "AssessmentConfig_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentResult" ADD CONSTRAINT "AssessmentResult_assessmentConfigId_fkey" FOREIGN KEY ("assessmentConfigId") REFERENCES "AssessmentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentResult" ADD CONSTRAINT "AssessmentResult_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentCampaign" ADD CONSTRAINT "AssessmentCampaign_assessmentConfigId_fkey" FOREIGN KEY ("assessmentConfigId") REFERENCES "AssessmentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentCampaign" ADD CONSTRAINT "AssessmentCampaign_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentCampaign" ADD CONSTRAINT "AssessmentCampaign_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "Segment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentInvitation" ADD CONSTRAINT "AssessmentInvitation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "AssessmentCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentInvitation" ADD CONSTRAINT "AssessmentInvitation_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentInvitation" ADD CONSTRAINT "AssessmentInvitation_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentNormGroup" ADD CONSTRAINT "AssessmentNormGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
