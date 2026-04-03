import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * EIQ (Emotional Intelligence Quotient) Assessment Template
 *
 * 30 Likert-scale questions measuring emotional intelligence across five
 * dimensions based on the Goleman EI framework. Each question is rated 1-5
 * (Strongly Disagree to Strongly Agree), with 6 questions per dimension.
 */

// Variable IDs for survey variables
const VAR_SA = "eiq_sa";
const VAR_SR = "eiq_sr";
const VAR_MOT = "eiq_mot";
const VAR_EMP = "eiq_emp";
const VAR_SS = "eiq_ss";

export const EIQ_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "SA",
    name: "Self-Awareness",
    description:
      "The ability to recognize and understand your own emotions, strengths, weaknesses, and their impact on others",
    variableId: VAR_SA,
    minScore: 0,
    maxScore: 30,
    color: "#3B82F6",
    icon: "eye",
  },
  {
    id: createId(),
    key: "SR",
    name: "Self-Regulation",
    description:
      "The ability to manage disruptive emotions and impulses, maintaining composure and adaptability",
    variableId: VAR_SR,
    minScore: 0,
    maxScore: 30,
    color: "#10B981",
    icon: "shield",
  },
  {
    id: createId(),
    key: "MOT",
    name: "Motivation",
    description: "An inner drive to pursue goals with energy and persistence beyond external rewards",
    variableId: VAR_MOT,
    minScore: 0,
    maxScore: 30,
    color: "#F59E0B",
    icon: "zap",
  },
  {
    id: createId(),
    key: "EMP",
    name: "Empathy",
    description: "The ability to understand and share the feelings of others, recognizing emotional cues",
    variableId: VAR_EMP,
    minScore: 0,
    maxScore: 30,
    color: "#EC4899",
    icon: "heart",
  },
  {
    id: createId(),
    key: "SS",
    name: "Social Skills",
    description:
      "Proficiency in managing relationships, building networks, and navigating social situations effectively",
    variableId: VAR_SS,
    minScore: 0,
    maxScore: 30,
    color: "#8B5CF6",
    icon: "users",
  },
];

