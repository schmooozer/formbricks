"use client";

import { cn } from "@/lib/cn";
import type {
  TAssessmentScores,
  TAssessmentDimension,
  TNormGroupStatistics,
} from "@formbricks/types/assessments";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

interface NormComparisonProps {
  scores: TAssessmentScores;
  normStats: TNormGroupStatistics;
  dimensions: TAssessmentDimension[];
  className?: string;
}

export function NormComparison({ scores, normStats, dimensions, className }: NormComparisonProps) {
  const data = dimensions.map((dim) => ({
    name: dim.name,
    individual: Math.round(scores[dim.key] ?? 0),
    normMean: Math.round(normStats[dim.key]?.mean ?? 0),
    color: dim.color,
  }));

  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <h3 className="mb-1 text-lg font-semibold text-slate-900">Norm Group Comparison</h3>
      <p className="mb-4 text-sm text-slate-500">Your scores compared to the norm group average</p>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#475569", fontSize: 11 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              cursor={{ fill: "#f1f5f9" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value: string) => (
                <span className="text-xs text-slate-600">
                  {value === "individual" ? "Your Score" : "Norm Mean"}
                </span>
              )}
            />
            <Bar dataKey="individual" name="individual" radius={[4, 4, 0, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`ind-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar
              dataKey="normMean"
              name="normMean"
              fill="#cbd5e1"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-2.5 text-left font-medium text-slate-600">Dimension</th>
              <th className="px-4 py-2.5 text-right font-medium text-slate-600">Your Score</th>
              <th className="px-4 py-2.5 text-right font-medium text-slate-600">Norm Mean</th>
              <th className="px-4 py-2.5 text-right font-medium text-slate-600">Difference</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim) => {
              const individual = scores[dim.key] ?? 0;
              const normMean = normStats[dim.key]?.mean ?? 0;
              const diff = individual - normMean;

              return (
                <tr key={dim.key} className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-medium text-slate-800">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: dim.color }}
                      />
                      {dim.name}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-700">{Math.round(individual)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-500">{Math.round(normMean)}</td>
                  <td
                    className={cn(
                      "px-4 py-2.5 text-right font-medium",
                      diff > 0 ? "text-emerald-600" : diff < 0 ? "text-red-500" : "text-slate-400"
                    )}
                  >
                    {diff > 0 ? "+" : ""}
                    {Math.round(diff)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
