import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * Motivators Assessment Template
 *
 * 30 Likert-scale questions measuring six core workplace motivators.
 * Each question is rated 1-5 (Not at all like me to Very much like me),
 * with 5 questions per dimension.
 */

// Variable IDs for survey variables
const VAR_ACH = "mot_ach";
const VAR_AFF = "mot_aff";
const VAR_POW = "mot_pow";
const VAR_AUT = "mot_aut";
const VAR_MAS = "mot_mas";
const VAR_PUR = "mot_pur";

export const MOTIVATORS_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "ACH",
    name: "Achievement",
    description:
      "Drive to set and surpass challenging goals, measuring progress and excelling at difficult tasks",
    variableId: VAR_ACH,
    minScore: 0,
    maxScore: 25,
    color: "#EF4444",
    icon: "trophy",
  },
  {
    id: createId(),
    key: "AFF",
    name: "Affiliation",
    description:
      "Need for strong interpersonal connections, belonging, and collaborative working relationships",
    variableId: VAR_AFF,
    minScore: 0,
    maxScore: 25,
    color: "#F59E0B",
    icon: "heart",
  },
  {
    id: createId(),
    key: "POW",
    name: "Power",
    description:
      "Desire to influence, lead, and shape decisions that affect the direction of teams and projects",
    variableId: VAR_POW,
    minScore: 0,
    maxScore: 25,
    color: "#8B5CF6",
    icon: "zap",
  },
  {
    id: createId(),
    key: "AUT",
    name: "Autonomy",
    description:
      "Preference for independence, flexibility, and control over how work is approached and completed",
    variableId: VAR_AUT,
    minScore: 0,
    maxScore: 25,
    color: "#3B82F6",
    icon: "compass",
  },
  {
    id: createId(),
    key: "MAS",
    name: "Mastery",
    description: "Passion for continuous learning, skill development, and the pursuit of deep expertise",
    variableId: VAR_MAS,
    minScore: 0,
    maxScore: 25,
    color: "#10B981",
    icon: "target",
  },
  {
    id: createId(),
    key: "PUR",
    name: "Purpose",
    description: "Need for meaningful work that aligns with personal values and creates a positive impact",
    variableId: VAR_PUR,
    minScore: 0,
    maxScore: 25,
    color: "#EC4899",
    icon: "sun",
  },
];

