"use client";

import { cn } from "@/lib/cn";
import type { TAssessmentResult, TAssessmentConfig } from "@formbricks/types/assessments";
import { ProfileSummary } from "./ProfileSummary";
import { DimensionRadarChart } from "./DimensionRadarChart";
import { DimensionBarChart } from "./DimensionBarChart";
import { DimensionBreakdown } from "./DimensionBreakdown";
import { NormComparison } from "./NormComparison";

interface AssessmentResultsPageProps {
  result: TAssessmentResult;
  config: TAssessmentConfig;
  respondentName?: string;
}

export function AssessmentResultsPage({ result, config, respondentName }: AssessmentResultsPageProps) {
  const { dimensions, interpretations, reportConfig, normGroups } = config;
  const { scores, normalizedScores, profile } = result;

  const activeNormGroup =
    config.scoringRules.normGroupId
      ? normGroups.find((ng) => ng.id === config.scoringRules.normGroupId)
      : normGroups[0];

  const normScores = activeNormGroup
    ? Object.fromEntries(
        Object.entries(activeNormGroup.statistics).map(([key, stats]) => [key, stats.mean])
      )
    : undefined;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(result.createdAt);

  const handleDownloadPdf = () => {
    if (result.pdfUrl) {
      window.open(result.pdfUrl, "_blank");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* Header */}
      <header className="text-center">
        {reportConfig.logoUrl && (
          <img
            src={reportConfig.logoUrl}
            alt="Logo"
            className="mx-auto mb-4 h-10 w-auto object-contain"
          />
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {reportConfig.title}
        </h1>
        {reportConfig.subtitle && (
          <p className="mt-1 text-base text-slate-500">{reportConfig.subtitle}</p>
        )}
        <div className="mt-3 flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>{formattedDate}</span>
          {respondentName && (
            <>
              <span className="text-slate-300">|</span>
              <span>{respondentName}</span>
            </>
          )}
        </div>
      </header>

      {/* Profile Summary */}
      <ProfileSummary profile={profile} dimensions={dimensions} />

      {/* Charts Row */}
      {(reportConfig.showRadarChart || reportConfig.showBarChart) && (
        <div
          className={cn(
            "grid gap-6",
            reportConfig.showRadarChart && reportConfig.showBarChart ? "lg:grid-cols-2" : "grid-cols-1"
          )}
        >
          {reportConfig.showRadarChart && (
            <DimensionRadarChart
              scores={normalizedScores}
              dimensions={dimensions}
              normScores={normScores}
            />
          )}
          {reportConfig.showBarChart && (
            <DimensionBarChart
              scores={scores}
              normalizedScores={normalizedScores}
              dimensions={dimensions}
            />
          )}
        </div>
      )}

      {/* Dimension Breakdown */}
      {reportConfig.showDimensionDetails && (
        <DimensionBreakdown
          scores={scores}
          normalizedScores={normalizedScores}
          dimensions={dimensions}
          interpretations={interpretations}
        />
      )}

      {/* Norm Comparison */}
      {reportConfig.showNormComparison && activeNormGroup && (
        <NormComparison
          scores={normalizedScores}
          normStats={activeNormGroup.statistics}
          dimensions={dimensions}
        />
      )}

      {/* AI Insights */}
      {result.aiInsights && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">AI Insights</h3>
          <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap text-slate-600">
            {result.aiInsights}
          </div>
        </section>
      )}

      {/* Download PDF */}
      {result.pdfUrl && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF Report
          </button>
        </div>
      )}

      {/* Footer */}
      {reportConfig.footerText && (
        <footer className="border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          {reportConfig.footerText}
        </footer>
      )}
    </div>
  );
}
