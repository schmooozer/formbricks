import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

// Variable IDs
const VAR_E = "mb_e";
const VAR_I = "mb_i";
const VAR_S = "mb_s";
const VAR_N = "mb_n";
const VAR_T = "mb_t";
const VAR_F = "mb_f";
const VAR_J = "mb_j";
const VAR_P = "mb_p";

export const MYERS_BRIGGS_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "E",
    name: "Extraversion",
    description: "Energised by the outer world of people and activity",
    variableId: VAR_E,
    minScore: 0,
    maxScore: 8,
    color: "#F59E0B",
    icon: "sun",
  },
  {
    id: createId(),
    key: "I",
    name: "Introversion",
    description: "Energised by the inner world of ideas and reflection",
    variableId: VAR_I,
    minScore: 0,
    maxScore: 8,
    color: "#6366F1",
    icon: "moon",
  },
  {
    id: createId(),
    key: "S",
    name: "Sensing",
    description: "Focuses on concrete facts, details, and present reality",
    variableId: VAR_S,
    minScore: 0,
    maxScore: 8,
    color: "#10B981",
    icon: "eye",
  },
  {
    id: createId(),
    key: "N",
    name: "Intuition",
    description: "Focuses on patterns, possibilities, and future potential",
    variableId: VAR_N,
    minScore: 0,
    maxScore: 8,
    color: "#8B5CF6",
    icon: "sparkles",
  },
  {
    id: createId(),
    key: "T",
    name: "Thinking",
    description: "Makes decisions based on logic, analysis, and objectivity",
    variableId: VAR_T,
    minScore: 0,
    maxScore: 8,
    color: "#3B82F6",
    icon: "brain",
  },
  {
    id: createId(),
    key: "F",
    name: "Feeling",
    description: "Makes decisions based on values, harmony, and personal impact",
    variableId: VAR_F,
    minScore: 0,
    maxScore: 8,
    color: "#EC4899",
    icon: "heart",
  },
  {
    id: createId(),
    key: "J",
    name: "Judging",
    description: "Prefers structure, planning, and decisive action",
    variableId: VAR_J,
    minScore: 0,
    maxScore: 8,
    color: "#EF4444",
    icon: "check-square",
  },
  {
    id: createId(),
    key: "P",
    name: "Perceiving",
    description: "Prefers flexibility, spontaneity, and keeping options open",
    variableId: VAR_P,
    minScore: 0,
    maxScore: 8,
    color: "#14B8A6",
    icon: "compass",
  },
];