export const MOTIVATORS_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "ACH",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "Achievement is not a primary motivator for you right now. You may prefer steady, predictable work over competitive goal-chasing. This does not mean you lack ambition; other motivators may be more central to your engagement.",
        strengths: [
          "Content with current performance levels",
          "Not driven by competition",
          "Values process as much as outcome",
        ],
        blindSpots: ["May be perceived as lacking ambition", "Could miss growth opportunities"],
        recommendations: [
          "Experiment with setting one stretch goal per quarter to see if it sparks engagement",
          "Identify what success looks like on your own terms",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You appreciate accomplishment and like to see results, but it is not your sole source of motivation. You balance goal pursuit with other priorities and can adapt your drive to the situation at hand.",
        strengths: [
          "Balanced approach to goals",
          "Can celebrate wins without being consumed by them",
          "Flexible about how success is defined",
        ],
        blindSpots: ["May not always push for stretch targets", "Could underplay achievements"],
        recommendations: [
          "Set specific, measurable goals for your top two priorities each quarter",
          "Share your achievements with your manager to ensure they are visible",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "You are highly driven by accomplishment. You set ambitious targets, track your progress rigorously, and derive deep satisfaction from overcoming challenges. Recognition for results matters to you.",
        strengths: ["Goal-oriented and persistent", "High personal standards", "Energised by challenge"],
        blindSpots: ["May struggle when goals are ambiguous", "Risk of burnout from relentless striving"],
        recommendations: [
          "Balance achievement goals with relationship and well-being goals",
          "Celebrate progress milestones, not just final outcomes",
        ],
      },
    ],
  },
  {
    dimensionKey: "AFF",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "Social connection is not a primary motivator for you at work. You are comfortable working independently and do not require close team bonds to stay engaged. You may prefer depth in a few relationships over breadth.",
        strengths: ["Self-sufficient", "Comfortable with solo work", "Not dependent on social validation"],
        blindSpots: [
          "May be perceived as aloof or disconnected",
          "Could miss valuable collaborative insights",
        ],
        recommendations: [
          "Schedule regular informal check-ins with key colleagues to maintain relationships",
          "Join one cross-functional initiative to broaden your network",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You value workplace relationships and enjoy collaboration, but you also appreciate time to work independently. You strike a healthy balance between social connection and focused solo work.",
        strengths: [
          "Flexible between teamwork and independent work",
          "Builds solid professional relationships",
          "Socially aware without being dependent",
        ],
        blindSpots: [
          "May not invest enough in relationship building during busy periods",
          "Could undervalue the power of networking",
        ],
        recommendations: [
          "Protect time for relationship building even during high-workload periods",
          "Actively participate in team social events to strengthen bonds",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "You are strongly motivated by connection, belonging, and teamwork. You thrive in collaborative environments and invest heavily in building positive working relationships. Team harmony matters deeply to you.",
        strengths: [
          "Excellent team builder",
          "Creates inclusive environments",
          "Strong interpersonal skills",
        ],
        blindSpots: [
          "May avoid conflict to preserve relationships",
          "Could struggle in isolated or highly competitive roles",
        ],
        recommendations: [
          "Practise giving honest feedback even when it feels uncomfortable",
          "Ensure your need for connection does not compromise decision quality",
        ],
      },
    ],
  },
  {
    dimensionKey: "POW",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "Influence and authority are not primary motivators for you. You are comfortable contributing without needing to be in charge. You may prefer to support others' leadership rather than lead yourself.",
        strengths: [
          "Collaborative and non-territorial",
          "Comfortable following skilled leaders",
          "Does not engage in power struggles",
        ],
        blindSpots: [
          "May not advocate strongly enough for your ideas",
          "Could be overlooked for leadership opportunities",
        ],
        recommendations: [
          "Practise voicing your opinion in meetings, even when others have authority",
          "Consider whether a small leadership role might reveal untapped strengths",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You appreciate having influence when it matters but do not need to be in control at all times. You can step into leadership when required and step back comfortably when others lead effectively.",
        strengths: [
          "Situational leadership ability",
          "Balanced approach to influence",
          "Able to both lead and follow",
        ],
        blindSpots: [
          "May hesitate to assert authority when it is needed",
          "Could send mixed signals about leadership interest",
        ],
        recommendations: [
          "Clarify your leadership aspirations with your manager",
          "Seek opportunities to lead cross-functional projects to test your interest",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "You are energised by leadership, influence, and the ability to shape outcomes. You actively seek positions of authority and feel most engaged when you can direct the course of projects and teams.",
        strengths: ["Decisive and action-oriented", "Natural leader", "Comfortable making tough calls"],
        blindSpots: ["May dominate discussions or override others", "Risk of being perceived as controlling"],
        recommendations: [
          "Balance directing with empowering others to lead",
          "Actively solicit input before making decisions to build buy-in",
        ],
      },
    ],
  },
  {
    dimensionKey: "AUT",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "You are comfortable with structure, guidance, and clear expectations. You do not need high levels of independence to be productive and may actually prefer having well-defined processes to follow.",
        strengths: [
          "Thrives in structured environments",
          "Comfortable with oversight",
          "Reliable in executing defined processes",
        ],
        blindSpots: [
          "May struggle when given ambiguous assignments",
          "Could resist taking ownership of unstructured work",
        ],
        recommendations: [
          "Gradually take on tasks with less defined parameters to build comfort with ambiguity",
          "Discuss your preference for clarity with your manager to ensure productive alignment",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You appreciate some freedom in how you work but also value having a framework to operate within. You balance independence with accountability and can adapt to varying levels of structure.",
        strengths: [
          "Adaptable to different work styles",
          "Can self-direct within boundaries",
          "Comfortable with reasonable oversight",
        ],
        blindSpots: [
          "May not always push for the flexibility you need",
          "Could default to seeking permission rather than taking initiative",
        ],
        recommendations: [
          "Negotiate for more autonomy in areas where you have proven competence",
          "Identify which aspects of your work benefit most from independence",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "Independence and flexibility are essential to your engagement. You work best when you can control your schedule, choose your methods, and operate with minimal oversight. Micromanagement is deeply demotivating for you.",
        strengths: ["Highly self-directed", "Creative problem solver", "Efficient without supervision"],
        blindSpots: [
          "May resist necessary structure or oversight",
          "Could appear uncooperative when processes are imposed",
        ],
        recommendations: [
          "Communicate proactively about your progress so managers feel comfortable granting autonomy",
          "Recognise when standardised processes serve the team even if they feel constraining",
        ],
      },
    ],
  },
  {
    dimensionKey: "MAS",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "Continuous learning and skill development are not primary motivators for you at this time. You may prefer to apply existing skills rather than constantly acquiring new ones, focusing on execution over exploration.",
        strengths: [
          "Efficient with current skill set",
          "Action-oriented",
          "Does not get distracted by shiny new knowledge",
        ],
        blindSpots: [
          "Skills may become outdated over time",
          "May miss opportunities that require new capabilities",
        ],
        recommendations: [
          "Dedicate one hour per week to learning something relevant to your role",
          "Identify one skill gap that, if addressed, would make your current work easier",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You enjoy learning and growing but balance it with practical application. You invest in skill development when it serves a clear purpose and appreciate opportunities to stretch without feeling overwhelmed.",
        strengths: [
          "Learns with purpose",
          "Balances development with delivery",
          "Open to growth when relevant",
        ],
        blindSpots: ["May deprioritise learning during busy periods", "Could stick to comfort-zone learning"],
        recommendations: [
          "Schedule learning time as a recurring calendar event to protect it",
          "Choose one stretch skill outside your comfort zone each quarter",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "You are deeply motivated by learning, growth, and the pursuit of excellence. You constantly seek to deepen your expertise and feel restless when you are not progressing. Mastery is a core part of your professional identity.",
        strengths: ["Deep expertise", "Growth mindset", "Continuous self-improvement"],
        blindSpots: [
          "May over-invest in learning at the expense of delivery",
          "Could become frustrated with repetitive tasks",
        ],
        recommendations: [
          "Balance learning goals with delivery commitments",
          "Share your expertise by mentoring others to multiply your impact",
        ],
      },
    ],
  },
  {
    dimensionKey: "PUR",
    ranges: [
      {
        min: 0,
        max: 8,
        label: "Low Driver",
        description:
          "Meaning and purpose are not the primary lens through which you evaluate your work. You may be motivated more by practical factors like compensation, challenge, or autonomy than by a sense of mission.",
        strengths: [
          "Pragmatic and flexible",
          "Can engage with work regardless of mission alignment",
          "Not dependent on lofty vision to perform",
        ],
        blindSpots: [
          "May feel disconnected during purpose-driven organisational initiatives",
          "Could struggle to inspire others with vision",
        ],
        recommendations: [
          "Identify at least one way your current work positively impacts someone else",
          "Explore whether connecting to a larger purpose could enhance your engagement",
        ],
      },
      {
        min: 9,
        max: 16,
        label: "Moderate Driver",
        description:
          "You appreciate meaningful work and are more engaged when you can see the impact of your efforts. However, purpose alone is not enough; you also need other motivators to stay fully engaged.",
        strengths: [
          "Values impact but remains practical",
          "Can find meaning in various types of work",
          "Balances idealism with realism",
        ],
        blindSpots: [
          "May not always advocate for purpose-aligned decisions",
          "Could lose motivation when impact is not visible",
        ],
        recommendations: [
          "Regularly revisit how your work connects to the broader organisational mission",
          "Volunteer for projects that have a visible positive impact",
        ],
      },
      {
        min: 17,
        max: 25,
        label: "Strong Driver",
        description:
          "Purpose is central to your engagement. You need to feel that your work matters, contributes to a greater good, and aligns with your values. Without meaning, even well-paid or challenging work will leave you unfulfilled.",
        strengths: [
          "Deeply engaged when aligned with mission",
          "Inspires others with vision",
          "Values-driven decision maker",
        ],
        blindSpots: [
          "May become disillusioned if organisational values shift",
          "Could reject pragmatic compromises that conflict with ideals",
        ],
        recommendations: [
          "Ensure your personal values and your organisation's mission are compatible",
          "Channel your purpose drive into mentoring and culture-building initiatives",
        ],
      },
    ],
  },
];

