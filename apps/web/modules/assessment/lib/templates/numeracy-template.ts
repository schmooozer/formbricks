import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Numeracy Assessment Template
 *
 * 24 multiple-choice questions measuring three dimensions:
 * - Mathematical Reasoning (MR): percentages, ratios, algebra, proportions
 * - Data Interpretation (DI): reading tables/charts, trends, comparisons
 * - Quantitative Skills (QS): conversions, estimation, statistics, probability
 *
 * Each question has one correct answer. The block logic increments the
 * matching dimension variable by 1 for a correct response.
 */

// Dimension IDs (stable across template uses)
const DIM_MR_ID = "num_mathematical_reasoning";
const DIM_DI_ID = "num_data_interpretation";
const DIM_QS_ID = "num_quantitative_skills";

// Variable IDs for survey variables
const VAR_MR = "num_mr";
const VAR_DI = "num_di";
const VAR_QS = "num_qs";

export const NUMERACY_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "MR",
    name: "Mathematical Reasoning",
    description:
      "Ability to work with percentages, ratios, proportions, and basic algebra in workplace contexts",
    variableId: VAR_MR,
    minScore: 0,
    maxScore: 8,
    color: "#EF4444",
    icon: "zap",
  },
  {
    id: createId(),
    key: "DI",
    name: "Data Interpretation",
    description: "Ability to read, analyse, and draw conclusions from tables, charts, and numerical data",
    variableId: VAR_DI,
    minScore: 0,
    maxScore: 8,
    color: "#F59E0B",
    icon: "sun",
  },
  {
    id: createId(),
    key: "QS",
    name: "Quantitative Skills",
    description:
      "Ability to perform unit conversions, estimation, basic statistics, and probability calculations",
    variableId: VAR_QS,
    minScore: 0,
    maxScore: 8,
    color: "#3B82F6",
    icon: "target",
  },
];

export const NUMERACY_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "MR",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are building foundational skills in mathematical reasoning. Workplace calculations involving percentages, ratios, and proportions may require additional time or support.",
        strengths: ["Willingness to engage with numerical problems", "Awareness of areas for growth"],
        blindSpots: [
          "May avoid tasks requiring calculations",
          "Could make errors in budgeting or pricing decisions",
        ],
        recommendations: [
          "Practice percentage and ratio calculations with real workplace scenarios",
          "Use estimation to verify calculator results",
          "Seek out online courses in business mathematics",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You handle most workplace mathematical reasoning tasks effectively. You can work with percentages, ratios, and proportions in familiar contexts and catch common errors.",
        strengths: [
          "Reliable with standard calculations",
          "Able to verify results for reasonableness",
          "Comfortable with budgets and basic financial math",
        ],
        blindSpots: ["May struggle with multi-step or unfamiliar problem formats"],
        recommendations: [
          "Challenge yourself with more complex multi-step problems",
          "Practice translating word problems into mathematical expressions",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You demonstrate strong mathematical reasoning skills. You confidently handle complex calculations involving percentages, ratios, algebra, and proportions in diverse workplace scenarios.",
        strengths: [
          "Confident with complex calculations",
          "Accurate under time pressure",
          "Can mentor others in quantitative tasks",
          "Strong financial and analytical acumen",
        ],
        blindSpots: ["May over-rely on mental math when a systematic approach is needed"],
        recommendations: [
          "Share your skills by mentoring colleagues",
          "Take on projects requiring advanced quantitative analysis",
          "Explore data analytics or financial modelling to extend your capabilities",
        ],
      },
    ],
  },
  {
    dimensionKey: "DI",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are building your ability to extract insights from data. Interpreting charts, tables, and trends may require additional practice and support.",
        strengths: ["Openness to working with data", "Recognition of data's importance in decision-making"],
        blindSpots: [
          "May misread trends or draw incorrect conclusions from data",
          "Could overlook important patterns",
        ],
        recommendations: [
          "Practice reading charts and graphs in business reports",
          "Start with simple data sets and work up to more complex ones",
          "Ask colleagues to walk you through their data analyses",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You can interpret most standard data presentations effectively. You identify trends, make comparisons, and draw reasonable conclusions from tables and charts.",
        strengths: [
          "Can extract key findings from standard reports",
          "Identifies obvious trends and patterns",
          "Makes sound data-based comparisons",
        ],
        blindSpots: ["May miss subtle patterns or fail to question data quality"],
        recommendations: [
          "Practice with more complex, multi-variable data sets",
          "Learn to identify misleading data presentations",
          "Develop skills in summarising data insights for stakeholders",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You excel at interpreting data from diverse sources. You quickly identify trends, spot anomalies, and draw accurate conclusions even from complex data presentations.",
        strengths: [
          "Rapid and accurate data analysis",
          "Identifies subtle trends and outliers",
          "Communicates data insights clearly",
          "Questions data quality and methodology",
        ],
        blindSpots: ["May over-analyse when a quick read is sufficient"],
        recommendations: [
          "Lead data review sessions and present findings to leadership",
          "Explore advanced data visualisation tools",
          "Mentor others in developing data literacy skills",
        ],
      },
    ],
  },
  {
    dimensionKey: "QS",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are developing foundational quantitative skills. Unit conversions, estimation, and basic statistics may present challenges in day-to-day work.",
        strengths: [
          "Awareness of the role quantitative skills play in work",
          "Willingness to learn and improve",
        ],
        blindSpots: [
          "May avoid estimation when it would speed up decisions",
          "Could make errors in unit conversions or statistical summaries",
        ],
        recommendations: [
          "Practice common unit conversions relevant to your role",
          "Learn to calculate mean, median, and mode from small data sets",
          "Use estimation techniques to quickly sanity-check results",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You handle standard quantitative tasks effectively. You can perform conversions, make reasonable estimates, and apply basic statistical concepts in your work.",
        strengths: [
          "Comfortable with everyday quantitative tasks",
          "Can estimate effectively to validate results",
          "Applies basic statistics appropriately",
        ],
        blindSpots: ["May be less confident with probability or less common conversions"],
        recommendations: [
          "Expand your knowledge of probability and its workplace applications",
          "Practice rapid estimation techniques",
          "Explore how statistical concepts apply to quality control and forecasting",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You demonstrate strong quantitative skills across conversions, estimation, statistics, and probability. You apply these skills confidently and accurately in diverse scenarios.",
        strengths: [
          "Versatile quantitative ability",
          "Quick and accurate estimations",
          "Strong grasp of probability and statistics",
          "Can apply quantitative reasoning to novel problems",
        ],
        blindSpots: ["May assume others share the same level of comfort with numbers"],
        recommendations: [
          "Apply your skills to process improvement and risk assessment projects",
          "Explore advanced statistical methods or data science fundamentals",
          "Help build quantitative literacy across your team",
        ],
      },
    ],
  },
];

