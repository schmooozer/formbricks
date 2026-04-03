import { Circle, Line, Polygon, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import type { TAssessmentDimension, TAssessmentScores } from "@formbricks/types/assessments";
import { colors } from "./pdf-styles";

interface PdfRadarChartProps {
  scores: TAssessmentScores;
  dimensions: TAssessmentDimension[];
  size?: number;
}

const GRID_LEVELS = [25, 50, 75, 100];
const LABEL_OFFSET = 18;

const localStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

export const PdfRadarChart = ({
  scores,
  dimensions,
  size = 280,
}: PdfRadarChartProps): React.JSX.Element => {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - LABEL_OFFSET - 10;
  const angleStep = 360 / dimensions.length;

  // Build polygon points for the score shape
  const scorePoints = dimensions
    .map((dim, i) => {
      const score = scores[dim.key] ?? 0;
      const clampedScore = Math.max(0, Math.min(100, score));
      const angle = i * angleStep;
      const r = maxRadius * (clampedScore / 100);
      const { x, y } = polarToCartesian(cx, cy, r, angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Build grid polygon points for each level
  const gridPolygons = GRID_LEVELS.map((level) => {
    const r = maxRadius * (level / 100);
    return dimensions
      .map((_, i) => {
        const angle = i * angleStep;
        const { x, y } = polarToCartesian(cx, cy, r, angle);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // Label positions
  const labels = dimensions.map((dim, i) => {
    const angle = i * angleStep;
    const { x, y } = polarToCartesian(cx, cy, maxRadius + LABEL_OFFSET, angle);

    let textAnchor: "middle" | "start" | "end" = "middle";
    if (x < cx - 5) textAnchor = "end";
    else if (x > cx + 5) textAnchor = "start";

    return { name: dim.name, x, y, textAnchor };
  });

  // Axis lines
  const axisLines = dimensions.map((_, i) => {
    const angle = i * angleStep;
    const { x, y } = polarToCartesian(cx, cy, maxRadius, angle);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });

  return (
    <View style={localStyles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid polygons */}
        {gridPolygons.map((points, idx) => (
          <Polygon
            key={`grid-${idx}`}
            points={points}
            fill="none"
            stroke={colors.slate300}
            strokeWidth={0.5}
          />
        ))}

        {/* Grid level labels */}
        {GRID_LEVELS.map((level) => {
          const r = maxRadius * (level / 100);
          const { x, y } = polarToCartesian(cx, cy, r, 0);
          return (
            <Text
              key={`level-${level}`}
              x={x + 3}
              y={y + 3}
              style={{ fontSize: 6, fill: colors.slate400 }}
            >
              {String(level)}
            </Text>
          );
        })}

        {/* Axis lines */}
        {axisLines.map((line, idx) => (
          <Line
            key={`axis-${idx}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colors.slate300}
            strokeWidth={0.5}
          />
        ))}

        {/* Score polygon */}
        <Polygon points={scorePoints} fill={`${colors.slate600}33`} stroke={colors.slate600} strokeWidth={1.5} />

        {/* Score dots */}
        {dimensions.map((dim, i) => {
          const score = scores[dim.key] ?? 0;
          const clampedScore = Math.max(0, Math.min(100, score));
          const angle = i * angleStep;
          const r = maxRadius * (clampedScore / 100);
          const { x, y } = polarToCartesian(cx, cy, r, angle);
          return (
            <Circle
              key={`dot-${dim.key}`}
              cx={x}
              cy={y}
              r={3}
              fill={dim.color}
              stroke={colors.white}
              strokeWidth={1}
            />
          );
        })}

        {/* Dimension labels */}
        {labels.map((label, idx) => (
          <Text
            key={`label-${idx}`}
            x={label.x}
            y={label.y}
            textAnchor={label.textAnchor}
            style={{ fontSize: 7, fill: colors.slate700, fontFamily: "Helvetica-Bold" }}
          >
            {label.name}
          </Text>
        ))}
      </Svg>
    </View>
  );
};
