import { cn } from "@/lib/cn";
import type {
  TAssessmentConfig,
  TAssessmentDimension,
  TAssessmentResult,
} from "@formbricks/types/assessments";

interface TeamMember {
  id: string;
  name: string;
  result: TAssessmentResult;
}

interface TeamComparisonMatrixProps {
  results: TeamMember[];
  dimensions: TAssessmentDimension[];
  config: TAssessmentConfig;
}

function getHeatColor(value: number, min: number, max: number): string {
  if (max === min) return "bg-slate-100";
  const ratio = (value - min) / (max - min);
  if (ratio < 0.2) return "bg-red-100 text-red-900";
  if (ratio < 0.4) return "bg-orange-100 text-orange-900";
  if (ratio < 0.6) return "bg-amber-100 text-amber-900";
  if (ratio < 0.8) return "bg-emerald-100 text-emerald-900";
  return "bg-emerald-200 text-emerald-900";
}

export function TeamComparisonMatrix({
  results,
  dimensions,
  config,
}: TeamComparisonMatrixProps): React.JSX.Element {
  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">No team results available for comparison.</p>
      </div>
    );
  }

  // Pre-compute min/max per dimension for heat map coloring
  const dimensionRanges = new Map<string, { min: number; max: number }>();
  for (const dim of dimensions) {
    let min = Infinity;
    let max = -Infinity;
    for (const member of results) {
      const score = member.result.normalizedScores[dim.key] ?? member.result.scores[dim.key];
      if (score !== undefined) {
        if (score < min) min = score;
        if (score > max) max = score;
      }
    }
    dimensionRanges.set(dim.key, {
      min: min === Infinity ? 0 : min,
      max: max === -Infinity ? 100 : max,
    });
  }

  // Find highest and lowest per dimension
  const dimensionExtremes = new Map<string, { highestId: string; lowestId: string }>();
  for (const dim of dimensions) {
    let highestId = "";
    let lowestId = "";
    let highestVal = -Infinity;
    let lowestVal = Infinity;
    for (const member of results) {
      const score = member.result.normalizedScores[dim.key] ?? member.result.scores[dim.key] ?? 0;
      if (score > highestVal) {
        highestVal = score;
        highestId = member.id;
      }
      if (score < lowestVal) {
        lowestVal = score;
        lowestId = member.id;
      }
    }
    dimensionExtremes.set(dim.key, { highestId, lowestId });
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-3">
        <h4 className="text-sm font-semibold text-slate-900">Team Comparison Matrix</h4>
        <p className="mt-0.5 text-xs text-slate-500">
          {results.length} members across {dimensions.length} dimensions
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="sticky left-0 z-10 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Dimension
              </th>
              {results.map((member) => (
                <th
                  key={member.id}
                  className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <span className="block max-w-[100px] truncate" title={member.name}>
                    {member.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {dimensions.map((dim) => {
              const range = dimensionRanges.get(dim.key) ?? { min: 0, max: 100 };
              const extremes = dimensionExtremes.get(dim.key);
              return (
                <tr key={dim.key} className="transition-colors hover:bg-slate-50/50">
                  <td className="sticky left-0 z-10 bg-white px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: dim.color }}
                      />
                      <span className="font-medium text-slate-900">{dim.name}</span>
                    </div>
                  </td>
                  {results.map((member) => {
                    const score =
                      member.result.normalizedScores[dim.key] ?? member.result.scores[dim.key] ?? 0;
                    const isHighest = extremes?.highestId === member.id;
                    const isLowest = extremes?.lowestId === member.id && results.length > 1;
                    const heatClass = getHeatColor(score, range.min, range.max);
                    return (
                      <td key={member.id} className="px-4 py-3 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold tabular-nums",
                            heatClass,
                            isHighest && "ring-2 ring-emerald-400",
                            isLowest && "ring-2 ring-red-300"
                          )}>
                          {Math.round(score)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 border-t border-slate-100 px-5 py-3">
        <span className="text-xs text-slate-500">Legend:</span>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="inline-block h-3 w-3 rounded ring-2 ring-emerald-400" />
          Highest
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="inline-block h-3 w-3 rounded ring-2 ring-red-300" />
          Lowest
        </div>
        <div className="ml-4 flex items-center gap-1 text-xs text-slate-500">
          <span className="inline-block h-3 w-6 rounded bg-red-100" />
          <span>Low</span>
          <span className="inline-block h-3 w-6 rounded bg-amber-100" />
          <span className="inline-block h-3 w-6 rounded bg-emerald-200" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