export const NUMERACY_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Numeracy Assessment Report",
  subtitle: "Mathematical reasoning and quantitative skills",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#3B82F6",
    accent: "#F59E0B",
  },
};

export const NUMERACY_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "average",
  normalizeToPercentage: true,
};

export const NUMERACY_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "skillsCompetency",
  dimensions: NUMERACY_DIMENSIONS,
  interpretations: NUMERACY_INTERPRETATIONS,
  reportConfig: NUMERACY_REPORT_CONFIG,
  scoringRules: NUMERACY_SCORING_RULES,
};

/**
 * Numeracy assessment questions.
 *
 * Each question has 4 options and one correct answer identified by correctIndex.
 * The dim field maps to a dimension key for scoring.
 */
export const NUMERACY_QUESTIONS = [
  // Mathematical Reasoning (MR)
  {
    q: "A product originally priced at $80 is discounted by 15%. What is the sale price?",
    options: ["$65.00", "$68.00", "$72.00", "$66.00"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "A team's budget increased from $50,000 to $62,500. What is the percentage increase?",
    options: ["20%", "25%", "12.5%", "22.5%"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "If 3 machines produce 180 units in 2 hours, how many units do 5 machines produce in 3 hours?",
    options: ["300", "450", "540", "270"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "A company's revenue-to-expense ratio is 5:3. If expenses are $120,000, what is the revenue?",
    options: ["$150,000", "$180,000", "$200,000", "$240,000"],
    correctIndex: 2,
    dim: "MR" as const,
  },
  {
    q: "An employee earns $25/hour and works 1.5x overtime. What do they earn for 8 regular hours plus 3 overtime hours?",
    options: ["$275.00", "$312.50", "$287.50", "$300.00"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "A project is 40% complete after 12 days. At this rate, how many total days will the project take?",
    options: ["28", "30", "32", "36"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "If the exchange rate is 1 USD = 0.85 EUR, how many USD are needed to get 510 EUR?",
    options: ["$580", "$600", "$620", "$433.50"],
    correctIndex: 1,
    dim: "MR" as const,
  },
  {
    q: "A supplier offers a 10% discount on orders over $500, then charges 8% tax. What is the total for a $700 order?",
    options: ["$680.40", "$693.00", "$712.80", "$756.00"],
    correctIndex: 0,
    dim: "MR" as const,
  },
  // Data Interpretation (DI)
  {
    q: "Quarterly sales (in thousands): Q1 = 120, Q2 = 150, Q3 = 135, Q4 = 195. What is the total annual sales?",
    options: ["$580,000", "$600,000", "$620,000", "$590,000"],
    correctIndex: 1,
    dim: "DI" as const,
  },
  {
    q: "Department headcounts: Marketing = 24, Engineering = 48, Sales = 36, Operations = 12. What percentage of staff is in Engineering?",
    options: ["36%", "40%", "44%", "48%"],
    correctIndex: 1,
    dim: "DI" as const,
  },
  {
    q: "Monthly website visitors: Jan = 8,000, Feb = 9,200, Mar = 10,580. If the growth pattern continues, which is closest to April's visitors?",
    options: ["11,200", "11,960", "12,167", "13,000"],
    correctIndex: 2,
    dim: "DI" as const,
  },
  {
    q: "Product A costs $12 with a 30% margin. Product B costs $18 with a 20% margin. Which generates more profit per unit, and by how much?",
    options: [
      "Product A, by $0.60",
      "Product B, by $0.60",
      "Product A, by $1.20",
      "They generate equal profit",
    ],
    correctIndex: 1,
    dim: "DI" as const,
  },
  {
    q: "Region North sold 340 units, South sold 510 units, East sold 425 units, West sold 225 units. What fraction of total sales came from South?",
    options: ["1/3", "34%", "51/150", "About 28%"],
    correctIndex: 1,
    dim: "DI" as const,
  },
  {
    q: "A survey of 400 employees shows: 35% prefer remote work, 45% prefer hybrid, and the rest prefer in-office. How many prefer in-office?",
    options: ["60", "80", "100", "120"],
    correctIndex: 1,
    dim: "DI" as const,
  },
  {
    q: "Year-over-year revenue: 2022 = $2.4M, 2023 = $2.88M, 2024 = $3.168M. Which year had the higher growth rate?",
    options: [
      "2023 (20%) vs 2024 (10%)",
      "2024 (15%) vs 2023 (12%)",
      "Both years had equal growth rates",
      "2023 (18%) vs 2024 (12%)",
    ],
    correctIndex: 0,
    dim: "DI" as const,
  },
  {
    q: "A bar chart shows customer satisfaction scores: Product X = 4.2, Product Y = 3.8, Product Z = 4.5 (out of 5). How much higher is Z's score than Y's, as a percentage of Y's score?",
    options: ["15.4%", "16.7%", "18.4%", "7.1%"],
    correctIndex: 2,
    dim: "DI" as const,
  },
  // Quantitative Skills (QS)
  {
    q: "Convert 2.5 kilometres to metres.",
    options: ["250", "2,500", "25,000", "25"],
    correctIndex: 1,
    dim: "QS" as const,
  },
  {
    q: "A shipment weighs 3,200 pounds. Approximately how many kilograms is this? (1 kg = 2.2 lbs)",
    options: ["1,280 kg", "1,455 kg", "1,600 kg", "7,040 kg"],
    correctIndex: 1,
    dim: "QS" as const,
  },
  {
    q: "The test scores for a team of 5 are: 72, 85, 68, 91, 84. What is the mean score?",
    options: ["78", "80", "82", "84"],
    correctIndex: 1,
    dim: "QS" as const,
  },
  {
    q: "From the set {12, 15, 18, 18, 22, 25, 30}, what is the median?",
    options: ["17", "18", "20", "22"],
    correctIndex: 1,
    dim: "QS" as const,
  },
  {
    q: "A jar contains 5 red, 3 blue, and 2 green marbles. What is the probability of drawing a blue marble?",
    options: ["20%", "25%", "30%", "33%"],
    correctIndex: 2,
    dim: "QS" as const,
  },
  {
    q: "Estimate: 498 x 21 is closest to which value?",
    options: ["8,000", "10,000", "10,500", "12,000"],
    correctIndex: 2,
    dim: "QS" as const,
  },
  {
    q: "A conference room is 8 metres long and 5 metres wide. What is its area in square feet? (1 metre = 3.28 feet)",
    options: ["131.2 sq ft", "328 sq ft", "430.5 sq ft", "525 sq ft"],
    correctIndex: 2,
    dim: "QS" as const,
  },
  {
    q: "If a factory produces items with a 2% defect rate, how many defective items are expected in a batch of 1,500?",
    options: ["15", "30", "45", "75"],
    correctIndex: 1,
    dim: "QS" as const,
  },
];

/**
 * Generate survey variables for the Numeracy template.
 */
export function getNumeracySurveyVariables() {
  return [
    { id: VAR_MR, name: "num_mr", type: "number" as const, value: 0 },
    { id: VAR_DI, name: "num_di", type: "number" as const, value: 0 },
    { id: VAR_QS, name: "num_qs", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a Numeracy dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "MR" | "DI" | "QS"): string {
  const map: Record<string, string> = { MR: VAR_MR, DI: VAR_DI, QS: VAR_QS };
  return map[dim];
}
