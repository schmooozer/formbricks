import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TAssessmentProfile } from "@formbricks/types/assessments";
import { colors, pdfStyles } from "./pdf-styles";

interface PdfProfileSummaryProps {
  profile: TAssessmentProfile;
}

const localStyles = StyleSheet.create({
  profileContainer: {
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  secondaryType: {
    fontSize: 10,
    color: colors.slate500,
  },
  columnsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.slate700,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    borderBottomStyle: "solid",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.slate100,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 8,
    color: colors.slate600,
  },
});

export const PdfProfileSummary = ({ profile }: PdfProfileSummaryProps): React.JSX.Element => {
  const hasStrengths = profile.strengths && profile.strengths.length > 0;
  const hasBlindSpots = profile.blindSpots && profile.blindSpots.length > 0;
  const hasDevelopmentAreas = profile.developmentAreas && profile.developmentAreas.length > 0;
  const hasTags = profile.tags && profile.tags.length > 0;

  return (
    <View style={pdfStyles.section}>
      <Text style={pdfStyles.sectionTitle}>Profile Summary</Text>

      <View style={localStyles.profileContainer}>
        {/* Profile label and type */}
        {profile.profileLabel ? (
          <Text style={pdfStyles.profileLabel}>{profile.profileLabel}</Text>
        ) : null}

        <View style={localStyles.typeRow}>
          {profile.primaryType ? (
            <View style={pdfStyles.badge}>
              <Text style={pdfStyles.badgeText}>{profile.primaryType}</Text>
            </View>
          ) : null}
          {profile.secondaryType ? (
            <Text style={localStyles.secondaryType}>/ {profile.secondaryType}</Text>
          ) : null}
        </View>

        {/* Summary text */}
        {profile.summary ? <Text style={pdfStyles.profileSummary}>{profile.summary}</Text> : null}

        {/* Tags */}
        {hasTags ? (
          <View style={localStyles.tagContainer}>
            {profile.tags!.map((tag, idx) => (
              <View key={idx} style={localStyles.tag}>
                <Text style={localStyles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Strengths and Blind Spots columns */}
      {hasStrengths || hasBlindSpots ? (
        <View style={localStyles.columnsRow}>
          {hasStrengths ? (
            <View style={localStyles.column}>
              <Text style={localStyles.columnTitle}>Strengths</Text>
              {profile.strengths!.map((item, idx) => (
                <View key={idx} style={pdfStyles.bulletItem}>
                  <Text style={pdfStyles.bulletDot}>{"\u2022"}</Text>
                  <Text style={pdfStyles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {hasBlindSpots ? (
            <View style={localStyles.column}>
              <Text style={localStyles.columnTitle}>Blind Spots</Text>
              {profile.blindSpots!.map((item, idx) => (
                <View key={idx} style={pdfStyles.bulletItem}>
                  <Text style={pdfStyles.bulletDot}>{"\u2022"}</Text>
                  <Text style={pdfStyles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Development Areas */}
      {hasDevelopmentAreas ? (
        <View style={{ marginTop: 12 }}>
          <Text style={localStyles.columnTitle}>Development Areas</Text>
          {profile.developmentAreas!.map((item, idx) => (
            <View key={idx} style={pdfStyles.bulletItem}>
              <Text style={pdfStyles.bulletDot}>{"\u2022"}</Text>
              <Text style={pdfStyles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
