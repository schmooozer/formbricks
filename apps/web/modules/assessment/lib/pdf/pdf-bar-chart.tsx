import { G, Line, Rect, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import type { TAssessmentDimension, TAssessmentScores } from "@formbricks/types/assessments";
import { colors } from "./pdf-styles";

interface PdfBarChartProps {
  scores: TAssessmentScores;
  dimensions: TAssessmentDimension[];
  width?: number;
}

const BAR_HEIGHT = 20;
const BAR_GAP = 10;
const LABEL_WIDTH = 90;
const VALUE_WIDTH = 40;
const PADDING_TOP = 10;
const PADDING_BOTTOM = 20;

const localStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});

export const PdfBarChart = ({ scores, dimensions, width = 460 }: PdfBarChartProps): React.JSX.Element => {
  const chartWidth = width - LABEL_WIDTH - VALUE_WIDTH;
  const totalHeight = PADDING_TOP + dimensions.length * (BAR_HEIGHT + BAR_GAP) + PADDING_BOTTOM;

  return (
    <View style={localStyles.container}>
      <Svg width={width} height={totalHeight} viewBox={`0 0 ${width} ${totalHeight}`}>
        {/* Background grid lines at 25%, 50%, 75%, 100% */}
        {[25, 50, 75, 100].map((pct) => {
          const x = LABEL_WIDTH + (chartWidth * pct) / 100;
          return (
            <Line
              key={`grid-${pct}`}
              x1={x}
              y1={PADDING_TOP - 4}
              x2={x}
              y2={totalHeight - PADDING_BOTTOM}
              stroke={colors.slate200}
              strokeWidth={0.5}
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Grid labels */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const x = LABEL_WIDTH + (chartWidth * pct) / 100;
          return (
            <Text
              key={`gridlabel-${pct}`}
              x={x}
              y={totalHeight - 6}
              textAnchor="middle"
              style={{ fontSize: 7, fill: colors.slate400 }}
            >
              {String(pct)}
            </Text>
          );
        })}

        {/* Baseline */}
        <Line
          x1={LABEL_WIDTH}
          y1={PADDING_TOP - 4}
          x2={LABEL_WIDTH}
          y2={totalHeight - PADDING_BOTTOM}
          stroke={colors.slate300}
          strokeWidth={1}
        />

        {/* Bars */}
        {dimensions.map((dim, i) => {
          const score = Math.max(0, Math.min(100, scores[dim.key] ?? 0));
          const barWidth = (chartWidth * score) / 100;
          const y = PADDING_TOP + i * (BAR_HEIGHT + BAR_GAP);

          return (
            <G key={dim.key}>
              {/* Dimension label */}
              <Text
                x={LABEL_WIDTH - 6}
                y={y + BAR_HEIGHT / 2 + 3}
                textAnchor="end"
                style={{ fontSize: 8, fill: colors.slate700, fontFamily: "Helvetica-Bold" }}
              >
                {dim.name}
              </Text>

              {/* Track background */}
              <Rect
                x={LABEL_WIDTH}
                y={y}
                width={chartWidth}
                height={BAR_HEIGHT}
                rx={3}
                ry={3}
                fill={colors.slate100}
              />

              {/* Score bar */}
              {barWidth > 0 ? (
                <Rect
                  x={LABEL_WIDTH}
                  y={y}
                  width={barWidth}
                  height={BAR_HEIGHT}
                  rx={3}
                  ry={3}
                  fill={dim.color}
                />
              ) : null}

              {/* Score text */}
              <Text
                x={LABEL_WIDTH + chartWidth + 6}
                y={y + BAR_HEIGHT / 2 + 3}
                textAnchor="start"
                style={{ fontSize: 8, fill: colors.slate600, fontFamily: "Helvetica-Bold" }}
              >
                {`${Math.round(score)}%`}
              </Text>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};
