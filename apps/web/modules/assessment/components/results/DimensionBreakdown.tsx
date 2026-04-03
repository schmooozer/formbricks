"use client";

import { cn } from "@/lib/cn";
import { findInterpretation } from "@/modules/assessment/lib/scoring/base";
import type {
  TAssessmentScores,
  TAssessmentDimension,
  TAssessmentInterpretation,
} from "@formbricks/types/assessments";

interface DimensionBreakdownProps {
  scores: TAssessmentScores;
  normalizedScores: TAssessmentScores;
  dimensions: TAssessmentDimension[];
  interpretations: TAssessmentInterpretation[];
  className?: string;
}

export function DimensionBreakdown({
  scores,
  normalizedScores,
  dimensions,
  interpretations,
  className,
}: DimensionBreakdownProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-slate-900">Detailed Dimension Analysis</h3>

      {dimensions.map((dim) => {
        const rawScore = scores[dim.key] ?? 0;
        const normalizedScore = normalizedScores[dim.key] ?? 0;
        const percentage = Math.min(100, Math.max(0, normalizedScore));
        const interp = findInterpretation(interpretations, dim.key, normalizedScore);

        return (
          <div
            key={dim.key}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: dim.color }}
                />
                <h4 className="text-base font-semibold text-slate-900">{dim.name}</h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">{Math.round(normalizedScore)}</span>
                <span className="ml-1 text-sm text-slate-500">/ 100</span>
              </div>
            </div>

            {dim.description && (
              <p className="mt-2 text-sm text-slate-500">{dim.description}</p>
            )}

            <div className="mt-4">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: dim.color,
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>{dim.minScore}</span>
                <span>Raw: {Math.round(rawScore)}</span>
                <span>{dim.maxScore}</span>
              </div>
            </div>

            {interp && (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: dim.color }}
                >
                  {interp.label}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{interp.description}</p>
              </div>
            )}

            {((interp?.strengths && interp.strengths.length > 0) ||
              (interp?.blindSpots && interp.blindSpots.length > 0)) && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {interp?.strengths && interp.strengths.length > 0 && (
                  <div>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Strengths
                    </h5>
                    <ul className="space-y-1.5">
                      {interp.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {interp?.blindSpots && interp.blindSpots.length > 0 && (
                  <div>
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                      Blind Spots
                    </h5>
                    <ul className="space-y-1.5">
                      {interp.blindSpots.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