export const EIQ_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "SA",
    ranges: [
      {
        min: 0,
        max: 10,
        label: "Developing",
        description:
          "You are still building awareness of your emotional landscape. You may find it challenging to pinpoint exactly what you are feeling or why. Growing in this area will strengthen every other dimension of emotional intelligence.",
        strengths: [
          "Open to learning about yourself",
          "Willing to receive input from others",
          "Potential for significant growth",
        ],
        blindSpots: [
          "May be caught off guard by emotional reactions",
          "Could overlook how your mood affects colleagues",
        ],
        recommendations: [
          "Keep a daily emotion journal noting what you feel and why",
          "Ask a trusted colleague for candid feedback on your presence in meetings",
        ],
      },
      {
        min: 11,
        max: 20,
        label: "Moderate",
        description:
          "You have a reasonable grasp of your emotions and their origins. In familiar situations you read yourself well, but novel or high-stakes scenarios may still surprise you. Continued practice will deepen your insight.",
        strengths: [
          "Generally aware of your emotional state",
          "Can reflect on your behaviour after the fact",
          "Receptive to feedback",
        ],
        blindSpots: [
          "May miss subtle emotional shifts under stress",
          "Could underestimate the impact of your mood on others",
        ],
        recommendations: [
          "Pause before responding in tense moments to check in with yourself",
          "Solicit 360-degree feedback periodically to identify blind spots",
        ],
      },
      {
        min: 21,
        max: 30,
        label: "Strong",
        description:
          "You possess a keen understanding of your emotions, triggers, and behavioural patterns. You accurately assess how your feelings influence your decisions and relationships, which serves as a solid foundation for emotional intelligence.",
        strengths: [
          "Accurate self-assessment",
          "Recognizes emotional triggers early",
          "Understands personal impact on others",
        ],
        blindSpots: ["May become overly self-analytical", "Could set unrealistically high self-standards"],
        recommendations: [
          "Mentor others in developing their self-awareness",
          "Channel your insight into coaching conversations with your team",
        ],
      },
    ],
  },
  {
    dimensionKey: "SR",
    ranges: [
      {
        min: 0,
        max: 10,
        label: "Developing",
        description:
          "Managing strong emotions is an area of growth for you. Stress or frustration may lead to impulsive reactions that you later regret. Building regulation skills will improve both your decision-making and your relationships.",
        strengths: ["Authentic emotional expression", "Passionate engagement", "Honest reactions"],
        blindSpots: ["Reactions may escalate conflict", "Impulsive decisions under pressure"],
        recommendations: [
          "Practice a three-breath pause before responding to stressful triggers",
          "Identify your top three stress signals and create a personal de-escalation plan",
        ],
      },
      {
        min: 11,
        max: 20,
        label: "Moderate",
        description:
          "You generally manage your emotions well in day-to-day situations. Intense or prolonged stress may still test your composure. With deliberate practice you can strengthen your consistency under pressure.",
        strengths: [
          "Maintains composure in routine situations",
          "Recovers from setbacks reasonably well",
          "Adapts to moderate change",
        ],
        blindSpots: [
          "Prolonged pressure may erode self-control",
          "May suppress rather than process difficult emotions",
        ],
        recommendations: [
          "Develop a stress management routine such as regular exercise or mindfulness",
          "Reflect on recent high-pressure moments to identify improvement areas",
        ],
      },
      {
        min: 21,
        max: 30,
        label: "Strong",
        description:
          "You excel at managing your emotions and maintaining composure even in challenging circumstances. You think before you act, hold yourself accountable, and adapt smoothly to change, creating stability for those around you.",
        strengths: [
          "Stays calm under pressure",
          "Models emotional discipline for others",
          "Adapts readily to change",
        ],
        blindSpots: [
          "May appear detached or unemotional to colleagues",
          "Could suppress feelings rather than expressing them constructively",
        ],
        recommendations: [
          "Share your self-regulation strategies with your team",
          "Ensure you still express authentic emotion so others feel safe doing the same",
        ],
      },
    ],
  },
  {
    dimensionKey: "MOT",
    ranges: [
      {
        min: 0,
        max: 10,
        label: "Developing",
        description:
          "Your intrinsic drive is still forming. You may rely heavily on external incentives and find it difficult to sustain effort when rewards are not immediate. Connecting your work to personal values can reignite your motivation.",
        strengths: [
          "Responsive to clear incentives",
          "Can be energised by the right environment",
          "Practical about effort allocation",
        ],
        blindSpots: [
          "May disengage when external rewards are absent",
          "Could struggle with long-term goal persistence",
        ],
        recommendations: [
          "Identify three personal values and connect each to a current work goal",
          "Break large objectives into smaller milestones to create a sense of progress",
        ],
      },
      {
        min: 11,
        max: 20,
        label: "Moderate",
        description:
          "You maintain a healthy level of drive and can push through many obstacles. At times, setbacks or ambiguity may dampen your momentum. Strengthening your connection to purpose will sustain you through tougher periods.",
        strengths: [
          "Goal-oriented in most situations",
          "Recovers from setbacks with support",
          "Balances ambition with realism",
        ],
        blindSpots: ["Extended adversity can sap energy", "May deprioritise personal development when busy"],
        recommendations: [
          "Schedule regular goal-review sessions to track progress and recalibrate",
          "Find an accountability partner who shares your professional aspirations",
        ],
      },
      {
        min: 21,
        max: 30,
        label: "Strong",
        description:
          "You are highly self-motivated with a deep internal drive to achieve and improve. You pursue goals with persistence and optimism, viewing setbacks as learning opportunities rather than failures.",
        strengths: [
          "Persistent and resilient",
          "Intrinsically driven to improve",
          "Maintains optimism through adversity",
        ],
        blindSpots: [
          "May push too hard and risk burnout",
          "High standards could frustrate less driven colleagues",
        ],
        recommendations: [
          "Model healthy ambition by openly balancing drive with recovery",
          "Help colleagues find their own intrinsic motivators through coaching",
        ],
      },
    ],
  },
  {
    dimensionKey: "EMP",
    ranges: [
      {
        min: 0,
        max: 10,
        label: "Developing",
        description:
          "Reading and responding to others' emotions is an area for growth. You may focus more on tasks than on the people doing them. Building empathy will strengthen your relationships and your ability to lead.",
        strengths: ["Objective perspective", "Focused on outcomes", "Direct communication style"],
        blindSpots: [
          "May miss emotional cues from colleagues",
          "Could be perceived as insensitive or dismissive",
        ],
        recommendations: [
          "Practice active listening by summarising what others say before responding",
          "In your next three meetings, observe body language and tone as much as content",
        ],
      },
      {
        min: 11,
        max: 20,
        label: "Moderate",
        description:
          "You generally pick up on others' feelings and show genuine concern. In complex or unfamiliar interpersonal situations you may miss subtleties. Continued practice will sharpen your emotional radar.",
        strengths: [
          "Attuned to familiar colleagues' emotions",
          "Shows caring in one-on-one settings",
          "Values diverse perspectives",
        ],
        blindSpots: [
          "May miss subtle cues in cross-cultural interactions",
          "Could default to problem-solving when empathy is what is needed",
        ],
        recommendations: [
          "Ask open-ended questions about how people feel rather than jumping to solutions",
          "Seek out perspectives from people whose backgrounds differ from yours",
        ],
      },
      {
        min: 21,
        max: 30,
        label: "Strong",
        description:
          "You have a well-developed ability to understand and share the feelings of others. You notice unspoken emotions, respect differences, and create an environment where people feel heard and valued.",
        strengths: [
          "Highly attuned to emotional cues",
          "Creates psychological safety",
          "Skilled at perspective-taking",
        ],
        blindSpots: [
          "May absorb others' stress and become emotionally drained",
          "Could prioritise harmony over necessary candour",
        ],
        recommendations: [
          "Set emotional boundaries to protect your own well-being",
          "Use your empathy to deliver difficult feedback with both honesty and compassion",
        ],
      },
    ],
  },
  {
    dimensionKey: "SS",
    ranges: [
      {
        min: 0,
        max: 10,
        label: "Developing",
        description:
          "Building and managing relationships is an area of growth for you. You may find it challenging to navigate complex social dynamics or influence others without formal authority. Focused skill-building will pay significant dividends.",
        strengths: ["Independent worker", "Straightforward communicator", "Does not rely on politics"],
        blindSpots: [
          "May struggle to build coalition support for ideas",
          "Could come across as aloof in team settings",
        ],
        recommendations: [
          "Practice one new networking behaviour each week such as initiating a conversation with a colleague you do not know well",
          "Observe a socially skilled colleague and note specific behaviours you could adopt",
        ],
      },
      {
        min: 11,
        max: 20,
        label: "Moderate",
        description:
          "You maintain good working relationships and can collaborate effectively in most settings. High-stakes negotiations or large-group facilitation may stretch your comfort zone. Targeted development will round out your social toolkit.",
        strengths: [
          "Collaborates well in familiar settings",
          "Communicates clearly",
          "Manages routine conflict constructively",
        ],
        blindSpots: [
          "May avoid high-stakes influence situations",
          "Could under-invest in broader network building",
        ],
        recommendations: [
          "Volunteer to facilitate a team meeting to practise group dynamics skills",
          "Seek a mentor who excels at stakeholder management",
        ],
      },
      {
        min: 21,
        max: 30,
        label: "Strong",
        description:
          "You excel at building relationships, communicating persuasively, and navigating complex social environments. You bring out the best in others and create a collaborative atmosphere wherever you work.",
        strengths: [
          "Builds rapport quickly",
          "Resolves conflict constructively",
          "Influences through trust and credibility",
        ],
        blindSpots: [
          "May over-invest in relationship maintenance at the expense of task focus",
          "Could be perceived as overly political",
        ],
        recommendations: [
          "Channel your social skills into mentoring and developing others",
          "Balance relationship building with clear accountability for results",
        ],
      },
    ],
  },
];