export const MOTIVATORS_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Motivators Assessment Report",
  subtitle: "Understanding what drives you at work",
  showRadarChart: true,
  showBarChart: true,
  showDimensionDetails: true,
  showNormComparison: false,
  showStrengthsAndBlindSpots: true,
  showRecommendations: true,
  brandColors: {
    primary: "#1E293B",
    secondary: "#10B981",
    accent: "#F59E0B",
  },
};

export const MOTIVATORS_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "variableSum",
  normalizeToPercentage: true,
};

export const MOTIVATORS_QUESTIONS = [
  // Achievement (ACH)
  { q: "I thrive when I can measure my progress against clear targets.", dim: "ACH" },
  { q: "Completing challenging tasks gives me a strong sense of satisfaction.", dim: "ACH" },
  { q: "I am energised by opportunities to exceed expectations.", dim: "ACH" },
  { q: "I regularly track my performance to ensure I am meeting my goals.", dim: "ACH" },
  { q: "I feel most fulfilled when I accomplish something others thought was difficult.", dim: "ACH" },

  // Affiliation (AFF)
  { q: "I prefer working in teams over working alone.", dim: "AFF" },
  { q: "Building strong relationships at work is very important to me.", dim: "AFF" },
  { q: "I go out of my way to help colleagues even when it is not part of my role.", dim: "AFF" },
  { q: "I feel most productive when I have a sense of belonging with my team.", dim: "AFF" },
  { q: "I value social connection and camaraderie in the workplace.", dim: "AFF" },

  // Power (POW)
  { q: "I enjoy being in a position to influence decisions.", dim: "POW" },
  { q: "I am drawn to leadership roles and responsibilities.", dim: "POW" },
  { q: "I feel motivated when I can shape the direction of a project or team.", dim: "POW" },
  { q: "Having authority to make important decisions energises me.", dim: "POW" },
  { q: "I actively seek opportunities to take on greater responsibility.", dim: "POW" },

  // Autonomy (AUT)
  { q: "I work best when I can set my own schedule and priorities.", dim: "AUT" },
  { q: "I prefer to choose my own methods for completing tasks.", dim: "AUT" },
  { q: "I feel stifled when I have to follow rigid processes with no room for flexibility.", dim: "AUT" },
  { q: "I am most creative when I have the freedom to approach problems my own way.", dim: "AUT" },
  { q: "Having control over how I spend my workday is essential to my satisfaction.", dim: "AUT" },

  // Mastery (MAS)
  { q: "I spend time developing deep expertise in my field.", dim: "MAS" },
  { q: "I enjoy learning new skills even when they are not required for my current role.", dim: "MAS" },
  { q: "I seek out challenging work that pushes me to grow professionally.", dim: "MAS" },
  { q: "I dedicate time to practice and refine my craft.", dim: "MAS" },
  { q: "I feel restless when I am not learning something new.", dim: "MAS" },

  // Purpose (PUR)
  { q: "I need to feel my work contributes to something meaningful.", dim: "PUR" },
  { q: "I am most engaged when I can see the impact of my work on others.", dim: "PUR" },
  { q: "I would choose meaningful work over a higher salary.", dim: "PUR" },
  { q: "I am motivated by knowing that my efforts make a positive difference.", dim: "PUR" },
  { q: "I actively seek roles that align with my personal values and beliefs.", dim: "PUR" },
];

