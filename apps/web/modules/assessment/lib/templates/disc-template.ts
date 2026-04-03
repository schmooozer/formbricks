import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * DISC Assessment Template
 *
 * Standard 28-question DISC assessment using forced-choice (most/least like me) format.
 * Each question block contains 4 statements, one for each DISC dimension.
 * The respondent selects which statement is MOST like them and which is LEAST like them.
 *
 * For simplicity in the Formbricks survey system, we use single-choice questions
 * where each option maps to a DISC dimension, and the block logic adds the
 * appropriate score to the matching dimension variable.
 */

// Dimension IDs (stable across template uses)
const DIM_D_ID = "disc_dominance";
const DIM_I_ID = "disc_influence";
const DIM_S_ID = "disc_steadiness";
const DIM_C_ID = "disc_conscientiousness";

// Variable IDs for survey variables
const VAR_D = "disc_d";
const VAR_I = "disc_i";
const VAR_S = "disc_s";
const VAR_C = "disc_c";

export const DISC_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "D",
    name: "Dominance",
    description: "Direct, results-oriented, firm, strong-willed, forceful",
    variableId: VAR_D,
    minScore: 0,
    maxScore: 28,
    color: "#DC2626",
    icon: "zap",
  },
  {
    id: createId(),
    key: "I",
    name: "Influence",
    description: "Outgoing, enthusiastic, optimistic, high-spirited, lively",
    variableId: VAR_I,
    minScore: 0,
    maxScore: 28,
    color: "#F59E0B",
    icon: "sun",
  },
  {
    id: createId(),
    key: "S",
    name: "Steadiness",
    description: "Even-tempered, accommodating, patient, humble, tactful",
    variableId: VAR_S,
    minScore: 0,
    maxScore: 28,
    color: "#10B981",
    icon: "heart",
  },
  {
    id: createId(),
    key: "C",
    name: "Conscientiousness",
    description: "Analytical, reserved, precise, private, systematic",
    variableId: VAR_C,
    minScore: 0,
    maxScore: 28,
    color: "#3B82F6",
    icon: "target",
  },
];

