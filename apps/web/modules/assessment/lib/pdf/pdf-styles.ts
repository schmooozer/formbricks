import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  slate50: "#f8fafc",
  white: "#ffffff",
  black: "#000000",
} as const;

export const pdfStyles = StyleSheet.create({
  // Page layout
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.slate800,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.slate200,
    borderBottomStyle: "solid",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logo: {
    width: 80,
    height: 40,
    objectFit: "contain",
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: colors.slate800,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.slate500,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 9,
    color: colors.slate500,
    marginTop: 2,
  },

  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.slate800,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    borderBottomStyle: "solid",
  },

  // Text
  text: {
    fontSize: 10,
    color: colors.slate700,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  textSmall: {
    fontSize: 8,
    color: colors.slate500,
    lineHeight: 1.4,
  },
  textBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.slate800,
  },

  // Badge
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: colors.slate100,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.slate600,
  },

  // Chart containers
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  // Dimension cards
  dimensionCard: {
    marginBottom: 14,
    padding: 12,
    backgroundColor: colors.slate50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderStyle: "solid",
  },
  dimensionCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  dimensionName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.slate800,
  },
  dimensionScore: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.slate600,
  },
  dimensionDescription: {
    fontSize: 9,
    color: colors.slate600,
    lineHeight: 1.4,
    marginTop: 4,
  },

  // Progress bar
  progressBarTrack: {
    height: 8,
    backgroundColor: colors.slate200,
    borderRadius: 4,
    marginTop: 4,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },

  // Bullet list
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 10,
    color: colors.slate400,
    marginRight: 6,
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    color: colors.slate700,
    lineHeight: 1.4,
    flex: 1,
  },

  // Profile summary
  profileLabel: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: colors.slate800,
    marginBottom: 4,
  },
  profileType: {
    fontSize: 12,
    color: colors.slate500,
    marginBottom: 8,
  },
  profileSummary: {
    fontSize: 10,
    color: colors.slate700,
    lineHeight: 1.6,
    marginBottom: 12,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: colors.slate400,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    borderTopStyle: "solid",
    paddingTop: 8,
  },
});
