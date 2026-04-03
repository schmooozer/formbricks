"use client";

import { cn } from "@/lib/cn";
import type { TAssessmentScores, TAssessmentDimension } from "@formbricks/types/assessments";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface DimensionRadarChartProps {
  scores: TAssessmentScores;
  dimensions: TAssessmentDimension[];
  normScores?: TAssessmentScores;
  className?: string;
}

export function DimensionRadarChart({
  scores,
  dimensions,
  normScores,
  className,
}: DimensionRadarChartProps) {
  const data = dimensions.map((dim) => ({
    dimension: dim.name,
    score: scores[dim.key] ?? 0,
    ...(normScores ? { norm: normScores[dim.key] ?? 0 } : {}),
    fullMark: dim.maxScore,
  }));

  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Dimension Overview</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#475569", fontSize: 12 }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, "auto"]}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            {normScores && (
              <Radar
                name="Norm Group"
                dataKey="norm"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {normScores && (
        <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
            Your Score
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
            Norm Group
          </span>
        </div>
      )}
    </section>
  );
}
