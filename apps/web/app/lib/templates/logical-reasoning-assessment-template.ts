import { createId } from "@paralleldrive/cuid2";
import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Logical Reasoning Assessment Template
 *
 * 24 multiple-choice questions measuring three dimensions:
 * Pattern Recognition, Deductive Reasoning, and Problem Solving.
 * Each question has one correct answer scored via survey variables
 * lr_pr, lr_dr, lr_ps.
 */

const LOGICAL_REASONING_QUESTIONS = [
  // Pattern Recognition (8 questions)
  {
    q: "What comes next in the sequence: 2, 6, 18, 54, ?",
    options: ["108", "162", "148", "216"],
  },
  {
    q: "What comes next in the sequence: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "32"],
  },
  {
    q: "Complete the pattern: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
  },
  {
    q: "What comes next in the sequence: 3, 5, 9, 17, 33, ?",
    options: ["49", "57", "65", "66"],
  },
  {
    q: "Complete the pattern: 100, 95, 85, 70, ?",
    options: ["55", "60", "50", "45"],
  },
  {
    q: "What comes next: AB, CD, EF, GH, ?",
    options: ["IJ", "HI", "JK", "IK"],
  },
  {
    q: "What comes next in the sequence: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "15"],
  },
  {
    q: "Complete the pattern: 2, 3, 5, 7, 11, 13, ?",
    options: ["15", "17", "19", "14"],
  },
  // Deductive Reasoning (8 questions)
  {
    q: "All managers attend the Monday briefing. Sarah is a manager. Which conclusion is valid?",
    options: [
      "Sarah attends the Monday briefing",
      "Sarah leads the Monday briefing",
      "Only managers attend the Monday briefing",
      "Sarah attends all briefings",
    ],
  },
  {
    q: "If a project is over budget, it requires director approval. Project Alpha is over budget. What must happen?",
    options: [
      "Project Alpha must be cancelled",
      "Project Alpha requires director approval",
      "The budget must be increased",
      "The project manager must be replaced",
    ],
  },
  {
    q: "No interns have building access after 6 PM. Tom is in the building at 8 PM. What can you conclude?",
    options: [
      "Tom is not an intern",
      "Tom has special permission",
      "Tom broke the rules",
      "Security was not monitoring",
    ],
  },
  {
    q: "All products in Category A ship free. All products over $50 are in Category A. Item X costs $75. What can you conclude?",
    options: ["Item X may ship free", "Item X ships free", "Item X is discounted", "Item X is in Category B"],
  },
  {
    q: "If it rains, the outdoor event moves indoors. If the event moves indoors, extra chairs are needed. It is raining. What is true?",
    options: [
      "The event is cancelled",
      "Extra chairs are needed",
      "The event stays outdoors with umbrellas",
      "Fewer chairs are needed",
    ],
  },
  {
    q: "Either the server failed or the network is down. The network is not down. What can you conclude?",
    options: [
      "Both the server and network failed",
      "The server failed",
      "Neither failed",
      "The issue is with the client software",
    ],
  },
  {
    q: "Every employee who completes training receives a certificate. Maria did not receive a certificate. What can you conclude?",
    options: [
      "Maria failed the training",
      "Maria did not complete the training",
      "The certificate was lost",
      "Maria is not an employee",
    ],
  },
  {
    q: "If a candidate has 5+ years of experience, they qualify for senior roles. If they qualify for senior roles, their salary range is above $100K. James has 7 years of experience. What is true?",
    options: [
      "James's salary range is above $100K",
      "James is guaranteed a senior role",
      "James earns exactly $100K",
      "James must apply for a senior role",
    ],
  },
  // Problem Solving (8 questions)
  {
    q: "A warehouse can process 120 orders per hour with 4 workers. A rush requires 450 orders in 3 hours. What is the minimum number of workers needed?",
    options: ["4", "5", "6", "8"],
  },
  {
    q: "Three teams (A, B, C) must present in order. Team A needs 20 min prep, Team B needs 10 min, Team C needs 15 min. Each presentation is 30 min. What is the earliest the last presentation can finish if they start at 9:00 AM?",
    options: ["10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM"],
  },
  {
    q: "A delivery truck can carry 2,000 kg. Package types: A = 150 kg, B = 200 kg. An order requires at least 5 of type A and 4 of type B. What is the maximum additional type A packages that can fit?",
    options: ["2", "3", "4", "5"],
  },
  {
    q: "A company has meeting rooms for 4, 8, and 20 people. A meeting has 12 attendees. Which is the most efficient room choice?",
    options: [
      "Two 4-person rooms and one 8-person room",
      "The 20-person room",
      "One 4-person room and one 8-person room",
      "Three 4-person rooms",
    ],
  },
  {
    q: "Tasks A (2 hrs), B (3 hrs), and C (1 hr) must be completed. Task B depends on Task A. Task C is independent. What is the shortest total time to complete all tasks?",
    options: ["5 hours", "6 hours", "4 hours", "3 hours"],
  },
  {
    q: "A printer prints 30 pages/min in black and white or 12 pages/min in colour. A report has 60 BW pages and 24 colour pages. How long does printing take?",
    options: ["3 minutes", "4 minutes", "5 minutes", "6 minutes"],
  },
  {
    q: "A team of 6 people must be split into two groups. Group 1 needs at least one senior member. There are 2 senior members. How many valid ways can the team be divided into groups of 3?",
    options: ["12", "16", "18", "20"],
  },
  {
    q: "A production line makes 50 units/hour. Quality checks take 5 minutes per batch of 25 units. How many units can be produced in an 8-hour shift including quality checks?",
    options: ["360", "380", "400", "384"],
  },
];

export const logicalReasoningAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = LOGICAL_REASONING_QUESTIONS.map((q, index) => {
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
      name: "Logical Reasoning Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Measure pattern recognition, deductive reasoning, and problem-solving abilities. 24 questions designed to evaluate analytical thinking skills.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