/**
 * Generate survey variables for the Motivators template.
 */
export function getMotivatorsSurveyVariables() {
  return [
    { id: VAR_ACH, name: "mot_ach", type: "number" as const, value: 0 },
    { id: VAR_AFF, name: "mot_aff", type: "number" as const, value: 0 },
    { id: VAR_POW, name: "mot_pow", type: "number" as const, value: 0 },
    { id: VAR_AUT, name: "mot_aut", type: "number" as const, value: 0 },
    { id: VAR_MAS, name: "mot_mas", type: "number" as const, value: 0 },
    { id: VAR_PUR, name: "mot_pur", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a Motivators dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "ACH" | "AFF" | "POW" | "AUT" | "MAS" | "PUR"): string {
  const map: Record<string, string> = {
    ACH: VAR_ACH,
    AFF: VAR_AFF,
    POW: VAR_POW,
    AUT: VAR_AUT,
    MAS: VAR_MAS,
    PUR: VAR_PUR,
  };
  return map[dim];
}

export const MOTIVATORS_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "custom",
  dimensions: MOTIVATORS_DIMENSIONS,
  interpretations: MOTIVATORS_INTERPRETATIONS,
  reportConfig: MOTIVATORS_REPORT_CONFIG,
  scoringRules: MOTIVATORS_SCORING_RULES,
};
