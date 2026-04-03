"use client";

import { cn } from "@/lib/cn";
import type {
  TAssessmentAggregateStats,
  TAssessmentConfig,
  TAssessmentDimension,
} from "@formbricks/types/assessments";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AssessmentAggregateViewProps {
  aggregateStats: TAssessmentAggregateStats;
  dimensions: TAssessmentDimension[];
  config: TAssessmentConfig;
}

const DEFAULT_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"];

export function AssessmentAggregateView({
  aggregateStats,
  dimensions,
  config,
}: AssessmentAggregateViewProps): React.JSX.Element {
  const { totalResponses, completionRate, averageScores, profileTypeDistribution } = aggregateStats;

  const dimensionColorMap = new Map<string, string>();
  dimensions.forEach((dim) => {
    dimensionColorMap.set(dim.key, dim.color);
  });

  // Build bar chart data
  const barData = dimensions.map((dim) => ({
    name: dim.name,
    score: Math.round((averageScores[dim.key] ?? 0) * 10) / 10,
    color: dim.color,
  }));

  // Build pie chart data
  const pieData = profileTypeDistribution.map((entry, index) => ({
    name: entry.type,
    value: entry.count,
    percentage: entry.percentage,
    color: dimensionColorMap.get(entry.type) ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Sample Size</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalResponses}</p>
          <p className="mt-0.5 text-xs text-slate-400">total responses</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Completion Rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{Math.round(completionRate * 100)}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${Math.min(completionRate * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Dimensions</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{dimensions.length}</p>
          <p className="mt-0.5 text-xs text-slate-400">
            {config.type.charAt(0).toUpperCase() + config.type.slice(1)} assessment
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Type Distribution Pie Chart */}
        {pieData.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Type Distribution</h4>
            <div className="flex items-center gap-6">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value">
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} (${pieData.find((d) => d.name === name)?.percentage ?? 0}%)`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-slate-700">{entry.name}</span>
                    <span className="ml-auto font-medium text-slate-900">{entry.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Average Scores Bar Chart */}
        {barData.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Average Scores by Dimension</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
                  <Tooltip
                    formatter={(value: number) => [value, "Score"]}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                    {barData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Dimension Stats Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-3">
          <h4 className="text-sm font-semibold text-slate-900">Dimension Statistics</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Dimension
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mean
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Std Dev
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Median
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Range
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {dimensions.map((dim) => {
                const stats = aggregateStats.dimensionStats[dim.key];
                if (!stats) return null;
                return (
                  <tr key={dim.key} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: dim.color }}
                        />
                        <span className="font-medium text-slate-900">{dim.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-700">{stats.mean.toFixed(1)}</td>
                    <td className="px-5 py-3 text-slate-700">{stats.stdDev.toFixed(1)}</td>
                    <td className="px-5 py-3 text-slate-700">
                      {stats.median !== undefined ? stats.median.toFixed(1) : "\u2014"}
                    </td>
                    <td className="px-5 py-3 text-slate-700">
                      {stats.min !== undefined && stats.max !== undefined
                        ? `${stats.min.toFixed(0)}\u2013${stats.max.toFixed(0)}`
                        : "\u2014"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