export const DISC_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "D",
    ranges: [
      {
        min: 0,
        max: 9,
        label: "Low Dominance",
        description:
          "You tend to be cooperative, agreeable, and prefer collaborative decision-making. You may avoid conflict and prefer to let others take the lead in high-pressure situations.",
        strengths: ["Collaborative", "Agreeable", "Supportive of others' ideas"],
        blindSpots: ["May avoid necessary confrontation", "Could be perceived as indecisive"],
        recommendations: ["Practice asserting your opinion in meetings", "Set clear personal boundaries"],
      },
      {
        min: 10,
        max: 18,
        label: "Moderate Dominance",
        description:
          "You balance assertiveness with cooperation. You can take charge when needed but also value input from others. This flexibility serves you well in most team environments.",
        strengths: ["Balanced approach", "Adaptable leadership style", "Good at reading situations"],
        blindSpots: ["May sometimes waiver between asserting and deferring"],
      },
      {
        min: 19,
        max: 28,
        label: "High Dominance",
        description:
          "You are direct, decisive, and results-oriented. You thrive on challenges and take charge naturally. You prefer to be in control and make things happen quickly.",
        strengths: ["Decisive", "Results-driven", "Takes initiative", "Competitive"],
        blindSpots: ["May overlook others' feelings", "Can come across as demanding", "Impatient with slow processes"],
        recommendations: ["Practice active listening", "Ask for input before deciding", "Show appreciation for others' contributions"],
      },
    ],
  },
  {
    dimensionKey: "I",
    ranges: [
      {
        min: 0,
        max: 9,
        label: "Low Influence",
        description:
          "You are reserved and prefer to work independently or in small groups. You tend to be more task-focused than people-focused and may find large social situations draining.",
        strengths: ["Focused", "Independent", "Thoughtful communicator"],
        blindSpots: ["May seem distant or unapproachable", "Could miss networking opportunities"],
      },
      {
        min: 10,
        max: 18,
        label: "Moderate Influence",
        description:
          "You enjoy social interaction but also value quiet time. You can be persuasive and enthusiastic when needed while maintaining a balanced approach to relationships.",
        strengths: ["Balanced social skills", "Can adapt to different social contexts"],
      },
      {
        min: 19,
        max: 28,
        label: "High Influence",
        description:
          "You are outgoing, enthusiastic, and persuasive. You thrive in social environments and are skilled at motivating others. You bring energy and optimism to teams.",
        strengths: ["Enthusiastic", "Persuasive", "Motivating", "Optimistic"],
        blindSpots: ["May overcommit", "Can be disorganized", "May avoid detailed work"],
        recommendations: ["Follow through on commitments", "Document important details", "Balance talking with listening"],
      },
    ],
  },
  {
    dimensionKey: "S",
    ranges: [
      {
        min: 0,
        max: 9,
        label: "Low Steadiness",
        description:
          "You embrace change and thrive in dynamic environments. You may become restless with routine and prefer variety in your work. You adapt quickly to new situations.",
        strengths: ["Adaptable", "Comfortable with change", "Flexible"],
        blindSpots: ["May seem impatient with routine tasks", "Could create instability for others"],
      },
      {
        min: 10,
        max: 18,
        label: "Moderate Steadiness",
        description:
          "You balance stability with adaptability. You can handle change while also appreciating consistency. You're a stabilizing presence without being resistant to new approaches.",
        strengths: ["Balanced adaptability", "Reliable yet flexible"],
      },
      {
        min: 19,
        max: 28,
        label: "High Steadiness",
        description:
          "You are patient, reliable, and team-oriented. You value stability and consistency, providing a calming influence. You excel at maintaining harmony and supporting others.",
        strengths: ["Patient", "Reliable", "Supportive", "Good listener", "Team player"],
        blindSpots: ["May resist necessary changes", "Can be too accommodating", "Avoids confrontation"],
        recommendations: ["Speak up when you disagree", "Be open to trying new approaches", "Set limits on what you take on"],
      },
    ],
  },
  {
    dimensionKey: "C",
    ranges: [
      {
        min: 0,
        max: 9,
        label: "Low Conscientiousness",
        description:
          "You prefer to work with the big picture rather than getting bogged down in details. You're comfortable making decisions without perfect information and prefer speed over precision.",
        strengths: ["Big-picture thinker", "Quick decision-maker", "Comfortable with ambiguity"],
        blindSpots: ["May overlook important details", "Work quality may be inconsistent"],
      },
      {
        min: 10,
        max: 18,
        label: "Moderate Conscientiousness",
        description:
          "You balance attention to detail with practical efficiency. You value quality but recognize when good enough is sufficient. You can work systematically when needed.",
        strengths: ["Practical", "Balanced approach to quality vs speed"],
      },
      {
        min: 19,
        max: 28,
        label: "High Conscientiousness",
        description:
          "You are analytical, systematic, and quality-focused. You value accuracy and thoroughness, preferring to work with data and facts. You set high standards for yourself and others.",
        strengths: ["Analytical", "Detail-oriented", "High standards", "Systematic", "Accurate"],
        blindSpots: ["May over-analyze", "Can be perceived as overly critical", "Perfectionism may slow progress"],
        recommendations: ["Set 'good enough' thresholds", "Share your analysis without overloading others", "Accept that some decisions require imperfect information"],
      },
    ],
  },
];

export const DISC_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "DISC Personality Assessment Report",
  subtitle: "Understanding your behavioural style",
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

export const DISC_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "ipsative",
  normalizeToPercentage: true,
};

export const DISC_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "disc",
  dimensions: DISC_DIMENSIONS,
  interpretations: DISC_INTERPRETATIONS,
  reportConfig: DISC_REPORT_CONFIG,
  scoringRules: DISC_SCORING_RULES,
};

/**
 * DISC survey questions.
 *
 * Each question presents 4 word groups. The respondent picks which
 * group is MOST like them. Each choice maps to a DISC dimension.
 * The block logic adds 1 point to the selected dimension's variable.
 */
