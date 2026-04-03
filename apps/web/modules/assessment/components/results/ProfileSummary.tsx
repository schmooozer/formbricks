"use client";

import { cn } from "@/lib/cn";
import type { TAssessmentProfile, TAssessmentDimension } from "@formbricks/types/assessments";

interface ProfileSummaryProps {
  profile: TAssessmentProfile;
  dimensions: TAssessmentDimension[];
}

export function ProfileSummary({ profile, dimensions }: ProfileSummaryProps) {
  const primaryDimension = dimensions.find((d) => d.key === profile.primaryType);
  const primaryColor = primaryDimension?.color ?? "#6366f1";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {profile.primaryType && (
          <span
            className="mb-3 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {primaryDimension?.name ?? profile.primaryType}
            {profile.secondaryType && (
              <span className="ml-1.5 opacity-80">
                / {dimensions.find((d) => d.key === profile.secondaryType)?.name ?? profile.secondaryType}
              </span>
            )}
          </span>
        )}

        {profile.profileLabel && (
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{profile.profileLabel}</h2>
        )}

        {profile.summary && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{profile.summary}</p>
        )}

        {profile.tags && profile.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {((profile.strengths && profile.strengths.length > 0) ||
        (profile.blindSpots && profile.blindSpots.length > 0)) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {profile.strengths && profile.strengths.length > 0 && (
            <div className="rounded-lg bg-emerald-50 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-800">
                Strengths
              </h3>
              <ul className="space-y-2">
                {profile.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.blindSpots && profile.blindSpots.length > 0 && (
            <div className="rounded-lg bg-amber-50 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-800">
                Blind Spots
              </h3>
              <ul className="space-y-2">
                {profile.blindSpots.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-amber-900">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
