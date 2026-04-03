import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Big Five (OCEAN) Personality Assessment Template
 *
 * 50 Likert-scale questions (10 per dimension) measuring the Big Five personality
 * traits. Uses normative scoring with a 1-5 scale. Reverse-scored items are
 * marked in the QUESTIONS array and should be inverted (6 - rating) before
 * adding to the dimension variable.
 */

// Variable IDs for survey variables
const VAR_O = "bf_openness";
const VAR_C = "bf_conscientiousness";
const VAR_E = "bf_extraversion";
const VAR_A = "bf_agreeableness";
const VAR_N = "bf_neuroticism";

export const BIG_FIVE_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "O",
    name: "Openness",
    description:
      "Openness to experience reflects intellectual curiosity, creativity, and a preference for novelty and variety.",
    variableId: VAR_O,
    minScore: 0,
    maxScore: 50,
    color: "#8B5CF6",
    icon: "lightbulb",
  },
  {
    id: createId(),
    key: "C",
    name: "Conscientiousness",
    description:
      "Conscientiousness reflects self-discipline, orderliness, and a drive to achieve goals through planned rather than spontaneous behaviour.",
    variableId: VAR_C,
    minScore: 0,
    maxScore: 50,
    color: "#10B981",
    icon: "target",
  },
  {
    id: createId(),
    key: "E",
    name: "Extraversion",
    description:
      "Extraversion reflects sociability, assertiveness, positive emotionality, and a tendency to seek stimulation in the company of others.",
    variableId: VAR_E,
    minScore: 0,
    maxScore: 50,
    color: "#F59E0B",
    icon: "sun",
  },
  {
    id: createId(),
    key: "A",
    name: "Agreeableness",
    description:
      "Agreeableness reflects a tendency to be compassionate, cooperative, trusting, and considerate towards others.",
    variableId: VAR_A,
    minScore: 0,
    maxScore: 50,
    color: "#3B82F6",
    icon: "heart",
  },
  {
    id: createId(),
    key: "N",
    name: "Neuroticism",
    description:
      "Neuroticism reflects emotional instability, proneness to stress, anxiety, and vulnerability to negative emotions.",
    variableId: VAR_N,
    minScore: 0,
    maxScore: 50,
    color: "#EF4444",
    icon: "alertTriangle",
  },
];