export const DISC_QUESTIONS = [
  { q: "Which word group describes you best?", options: [{ label: "Decisive, direct, daring", dim: "D" }, { label: "Inspiring, interactive, impressive", dim: "I" }, { label: "Supportive, stable, sincere", dim: "S" }, { label: "Cautious, careful, correct", dim: "C" }] },
  { q: "In a team setting, I typically...", options: [{ label: "Take charge and set direction", dim: "D" }, { label: "Energise the group and generate ideas", dim: "I" }, { label: "Listen and support team members", dim: "S" }, { label: "Analyse the plan and check details", dim: "C" }] },
  { q: "When facing a challenge, I...", options: [{ label: "Take immediate action", dim: "D" }, { label: "Rally others to help", dim: "I" }, { label: "Stay calm and methodical", dim: "S" }, { label: "Research and plan carefully", dim: "C" }] },
  { q: "I am most motivated by...", options: [{ label: "Results and achievements", dim: "D" }, { label: "Recognition and social interaction", dim: "I" }, { label: "Security and harmony", dim: "S" }, { label: "Quality and accuracy", dim: "C" }] },
  { q: "My communication style is...", options: [{ label: "Brief, direct, to the point", dim: "D" }, { label: "Animated, expressive, storytelling", dim: "I" }, { label: "Warm, patient, encouraging", dim: "S" }, { label: "Precise, factual, detailed", dim: "C" }] },
  { q: "Under pressure, I tend to...", options: [{ label: "Become more demanding and controlling", dim: "D" }, { label: "Become disorganised and emotional", dim: "I" }, { label: "Withdraw and become passive", dim: "S" }, { label: "Become overly critical and rigid", dim: "C" }] },
  { q: "I value most in others...", options: [{ label: "Competence and directness", dim: "D" }, { label: "Enthusiasm and friendliness", dim: "I" }, { label: "Patience and reliability", dim: "S" }, { label: "Accuracy and thoroughness", dim: "C" }] },
  { q: "My ideal work environment is...", options: [{ label: "Fast-paced with authority to decide", dim: "D" }, { label: "Collaborative with lots of interaction", dim: "I" }, { label: "Stable with clear expectations", dim: "S" }, { label: "Structured with high standards", dim: "C" }] },
  { q: "When making decisions, I rely on...", options: [{ label: "My gut instinct and experience", dim: "D" }, { label: "Input from others and intuition", dim: "I" }, { label: "Established procedures and consensus", dim: "S" }, { label: "Data, facts, and analysis", dim: "C" }] },
  { q: "I am often described as...", options: [{ label: "Bold and ambitious", dim: "D" }, { label: "Charismatic and fun", dim: "I" }, { label: "Dependable and calm", dim: "S" }, { label: "Meticulous and logical", dim: "C" }] },
  { q: "My greatest fear is...", options: [{ label: "Losing control or being taken advantage of", dim: "D" }, { label: "Being rejected or ignored", dim: "I" }, { label: "Sudden change or loss of stability", dim: "S" }, { label: "Being wrong or criticised for errors", dim: "C" }] },
  { q: "I prefer to lead by...", options: [{ label: "Setting the vision and expecting results", dim: "D" }, { label: "Inspiring and motivating others", dim: "I" }, { label: "Building consensus and trust", dim: "S" }, { label: "Setting clear standards and processes", dim: "C" }] },
  { q: "In conflict, I typically...", options: [{ label: "Confront the issue head-on", dim: "D" }, { label: "Try to talk it out and find middle ground", dim: "I" }, { label: "Avoid the conflict and keep the peace", dim: "S" }, { label: "Analyse the facts and present logical arguments", dim: "C" }] },
  { q: "What energises me most is...", options: [{ label: "Winning and overcoming obstacles", dim: "D" }, { label: "Meeting new people and brainstorming", dim: "I" }, { label: "Helping others and maintaining harmony", dim: "S" }, { label: "Solving complex problems", dim: "C" }] },
  { q: "When starting a new project, I...", options: [{ label: "Jump right in and figure it out", dim: "D" }, { label: "Get excited and share my vision", dim: "I" }, { label: "Want to understand the full scope first", dim: "S" }, { label: "Create a detailed plan before starting", dim: "C" }] },
  { q: "I measure success by...", options: [{ label: "Tangible results and achievements", dim: "D" }, { label: "Relationships built and recognition received", dim: "I" }, { label: "Team satisfaction and smooth processes", dim: "S" }, { label: "Accuracy and quality of output", dim: "C" }] },
  { q: "When receiving feedback, I prefer it to be...", options: [{ label: "Direct and action-oriented", dim: "D" }, { label: "Positive and encouraging", dim: "I" }, { label: "Gentle and private", dim: "S" }, { label: "Specific and evidence-based", dim: "C" }] },
  { q: "My approach to rules is...", options: [{ label: "Rules are guidelines, results matter more", dim: "D" }, { label: "Rules should be flexible and people-focused", dim: "I" }, { label: "Rules provide helpful structure", dim: "S" }, { label: "Rules should be followed precisely", dim: "C" }] },
  { q: "I handle change by...", options: [{ label: "Embracing it as an opportunity", dim: "D" }, { label: "Getting others excited about it", dim: "I" }, { label: "Adapting gradually once I understand why", dim: "S" }, { label: "Analysing the implications thoroughly", dim: "C" }] },
  { q: "My biggest strength is...", options: [{ label: "Getting things done quickly", dim: "D" }, { label: "Connecting with and influencing people", dim: "I" }, { label: "Being a reliable team player", dim: "S" }, { label: "Maintaining high quality standards", dim: "C" }] },
  { q: "When working on a deadline, I...", options: [{ label: "Push harder and demand more", dim: "D" }, { label: "Stay positive and motivate the team", dim: "I" }, { label: "Work steadily and support others", dim: "S" }, { label: "Double-check everything for accuracy", dim: "C" }] },
  { q: "I prefer meetings that are...", options: [{ label: "Short, focused, with clear outcomes", dim: "D" }, { label: "Interactive, creative, and engaging", dim: "I" }, { label: "Structured with everyone having a say", dim: "S" }, { label: "Well-prepared with data and agendas", dim: "C" }] },
  { q: "My approach to risk is...", options: [{ label: "I take calculated risks for big rewards", dim: "D" }, { label: "I'm optimistic and willing to try new things", dim: "I" }, { label: "I prefer proven approaches with less risk", dim: "S" }, { label: "I carefully evaluate all risks before acting", dim: "C" }] },
  { q: "What frustrates me most is...", options: [{ label: "Inefficiency and indecisiveness", dim: "D" }, { label: "Routine work and lack of recognition", dim: "I" }, { label: "Rushed decisions and conflict", dim: "S" }, { label: "Carelessness and lack of standards", dim: "C" }] },
  { q: "In a social setting, I am...", options: [{ label: "Commanding, steering the conversation", dim: "D" }, { label: "The life of the party, making everyone laugh", dim: "I" }, { label: "A good listener, making others comfortable", dim: "S" }, { label: "Observant, engaging in deep one-on-one conversations", dim: "C" }] },
  { q: "When delegating work, I...", options: [{ label: "Give the goal and expect them to figure it out", dim: "D" }, { label: "Explain the exciting vision and trust their creativity", dim: "I" }, { label: "Provide support and check in regularly", dim: "S" }, { label: "Give detailed instructions and quality criteria", dim: "C" }] },
  { q: "My learning style is...", options: [{ label: "Learn by doing and experimenting", dim: "D" }, { label: "Learn by discussing and collaborating", dim: "I" }, { label: "Learn step-by-step with clear guidance", dim: "S" }, { label: "Learn by reading and researching thoroughly", dim: "C" }] },
  { q: "The word that best describes me is...", options: [{ label: "Determined", dim: "D" }, { label: "Enthusiastic", dim: "I" }, { label: "Dependable", dim: "S" }, { label: "Precise", dim: "C" }] },
];

/**
 * Generate survey variables for the DISC template.
 */
export function getDiscSurveyVariables() {
  return [
    { id: VAR_D, name: "disc_d", type: "number" as const, value: 0 },
    { id: VAR_I, name: "disc_i", type: "number" as const, value: 0 },
    { id: VAR_S, name: "disc_s", type: "number" as const, value: 0 },
    { id: VAR_C, name: "disc_c", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a DISC dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "D" | "I" | "S" | "C"): string {
  const map: Record<string, string> = { D: VAR_D, I: VAR_I, S: VAR_S, C: VAR_C };
  return map[dim];
}
