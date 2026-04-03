import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Literacy Assessment Template
 *
 * 24 multiple-choice questions (8 per dimension) measuring Reading Comprehension,
 * Vocabulary, and Written Communication. Each question has one correct answer.
 * Correct answers increment the matching dimension's variable by 1.
 */

// Variable IDs for survey variables
const VAR_RC = "lit_rc";
const VAR_VOC = "lit_voc";
const VAR_WC = "lit_wc";

export const LITERACY_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "RC",
    name: "Reading Comprehension",
    description: "Ability to read, interpret, and draw conclusions from written passages",
    variableId: VAR_RC,
    minScore: 0,
    maxScore: 8,
    color: "#3B82F6",
    icon: "book-open",
  },
  {
    id: createId(),
    key: "VOC",
    name: "Vocabulary",
    description: "Knowledge of word meanings, synonyms, and contextual word usage",
    variableId: VAR_VOC,
    minScore: 0,
    maxScore: 8,
    color: "#8B5CF6",
    icon: "spell-check",
  },
  {
    id: createId(),
    key: "WC",
    name: "Written Communication",
    description: "Understanding of grammar, punctuation, sentence structure, and clarity",
    variableId: VAR_WC,
    minScore: 0,
    maxScore: 8,
    color: "#10B981",
    icon: "pen-tool",
  },
];

export const LITERACY_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "RC",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "Your reading comprehension skills are still developing. You may find it challenging to identify main ideas, draw inferences, or distinguish key details in workplace documents. Focused practice will help you build confidence with written materials.",
        strengths: [
          "Awareness that reading skills can be improved",
          "Willingness to engage with written content",
          "Potential to grow quickly with targeted practice",
        ],
        blindSpots: [
          "May misinterpret instructions or policy documents",
          "Could overlook important details in written communications",
        ],
        recommendations: [
          "Practise summarising paragraphs in your own words after reading",
          "Ask clarifying questions when written instructions are unclear",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You demonstrate solid reading comprehension skills. You can identify main ideas and supporting details in most workplace documents. You may occasionally miss subtle inferences or nuances in more complex texts.",
        strengths: [
          "Reliably extracts key information from standard documents",
          "Can follow multi-step written instructions",
          "Identifies the main argument in most passages",
        ],
        blindSpots: [
          "May struggle with highly technical or ambiguous text",
          "Could miss implied meanings or unstated assumptions",
        ],
        recommendations: [
          "Challenge yourself with more complex reading materials",
          "Practise identifying author intent and underlying assumptions",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You have strong reading comprehension skills. You readily identify main ideas, supporting evidence, and implied meanings. You can critically evaluate written content and synthesise information from multiple sources with ease.",
        strengths: [
          "Excellent at extracting and synthesising information",
          "Strong critical reading and inference skills",
          "Accurately interprets nuanced or complex documents",
        ],
        blindSpots: [
          "May assume others share the same reading proficiency",
          "Could over-analyse straightforward communications",
        ],
        recommendations: [
          "Mentor colleagues who are developing their reading skills",
          "Apply your skills to cross-functional document review and quality assurance",
        ],
      },
    ],
  },
  {
    dimensionKey: "VOC",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "Your vocabulary range is still growing. You may encounter unfamiliar words in professional documents that slow your comprehension. Building your word knowledge will improve both reading speed and communication precision.",
        strengths: [
          "Recognises common workplace terminology",
          "Open to learning new words",
          "Can use context to make reasonable guesses",
        ],
        blindSpots: [
          "May misuse technical or formal terms",
          "Limited vocabulary could reduce communication precision",
        ],
        recommendations: [
          "Keep a vocabulary journal and note new words encountered at work",
          "Use a dictionary or thesaurus regularly when reading professional materials",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You have a solid working vocabulary suitable for most professional contexts. You understand common business terminology and can usually determine word meaning from context. Some advanced or specialised terms may still be challenging.",
        strengths: [
          "Good command of standard professional vocabulary",
          "Can distinguish between similar words in context",
          "Effective at using context clues for unfamiliar terms",
        ],
        blindSpots: [
          "May lack precision with advanced or industry-specific terminology",
          "Could default to simpler words when more precise options exist",
        ],
        recommendations: [
          "Read industry publications to expand specialised vocabulary",
          "Practise using precise terminology in written communications",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You possess an extensive vocabulary and use words with precision. You easily understand advanced terminology, distinguish subtle differences between synonyms, and select the most appropriate word for any professional context.",
        strengths: [
          "Precise and sophisticated word choice",
          "Easily understands advanced and technical language",
          "Strong ability to adapt language to different audiences",
        ],
        blindSpots: [
          "May use overly complex language when simpler words would be clearer",
          "Could assume others understand the same vocabulary",
        ],
        recommendations: [
          "Adapt your language to your audience for maximum clarity",
          "Help develop team glossaries or plain-language guides for complex topics",
        ],
      },
    ],
  },
  {
    dimensionKey: "WC",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "Your written communication skills are still developing. You may make frequent errors in grammar, punctuation, or sentence structure that affect the clarity of your writing. Targeted practice will help you produce clearer, more professional documents.",
        strengths: [
          "Able to communicate basic ideas in writing",
          "Recognises the importance of clear writing",
          "Can improve significantly with focused practice",
        ],
        blindSpots: [
          "Grammatical errors may undermine credibility",
          "Unclear sentence structure could lead to miscommunication",
        ],
        recommendations: [
          "Use grammar-checking tools and review suggestions carefully",
          "Study common punctuation rules, especially semicolons, commas, and apostrophes",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You write clearly and correctly in most situations. Your grammar and punctuation are generally sound, and you can construct well-organised sentences and paragraphs. Occasional errors may appear in complex sentence structures.",
        strengths: [
          "Produces clear and readable professional writing",
          "Good command of standard grammar and punctuation",
          "Can structure written content logically",
        ],
        blindSpots: [
          "May struggle with complex grammatical constructions",
          "Could be more concise in written communications",
        ],
        recommendations: [
          "Practise editing your own writing for conciseness",
          "Study advanced grammar topics such as parallel structure and active voice",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You have excellent written communication skills. Your writing is clear, concise, grammatically correct, and well-structured. You can produce polished professional documents and adapt your writing style to different audiences and purposes.",
        strengths: [
          "Consistently produces polished, error-free writing",
          "Skilled at adapting tone and style to the audience",
          "Strong command of grammar, punctuation, and sentence structure",
        ],
        blindSpots: [
          "May set unrealistically high writing standards for others",
          "Could spend excessive time perfecting written communications",
        ],
        recommendations: [
          "Offer to review and edit important team documents",
          "Share writing best practices with colleagues through informal coaching",
        ],
      },
    ],
  },
];

