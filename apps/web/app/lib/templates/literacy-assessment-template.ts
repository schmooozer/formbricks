import { createId } from "@paralleldrive/cuid2";
import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Literacy Assessment Template
 *
 * 24 multiple-choice questions (8 per dimension) measuring Reading Comprehension,
 * Vocabulary, and Written Communication skills. Each question has one correct answer.
 * Survey variables lit_rc, lit_voc, lit_wc track cumulative scores.
 */

const LITERACY_QUESTIONS = [
  // Reading Comprehension (8 questions)
  {
    q: 'Read the following passage and answer the question.\n\n"The company\'s quarterly revenue exceeded projections by 12%, driven primarily by expansion into emerging markets. However, operating costs rose by 8% due to increased logistics expenses."\n\nWhat was the primary driver of revenue growth?',
    options: [
      "Reduced operating costs",
      "Expansion into emerging markets",
      "Lower logistics expenses",
      "Increased domestic sales",
    ],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Effective onboarding programmes reduce new-hire turnover by up to 25%. Organisations that pair new employees with mentors report higher engagement scores within the first 90 days compared to those that rely solely on self-directed orientation."\n\nWhat conclusion can be drawn from this passage?',
    options: [
      "Self-directed orientation is more cost-effective than mentoring",
      "Mentoring during onboarding is associated with higher early engagement",
      "Turnover rates are unaffected by onboarding practices",
      "New employees prefer working independently without mentors",
    ],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The policy update requires all remote workers to log their hours using the centralised time-tracking system. Managers are responsible for reviewing submissions weekly and flagging discrepancies within 48 hours."\n\nWho is responsible for identifying time-tracking errors?',
    options: ["Remote workers", "The human resources department", "Managers", "The IT support team"],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"While automation has eliminated some routine clerical roles, it has simultaneously created demand for positions in data analysis, system maintenance, and process design. Net employment in the sector has remained stable over the past decade."\n\nWhat is the main point of this passage?',
    options: [
      "Automation has caused widespread job losses",
      "Clerical roles are no longer necessary",
      "Automation has shifted the types of jobs available rather than reducing overall employment",
      "Data analysis roles are declining",
    ],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The safety audit identified three critical findings: inadequate emergency exit signage on the third floor, expired fire extinguishers in the east wing, and missing safety data sheets in the chemical storage area. Remediation must be completed within 30 days."\n\nHow many critical findings were identified?',
    options: ["One", "Two", "Three", "Four"],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Customer satisfaction scores declined from 87% to 74% following the transition to the new ticketing system. The most common complaint cited longer response times, with the average resolution period increasing from 24 to 48 hours."\n\nWhat was the most common customer complaint after the transition?',
    options: [
      "Difficulty using the new system",
      "Longer response times",
      "Unfriendly support staff",
      "Higher service fees",
    ],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The board approved a phased implementation approach: Phase 1 covers the pilot programme in two regional offices, Phase 2 extends to all domestic locations, and Phase 3 includes international offices. Each phase requires a formal review before proceeding to the next."\n\nWhat must occur before moving from one phase to the next?',
    options: ["Board re-election", "A formal review", "Employee voting", "Budget reallocation"],
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Although the marketing campaign generated significant brand awareness, conversion rates remained below target. Analysis suggests the landing page design failed to communicate the value proposition clearly, resulting in a high bounce rate."\n\nWhat does the analysis suggest caused the low conversion rates?',
    options: [
      "Insufficient marketing spend",
      "Low brand awareness",
      "Poor landing page design that did not convey the value proposition",
      "Excessive competition in the market",
    ],
  },
  // Vocabulary (8 questions)
  {
    q: 'Select the word that best completes the sentence:\n\n"The manager\'s decision to restructure the department was ______, catching everyone off guard."',
    options: ["abrupt", "gradual", "predictable", "transparent"],
  },
  {
    q: 'Which word is the closest synonym for "mitigate"?',
    options: ["Intensify", "Eliminate", "Reduce", "Ignore"],
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The report provided a ______ analysis of the market conditions, covering every relevant factor."',
    options: ["superficial", "comprehensive", "ambiguous", "redundant"],
  },
  {
    q: 'Which word is the closest synonym for "pragmatic"?',
    options: ["Idealistic", "Theoretical", "Practical", "Emotional"],
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The two departments must ______ their efforts to avoid duplication of work."',
    options: ["segregate", "coordinate", "diminish", "postpone"],
  },
  {
    q: 'Which word is the closest synonym for "diligent"?',
    options: ["Careless", "Industrious", "Reluctant", "Passive"],
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The consultant\'s recommendations were ______ and directly addressed the root cause of the problem."',
    options: ["vague", "pertinent", "excessive", "trivial"],
  },
  {
    q: 'Which word is the closest synonym for "expedite"?',
    options: ["Delay", "Complicate", "Accelerate", "Cancel"],
  },
  // Written Communication (8 questions)
  {
    q: "Which sentence is punctuated correctly?",
    options: [
      "The meeting is scheduled for Monday, however we may need to reschedule.",
      "The meeting is scheduled for Monday; however, we may need to reschedule.",
      "The meeting is scheduled for Monday however, we may need to reschedule.",
      "The meeting is scheduled for Monday however we may need to reschedule.",
    ],
  },
  {
    q: "Which sentence uses the correct subject-verb agreement?",
    options: [
      "The team of analysts have submitted their report.",
      "The team of analysts have submitted its report.",
      "The team of analysts has submitted their report.",
      "The team of analysts has submitted its report.",
    ],
  },
  {
    q: "Which version of the sentence is most clear and concise?",
    options: [
      "Due to the fact that the budget was reduced, the project timeline was extended.",
      "Because the budget was reduced, the project timeline was extended.",
      "The project timeline was extended due to the fact that the budget experienced a reduction.",
      "On account of the budget being reduced, it was decided that the project timeline would be extended.",
    ],
  },
  {
    q: "Which sentence correctly uses a parallel structure?",
    options: [
      "The role requires managing budgets, to coordinate teams, and strategic planning.",
      "The role requires managing budgets, coordinating teams, and planning strategically.",
      "The role requires to manage budgets, coordinating teams, and strategic planning.",
      "The role requires budget management, to coordinate teams, and planning strategically.",
    ],
  },
  {
    q: "Which sentence uses the correct pronoun reference?",
    options: [
      "When a manager delegates tasks, they should provide clear instructions.",
      "When a manager delegates tasks, you should provide clear instructions.",
      "When a manager delegates tasks, we should provide clear instructions.",
      "When a manager delegates tasks, it should provide clear instructions.",
    ],
  },
  {
    q: "Which sentence correctly uses a comma with an introductory clause?",
    options: [
      "After reviewing the data the team decided to proceed.",
      "After reviewing the data, the team decided to proceed.",
      "After, reviewing the data the team decided to proceed.",
      "After reviewing, the data the team decided to proceed.",
    ],
  },
  {
    q: "Which sentence avoids the passive voice most effectively?",
    options: [
      "The report was completed by the finance team before the deadline.",
      "Before the deadline, the report was completed by the finance team.",
      "The finance team completed the report before the deadline.",
      "It was the finance team by whom the report was completed before the deadline.",
    ],
  },
  {
    q: "Which sentence uses the correct word?",
    options: [
      "The new policy will effect all employees starting next quarter.",
      "The new policy will affect all employees starting next quarter.",
      "The new policy will have an affect on all employees starting next quarter.",
      "The new policy will effect a change for all employees starting next quarter.",
    ],
  },
];

export const literacyAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = LITERACY_QUESTIONS.map((q, index) => {
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
      name: "Literacy Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Evaluate reading comprehension, vocabulary, and written communication skills. 24 questions across three literacy dimensions with instant scoring.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
