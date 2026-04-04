import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Myers-Briggs Type Indicator (MBTI) Assessment Template
 *
 * 32 forced-choice questions across 4 dichotomy pairs (8 per pair).
 * Each question presents two options; the first maps to the first pole
 * and the second maps to the second pole of the dichotomy.
 *
 * Uses ipsative scoring: selecting an option increments the corresponding
 * dimension variable by 1. The 4-letter type code is determined by which
 * pole scores higher in each pair.
 */

// Variable IDs for survey variables
const VAR_E = "mb_e";
const VAR_I = "mb_i";
const VAR_S = "mb_s";
const VAR_N = "mb_n";
const VAR_T = "mb_t";
const VAR_F = "mb_f";
const VAR_J = "mb_j";
const VAR_P = "mb_p";

export const MBTI_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "E",
    name: "Extraversion",
    description:
      "Preference for drawing energy from the outer world of people, activities, and social interaction.",
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
    description:
      "Preference for drawing energy from the inner world of ideas, reflections, and solitary activities.",
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
    description:
      "Preference for taking in information through the five senses, focusing on facts and concrete details.",
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
    description: "Preference for taking in information through patterns, possibilities, and the big picture.",
    variableId: VAR_N,
    minScore: 0,
    maxScore: 8,
    color: "#8B5CF6",
    icon: "lightbulb",
  },
  {
    id: createId(),
    key: "T",
    name: "Thinking",
    description:
      "Preference for making decisions based on objective logic, analysis, and consistent principles.",
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
    description:
      "Preference for making decisions based on personal values, empathy, and the impact on people.",
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
    description: "Preference for a structured, planned, and organised approach to the outer world.",
    variableId: VAR_J,
    minScore: 0,
    maxScore: 8,
    color: "#EF4444",
    icon: "clipboardCheck",
  },
  {
    id: createId(),
    key: "P",
    name: "Perceiving",
    description: "Preference for a flexible, spontaneous, and adaptable approach to the outer world.",
    variableId: VAR_P,
    minScore: 0,
    maxScore: 8,
    color: "#14B8A6",
    icon: "compass",
  },
];