export const BIG_FIVE_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  // ── Openness ──────────────────────────────────────────────────────────────
  {
    dimensionKey: "O",
    ranges: [
      {
        min: 0,
        max: 16,
        label: "Low Openness",
        description:
          "You prefer familiar routines, practical solutions, and concrete thinking over abstract ideas. You value tradition and tend to be pragmatic in your approach to work and life. Your grounded perspective helps you stay focused on proven methods and deliver consistent, reliable results.",
        strengths: ["Practical and grounded", "Consistent and reliable", "Focused on proven methods"],
        blindSpots: ["May resist innovation or new approaches", "Could miss creative solutions to problems"],
        recommendations: [
          "Challenge yourself to try one new approach each month",
          "Seek out colleagues with different perspectives for brainstorming",
          "Set aside time for creative exploration without pressure for immediate results",
        ],
      },
      {
        min: 17,
        max: 33,
        label: "Moderate Openness",
        description:
          "You balance curiosity with practicality, appreciating new ideas while also valuing proven approaches. You are willing to explore creative solutions when the situation calls for it but remain grounded enough to evaluate their feasibility. This balanced approach allows you to bridge traditional and innovative thinking within your team.",
        strengths: [
          "Balanced perspective on innovation and tradition",
          "Adaptable thinking style",
          "Good at evaluating new ideas practically",
        ],
        blindSpots: [
          "May sometimes hesitate between exploring and sticking with the known",
          "Could underestimate the value of bold creative leaps",
        ],
        recommendations: [
          "Lean into your curiosity when you notice yourself defaulting to the familiar",
          "Volunteer for cross-functional projects that expose you to new domains",
        ],
      },
      {
        min: 34,
        max: 50,
        label: "High Openness",
        description:
          "You are intellectually curious, imaginative, and drawn to novel experiences and ideas. You thrive in environments that encourage creativity, experimentation, and unconventional thinking. You are often the one to challenge assumptions and introduce fresh perspectives, making you a natural catalyst for innovation.",
        strengths: [
          "Highly creative and imaginative",
          "Strong intellectual curiosity",
          "Comfortable with ambiguity and complexity",
        ],
        blindSpots: [
          "May overcomplicate straightforward tasks",
          "Could lose interest in routine but necessary work",
        ],
        recommendations: [
          "Pair your creative ideas with practical implementation plans",
          "Find a detail-oriented partner to help ground your visions",
          "Schedule dedicated time for routine tasks to ensure follow-through",
        ],
      },
    ],
  },

  // ── Conscientiousness ─────────────────────────────────────────────────────
  {
    dimensionKey: "C",
    ranges: [
      {
        min: 0,
        max: 16,
        label: "Low Conscientiousness",
        description:
          "You are flexible, spontaneous, and comfortable with ambiguity. You adapt quickly to changing circumstances and prefer not to be constrained by rigid plans or structures. While you may sometimes struggle with follow-through, your adaptability is a genuine asset in fast-moving environments.",
        strengths: [
          "Flexible and adaptable",
          "Comfortable with change and ambiguity",
          "Quick to pivot when circumstances shift",
        ],
        blindSpots: [
          "May struggle to meet deadlines consistently",
          "Could be perceived as unreliable by structured colleagues",
        ],
        recommendations: [
          "Use simple checklists or task management tools to track commitments",
          "Break large goals into smaller milestones with clear due dates",
          "Partner with highly organised colleagues on critical projects",
        ],
      },
      {
        min: 17,
        max: 33,
        label: "Moderate Conscientiousness",
        description:
          "You strike a healthy balance between structure and flexibility. You can plan ahead and follow through on commitments while remaining adaptable when plans need to change. You know when to be meticulous and when good enough is sufficient, allowing you to manage your energy across competing demands effectively.",
        strengths: [
          "Balanced approach to planning and flexibility",
          "Good at prioritising effort",
          "Reliable without being rigid",
        ],
        blindSpots: [
          "May inconsistently apply structure across projects",
          "Could sometimes under-prepare for complex tasks",
        ],
        recommendations: [
          "Identify which projects require tight structure versus a lighter touch",
          "Build consistent daily habits for your most important responsibilities",
        ],
      },
      {
        min: 34,
        max: 50,
        label: "High Conscientiousness",
        description:
          "You are highly organised, disciplined, and goal-oriented. You set clear objectives, plan meticulously, and follow through on every commitment. Your strong work ethic and attention to detail make you someone others rely on for consistent, high-quality output. You hold yourself and often others to high standards.",
        strengths: [
          "Exceptionally organised and reliable",
          "Strong work ethic and self-discipline",
          "Detail-oriented and thorough",
        ],
        blindSpots: [
          "May tend towards perfectionism that delays delivery",
          "Could be inflexible when plans need to change",
        ],
        recommendations: [
          "Set explicit good-enough thresholds for lower-priority tasks",
          "Practice delegating without micromanaging the details",
          "Schedule unstructured time to recharge and foster creativity",
        ],
      },
    ],
  },

  // ── Extraversion ──────────────────────────────────────────────────────────
  {
    dimensionKey: "E",
    ranges: [
      {
        min: 0,
        max: 16,
        label: "Low Extraversion",
        description:
          "You are reflective, reserved, and energised by solitude or small-group interactions. You prefer deep one-on-one conversations over large social gatherings and do your best thinking in quiet environments. Your thoughtful nature means you often contribute considered, high-quality insights when you do speak up.",
        strengths: ["Thoughtful and reflective", "Strong listener", "Focused and independent worker"],
        blindSpots: [
          "May be overlooked in group settings",
          "Could miss opportunities to build a broader network",
        ],
        recommendations: [
          "Prepare talking points before meetings to ensure your voice is heard",
          "Schedule regular one-on-one check-ins to build key relationships",
          "Experiment with sharing ideas in writing if speaking up feels uncomfortable",
        ],
      },
      {
        min: 17,
        max: 33,
        label: "Moderate Extraversion",
        description:
          "You are comfortable in both social and solitary settings, adapting your energy to the situation at hand. You enjoy connecting with others but also need quiet time to recharge and reflect. This versatility makes you effective across a wide range of team dynamics and work environments.",
        strengths: [
          "Adaptable social style",
          "Comfortable in diverse settings",
          "Good balance of talking and listening",
        ],
        blindSpots: [
          "May sometimes struggle to identify whether to engage or withdraw",
          "Could underplay your social strengths in certain contexts",
        ],
        recommendations: [
          "Pay attention to your energy levels and honour your need for both connection and solitude",
          "Use your adaptability to bridge introverted and extraverted team members",
        ],
      },
      {
        min: 34,
        max: 50,
        label: "High Extraversion",
        description:
          "You are outgoing, energetic, and thrive in the company of others. You draw energy from social interaction and are often the person who brings enthusiasm and momentum to a group. Your natural sociability makes you well-suited for roles that require relationship-building, collaboration, and public-facing communication.",
        strengths: [
          "Energetic and enthusiastic",
          "Natural relationship builder",
          "Effective communicator in group settings",
        ],
        blindSpots: [
          "May dominate conversations or overlook quieter colleagues",
          "Could struggle with tasks that require extended solitary focus",
        ],
        recommendations: [
          "Practice active listening and invite quieter team members to share their views",
          "Block focused work time without social interruptions",
          "Channel your social energy into mentoring and team-building activities",
        ],
      },
    ],
  },

  // ── Agreeableness ─────────────────────────────────────────────────────────
  {
    dimensionKey: "A",
    ranges: [
      {
        min: 0,
        max: 16,
        label: "Low Agreeableness",
        description:
          "You are direct, sceptical, and prioritise truth over diplomacy. You are comfortable challenging ideas and pushing back when you disagree, which makes you effective in roles requiring tough negotiations and critical evaluation. You trust evidence more than people and value competence above harmony.",
        strengths: [
          "Direct and honest communicator",
          "Effective critical thinker",
          "Comfortable with healthy conflict",
        ],
        blindSpots: [
          "May come across as abrasive or dismissive",
          "Could damage relationships by prioritising being right over being kind",
        ],
        recommendations: [
          "Pair direct feedback with genuine acknowledgement of others' contributions",
          "Practice empathic listening before offering critiques",
          "Consider the relationship impact alongside the logical merits of your position",
        ],
      },
      {
        min: 17,
        max: 33,
        label: "Moderate Agreeableness",
        description:
          "You balance warmth with healthy assertiveness. You care about others' feelings but are willing to speak up when something is not right. You can collaborate effectively while maintaining your own perspective, which makes you a valuable team member who contributes without creating unnecessary friction.",
        strengths: [
          "Balanced between cooperation and assertiveness",
          "Good at giving constructive feedback",
          "Maintains healthy professional boundaries",
        ],
        blindSpots: [
          "May occasionally send mixed signals about where you stand",
          "Could waver between accommodating and pushing back",
        ],
        recommendations: [
          "Be intentional about when to accommodate and when to advocate for your position",
          "Develop a consistent framework for giving and receiving feedback",
        ],
      },
      {
        min: 34,
        max: 50,
        label: "High Agreeableness",
        description:
          "You are compassionate, trusting, and deeply attuned to the needs and feelings of those around you. You excel at creating harmonious environments and building strong, trust-based relationships. Your cooperative nature makes you a natural mediator and a valued collaborator on any team.",
        strengths: [
          "Compassionate and empathetic",
          "Builds strong trust-based relationships",
          "Natural mediator and peacemaker",
        ],
        blindSpots: [
          "May avoid necessary confrontation to preserve harmony",
          "Could be taken advantage of by less scrupulous colleagues",
        ],
        recommendations: [
          "Practice saying no when requests conflict with your priorities",
          "Recognise that constructive conflict can strengthen rather than weaken relationships",
          "Set clear boundaries to protect your time and energy",
        ],
      },
    ],
  },

  // ── Neuroticism ──────────────────────────────────────────────────────────
  {
    dimensionKey: "N",
    ranges: [
      {
        min: 0,
        max: 16,
        label: "Low Neuroticism",
        description:
          "You are emotionally stable, calm, and resilient under pressure. You rarely feel overwhelmed by stress and recover quickly from setbacks. Your steady temperament provides a stabilising influence on those around you and helps you maintain clear thinking in high-pressure situations.",
        strengths: ["Emotionally resilient", "Calm under pressure", "Provides stability to the team"],
        blindSpots: [
          "May underestimate the emotional impact of events on others",
          "Could appear detached or unsympathetic in emotionally charged situations",
        ],
        recommendations: [
          "Check in proactively with colleagues who may be struggling",
          "Acknowledge that emotional reactions are valid even when you do not share them",
        ],
      },
      {
        min: 17,
        max: 33,
        label: "Moderate Neuroticism",
        description:
          "You experience a normal range of emotional reactions, feeling stress and worry at times but generally managing them effectively. You are attuned to potential problems, which helps you anticipate risks, while still maintaining enough composure to function well under pressure most of the time.",
        strengths: ["Balanced emotional awareness", "Good at anticipating risks", "Relatable and empathetic"],
        blindSpots: [
          "May occasionally let worry interfere with decision-making",
          "Could be more affected by setbacks than you realise",
        ],
        recommendations: [
          "Develop a personal stress-management toolkit such as exercise, journalling, or mindfulness",
          "Distinguish between productive worry that prompts action and unproductive rumination",
          "Seek feedback from trusted colleagues on how you present under pressure",
        ],
      },
      {
        min: 34,
        max: 50,
        label: "High Neuroticism",
        description:
          "You are highly sensitive to stress and tend to experience strong emotional reactions to challenges and setbacks. While this can feel overwhelming, your sensitivity also makes you exceptionally perceptive about potential risks and problems that others might overlook. You care deeply, and that intensity is both your challenge and your strength.",
        strengths: [
          "Highly perceptive about risks and problems",
          "Deeply empathetic and caring",
          "Vigilant and detail-aware under pressure",
        ],
        blindSpots: [
          "May become paralysed by anxiety or self-doubt",
          "Could project negative expectations onto neutral situations",
        ],
        recommendations: [
          "Build a consistent self-care routine including physical activity and recovery time",
          "Practice cognitive reframing techniques to challenge catastrophic thinking",
          "Work with a mentor or coach to develop emotional regulation strategies",
        ],
      },
    ],
  },
];

