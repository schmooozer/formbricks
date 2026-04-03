import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Logical Reasoning Assessment Template
 *
 * 24 multiple-choice questions measuring three dimensions:
 * - Pattern Recognition (PR): number sequences, letter patterns, rule completion
 * - Deductive Reasoning (DR): syllogisms, if-then logic, conclusions from premises
 * - Problem Solving (PS): multi-step logic, process optimisation, constraint satisfaction
 *
 * Each question has one correct answer. The block logic increments the
 * matching dimension variable by 1 for a correct response.
 */

// Dimension IDs (stable across template uses)
const DIM_PR_ID = "lr_pattern_recognition";
const DIM_DR_ID = "lr_deductive_reasoning";
const DIM_PS_ID = "lr_problem_solving";

// Variable IDs for survey variables
const VAR_PR = "lr_pr";
const VAR_DR = "lr_dr";
const VAR_PS = "lr_ps";

export const LOGICAL_REASONING_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "PR",
    name: "Pattern Recognition",
    description: "Ability to identify sequences, patterns, and rules in numbers, letters, and abstract data",
    variableId: VAR_PR,
    minScore: 0,
    maxScore: 8,
    color: "#8B5CF6",
    icon: "zap",
  },
  {
    id: createId(),
    key: "DR",
    name: "Deductive Reasoning",
    description: "Ability to draw valid conclusions from given premises using logical rules",
    variableId: VAR_DR,
    minScore: 0,
    maxScore: 8,
    color: "#3B82F6",
    icon: "target",
  },
  {
    id: createId(),
    key: "PS",
    name: "Problem Solving",
    description: "Ability to work through multi-step problems, optimise processes, and satisfy constraints",
    variableId: VAR_PS,
    minScore: 0,
    maxScore: 8,
    color: "#10B981",
    icon: "sun",
  },
];

export const LOGICAL_REASONING_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "PR",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are building your ability to spot patterns and sequences. Recognising recurring structures in data or processes may take more time and deliberate effort.",
        strengths: [
          "Willingness to engage with abstract problems",
          "Persistence when working through unfamiliar patterns",
        ],
        blindSpots: [
          "May miss repeating patterns in data or workflows",
          "Could overlook trends that inform forecasting",
        ],
        recommendations: [
          "Practice number and letter sequence puzzles regularly",
          "Look for patterns in everyday work data such as sales trends or scheduling cycles",
          "Use visual aids to map out sequences when problem solving",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You reliably identify common patterns and sequences. You can spot trends in familiar contexts and apply pattern-based reasoning to standard workplace problems.",
        strengths: [
          "Identifies standard patterns quickly",
          "Applies pattern recognition to routine analysis",
          "Good at spotting trends in familiar data",
        ],
        blindSpots: ["May struggle with novel or complex pattern types"],
        recommendations: [
          "Challenge yourself with increasingly complex sequences",
          "Apply pattern recognition to process improvement and forecasting tasks",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You excel at identifying patterns, even in complex or unfamiliar data. You quickly recognise underlying rules and use them to predict outcomes and inform decisions.",
        strengths: [
          "Rapid identification of complex patterns",
          "Strong abstract reasoning",
          "Effective at forecasting and trend analysis",
          "Can identify hidden structures in data",
        ],
        blindSpots: ["May see patterns where none exist (over-fitting)"],
        recommendations: [
          "Apply your pattern recognition skills to strategic planning and data analysis",
          "Mentor colleagues in developing analytical thinking",
          "Stay mindful of confirmation bias when identifying patterns",
        ],
      },
    ],
  },
  {
    dimensionKey: "DR",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are building your deductive reasoning skills. Drawing strict logical conclusions from premises may require more careful and systematic analysis.",
        strengths: ["Openness to logical analysis", "Awareness that conclusions should follow from evidence"],
        blindSpots: [
          "May jump to conclusions without verifying logical validity",
          "Could confuse correlation with causation",
        ],
        recommendations: [
          "Practice if-then reasoning with workplace scenarios",
          "Before making conclusions, explicitly list the premises you are relying on",
          "Study common logical fallacies to avoid reasoning errors",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You apply deductive reasoning effectively in most situations. You can follow logical chains and identify valid conclusions from clearly stated premises.",
        strengths: [
          "Follows logical arguments accurately",
          "Identifies valid conclusions in standard scenarios",
          "Can spot obvious logical errors",
        ],
        blindSpots: ["May be tripped up by more complex or multi-layered logical chains"],
        recommendations: [
          "Practice with more complex multi-premise arguments",
          "Apply deductive reasoning to risk assessment and policy analysis",
          "Learn to identify hidden assumptions in arguments",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You demonstrate strong deductive reasoning. You can navigate complex logical chains, identify hidden assumptions, and draw precise conclusions even under ambiguity.",
        strengths: [
          "Rigorous logical analysis",
          "Identifies hidden assumptions",
          "Excellent at evaluating arguments and proposals",
          "Clear and structured reasoning",
        ],
        blindSpots: ["May over-rely on pure logic when emotional intelligence is also needed"],
        recommendations: [
          "Apply your reasoning skills to strategic decision-making and policy development",
          "Help teams structure their thinking during complex deliberations",
          "Balance logical rigour with stakeholder perspectives",
        ],
      },
    ],
  },
  {
    dimensionKey: "PS",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Developing",
        description:
          "You are building your multi-step problem-solving skills. Complex problems with multiple constraints may feel overwhelming and benefit from a more structured approach.",
        strengths: ["Willingness to tackle problems", "Seeks help when needed"],
        blindSpots: [
          "May struggle to break complex problems into manageable steps",
          "Could overlook constraints or dependencies",
        ],
        recommendations: [
          "Practice breaking large problems into smaller, sequential steps",
          "Write down all constraints before attempting a solution",
          "Use frameworks like pros/cons lists or decision matrices",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Competent",
        description:
          "You handle standard multi-step problems effectively. You can identify constraints, consider dependencies, and work through problems in a logical sequence.",
        strengths: [
          "Systematic approach to problems",
          "Considers multiple constraints",
          "Can optimise straightforward processes",
        ],
        blindSpots: ["May take longer with highly complex or novel problem types"],
        recommendations: [
          "Tackle more complex optimisation and scheduling challenges",
          "Practice problems that involve trade-offs and competing priorities",
          "Develop skills in resource allocation and capacity planning",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Proficient",
        description:
          "You excel at solving complex, multi-step problems. You efficiently navigate constraints, optimise processes, and find creative solutions to challenging scenarios.",
        strengths: [
          "Efficient with complex multi-step problems",
          "Strong at optimisation and resource allocation",
          "Creative problem-solver",
          "Handles ambiguity and competing constraints well",
        ],
        blindSpots: ["May over-complicate simple problems"],
        recommendations: [
          "Lead process improvement and operational efficiency initiatives",
          "Mentor others in structured problem-solving approaches",
          "Apply your skills to strategic planning and scenario modelling",
        ],
      },
    ],
  },
];