export const MBTI_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  // ── Extraversion ──────────────────────────────────────────────────────────
  {
    dimensionKey: "E",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Extraversion",
        description:
          "You show a mild preference for extraversion. While you can enjoy social interaction, it is not your primary source of energy. You may function well in both collaborative and independent settings, leaning slightly towards the social side when given a choice.",
        strengths: ["Flexible social engagement", "Can work in both team and solo settings"],
        blindSpots: ["Preference may be unclear to colleagues"],
        recommendations: [
          "Experiment with both collaborative and solo work to identify what suits each task best",
        ],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Extraversion",
        description:
          "You have a clear preference for engaging with the external world. You are energised by interaction, enjoy collaborative work, and tend to think out loud. You communicate readily and build rapport with ease, making you a natural connector within your team.",
        strengths: ["Strong communicator", "Builds rapport easily", "Energises group settings"],
        blindSpots: [
          "May dominate quieter colleagues in discussions",
          "Could struggle with prolonged solitary work",
        ],
        recommendations: [
          "Create space for introverted colleagues to contribute",
          "Schedule focused solo time for deep work",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Extraversion",
        description:
          "You have a strong preference for the outer world of people and action. You are at your best in social, high-energy environments and may feel restless when working alone for long periods. You are outgoing, expressive, and often the person who initiates conversations and activities.",
        strengths: [
          "Highly sociable and approachable",
          "Excellent at networking and relationship-building",
          "Brings energy and enthusiasm to teams",
        ],
        blindSpots: [
          "May find prolonged solitary tasks draining",
          "Could overlook the need for quiet reflection",
        ],
        recommendations: [
          "Build short solo-reflection breaks into your day",
          "Seek feedback from quieter team members you may inadvertently overshadow",
        ],
      },
    ],
  },

  // ── Introversion ──────────────────────────────────────────────────────────
  {
    dimensionKey: "I",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Introversion",
        description:
          "You show a mild preference for introversion. You can engage socially when needed but may slightly prefer quieter environments. This gentle preference gives you flexibility across different work contexts.",
        strengths: ["Adaptable to social and solitary settings", "Balanced energy management"],
        blindSpots: ["May not advocate strongly enough for your need for quiet time"],
        recommendations: ["Be intentional about protecting focus time when you need it"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Introversion",
        description:
          "You have a clear preference for the inner world of ideas and reflection. You recharge through solitude, prefer meaningful one-on-one conversations, and do your best thinking independently. You are a careful listener who contributes thoughtful, well-considered perspectives.",
        strengths: ["Deep thinker", "Excellent listener", "Produces high-quality independent work"],
        blindSpots: ["May hesitate to share ideas in group settings", "Could be perceived as disengaged"],
        recommendations: [
          "Prepare key points before meetings to ensure your voice is heard",
          "Use written communication to share ideas when speaking up feels difficult",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Introversion",
        description:
          "You have a strong preference for the inner world. You need significant quiet time to recharge and do your best work in solitary or small-group environments. You are deeply reflective, often producing insights that others miss because of the depth of your thinking.",
        strengths: [
          "Exceptional focus and concentration",
          "Deep analytical thinking",
          "Self-sufficient and independent",
        ],
        blindSpots: [
          "May avoid social situations that could benefit your career",
          "Could be perceived as aloof or unapproachable",
        ],
        recommendations: [
          "Set a regular cadence for one-on-one relationship building",
          "Share your work and insights proactively rather than waiting to be asked",
        ],
      },
    ],
  },

  // ── Sensing ───────────────────────────────────────────────────────────────
  {
    dimensionKey: "S",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Sensing",
        description:
          "You show a mild preference for concrete, factual information. While you can appreciate abstract ideas, you tend to gravitate slightly towards practical, real-world data when making decisions.",
        strengths: ["Grounded with some openness to abstraction", "Flexible information processing"],
        blindSpots: ["May not fully leverage your practical instincts"],
        recommendations: ["Trust your attention to detail as a genuine strength in data-heavy tasks"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Sensing",
        description:
          "You have a clear preference for working with concrete facts, proven methods, and tangible outcomes. You are detail-oriented and practical, preferring step-by-step processes over abstract brainstorming. You bring a grounding, realistic perspective to teams that may otherwise get lost in possibilities.",
        strengths: [
          "Detail-oriented and thorough",
          "Practical and results-focused",
          "Reliable with facts and data",
        ],
        blindSpots: [
          "May dismiss innovative approaches that lack proven track records",
          "Could miss the strategic big picture",
        ],
        recommendations: [
          "Partner with intuitive colleagues for long-range planning",
          "Practice stepping back to consider broader implications before diving into details",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Sensing",
        description:
          "You have a strong preference for concrete reality. You trust what you can see, touch, and verify, and you excel at working with precise data and established procedures. You are the person others turn to for accurate, reliable, and practical work.",
        strengths: [
          "Exceptionally detail-oriented",
          "Masters established procedures quickly",
          "Produces highly accurate work",
        ],
        blindSpots: [
          "May resist change or unproven approaches",
          "Could become frustrated with ambiguity and vagueness",
        ],
        recommendations: [
          "Challenge yourself to consider 'what if' scenarios alongside 'what is'",
          "Seek exposure to strategic planning exercises to broaden your perspective",
        ],
      },
    ],
  },

  // ── Intuition ─────────────────────────────────────────────────────────────
  {
    dimensionKey: "N",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Intuition",
        description:
          "You show a mild preference for seeing patterns and possibilities beyond the immediate facts. While you can work with concrete data, you are slightly more drawn to exploring ideas and future potential.",
        strengths: ["Open to new ideas with a practical foundation", "Flexible perspective"],
        blindSpots: ["May not fully trust your intuitive insights"],
        recommendations: ["Give your intuitive hunches space alongside your factual analysis"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Intuition",
        description:
          "You have a clear preference for working with patterns, possibilities, and the big picture. You enjoy exploring new ideas, making connections between seemingly unrelated concepts, and imagining future scenarios. You bring a creative, forward-thinking perspective to your work.",
        strengths: [
          "Creative and innovative thinker",
          "Strong at strategic planning",
          "Sees connections others miss",
        ],
        blindSpots: [
          "May overlook important details in pursuit of the big picture",
          "Could frustrate detail-oriented colleagues",
        ],
        recommendations: [
          "Pair your visions with concrete action steps",
          "Collaborate with sensing types to ensure practical feasibility",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Intuition",
        description:
          "You have a strong preference for the world of possibilities and abstractions. You are a natural visionary who thrives on innovation, conceptual thinking, and exploring uncharted territory. You quickly grasp complex systems and enjoy working at the frontier of ideas.",
        strengths: [
          "Visionary and future-oriented",
          "Exceptional at pattern recognition",
          "Thrives on complexity and innovation",
        ],
        blindSpots: ["May struggle with routine, detail-heavy tasks", "Could overlook practical constraints"],
        recommendations: [
          "Develop systems for managing necessary details without draining your energy",
          "Ground your ideas with data and evidence when presenting to stakeholders",
        ],
      },
    ],
  },

  // ── Thinking ──────────────────────────────────────────────────────────────
  {
    dimensionKey: "T",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Thinking",
        description:
          "You show a mild preference for logical analysis when making decisions. While you consider people's feelings, you lean slightly towards objective criteria and rational evaluation.",
        strengths: ["Balanced decision-making", "Can consider both logic and values"],
        blindSpots: ["May not always be clear about which criteria are driving your decisions"],
        recommendations: ["Be explicit about your reasoning to help others understand your decisions"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Thinking",
        description:
          "You have a clear preference for making decisions based on logic, analysis, and objective principles. You value fairness, consistency, and truth, and you are comfortable making tough calls when the evidence supports them. You bring analytical rigour and clarity to complex decisions.",
        strengths: [
          "Objective and analytical",
          "Fair and consistent decision-maker",
          "Comfortable with difficult decisions",
        ],
        blindSpots: [
          "May undervalue the emotional impact of decisions",
          "Could be perceived as cold or impersonal",
        ],
        recommendations: [
          "Acknowledge the human side of decisions even when the logic is clear",
          "Practice communicating decisions with empathy",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Thinking",
        description:
          "You have a strong preference for logical, principle-based decision-making. You are highly analytical, value intellectual honesty above social harmony, and are willing to challenge popular positions when the evidence warrants it. You excel in roles requiring critical evaluation and strategic analysis.",
        strengths: [
          "Exceptional analytical skills",
          "Intellectually honest and principled",
          "Excels at strategic and critical thinking",
        ],
        blindSpots: [
          "May alienate colleagues with blunt directness",
          "Could dismiss emotional intelligence as irrelevant",
        ],
        recommendations: [
          "Invest in developing your emotional intelligence alongside your analytical skills",
          "Frame logical conclusions in terms that acknowledge their impact on people",
        ],
      },
    ],
  },

  // ── Feeling ───────────────────────────────────────────────────────────────
  {
    dimensionKey: "F",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Feeling",
        description:
          "You show a mild preference for considering values and people's feelings when making decisions. While you can be logical, you lean slightly towards empathy and interpersonal harmony.",
        strengths: ["Balanced sensitivity to logic and values", "Approachable decision-maker"],
        blindSpots: ["May not always recognise when your values are influencing your reasoning"],
        recommendations: ["Reflect on whether your decisions are driven by logic, values, or both"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Feeling",
        description:
          "You have a clear preference for making decisions based on personal values, empathy, and the impact on people. You are skilled at reading social dynamics and creating harmony within teams. You naturally consider how decisions will affect individuals and relationships.",
        strengths: [
          "Empathetic and people-oriented",
          "Builds team cohesion",
          "Skilled at conflict resolution",
        ],
        blindSpots: ["May avoid necessary but unpopular decisions", "Could take criticism personally"],
        recommendations: [
          "Develop comfort with making tough decisions that serve the greater good",
          "Separate personal worth from professional feedback",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Feeling",
        description:
          "You have a strong preference for values-based, people-centred decision-making. You are deeply empathetic, attuned to others' emotions, and driven to create positive human outcomes. You excel at building trust, resolving conflict, and fostering inclusive environments.",
        strengths: [
          "Deeply empathetic and compassionate",
          "Exceptional relationship builder",
          "Creates psychologically safe environments",
        ],
        blindSpots: [
          "May struggle with decisions that benefit the organisation but hurt individuals",
          "Could become overwhelmed by absorbing others' emotions",
        ],
        recommendations: [
          "Set emotional boundaries to protect your energy",
          "Partner with thinking types to ensure objectivity in high-stakes decisions",
        ],
      },
    ],
  },

  // ── Judging ───────────────────────────────────────────────────────────────
  {
    dimensionKey: "J",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Judging",
        description:
          "You show a mild preference for structure and planning. While you can adapt to change, you slightly prefer having a plan and knowing what to expect.",
        strengths: [
          "Flexible but leans towards organisation",
          "Comfortable with both planned and spontaneous approaches",
        ],
        blindSpots: ["May not consistently enforce the structure you prefer"],
        recommendations: ["Use light planning frameworks that provide structure without rigidity"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Judging",
        description:
          "You have a clear preference for structure, planning, and closure. You like to make decisions, set schedules, and work systematically towards goals. You are reliable, organised, and bring a sense of order and predictability to your work environment.",
        strengths: [
          "Well-organised and reliable",
          "Good at planning and meeting deadlines",
          "Provides structure for teams",
        ],
        blindSpots: ["May become rigid when plans need to change", "Could rush decisions to achieve closure"],
        recommendations: [
          "Build buffer time into plans for unexpected changes",
          "Practice sitting with ambiguity before forcing a decision",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Judging",
        description:
          "You have a strong preference for a structured, decided, and organised lifestyle. You thrive when there is a clear plan, established deadlines, and predictable routines. You are exceptionally reliable and bring strong project management instincts to every endeavour.",
        strengths: [
          "Exceptionally organised and dependable",
          "Strong project management instincts",
          "Drives teams to completion",
        ],
        blindSpots: [
          "May become stressed or controlling when things deviate from the plan",
          "Could miss opportunities that arise from spontaneity",
        ],
        recommendations: [
          "Schedule intentional unstructured time to foster flexibility",
          "Practice responding to change with curiosity rather than frustration",
        ],
      },
    ],
  },

  // ── Perceiving ────────────────────────────────────────────────────────────
  {
    dimensionKey: "P",
    ranges: [
      {
        min: 0,
        max: 2,
        label: "Slight Perceiving",
        description:
          "You show a mild preference for flexibility and keeping options open. While you can follow plans, you slightly prefer environments that allow for spontaneity and adaptation.",
        strengths: ["Adaptable with some appreciation for structure", "Open to emerging opportunities"],
        blindSpots: ["May procrastinate when structure would help"],
        recommendations: ["Use deadlines as helpful guardrails rather than constraints"],
      },
      {
        min: 3,
        max: 5,
        label: "Moderate Perceiving",
        description:
          "You have a clear preference for flexibility, spontaneity, and keeping your options open. You enjoy exploring possibilities, adapting to new information, and maintaining the freedom to change course. You bring an energising sense of openness and curiosity to your teams.",
        strengths: [
          "Adaptable and flexible",
          "Comfortable with ambiguity",
          "Curious and open to new information",
        ],
        blindSpots: [
          "May struggle to meet deadlines or finalise decisions",
          "Could leave too many things open-ended",
        ],
        recommendations: [
          "Set personal mini-deadlines within larger projects",
          "Practice making and committing to decisions even when not all information is available",
        ],
      },
      {
        min: 6,
        max: 8,
        label: "Strong Perceiving",
        description:
          "You have a strong preference for an open, flexible, and spontaneous approach to life and work. You thrive in dynamic environments, excel at last-minute improvisation, and resist rigid structures. You are at your creative best when given freedom to explore and adapt.",
        strengths: [
          "Highly adaptable and resourceful",
          "Excellent improviser",
          "Thrives in dynamic, fast-changing environments",
        ],
        blindSpots: [
          "May chronically underestimate the time tasks require",
          "Could frustrate structure-oriented colleagues",
        ],
        recommendations: [
          "Partner with judging types for projects requiring detailed planning",
          "Develop a minimal personal organisational system that respects your need for flexibility",
        ],
      },
    ],
  },
];