export const BIG_FIVE_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Big Five Personality Assessment Report",
  subtitle: "Your OCEAN personality profile",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
  },
};

export const BIG_FIVE_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "normative",
  normalizeToPercentage: true,
};

export const BIG_FIVE_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "bigFive",
  dimensions: BIG_FIVE_DIMENSIONS,
  interpretations: BIG_FIVE_INTERPRETATIONS,
  reportConfig: BIG_FIVE_REPORT_CONFIG,
  scoringRules: BIG_FIVE_SCORING_RULES,
};

/**
 * Big Five survey questions.
 *
 * Each question is a Likert-scale rating (1-5, Strongly Disagree to Strongly Agree).
 * The `dim` field indicates which OCEAN dimension the question measures.
 * Items marked `reversed: true` should be inverted (6 - rating) before adding
 * to the dimension variable.
 */
export const BIG_FIVE_QUESTIONS = [
  // Openness
  { q: "I enjoy trying new and different activities", dim: "O" },
  { q: "I am curious about many different things", dim: "O" },
  { q: "I have a vivid imagination", dim: "O" },
  { q: "I enjoy thinking about abstract concepts and theories", dim: "O" },
  { q: "I appreciate art, music, and creative expression", dim: "O" },
  { q: "I often look for deeper meaning in everyday events", dim: "O" },
  { q: "I prefer routine over variety", dim: "O", reversed: true },
  { q: "I tend to stick with what I know rather than explore new ideas", dim: "O", reversed: true },
  { q: "I am open to reconsidering my values and beliefs", dim: "O" },
  { q: "I find it difficult to imagine things that are not real", dim: "O", reversed: true },

  // Conscientiousness
  { q: "I am always prepared", dim: "C" },
  { q: "I pay attention to details", dim: "C" },
  { q: "I follow through on my commitments", dim: "C" },
  { q: "I keep my workspace organised", dim: "C" },
  { q: "I set clear goals and work systematically towards them", dim: "C" },
  { q: "I think carefully before making decisions", dim: "C" },
  { q: "I tend to leave things unfinished", dim: "C", reversed: true },
  { q: "I often forget to put things back in their proper place", dim: "C", reversed: true },
  { q: "I find it hard to get down to work on time", dim: "C", reversed: true },
  { q: "I take my responsibilities seriously", dim: "C" },

  // Extraversion
  { q: "I feel energised by being around people", dim: "E" },
  { q: "I am the life of the party", dim: "E" },
  { q: "I enjoy being the centre of attention", dim: "E" },
  { q: "I find it easy to start conversations with strangers", dim: "E" },
  { q: "I feel comfortable in large social gatherings", dim: "E" },
  { q: "I am enthusiastic and expressive when talking to others", dim: "E" },
  { q: "I prefer to keep to myself", dim: "E", reversed: true },
  { q: "I find it draining to spend long periods around others", dim: "E", reversed: true },
  { q: "I tend to stay in the background at social events", dim: "E", reversed: true },
  { q: "I actively seek out new social experiences", dim: "E" },

  // Agreeableness
  { q: "I take time to help others", dim: "A" },
  { q: "I trust people easily", dim: "A" },
  { q: "I am considerate of others' feelings", dim: "A" },
  { q: "I try to see the best in people", dim: "A" },
  { q: "I am willing to compromise to keep the peace", dim: "A" },
  { q: "I cooperate well with others even when I disagree", dim: "A" },
  { q: "I tend to find fault with others", dim: "A", reversed: true },
  { q: "I can be blunt and insensitive without realising it", dim: "A", reversed: true },
  { q: "I suspect hidden motives in people I work with", dim: "A", reversed: true },
  { q: "I go out of my way to make people feel welcome", dim: "A" },

  // Neuroticism
  { q: "I get stressed easily", dim: "N" },
  { q: "I worry about things", dim: "N" },
  { q: "I am easily disturbed", dim: "N" },
  { q: "I experience frequent mood swings", dim: "N" },
  { q: "I often feel overwhelmed by my responsibilities", dim: "N" },
  { q: "I dwell on things that have gone wrong", dim: "N" },
  { q: "I rarely feel anxious", dim: "N", reversed: true },
  { q: "I stay calm under pressure", dim: "N", reversed: true },
  { q: "I bounce back quickly from setbacks", dim: "N", reversed: true },
  { q: "I tend to take things personally", dim: "N" },
];

/**
 * Generate survey variables for the Big Five template.
 */
export function getBigFiveSurveyVariables() {
  return [
    { id: VAR_O, name: "bf_openness", type: "number" as const, value: 0 },
    { id: VAR_C, name: "bf_conscientiousness", type: "number" as const, value: 0 },
    { id: VAR_E, name: "bf_extraversion", type: "number" as const, value: 0 },
    { id: VAR_A, name: "bf_agreeableness", type: "number" as const, value: 0 },
    { id: VAR_N, name: "bf_neuroticism", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a Big Five dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "O" | "C" | "E" | "A" | "N"): string {
  const map: Record<string, string> = { O: VAR_O, C: VAR_C, E: VAR_E, A: VAR_A, N: VAR_N };
  return map[dim];
}
