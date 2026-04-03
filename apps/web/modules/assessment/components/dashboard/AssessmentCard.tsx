import { cn } from "@/lib/cn";
import type {
  TAssessmentCampaignStatus,
  TAssessmentConfig,
  TAssessmentType,
} from "@formbricks/types/assessments";

interface TAssessmentCardStats {
  totalInvited: number;
  totalCompleted: number;
  averageScores?: Record<string, number>;
  primaryTypeDistribution?: Array<{ type: string; count: number }>;
}

interface AssessmentCardProps {
  assessment: TAssessmentConfig & {
    campaignName: string;
    status: TAssessmentCampaignStatus;
    stats: TAssessmentCardStats;
  };
  onViewResults: (id: string) => void;
  onIssueAssessment: (id: string) => void;
  onExport: (id: string) => void;
}

const TYPE_LABELS: Record<TAssessmentType, string> = {
  disc: "DISC",
  bigFive: "Big Five",
  myersBriggs: "Myers-Briggs",
  skillsCompetency: "Skills",
  threeSixtyFeedback: "360 Feedback",
  custom: "Custom",
};

const STATUS_STYLES: Record<TAssessmentCampaignStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  archived: "bg-gray-100 text-gray-500",
};

export function AssessmentCard({
  assessment,
  onViewResults,
  onIssueAssessment,
  onExport,
}: AssessmentCardProps): React.JSX.Element {
  const { stats, campaignName, status, type, id } = assessment;
  const completionPercent =
    stats.totalInvited > 0 ? Math.round((stats.totalCompleted / stats.totalInvited) * 100) : 0;

  const topTypes = stats.primaryTypeDistribution?.slice(0, 4) ?? [];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-900">{campaignName}</h3>
        </div>
        <div className="ml-3 flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {TYPE_LABELS[type]}
          </span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_STYLES[status])}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      {/* Completion Stats */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-slate-600">
            {stats.totalCompleted}/{stats.totalInvited} completed
          </span>
          <span className="font-medium text-slate-900">{completionPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Score Preview */}
      <div className="mb-4 min-h-[2.5rem]">
        {stats.averageScores && Object.keys(stats.averageScores).length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.averageScores)
              .slice(0, 4)
              .map(([key, value]) => (
                <div key={key} className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-600">
                  <span className="font-medium">{key}:</span> {Math.round(value)}
                </div>
              ))}
          </div>
        ) : topTypes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topTypes.map((entry) => (
              <div key={entry.type} className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-600">
                <span className="font-medium">{entry.type}:</span> {entry.count}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No results yet</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onViewResults(id)}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800">
          View Results
        </button>
        <button
          type="button"
          onClick={() => onIssueAssessment(id)}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50">
          Issue Assessment
        </button>
        <button
          type="button"
          onClick={() => onExport(id)}
          className="ml-auto rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50">
          Export
        </button>
      </div>
    </div>
  );
}