export const MBTI_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
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

export const MBTI_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "ipsative",
  normalizeToPercentage: true,
};

export const MBTI_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "myersBriggs",
  dimensions: MBTI_DIMENSIONS,
  interpretations: MBTI_INTERPRETATIONS,
  reportConfig: MBTI_REPORT_CONFIG,
  scoringRules: MBTI_SCORING_RULES,
};

/**
 * MBTI survey questions.
 *
 * Each question presents two options representing opposite poles of a dichotomy.
 * The `dims` array indicates which dimension each option maps to:
 *   dims[0] = dimension for the first option
 *   dims[1] = dimension for the second option
 *
 * The block logic adds 1 point to the selected dimension's variable.
 */
export const MBTI_QUESTIONS: { q: string; options: [string, string]; dims: [string, string] }[] = [
  // E/I pair
  {
    q: "At a work event, I prefer to...",
    options: [
      "Talk to many different people and circulate the room",
      "Have deep conversations with a few people I know well",
    ],
    dims: ["E", "I"],
  },
  {
    q: "After a long day of meetings, I recharge by...",
    options: [
      "Going out with colleagues for dinner or drinks",
      "Spending quiet time alone or with one close friend",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When brainstorming ideas, I work best by...",
    options: ["Discussing ideas out loud with a group", "Thinking things through quietly on my own first"],
    dims: ["E", "I"],
  },
  {
    q: "In my ideal role, I would spend most of my time...",
    options: [
      "Collaborating face-to-face with team members and clients",
      "Working independently on focused, in-depth tasks",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When solving a difficult problem, I tend to...",
    options: [
      "Talk it through with others to clarify my thinking",
      "Reflect on it privately before sharing my conclusions",
    ],
    dims: ["E", "I"],
  },
  {
    q: "I am energised most by...",
    options: [
      "Being in a lively environment with lots of interaction",
      "Having uninterrupted time to concentrate deeply",
    ],
    dims: ["E", "I"],
  },
  {
    q: "When learning something new, I prefer to...",
    options: [
      "Jump into group activities and learn by doing with others",
      "Study the material on my own and process it internally",
    ],
    dims: ["E", "I"],
  },
  {
    q: "People who know me well would say I am...",
    options: [
      "Outgoing, talkative, and easy to get to know",
      "Private, thoughtful, and harder to read at first",
    ],
    dims: ["E", "I"],
  },

  // S/N pair
  {
    q: "I trust...",
    options: ["Concrete facts and direct experience", "Intuition and patterns I sense beneath the surface"],
    dims: ["S", "N"],
  },
  {
    q: "When reading a report, I focus on...",
    options: [
      "The specific data, figures, and evidence presented",
      "The overarching themes, implications, and possibilities",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I am more interested in...",
    options: ["What is real and actual right now", "What could be possible in the future"],
    dims: ["S", "N"],
  },
  {
    q: "When describing an event to a colleague, I tend to...",
    options: [
      "Relay the facts in a sequential, step-by-step way",
      "Share the overall impression and what it could mean",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I prefer work that involves...",
    options: [
      "Applying established methods to produce tangible results",
      "Exploring new concepts and developing innovative strategies",
    ],
    dims: ["S", "N"],
  },
  {
    q: "When making a plan, I start with...",
    options: [
      "Concrete details and practical logistics",
      "The big picture vision and then work out the details later",
    ],
    dims: ["S", "N"],
  },
  {
    q: "I value colleagues who are...",
    options: [
      "Realistic, practical, and grounded in experience",
      "Visionary, creative, and open to unconventional ideas",
    ],
    dims: ["S", "N"],
  },
  {
    q: "When given instructions, I prefer them to be...",
    options: ["Clear, specific, and step-by-step", "General guidelines that leave room for interpretation"],
    dims: ["S", "N"],
  },

  // T/F pair
  {
    q: "When making decisions, I rely more on...",
    options: ["Logic and objective analysis", "Values and how people will be affected"],
    dims: ["T", "F"],
  },
  {
    q: "When giving feedback, I prioritise...",
    options: [
      "Being honest and accurate, even if it is uncomfortable",
      "Being tactful and considerate of the person's feelings",
    ],
    dims: ["T", "F"],
  },
  {
    q: "In a disagreement, I tend to...",
    options: [
      "Focus on the logical merits of each position",
      "Consider how the outcome will affect relationships and morale",
    ],
    dims: ["T", "F"],
  },
  {
    q: "I am more persuaded by...",
    options: [
      "A well-structured argument supported by evidence",
      "A compelling story about the human impact",
    ],
    dims: ["T", "F"],
  },
  {
    q: "When evaluating a proposal, I first consider...",
    options: [
      "Whether it is logically sound and cost-effective",
      "Whether it aligns with our values and supports the team",
    ],
    dims: ["T", "F"],
  },
  {
    q: "I would rather be known as...",
    options: ["Fair and competent", "Compassionate and understanding"],
    dims: ["T", "F"],
  },
  {
    q: "When a colleague is underperforming, I first think about...",
    options: [
      "The objective standards they are failing to meet",
      "What personal challenges they might be facing",
    ],
    dims: ["T", "F"],
  },
  {
    q: "I find it easier to...",
    options: [
      "Analyse the pros and cons of a situation objectively",
      "Tune into how a situation is affecting people emotionally",
    ],
    dims: ["T", "F"],
  },

  // J/P pair
  {
    q: "I prefer my work environment to be...",
    options: ["Structured, planned, and predictable", "Flexible, spontaneous, and open to change"],
    dims: ["J", "P"],
  },
  {
    q: "When starting a project, I prefer to...",
    options: [
      "Create a detailed plan with milestones and deadlines",
      "Explore options and let the approach evolve naturally",
    ],
    dims: ["J", "P"],
  },
  {
    q: "I feel most comfortable when...",
    options: [
      "Decisions are made and I know what to expect",
      "Options are still open and I can adapt as I go",
    ],
    dims: ["J", "P"],
  },
  {
    q: "My desk and workspace tend to be...",
    options: [
      "Neat, organised, and everything in its place",
      "A creative spread of current projects and materials",
    ],
    dims: ["J", "P"],
  },
  {
    q: "When a deadline is approaching, I typically...",
    options: [
      "Have completed most of the work well in advance",
      "Do my best work in a final burst of energy close to the deadline",
    ],
    dims: ["J", "P"],
  },
  {
    q: "I prefer to handle tasks by...",
    options: [
      "Finishing one thing completely before moving to the next",
      "Working on several things at once and keeping my options open",
    ],
    dims: ["J", "P"],
  },
  {
    q: "When plans change unexpectedly, I...",
    options: [
      "Feel frustrated and prefer to get back on track quickly",
      "See it as an opportunity and adapt easily",
    ],
    dims: ["J", "P"],
  },
  {
    q: "In my personal life, I tend to...",
    options: [
      "Plan activities and trips well in advance",
      "Decide things in the moment and stay spontaneous",
    ],
    dims: ["J", "P"],
  },
];

/**
 * Generate survey variables for the MBTI template.
 */
export function getMbtiSurveyVariables() {
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
 * Map an MBTI dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"): string {
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
  return map[dim];
}