export const MYERS_BRIGGS_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "E",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Extraversion",
        description:
          "You have a mild preference for extraversion. You can draw energy from social interaction but also value time alone. You are adaptable in both group and solo settings.",
        strengths: [
          "Adaptable in social settings",
          "Comfortable in both group and solo work",
          "Balanced energy management",
        ],
        blindSpots: ["May not fully leverage networking opportunities"],
        recommendations: [
          "Experiment with leading more group discussions",
          "Notice when social energy fuels your best work",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Extraversion",
        description:
          "You clearly prefer the outer world of people and activity. You think best by talking things through and enjoy collaborative environments. You are energised by interaction and may find prolonged isolation draining.",
        strengths: [
          "Strong communicator",
          "Builds relationships easily",
          "Thrives in collaborative settings",
          "Quick to initiate action",
        ],
        blindSpots: ["May dominate conversations", "Can find solo focused work challenging"],
        recommendations: [
          "Schedule focused alone time for deep work",
          "Practice active listening in meetings",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Extraversion",
        description:
          "You have a strong preference for extraversion. You are highly energised by people, action, and external stimulation. You process thoughts by speaking and prefer a fast-paced, interactive environment.",
        strengths: [
          "Excellent networker",
          "High energy in team settings",
          "Natural group facilitator",
          "Action-oriented",
        ],
        blindSpots: [
          "May overlook need for reflection",
          "Can seem overwhelming to introverts",
          "May rush decisions without quiet analysis",
        ],
        recommendations: [
          "Build in reflection time before major decisions",
          "Learn to read when colleagues need space",
          "Try journaling to complement verbal processing",
        ],
      },
    ],
  },
  {
    dimensionKey: "I",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Introversion",
        description:
          "You have a mild preference for introversion. You value quiet reflection but are comfortable in social settings when needed.",
        strengths: ["Flexible between social and solo work", "Good listener", "Thoughtful contributor"],
        blindSpots: ["May not speak up enough in groups"],
        recommendations: ["Push yourself to share ideas earlier in discussions"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Introversion",
        description:
          "You clearly prefer the inner world of ideas and reflection. You think best when you have time to process internally and prefer depth over breadth in relationships and topics.",
        strengths: [
          "Deep thinker",
          "Excellent listener",
          "Focused and concentrated",
          "Builds deep relationships",
        ],
        blindSpots: ["May be perceived as distant", "Could miss opportunities by not speaking up"],
        recommendations: [
          "Share your ideas proactively in meetings",
          "Build a small trusted network for collaboration",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Introversion",
        description:
          "You have a strong preference for introversion. You are most productive in quiet environments and need substantial alone time to recharge. You process deeply and produce well-considered work.",
        strengths: [
          "Exceptional focus",
          "Deep analytical thinking",
          "Independent worker",
          "Thoughtful decision-maker",
        ],
        blindSpots: [
          "May avoid necessary networking",
          "Can seem unapproachable",
          "May over-process before acting",
        ],
        recommendations: [
          "Set specific goals for relationship-building",
          "Practice sharing work-in-progress ideas",
          "Find an extraverted partner for collaborative tasks",
        ],
      },
    ],
  },
  {
    dimensionKey: "S",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Sensing",
        description:
          "You have a mild preference for sensing. You appreciate concrete facts but can also engage with abstract concepts when needed.",
        strengths: ["Balanced between detail and big-picture", "Practical yet open to new ideas"],
        blindSpots: ["May sometimes miss important details"],
        recommendations: ["Double-check factual accuracy on important projects"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Sensing",
        description:
          "You clearly prefer working with concrete, tangible information. You trust experience and facts over theories. You are detail-oriented and prefer step-by-step instructions.",
        strengths: [
          "Excellent attention to detail",
          "Reliable and thorough",
          "Practical problem-solver",
          "Grounded in reality",
        ],
        blindSpots: ["May resist unproven approaches", "Could miss long-term strategic opportunities"],
        recommendations: [
          "Practice brainstorming without judgement",
          "Seek out colleagues who think about future possibilities",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Sensing",
        description:
          "You strongly prefer the concrete and factual. You excel at observing details, recalling specifics, and implementing proven methods. Abstract theories without practical application feel unsatisfying.",
        strengths: [
          "Meticulous accuracy",
          "Strong implementation skills",
          "Trusted for factual reliability",
          "Excellent memory for specifics",
        ],
        blindSpots: [
          "May dismiss innovative ideas too quickly",
          "Can get lost in details and miss the big picture",
          "May resist change that lacks proven track record",
        ],
        recommendations: [
          "Challenge yourself to consider 'what if' scenarios",
          "Partner with intuitive colleagues on strategy projects",
          "Practise looking at data for emerging patterns, not just current facts",
        ],
      },
    ],
  },
  {
    dimensionKey: "N",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Intuition",
        description:
          "You have a mild preference for intuition. You enjoy exploring ideas but stay grounded in practical considerations.",
        strengths: ["Creative yet practical", "Open to new possibilities"],
        blindSpots: ["May not follow through on all ideas"],
        recommendations: ["Balance creative thinking with actionable plans"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Intuition",
        description:
          "You clearly prefer working with patterns, possibilities, and the big picture. You enjoy exploring new concepts and are drawn to innovation. You see connections others might miss.",
        strengths: [
          "Strategic thinker",
          "Sees patterns and connections",
          "Innovative problem-solver",
          "Future-oriented",
        ],
        blindSpots: ["May overlook important details", "Can be impatient with routine work"],
        recommendations: [
          "Partner with detail-oriented colleagues for implementation",
          "Ground your visions in specific action steps",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Intuition",
        description:
          "You strongly prefer the world of ideas, patterns, and possibilities. You are a natural visionary who sees potential everywhere. You may find routine and detail work draining.",
        strengths: [
          "Visionary thinking",
          "Exceptional pattern recognition",
          "Natural innovator",
          "Inspires others with possibilities",
        ],
        blindSpots: [
          "May neglect practical implementation",
          "Can overwhelm others with too many ideas",
          "May lose interest after the conceptual phase",
        ],
        recommendations: [
          "Develop systems for follow-through",
          "Find an execution partner for your ideas",
          "Practice staying present with current realities before jumping to future possibilities",
        ],
      },
    ],
  },
  {
    dimensionKey: "T",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Thinking",
        description:
          "You have a mild preference for logical analysis in decision-making while still considering personal impact.",
        strengths: ["Balanced decision-making", "Can be both analytical and empathetic"],
        blindSpots: ["May take longer to decide when logic and values conflict"],
        recommendations: ["Trust your analytical instincts on technical decisions"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Thinking",
        description:
          "You clearly prefer to make decisions based on logic, data, and objective analysis. You value fairness through consistent principles and can make tough calls when needed.",
        strengths: [
          "Objective decision-maker",
          "Strong analytical skills",
          "Consistent and fair",
          "Handles tough decisions well",
        ],
        blindSpots: ["May seem insensitive to others' feelings", "Could undervalue relationship dynamics"],
        recommendations: [
          "Consider the human impact of your decisions",
          "Acknowledge others' feelings before presenting your analysis",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Thinking",
        description:
          "You strongly prefer logical, analytical decision-making. You excel at identifying flaws in reasoning and maintaining objectivity under pressure. Emotional arguments may frustrate you.",
        strengths: [
          "Exceptional analytical rigour",
          "Calm under pressure",
          "Identifies logical flaws quickly",
          "Makes principled decisions",
        ],
        blindSpots: [
          "May alienate colleagues with blunt feedback",
          "Can dismiss emotional concerns as irrational",
          "May create conflict by prioritising logic over harmony",
        ],
        recommendations: [
          "Lead with appreciation before critique",
          "Learn to translate logical conclusions into emotionally intelligent communication",
          "Recognise that values-based decisions are valid even if not purely logical",
        ],
      },
    ],
  },
  {
    dimensionKey: "F",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Feeling",
        description:
          "You have a mild preference for values-based decision-making while maintaining analytical objectivity when needed.",
        strengths: ["Considerate yet objective", "Balances empathy with logic"],
        blindSpots: ["May struggle when values and data conflict"],
        recommendations: ["Trust your instinct to consider people impact"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Feeling",
        description:
          "You clearly prefer to make decisions based on values, personal impact, and maintaining harmony. You are skilled at reading others' emotions and creating inclusive environments.",
        strengths: [
          "Empathetic leader",
          "Creates team harmony",
          "Values-driven decisions",
          "Skilled at reading people",
        ],
        blindSpots: ["May avoid necessary confrontation", "Could take criticism personally"],
        recommendations: [
          "Practise giving constructive feedback directly",
          "Separate personal feelings from professional critique",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Feeling",
        description:
          "You strongly prefer values-based, people-centred decision-making. You are deeply attuned to others' needs and create warm, supportive environments. Purely impersonal decisions feel wrong to you.",
        strengths: [
          "Deeply empathetic",
          "Creates psychological safety",
          "Inspires loyalty",
          "Champions team wellbeing",
        ],
        blindSpots: [
          "May avoid tough decisions that could upset people",
          "Can be perceived as biased toward favourites",
          "May sacrifice efficiency for harmony",
        ],
        recommendations: [
          "Develop comfort with healthy conflict",
          "Practise using data to support your values-based recommendations",
          "Set boundaries to avoid emotional exhaustion",
        ],
      },
    ],
  },
  {
    dimensionKey: "J",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Judging",
        description:
          "You have a mild preference for structure and planning while maintaining some flexibility.",
        strengths: ["Organised yet adaptable", "Can plan and pivot as needed"],
        blindSpots: ["May sometimes over-plan simple tasks"],
        recommendations: ["Use your planning skills for complex projects, stay loose for simple ones"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Judging",
        description:
          "You clearly prefer structure, planning, and decisive action. You like to know what to expect and feel most productive when working from a clear plan with defined milestones.",
        strengths: [
          "Excellent planner",
          "Reliable and punctual",
          "Decisive",
          "Follows through on commitments",
        ],
        blindSpots: ["May be inflexible when plans change", "Could make decisions too quickly"],
        recommendations: [
          "Build buffer time into plans for unexpected changes",
          "Practice sitting with ambiguity before deciding",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Judging",
        description:
          "You strongly prefer structure, closure, and decisive action. You are highly organised and may feel stressed by ambiguity or last-minute changes. You are the person who makes things happen on time.",
        strengths: [
          "Exceptional organiser",
          "Drives projects to completion",
          "Creates clarity from chaos",
          "Dependable and consistent",
        ],
        blindSpots: [
          "May resist necessary pivots",
          "Can seem controlling or rigid",
          "May close down options too early",
        ],
        recommendations: [
          "Practice 'good enough' instead of perfect",
          "Leave decisions open longer on complex issues",
          "Learn to see last-minute changes as opportunities, not threats",
        ],
      },
    ],
  },
  {
    dimensionKey: "P",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Perceiving",
        description: "You have a mild preference for flexibility while appreciating some structure.",
        strengths: ["Adaptable with some discipline", "Open to change"],
        blindSpots: ["May occasionally procrastinate"],
        recommendations: ["Use light structure (checklists) to stay on track"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Perceiving",
        description:
          "You clearly prefer flexibility, spontaneity, and keeping options open. You work well under pressure and enjoy adapting to new information. Rigid schedules feel constraining.",
        strengths: [
          "Highly adaptable",
          "Thrives under pressure",
          "Open to new information",
          "Flexible problem-solver",
        ],
        blindSpots: ["May procrastinate on routine tasks", "Could miss deadlines without external structure"],
        recommendations: [
          "Use minimal structure (weekly goals, not hourly schedules)",
          "Set personal deadlines ahead of actual deadlines",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Perceiving",
        description:
          "You strongly prefer an open, flexible approach to life and work. You are energised by spontaneity and new possibilities. Fixed plans and rigid schedules feel suffocating.",
        strengths: [
          "Maximum adaptability",
          "Excellent in crisis situations",
          "Sees opportunities others miss",
          "Comfortable with uncertainty",
        ],
        blindSpots: [
          "May chronically procrastinate",
          "Can frustrate structure-oriented colleagues",
          "May leave projects unfinished when something more interesting appears",
        ],
        recommendations: [
          "Partner with a J-type colleague for project management",
          "Use the 'two-minute rule' — if it takes less than two minutes, do it now",
          "Commit to finishing one thing before starting the next",
        ],
      },
    ],
  },
];

