"use client";

import { cn } from "@/lib/cn";
import type { TAssessmentCampaignStatus, TAssessmentConfig, TAssessmentType } from "@formbricks/types/assessments";
import { useState } from "react";
import { AssessmentCard } from "./AssessmentCard";

interface AssessmentCardData extends TAssessmentConfig {
  campaignName: string;
  status: TAssessmentCampaignStatus;
  stats: {
    totalInvited: number;
    totalCompleted: number;
    averageScores?: Record<string, number>;
    primaryTypeDistribution?: Array<{ type: string; count: number }>;
  };
}

interface AssessmentDashboardProps {
  assessments: AssessmentCardData[];
  onViewResults: (id: string) => void;
  onIssueAssessment: (id: string) => void;
  onExport: (id: string) => void;
}

type SortOption = "newest" | "name" | "completion";

const TYPE_FILTER_OPTIONS: Array<{ value: TAssessmentType | "all"; label: string }> = [
  { value: "all", label: "All Types" },
  { value: "disc", label: "DISC" },
  { value: "bigFive", label: "Big Five" },
  { value: "myersBriggs", label: "Myers-Briggs" },
  { value: "skillsCompetency", label: "Skills" },
  { value: "threeSixtyFeedback", label: "360 Feedback" },
  { value: "custom", label: "Custom" },
];

const STATUS_FILTER_OPTIONS: Array<{ value: TAssessmentCampaignStatus | "all"; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

export function AssessmentDashboard({
  assessments,
  onViewResults,
  onIssueAssessment,
  onExport,
}: AssessmentDashboardProps): React.JSX.Element {
  const [typeFilter, setTypeFilter] = useState<TAssessmentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TAssessmentCampaignStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter
  let filtered = assessments.filter((a) => {
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (searchQuery && !a.campaignName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.campaignName.localeCompare(b.campaignName);
      case "completion": {
        const aRate = a.stats.totalInvited > 0 ? a.stats.totalCompleted / a.stats.totalInvited : 0;
        const bRate = b.stats.totalInvited > 0 ? b.stats.totalCompleted / b.stats.totalInvited : 0;
        return bRate - aRate;
      }
      case "newest":
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assessments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track your assessment campaigns
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {assessments.length} assessment{assessments.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search assessments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TAssessmentType | "all")}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400">
          {TYPE_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TAssessmentCampaignStatus | "all")}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="ml-auto rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400">
          <option value="newest">Newest First</option>
          <option value="name">Name A-Z</option>
          <option value="completion">Completion Rate</option>
        </select>
      </div>

      {/* Content */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onViewResults={onViewResults}
              onIssueAssessment={onIssueAssessment}
              onExport={onExport}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-16">
          {assessments.length === 0 ? (
            <>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-6 w-6 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">No assessments yet</h3>
              <p className="mt-1 text-center text-sm text-slate-500">
                Create your first assessment campaign to get started.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-slate-900">No matching assessments</h3>
              <p className="mt-1 text-center text-sm text-slate-500">
                Try adjusting your filters or search query.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