export const LOGICAL_REASONING_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Logical Reasoning Assessment Report",
  subtitle: "Analytical thinking and problem-solving abilities",
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

export const LOGICAL_REASONING_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "average",
  normalizeToPercentage: true,
};

export const LOGICAL_REASONING_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "skillsCompetency",
  dimensions: LOGICAL_REASONING_DIMENSIONS,
  interpretations: LOGICAL_REASONING_INTERPRETATIONS,
  reportConfig: LOGICAL_REASONING_REPORT_CONFIG,
  scoringRules: LOGICAL_REASONING_SCORING_RULES,
};

/**
 * Logical Reasoning assessment questions.
 *
 * Each question has 4 options and one correct answer identified by correctIndex.
 * The dim field maps to a dimension key for scoring.
 */
export const LOGICAL_REASONING_QUESTIONS = [
  // Pattern Recognition (PR)
  {
    q: "What comes next in the sequence: 2, 6, 18, 54, ?",
    options: ["108", "162", "148", "216"],
    correctIndex: 1,
    dim: "PR" as const,
  },
  {
    q: "What comes next in the sequence: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "32"],
    correctIndex: 1,
    dim: "PR" as const,
  },
  {
    q: "Complete the pattern: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
    correctIndex: 2,
    dim: "PR" as const,
  },
  {
    q: "What comes next in the sequence: 3, 5, 9, 17, 33, ?",
    options: ["49", "57", "65", "66"],
    correctIndex: 2,
    dim: "PR" as const,
  },
  {
    q: "Complete the pattern: 100, 95, 85, 70, ?",
    options: ["55", "60", "50", "45"],
    correctIndex: 2,
    dim: "PR" as const,
  },
  {
    q: "What comes next: AB, CD, EF, GH, ?",
    options: ["IJ", "HI", "JK", "IK"],
    correctIndex: 0,
    dim: "PR" as const,
  },
  {
    q: "What comes next in the sequence: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "15"],
    correctIndex: 2,
    dim: "PR" as const,
  },
  {
    q: "Complete the pattern: 2, 3, 5, 7, 11, 13, ?",
    options: ["15", "17", "19", "14"],
    correctIndex: 1,
    dim: "PR" as const,
  },
  // Deductive Reasoning (DR)
  {
    q: "All managers attend the Monday briefing. Sarah is a manager. Which conclusion is valid?",
    options: [
      "Sarah attends the Monday briefing",
      "Sarah leads the Monday briefing",
      "Only managers attend the Monday briefing",
      "Sarah attends all briefings",
    ],
    correctIndex: 0,
    dim: "DR" as const,
  },
  {
    q: "If a project is over budget, it requires director approval. Project Alpha is over budget. What must happen?",
    options: [
      "Project Alpha must be cancelled",
      "Project Alpha requires director approval",
      "The budget must be increased",
      "The project manager must be replaced",
    ],
    correctIndex: 1,
    dim: "DR" as const,
  },
  {
    q: "No interns have building access after 6 PM. Tom is in the building at 8 PM. What can you conclude?",
    options: [
      "Tom is not an intern",
      "Tom has special permission",
      "Tom broke the rules",
      "Security was not monitoring",
    ],
    correctIndex: 0,
    dim: "DR" as const,
  },
  {
    q: "All products in Category A ship free. All products over $50 are in Category A. Item X costs $75. What can you conclude?",
    options: ["Item X may ship free", "Item X ships free", "Item X is discounted", "Item X is in Category B"],
    correctIndex: 1,
    dim: "DR" as const,
  },
  {
    q: "If it rains, the outdoor event moves indoors. If the event moves indoors, extra chairs are needed. It is raining. What is true?",
    options: [
      "The event is cancelled",
      "Extra chairs are needed",
      "The event stays outdoors with umbrellas",
      "Fewer chairs are needed",
    ],
    correctIndex: 1,
    dim: "DR" as const,
  },
  {
    q: "Either the server failed or the network is down. The network is not down. What can you conclude?",
    options: [
      "Both the server and network failed",
      "The server failed",
      "Neither failed",
      "The issue is with the client software",
    ],
    correctIndex: 1,
    dim: "DR" as const,
  },
  {
    q: "Every employee who completes training receives a certificate. Maria did not receive a certificate. What can you conclude?",
    options: [
      "Maria failed the training",
      "Maria did not complete the training",
      "The certificate was lost",
      "Maria is not an employee",
    ],
    correctIndex: 1,
    dim: "DR" as const,
  },
  {
    q: "If a candidate has 5+ years of experience, they qualify for senior roles. If they qualify for senior roles, their salary range is above $100K. James has 7 years of experience. What is true?",
    options: [
      "James's salary range is above $100K",
      "James is guaranteed a senior role",
      "James earns exactly $100K",
      "James must apply for a senior role",
    ],
    correctIndex: 0,
    dim: "DR" as const,
  },
  // Problem Solving (PS)
  {
    q: "A warehouse can process 120 orders per hour with 4 workers. A rush requires 450 orders in 3 hours. What is the minimum number of workers needed?",
    options: ["4", "5", "6", "8"],
    correctIndex: 1,
    dim: "PS" as const,
  },
  {
    q: "Three teams (A, B, C) must present in order. Team A needs 20 min prep, Team B needs 10 min, Team C needs 15 min. Each presentation is 30 min. What is the earliest the last presentation can finish if they start at 9:00 AM?",
    options: ["10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM"],
    correctIndex: 0,
    dim: "PS" as const,
  },
  {
    q: "A delivery truck can carry 2,000 kg. Package types: A = 150 kg, B = 200 kg. An order requires at least 5 of type A and 4 of type B. What is the maximum additional type A packages that can fit?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
    dim: "PS" as const,
  },
  {
    q: "A company has meeting rooms for 4, 8, and 20 people. A meeting has 12 attendees. Which is the most efficient room choice?",
    options: [
      "Two 4-person rooms and one 8-person room",
      "The 20-person room",
      "One 4-person room and one 8-person room",
      "Three 4-person rooms",
    ],
    correctIndex: 1,
    dim: "PS" as const,
  },
  {
    q: "Tasks A (2 hrs), B (3 hrs), and C (1 hr) must be completed. Task B depends on Task A. Task C is independent. What is the shortest total time to complete all tasks?",
    options: ["5 hours", "6 hours", "4 hours", "3 hours"],
    correctIndex: 0,
    dim: "PS" as const,
  },
  {
    q: "A printer prints 30 pages/min in black and white or 12 pages/min in colour. A report has 60 BW pages and 24 colour pages. How long does printing take?",
    options: ["3 minutes", "4 minutes", "5 minutes", "6 minutes"],
    correctIndex: 1,
    dim: "PS" as const,
  },
  {
    q: "A team of 6 people must be split into two groups. Group 1 needs at least one senior member. There are 2 senior members. How many valid ways can the team be divided into groups of 3?",
    options: ["12", "16", "18", "20"],
    correctIndex: 2,
    dim: "PS" as const,
  },
  {
    q: "A production line makes 50 units/hour. Quality checks take 5 minutes per batch of 25 units. How many units can be produced in an 8-hour shift including quality checks?",
    options: ["360", "380", "400", "384"],
    correctIndex: 0,
    dim: "PS" as const,
  },
];

/**
 * Generate survey variables for the Logical Reasoning template.
 */
export function getLogicalReasoningSurveyVariables() {
  return [
    { id: VAR_PR, name: "lr_pr", type: "number" as const, value: 0 },
    { id: VAR_DR, name: "lr_dr", type: "number" as const, value: 0 },
    { id: VAR_PS, name: "lr_ps", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a Logical Reasoning dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "PR" | "DR" | "PS"): string {
  const map: Record<string, string> = { PR: VAR_PR, DR: VAR_DR, PS: VAR_PS };
  return map[dim];
}