export const EIQ_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Emotional Intelligence Assessment Report",
  subtitle: "Understanding your EQ strengths and growth areas",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#3B82F6",
    accent: "#EC4899",
  },
};

export const EIQ_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "variableSum",
  normalizeToPercentage: true,
};

export const EIQ_QUESTIONS = [
  // Self-Awareness (SA)
  { q: "I can accurately identify my emotions as I experience them.", dim: "SA" },
  { q: "I understand how my feelings affect my performance at work.", dim: "SA" },
  { q: "I recognize my strengths and limitations honestly.", dim: "SA" },
  { q: "I am aware of how my mood influences my interactions with others.", dim: "SA" },
  { q: "I can describe why I feel a certain way in most situations.", dim: "SA" },
  { q: "I seek feedback from others to better understand my impact.", dim: "SA" },

  // Self-Regulation (SR)
  { q: "I stay calm under pressure and manage stress effectively.", dim: "SR" },
  { q: "I think before acting when I feel frustrated or angry.", dim: "SR" },
  { q: "I can adapt quickly when circumstances change unexpectedly.", dim: "SR" },
  { q: "I hold myself accountable for my mistakes rather than blaming others.", dim: "SR" },
  { q: "I manage disruptive impulses and keep them from interfering with my work.", dim: "SR" },
  { q: "I remain composed and positive even during difficult conversations.", dim: "SR" },

  // Motivation (MOT)
  { q: "I set challenging goals for myself and work hard to achieve them.", dim: "MOT" },
  { q: "I remain optimistic even when facing setbacks or obstacles.", dim: "MOT" },
  { q: "I am driven by a desire to improve and excel, not just external rewards.", dim: "MOT" },
  { q: "I persist in pursuing my goals even when progress is slow.", dim: "MOT" },
  { q: "I take initiative and act on opportunities without being asked.", dim: "MOT" },
  { q: "I align my daily efforts with my long-term professional aspirations.", dim: "MOT" },

  // Empathy (EMP)
  { q: "I can sense how others are feeling even when they do not say it directly.", dim: "EMP" },
  { q: "I consider others' perspectives before making decisions that affect them.", dim: "EMP" },
  { q: "I listen attentively without interrupting when someone shares a concern.", dim: "EMP" },
  { q: "I recognize and respect cultural and individual differences in the workplace.", dim: "EMP" },
  { q: "I pick up on unspoken tensions or dynamics within a group.", dim: "EMP" },
  { q: "I show genuine interest in the well-being of my colleagues.", dim: "EMP" },

  // Social Skills (SS)
  { q: "I can resolve conflicts effectively by finding common ground.", dim: "SS" },
  { q: "I build rapport easily with different types of people.", dim: "SS" },
  { q: "I communicate my ideas clearly and persuasively.", dim: "SS" },
  { q: "I collaborate well and contribute to a positive team environment.", dim: "SS" },
  { q: "I can influence others without resorting to pressure or authority.", dim: "SS" },
  { q: "I give constructive feedback that others can receive openly.", dim: "SS" },
];

/**
 * Generate survey variables for the EIQ template.
 */
export function getEiqSurveyVariables() {
  return [
    { id: VAR_SA, name: "eiq_sa", type: "number" as const, value: 0 },
    { id: VAR_SR, name: "eiq_sr", type: "number" as const, value: 0 },
    { id: VAR_MOT, name: "eiq_mot", type: "number" as const, value: 0 },
    { id: VAR_EMP, name: "eiq_emp", type: "number" as const, value: 0 },
    { id: VAR_SS, name: "eiq_ss", type: "number" as const, value: 0 },
  ];
}

/**
 * Map an EIQ dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "SA" | "SR" | "MOT" | "EMP" | "SS"): string {
  const map: Record<string, string> = { SA: VAR_SA, SR: VAR_SR, MOT: VAR_MOT, EMP: VAR_EMP, SS: VAR_SS };
  return map[dim];
}

export const EIQ_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "custom",
  dimensions: EIQ_DIMENSIONS,
  interpretations: EIQ_INTERPRETATIONS,
  reportConfig: EIQ_REPORT_CONFIG,
  scoringRules: EIQ_SCORING_RULES,
};