export const MYERS_BRIGGS_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Myers-Briggs Type Indicator Report",
  subtitle: "Your 4-letter personality type and what it means",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#6366F1",
    accent: "#F59E0B",
  },
};

export const MYERS_BRIGGS_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "ipsative",
  normalizeToPercentage: true,
};

export const MYERS_BRIGGS_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "myersBriggs",
  dimensions: MYERS_BRIGGS_DIMENSIONS,
  interpretations: MYERS_BRIGGS_INTERPRETATIONS,
  reportConfig: MYERS_BRIGGS_REPORT_CONFIG,
  scoringRules: MYERS_BRIGGS_SCORING_RULES,
};

/**
 * MBTI questions — 32 forced-choice questions (8 per dichotomy pair).
 * Each question has exactly 2 options. The first maps to dims[0], the second to dims[1].
 */
export const MYERS_BRIGGS_QUESTIONS = [
  // E/I pair (8 questions)
  {
    q: "At a work event, I prefer to:",
    options: [
      "Talk to many different people and work the room",
      "Have a few deep conversations with people I know well",
    ],
    dims: ["E", "I"],
  },
  {
    q: "After a long day of meetings, I recharge by:",
    options: [
      "Going out with colleagues for dinner or drinks",
      "Spending quiet time alone or with one close person",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When brainstorming, I work best by:",
    options: [
      "Talking ideas through with the group in real time",
      "Reflecting on my own first, then sharing my best ideas",
    ],
    dims: ["E", "I"],
  },
  {
    q: "In my ideal role, I would:",
    options: [
      "Interact with many people throughout the day",
      "Have long stretches of focused, uninterrupted work",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When solving a problem, I tend to:",
    options: [
      "Think out loud and bounce ideas off others",
      "Quietly work through it in my head before sharing",
    ],
    dims: ["E", "I"],
  },
  {
    q: "I find energy in:",
    options: [
      "A bustling open office with lots of activity",
      "A quiet private workspace with minimal interruptions",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When meeting someone new, I typically:",
    options: [
      "Initiate conversation and share about myself freely",
      "Wait for them to approach and reveal myself gradually",
    ],
    dims: ["E", "I"],
  },
  {
    q: "My communication style is more:",
    options: [
      "Expressive and immediate — I share thoughts as they come",
      "Reserved and considered — I choose my words carefully",
    ],
    dims: ["E", "I"],
  },

  // S/N pair (8 questions)
  {
    q: "When learning something new, I prefer:",
    options: [
      "Step-by-step instructions with concrete examples",
      "An overview of the concept so I can figure out the details myself",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I trust:",
    options: ["Proven methods and direct experience", "My intuition and gut feeling about possibilities"],
    dims: ["S", "N"],
  },
  {
    q: "In a project debrief, I focus on:",
    options: [
      "What specifically happened and what the data shows",
      "What the results mean for the bigger picture and future direction",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I am more interested in:",
    options: ["What is real and actual right now", "What could be possible in the future"],
    dims: ["S", "N"],
  },
  {
    q: "When reading a report, I pay most attention to:",
    options: ["The specific facts, figures, and data points", "The themes, patterns, and implications"],
    dims: ["S", "N"],
  },
  {
    q: "I would describe myself as more:",
    options: ["Practical and down-to-earth", "Imaginative and theoretical"],
    dims: ["S", "N"],
  },
  {
    q: "When giving directions, I prefer to:",
    options: [
      "Give specific, detailed step-by-step instructions",
      "Describe the general destination and let them find their way",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I get frustrated when people:",
    options: [
      "Jump to conclusions without checking the facts",
      "Get bogged down in details and miss the bigger opportunity",
    ],
    dims: ["S", "N"],
  },

  // T/F pair (8 questions)
  {
    q: "When making a difficult decision, I rely more on:",
    options: ["Logical analysis and objective criteria", "How the decision will affect the people involved"],
    dims: ["T", "F"],
  },
  {
    q: "When giving feedback, I prioritise:",
    options: [
      "Being truthful and direct, even if it stings",
      "Being tactful and encouraging, even if I soften the message",
    ],
    dims: ["T", "F"],
  },
  {
    q: "In a disagreement, I am more likely to:",
    options: ["Focus on who has the stronger argument", "Focus on how to restore harmony and understanding"],
    dims: ["T", "F"],
  },
  {
    q: "I believe fairness means:",
    options: [
      "Treating everyone by the same objective standard",
      "Considering each person's unique circumstances",
    ],
    dims: ["T", "F"],
  },
  {
    q: "I am more impressed by:",
    options: [
      "A well-reasoned argument backed by evidence",
      "A heartfelt appeal that connects with shared values",
    ],
    dims: ["T", "F"],
  },
  {
    q: "When a colleague makes a mistake, my first instinct is to:",
    options: [
      "Analyse what went wrong and how to fix the process",
      "Consider how they are feeling and offer support",
    ],
    dims: ["T", "F"],
  },
  {
    q: "I would rather be known as:",
    options: ["Competent and logical", "Compassionate and understanding"],
    dims: ["T", "F"],
  },
  {
    q: "When evaluating a proposal, I weigh:",
    options: [
      "The data, costs, and logical consistency",
      "The impact on team morale and alignment with our values",
    ],
    dims: ["T", "F"],
  },

  // J/P pair (8 questions)
  {
    q: "I prefer my work environment to be:",
    options: [
      "Structured with clear expectations and deadlines",
      "Flexible with room to adapt as things evolve",
    ],
    dims: ["J", "P"],
  },
  {
    q: "When planning a project, I:",
    options: ["Create a detailed plan before starting work", "Dive in and adjust the plan as I learn more"],
    dims: ["J", "P"],
  },
  {
    q: "Regarding deadlines, I typically:",
    options: [
      "Finish well ahead of time so I can relax",
      "Work best with the energy of an approaching deadline",
    ],
    dims: ["J", "P"],
  },
  {
    q: "I feel more comfortable when:",
    options: [
      "A decision has been made and we can move forward",
      "Options are still open and we can gather more information",
    ],
    dims: ["J", "P"],
  },
  {
    q: "My desk or workspace tends to be:",
    options: [
      "Organised with everything in its place",
      "A creative workspace with multiple things in progress",
    ],
    dims: ["J", "P"],
  },
  {
    q: "When plans change unexpectedly, I:",
    options: [
      "Feel stressed and want to re-establish a new plan quickly",
      "Feel energised by the new possibilities this opens up",
    ],
    dims: ["J", "P"],
  },
  {
    q: "I prefer to:",
    options: [
      "Make a to-do list and check items off systematically",
      "Keep things flexible and respond to whatever feels most important",
    ],
    dims: ["J", "P"],
  },
  {
    q: "On holiday, I prefer:",
    options: [
      "A planned itinerary with reservations and schedules",
      "A loose plan that allows spontaneous exploration",
    ],
    dims: ["J", "P"],
  },
];

/**
 * Generate survey variables for the MBTI template.
 */
export function getMyersBriggsSurveyVariables() {
  return [
    { id: VAR_E, name: "mb_e", type: "number" as const, value: 0 },
    { id: VAR_I, name: "mb_i", type: "number" as const, value: 0 },
    { id: VAR_S, name: "mb_s", type: "number" as const, value: 0 },
    { id: VAR_N, name: "mb_n", type: "number" as const, value: 0 },
    { id: VAR_T, name: "mb_t", type: "number" as const, value: 0 },
    { id: VAR_F, name: "mb_f", type: "number" as const, value: 0 },
    { id: VAR_J, name: "mb_j", type: "number" as const, value: 0 },
    { id: VAR_P, name: "mb_p", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a dimension key to its variable ID.
 */
export function getVariableIdForDimension(dim: string): string {
  const map: Record<string, string> = {
    E: VAR_E,
    I: VAR_I,
    S: VAR_S,
    N: VAR_N,
    T: VAR_T,
    F: VAR_F,
    J: VAR_J,
    P: VAR_P,
  };
  return map[dim] ?? dim;
}
