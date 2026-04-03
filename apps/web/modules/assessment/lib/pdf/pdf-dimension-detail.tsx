import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  TAssessmentDimension,
  TAssessmentInterpretation,
  TAssessmentScores,
} from "@formbricks/types/assessments";
import { colors, pdfStyles } from "./pdf-styles";

interface PdfDimensionDetailProps {
  dimension: TAssessmentDimension;
  score: number;
  interpretation?: TAssessmentInterpretation;
}

interface PdfDimensionDetailsPageProps {
  dimensions: TAssessmentDimension[];
  scores: TAssessmentScores;
  interpretations: TAssessmentInterpretation[];
}

const localStyles = StyleSheet.create({
  progressContainer: {
    marginTop: 6,
    marginBottom: 6,
  },
  interpretationLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.slate600,
    marginTop: 6,
    marginBottom: 2,
  },
  interpretationText: {
    fontSize: 9,
    color: colors.slate600,
    lineHeight: 1.5,
  },
});

function getInterpretationForScore(
  interpretation: TAssessmentInterpretation | undefined,
  score: number
) {
  if (!interpretation) return null;
  return interpretation.ranges.find((range) => score >= range.min && score <= range.max) ?? null;
}

const PdfDimensionDetail = ({
  dimension,
  score,
  interpretation,
}: PdfDimensionDetailProps): React.JSX.Element => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const matchedRange = getInterpretationForScore(interpretation, clampedScore);

  return (
    <View style={pdfStyles.dimensionCard} wrap={false}>
      <View style={pdfStyles.dimensionCardHeader}>
        <Text style={pdfStyles.dimensionName}>{dimension.name}</Text>
        <Text style={pdfStyles.dimensionScore}>{Math.round(clampedScore)}%</Text>
      </View>

      {/* Progress bar */}
      <View style={localStyles.progressContainer}>
        <View style={pdfStyles.progressBarTrack}>
          <View
            style={[
              pdfStyles.progressBarFill,
              {
                width: `${clampedScore}%`,
                backgroundColor: dimension.color,
              },
            ]}
          />
        </View>
      </View>

      {/* Interpretation */}
      {matchedRange ? (
        <View>
          <Text style={localStyles.interpretationLabel}>{matchedRange.label}</Text>
          <Text style={localStyles.interpretationText}>{matchedRange.description}</Text>

          {matchedRange.strengths && matchedRange.strengths.length > 0 ? (
            <View style={{ marginTop: 6 }}>
              <Text style={localStyles.interpretationLabel}>Strengths</Text>
              {matchedRange.strengths.map((strength, idx) => (
                <View key={idx} style={pdfStyles.bulletItem}>
                  <Text style={pdfStyles.bulletDot}>{"\u2022"}</Text>
                  <Text style={pdfStyles.bulletText}>{strength}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {matchedRange.recommendations && matchedRange.recommendations.length > 0 ? (
            <View style={{ marginTop: 6 }}>
              <Text style={localStyles.interpretationLabel}>Recommendations</Text>
              {matchedRange.recommendations.map((rec, idx) => (
                <View key={idx} style={pdfStyles.bulletItem}>
                  <Text style={pdfStyles.bulletDot}>{"\u2022"}</Text>
                  <Text style={pdfStyles.bulletText}>{rec}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Dimension description */}
      {dimension.description ? (
        <Text style={pdfStyles.dimensionDescription}>{dimension.description}</Text>
      ) : null}
    </View>
  );
};

export const PdfDimensionDetailsPage = ({
  dimensions,
  scores,
  interpretations,
}: PdfDimensionDetailsPageProps): React.JSX.Element => {
  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>Dimension Details</Text>
      {dimensions.map((dim) => {
        const score = scores[dim.key] ?? 0;
        const interpretation = interpretations.find((interp) => interp.dimensionKey === dim.key);
        return (
          <PdfDimensionDetail key={dim.key} dimension={dim} score={score} interpretation={interpretation} />
        );
      })}
    </View>
  );
};
