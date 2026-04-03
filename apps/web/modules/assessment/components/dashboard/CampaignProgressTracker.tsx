import { cn } from "@/lib/cn";
import type { TAssessmentInvitation, TAssessmentInvitationStatus } from "@formbricks/types/assessments";

interface ContactInfo {
  name: string;
  email: string;
}

interface InvitationWithContact extends TAssessmentInvitation {
  contact: ContactInfo;
  scoreSummary?: string;
}

interface CampaignProgressTrackerProps {
  invitations: InvitationWithContact[];
}

const STATUS_CONFIG: Record<TAssessmentInvitationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-slate-100 text-slate-600" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700" },
  opened: { label: "Opened", className: "bg-indigo-100 text-indigo-700" },
  started: { label: "Started", className: "bg-amber-100 text-amber-700" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
  expired: { label: "Expired", className: "bg-red-100 text-red-700" },
};

function formatDate(date: Date | null | undefined): string {
  if (!date) return "\u2014";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CampaignProgressTracker({ invitations }: CampaignProgressTrackerProps): React.JSX.Element {
  if (invitations.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">No invitations have been sent yet.</p>
      </div>
    );
  }

  const statusCounts = invitations.reduce(
    (acc, inv) => {
      acc[inv.status] = (acc[inv.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      {/* Summary Bar */}
      <div className="flex flex-wrap gap-3 border-b border-slate-100 px-5 py-3">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = STATUS_CONFIG[status as TAssessmentInvitationStatus];
          return (
            <span
              key={status}
              className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", config.className)}>
              {config.label}: {count}
            </span>
          );
        })}
        <span className="ml-auto text-xs text-slate-500">Total: {invitations.length}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sent
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Completed
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Score Summary
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invitations.map((invitation) => {
              const statusConfig = STATUS_CONFIG[invitation.status];
              return (
                <tr key={invitation.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-slate-900">{invitation.contact.name}</p>
                      <p className="text-xs text-slate-500">{invitation.contact.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusConfig.className
                      )}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                    {formatDate(invitation.sentAt)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                    {formatDate(invitation.completedAt)}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {invitation.status === "completed" && invitation.scoreSummary ? (
                      <span className="text-xs">{invitation.scoreSummary}</span>
                    ) : (
                      <span className="text-xs text-slate-400">{"\u2014"}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