export const LITERACY_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Literacy Assessment Report",
  subtitle: "Reading, vocabulary, and written communication skills",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#3B82F6",
    accent: "#8B5CF6",
  },
};

export const LITERACY_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "average",
  normalizeToPercentage: true,
};

export const LITERACY_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "skillsCompetency",
  dimensions: LITERACY_DIMENSIONS,
  interpretations: LITERACY_INTERPRETATIONS,
  reportConfig: LITERACY_REPORT_CONFIG,
  scoringRules: LITERACY_SCORING_RULES,
};

/**
 * Literacy survey questions.
 *
 * Each question has 4 options and a correctIndex indicating which option (0-based)
 * is the correct answer. The dim field maps the question to a dimension.
 * Block logic awards 1 point to the dimension variable when the correct option is selected.
 */
export const LITERACY_QUESTIONS = [
  // Reading Comprehension
  {
    q: 'Read the following passage and answer the question.\n\n"The company\'s quarterly revenue exceeded projections by 12%, driven primarily by expansion into emerging markets. However, operating costs rose by 8% due to increased logistics expenses."\n\nWhat was the primary driver of revenue growth?',
    options: [
      "Reduced operating costs",
      "Expansion into emerging markets",
      "Lower logistics expenses",
      "Increased domestic sales",
    ],
    correctIndex: 1,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Effective onboarding programmes reduce new-hire turnover by up to 25%. Organisations that pair new employees with mentors report higher engagement scores within the first 90 days compared to those that rely solely on self-directed orientation."\n\nWhat conclusion can be drawn from this passage?',
    options: [
      "Self-directed orientation is more cost-effective than mentoring",
      "Mentoring during onboarding is associated with higher early engagement",
      "Turnover rates are unaffected by onboarding practices",
      "New employees prefer working independently without mentors",
    ],
    correctIndex: 1,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The policy update requires all remote workers to log their hours using the centralised time-tracking system. Managers are responsible for reviewing submissions weekly and flagging discrepancies within 48 hours."\n\nWho is responsible for identifying time-tracking errors?',
    options: ["Remote workers", "The human resources department", "Managers", "The IT support team"],
    correctIndex: 2,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"While automation has eliminated some routine clerical roles, it has simultaneously created demand for positions in data analysis, system maintenance, and process design. Net employment in the sector has remained stable over the past decade."\n\nWhat is the main point of this passage?',
    options: [
      "Automation has caused widespread job losses",
      "Clerical roles are no longer necessary",
      "Automation has shifted the types of jobs available rather than reducing overall employment",
      "Data analysis roles are declining",
    ],
    correctIndex: 2,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The safety audit identified three critical findings: inadequate emergency exit signage on the third floor, expired fire extinguishers in the east wing, and missing safety data sheets in the chemical storage area. Remediation must be completed within 30 days."\n\nHow many critical findings were identified?',
    options: ["One", "Two", "Three", "Four"],
    correctIndex: 2,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Customer satisfaction scores declined from 87% to 74% following the transition to the new ticketing system. The most common complaint cited longer response times, with the average resolution period increasing from 24 to 48 hours."\n\nWhat was the most common customer complaint after the transition?',
    options: [
      "Difficulty using the new system",
      "Longer response times",
      "Unfriendly support staff",
      "Higher service fees",
    ],
    correctIndex: 1,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"The board approved a phased implementation approach: Phase 1 covers the pilot programme in two regional offices, Phase 2 extends to all domestic locations, and Phase 3 includes international offices. Each phase requires a formal review before proceeding to the next."\n\nWhat must occur before moving from one phase to the next?',
    options: ["Board re-election", "A formal review", "Employee voting", "Budget reallocation"],
    correctIndex: 1,
    dim: "RC" as const,
  },
  {
    q: 'Read the following passage and answer the question.\n\n"Although the marketing campaign generated significant brand awareness, conversion rates remained below target. Analysis suggests the landing page design failed to communicate the value proposition clearly, resulting in a high bounce rate."\n\nWhat does the analysis suggest caused the low conversion rates?',
    options: [
      "Insufficient marketing spend",
      "Low brand awareness",
      "Poor landing page design that did not convey the value proposition",
      "Excessive competition in the market",
    ],
    correctIndex: 2,
    dim: "RC" as const,
  },
  // Vocabulary
  {
    q: 'Select the word that best completes the sentence:\n\n"The manager\'s decision to restructure the department was ______, catching everyone off guard."',
    options: ["abrupt", "gradual", "predictable", "transparent"],
    correctIndex: 0,
    dim: "VOC" as const,
  },
  {
    q: 'Which word is the closest synonym for "mitigate"?',
    options: ["Intensify", "Eliminate", "Reduce", "Ignore"],
    correctIndex: 2,
    dim: "VOC" as const,
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The report provided a ______ analysis of the market conditions, covering every relevant factor."',
    options: ["superficial", "comprehensive", "ambiguous", "redundant"],
    correctIndex: 1,
    dim: "VOC" as const,
  },
  {
    q: 'Which word is the closest synonym for "pragmatic"?',
    options: ["Idealistic", "Theoretical", "Practical", "Emotional"],
    correctIndex: 2,
    dim: "VOC" as const,
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The two departments must ______ their efforts to avoid duplication of work."',
    options: ["segregate", "coordinate", "diminish", "postpone"],
    correctIndex: 1,
    dim: "VOC" as const,
  },
  {
    q: 'Which word is the closest synonym for "diligent"?',
    options: ["Careless", "Industrious", "Reluctant", "Passive"],
    correctIndex: 1,
    dim: "VOC" as const,
  },
  {
    q: 'Select the word that best completes the sentence:\n\n"The consultant\'s recommendations were ______ and directly addressed the root cause of the problem."',
    options: ["vague", "pertinent", "excessive", "trivial"],
    correctIndex: 1,
    dim: "VOC" as const,
  },
  {
    q: 'Which word is the closest synonym for "expedite"?',
    options: ["Delay", "Complicate", "Accelerate", "Cancel"],
    correctIndex: 2,
    dim: "VOC" as const,
  },
  // Written Communication
  {
    q: "Which sentence is punctuated correctly?",
    options: [
      "The meeting is scheduled for Monday, however we may need to reschedule.",
      "The meeting is scheduled for Monday; however, we may need to reschedule.",
      "The meeting is scheduled for Monday however, we may need to reschedule.",
      "The meeting is scheduled for Monday however we may need to reschedule.",
    ],
    correctIndex: 1,
    dim: "WC" as const,
  },
  {
    q: "Which sentence uses the correct subject-verb agreement?",
    options: [
      "The team of analysts have submitted their report.",
      "The team of analysts have submitted its report.",
      "The team of analysts has submitted their report.",
      "The team of analysts has submitted its report.",
    ],
    correctIndex: 3,
    dim: "WC" as const,
  },
  {
    q: "Which version of the sentence is most clear and concise?",
    options: [
      "Due to the fact that the budget was reduced, the project timeline was extended.",
      "Because the budget was reduced, the project timeline was extended.",
      "The project timeline was extended due to the fact that the budget experienced a reduction.",
      "On account of the budget being reduced, it was decided that the project timeline would be extended.",
    ],
    correctIndex: 1,
    dim: "WC" as const,
  },
  {
    q: "Which sentence correctly uses a parallel structure?",
    options: [
      "The role requires managing budgets, to coordinate teams, and strategic planning.",
      "The role requires managing budgets, coordinating teams, and planning strategically.",
      "The role requires to manage budgets, coordinating teams, and strategic planning.",
      "The role requires budget management, to coordinate teams, and planning strategically.",
    ],
    correctIndex: 1,
    dim: "WC" as const,
  },
  {
    q: "Which sentence uses the correct pronoun reference?",
    options: [
      "When a manager delegates tasks, they should provide clear instructions.",
      "When a manager delegates tasks, you should provide clear instructions.",
      "When a manager delegates tasks, we should provide clear instructions.",
      "When a manager delegates tasks, it should provide clear instructions.",
    ],
    correctIndex: 0,
    dim: "WC" as const,
  },
  {
    q: "Which sentence correctly uses a comma with an introductory clause?",
    options: [
      "After reviewing the data the team decided to proceed.",
      "After reviewing the data, the team decided to proceed.",
      "After, reviewing the data the team decided to proceed.",
      "After reviewing, the data the team decided to proceed.",
    ],
    correctIndex: 1,
    dim: "WC" as const,
  },
  {
    q: "Which sentence avoids the passive voice most effectively?",
    options: [
      "The report was completed by the finance team before the deadline.",
      "Before the deadline, the report was completed by the finance team.",
      "The finance team completed the report before the deadline.",
      "It was the finance team by whom the report was completed before the deadline.",
    ],
    correctIndex: 2,
    dim: "WC" as const,
  },
  {
    q: "Which sentence uses the correct word?",
    options: [
      "The new policy will effect all employees starting next quarter.",
      "The new policy will affect all employees starting next quarter.",
      "The new policy will have an affect on all employees starting next quarter.",
      "The new policy will effect a change for all employees starting next quarter.",
    ],
    correctIndex: 1,
    dim: "WC" as const,
  },
];

/**
 * Generate survey variables for the Literacy template.
 */
export function getLiteracySurveyVariables() {
  return [
    { id: VAR_RC, name: "lit_rc", type: "number" as const, value: 0 },
    { id: VAR_VOC, name: "lit_voc", type: "number" as const, value: 0 },
    { id: VAR_WC, name: "lit_wc", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a Literacy dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "RC" | "VOC" | "WC"): string {
  const map: Record<string, string> = { RC: VAR_RC, VOC: VAR_VOC, WC: VAR_WC };
  return map[dim];
}
