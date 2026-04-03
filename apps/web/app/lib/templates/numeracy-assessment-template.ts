import { createId } from "@paralleldrive/cuid2";
import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Numeracy Assessment Template
 *
 * 24 multiple-choice questions measuring three dimensions of numeracy:
 * Mathematical Reasoning, Data Interpretation, and Quantitative Skills.
 * Each question has one correct answer scored via survey variables
 * num_mr, num_di, num_qs.
 */

const NUMERACY_QUESTIONS = [
  // Mathematical Reasoning (8 questions)
  {
    q: "A product originally priced at $80 is discounted by 15%. What is the sale price?",
    options: ["$65.00", "$68.00", "$72.00", "$66.00"],
  },
  {
    q: "A team's budget increased from $50,000 to $62,500. What is the percentage increase?",
    options: ["20%", "25%", "12.5%", "22.5%"],
  },
  {
    q: "If 3 machines produce 180 units in 2 hours, how many units do 5 machines produce in 3 hours?",
    options: ["300", "450", "540", "270"],
  },
  {
    q: "A company's revenue-to-expense ratio is 5:3. If expenses are $120,000, what is the revenue?",
    options: ["$150,000", "$180,000", "$200,000", "$240,000"],
  },
  {
    q: "An employee earns $25/hour and works 1.5x overtime. What do they earn for 8 regular hours plus 3 overtime hours?",
    options: ["$275.00", "$312.50", "$287.50", "$300.00"],
  },
  {
    q: "A project is 40% complete after 12 days. At this rate, how many total days will the project take?",
    options: ["28", "30", "32", "36"],
  },
  {
    q: "If the exchange rate is 1 USD = 0.85 EUR, how many USD are needed to get 510 EUR?",
    options: ["$580", "$600", "$620", "$433.50"],
  },
  {
    q: "A supplier offers a 10% discount on orders over $500, then charges 8% tax. What is the total for a $700 order?",
    options: ["$680.40", "$693.00", "$712.80", "$756.00"],
  },
  // Data Interpretation (8 questions)
  {
    q: "Quarterly sales (in thousands): Q1 = 120, Q2 = 150, Q3 = 135, Q4 = 195. What is the total annual sales?",
    options: ["$580,000", "$600,000", "$620,000", "$590,000"],
  },
  {
    q: "Department headcounts: Marketing = 24, Engineering = 48, Sales = 36, Operations = 12. What percentage of staff is in Engineering?",
    options: ["36%", "40%", "44%", "48%"],
  },
  {
    q: "Monthly website visitors: Jan = 8,000, Feb = 9,200, Mar = 10,580. If the growth pattern continues, which is closest to April's visitors?",
    options: ["11,200", "11,960", "12,167", "13,000"],
  },
  {
    q: "Product A costs $12 with a 30% margin. Product B costs $18 with a 20% margin. Which generates more profit per unit, and by how much?",
    options: [
      "Product A, by $0.60",
      "Product B, by $0.60",
      "Product A, by $1.20",
      "They generate equal profit",
    ],
  },
  {
    q: "Region North sold 340 units, South sold 510 units, East sold 425 units, West sold 225 units. What fraction of total sales came from South?",
    options: ["1/3", "34%", "51/150", "About 28%"],
  },
  {
    q: "A survey of 400 employees shows: 35% prefer remote work, 45% prefer hybrid, and the rest prefer in-office. How many prefer in-office?",
    options: ["60", "80", "100", "120"],
  },
  {
    q: "Year-over-year revenue: 2022 = $2.4M, 2023 = $2.88M, 2024 = $3.168M. Which year had the higher growth rate?",
    options: [
      "2023 (20%) vs 2024 (10%)",
      "2024 (15%) vs 2023 (12%)",
      "Both years had equal growth rates",
      "2023 (18%) vs 2024 (12%)",
    ],
  },
  {
    q: "A bar chart shows customer satisfaction scores: Product X = 4.2, Product Y = 3.8, Product Z = 4.5 (out of 5). How much higher is Z's score than Y's, as a percentage of Y's score?",
    options: ["15.4%", "16.7%", "18.4%", "7.1%"],
  },
  // Quantitative Skills (8 questions)
  {
    q: "Convert 2.5 kilometres to metres.",
    options: ["250", "2,500", "25,000", "25"],
  },
  {
    q: "A shipment weighs 3,200 pounds. Approximately how many kilograms is this? (1 kg = 2.2 lbs)",
    options: ["1,280 kg", "1,455 kg", "1,600 kg", "7,040 kg"],
  },
  {
    q: "The test scores for a team of 5 are: 72, 85, 68, 91, 84. What is the mean score?",
    options: ["78", "80", "82", "84"],
  },
  {
    q: "From the set {12, 15, 18, 18, 22, 25, 30}, what is the median?",
    options: ["17", "18", "20", "22"],
  },
  {
    q: "A jar contains 5 red, 3 blue, and 2 green marbles. What is the probability of drawing a blue marble?",
    options: ["20%", "25%", "30%", "33%"],
  },
  {
    q: "Estimate: 498 x 21 is closest to which value?",
    options: ["8,000", "10,000", "10,500", "12,000"],
  },
  {
    q: "A conference room is 8 metres long and 5 metres wide. What is its area in square feet? (1 metre = 3.28 feet)",
    options: ["131.2 sq ft", "328 sq ft", "430.5 sq ft", "525 sq ft"],
  },
  {
    q: "If a factory produces items with a 2% defect rate, how many defective items are expected in a batch of 1,500?",
    options: ["15", "30", "45", "75"],
  },
];

export const numeracyAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = NUMERACY_QUESTIONS.map((q, index) => {
    return buildBlock({
      name: `Question ${index + 1}`,
      elements: [
        buildMultipleChoiceElement({
          headline: q.q,
          type: TSurveyElementTypeEnum.MultipleChoiceSingle,
          choices: q.options,
          shuffleOption: "none",
          required: true,
        }),
      ],
      t,
    });
  });

  return buildSurvey(
    {
      name: "Numeracy Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Assess mathematical reasoning, data interpretation, and quantitative skills. 24 workplace-relevant numeracy questions with automated scoring.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
