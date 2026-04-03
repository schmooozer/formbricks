"use client";

import { cn } from "@/lib/cn";
import type { TAssessmentScores, TAssessmentDimension } from "@formbricks/types/assessments";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface DimensionBarChartProps {
  scores: TAssessmentScores;
  normalizedScores: TAssessmentScores;
  dimensions: TAssessmentDimension[];
  className?: string;
}

export function DimensionBarChart({
  scores,
  normalizedScores,
  dimensions,
  className,
}: DimensionBarChartProps) {
  const data = dimensions.map((dim) => ({
    name: dim.name,
    raw: scores[dim.key] ?? 0,
    normalized: normalizedScores[dim.key] ?? 0,
    color: dim.color,
  }));

  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Score Breakdown</h3>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#475569", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={75}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number, name: string) => [
                `${Math.round(value)}%`,
                name === "normalized" ? "Score" : "Raw",
              ]}
              cursor={{ fill: "#f1f5f9" }}
            />
            <Bar dataKey="normalized" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
