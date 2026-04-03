import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { TAssessmentReportConfig } from "@formbricks/types/assessments";
import { colors, pdfStyles } from "./pdf-styles";

interface PdfHeaderProps {
  reportConfig: TAssessmentReportConfig;
  respondentName?: string;
  date: Date;
}

const localStyles = StyleSheet.create({
  headerContent: {
    flex: 1,
  },
  dateRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  brandBar: {
    height: 3,
    borderRadius: 2,
    marginBottom: 12,
  },
});

export const PdfHeader = ({ reportConfig, respondentName, date }: PdfHeaderProps): React.JSX.Element => {
  const primaryColor = reportConfig.brandColors?.primary ?? colors.slate800;
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={pdfStyles.header}>
      <View style={[localStyles.brandBar, { backgroundColor: primaryColor }]} />
      <View style={pdfStyles.headerRow}>
        <View style={localStyles.headerContent}>
          <Text style={pdfStyles.title}>{reportConfig.title}</Text>
          {reportConfig.subtitle ? <Text style={pdfStyles.subtitle}>{reportConfig.subtitle}</Text> : null}
          <View style={localStyles.dateRow}>
            {respondentName ? (
              <Text style={pdfStyles.metaText}>Prepared for: {respondentName}</Text>
            ) : null}
            <Text style={pdfStyles.metaText}>Date: {formattedDate}</Text>
          </View>
        </View>
        {reportConfig.logoUrl ? (
          <Image src={reportConfig.logoUrl} style={pdfStyles.logo} />
        ) : null}
      </View>
    </View>
  );
};
