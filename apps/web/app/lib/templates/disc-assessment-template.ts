import { createId } from "@paralleldrive/cuid2";
import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * DISC Personality Assessment Template
 *
 * 28 forced-choice questions where each option maps to a DISC dimension.
 * Survey variables disc_d, disc_i, disc_s, disc_c track cumulative scores
 * via block logic (each choice increments the matching dimension by 1).
 */

const DISC_QUESTIONS = [
  {
    q: "Which word group describes you best?",
    options: [
      "Decisive, direct, daring",
      "Inspiring, interactive, impressive",
      "Supportive, stable, sincere",
      "Cautious, careful, correct",
    ],
  },
  {
    q: "In a team setting, I typically...",
    options: [
      "Take charge and set direction",
      "Energise the group and generate ideas",
      "Listen and support team members",
      "Analyse the plan and check details",
    ],
  },
  {
    q: "When facing a challenge, I...",
    options: [
      "Take immediate action",
      "Rally others to help",
      "Stay calm and methodical",
      "Research and plan carefully",
    ],
  },
  {
    q: "I am most motivated by...",
    options: [
      "Results and achievements",
      "Recognition and social interaction",
      "Security and harmony",
      "Quality and accuracy",
    ],
  },
  {
    q: "My communication style is...",
    options: [
      "Brief, direct, to the point",
      "Animated, expressive, storytelling",
      "Warm, patient, encouraging",
      "Precise, factual, detailed",
    ],
  },
  {
    q: "Under pressure, I tend to...",
    options: [
      "Become more demanding and controlling",
      "Become disorganised and emotional",
      "Withdraw and become passive",
      "Become overly critical and rigid",
    ],
  },
  {
    q: "I value most in others...",
    options: [
      "Competence and directness",
      "Enthusiasm and friendliness",
      "Patience and reliability",
      "Accuracy and thoroughness",
    ],
  },
  {
    q: "My ideal work environment is...",
    options: [
      "Fast-paced with authority to decide",
      "Collaborative with lots of interaction",
      "Stable with clear expectations",
      "Structured with high standards",
    ],
  },
  {
    q: "When making decisions, I rely on...",
    options: [
      "My gut instinct and experience",
      "Input from others and intuition",
      "Established procedures and consensus",
      "Data, facts, and analysis",
    ],
  },
  {
    q: "I am often described as...",
    options: ["Bold and ambitious", "Charismatic and fun", "Dependable and calm", "Meticulous and logical"],
  },
  {
    q: "My greatest fear is...",
    options: [
      "Losing control or being taken advantage of",
      "Being rejected or ignored",
      "Sudden change or loss of stability",
      "Being wrong or criticised for errors",
    ],
  },
  {
    q: "I prefer to lead by...",
    options: [
      "Setting the vision and expecting results",
      "Inspiring and motivating others",
      "Building consensus and trust",
      "Setting clear standards and processes",
    ],
  },
  {
    q: "In conflict, I typically...",
    options: [
      "Confront the issue head-on",
      "Try to talk it out and find middle ground",
      "Avoid the conflict and keep the peace",
      "Analyse the facts and present logical arguments",
    ],
  },
  {
    q: "What energises me most is...",
    options: [
      "Winning and overcoming obstacles",
      "Meeting new people and brainstorming",
      "Helping others and maintaining harmony",
      "Solving complex problems",
    ],
  },
  {
    q: "When starting a new project, I...",
    options: [
      "Jump right in and figure it out",
      "Get excited and share my vision",
      "Want to understand the full scope first",
      "Create a detailed plan before starting",
    ],
  },
  {
    q: "I measure success by...",
    options: [
      "Tangible results and achievements",
      "Relationships built and recognition received",
      "Team satisfaction and smooth processes",
      "Accuracy and quality of output",
    ],
  },
  {
    q: "When receiving feedback, I prefer it to be...",
    options: [
      "Direct and action-oriented",
      "Positive and encouraging",
      "Gentle and private",
      "Specific and evidence-based",
    ],
  },
  {
    q: "My approach to rules is...",
    options: [
      "Rules are guidelines, results matter more",
      "Rules should be flexible and people-focused",
      "Rules provide helpful structure",
      "Rules should be followed precisely",
    ],
  },
  {
    q: "I handle change by...",
    options: [
      "Embracing it as an opportunity",
      "Getting others excited about it",
      "Adapting gradually once I understand why",
      "Analysing the implications thoroughly",
    ],
  },
  {
    q: "My biggest strength is...",
    options: [
      "Getting things done quickly",
      "Connecting with and influencing people",
      "Being a reliable team player",
      "Maintaining high quality standards",
    ],
  },
  {
    q: "When working on a deadline, I...",
    options: [
      "Push harder and demand more",
      "Stay positive and motivate the team",
      "Work steadily and support others",
      "Double-check everything for accuracy",
    ],
  },
  {
    q: "I prefer meetings that are...",
    options: [
      "Short, focused, with clear outcomes",
      "Interactive, creative, and engaging",
      "Structured with everyone having a say",
      "Well-prepared with data and agendas",
    ],
  },
  {
    q: "My approach to risk is...",
    options: [
      "I take calculated risks for big rewards",
      "I'm optimistic and willing to try new things",
      "I prefer proven approaches with less risk",
      "I carefully evaluate all risks before acting",
    ],
  },
  {
    q: "What frustrates me most is...",
    options: [
      "Inefficiency and indecisiveness",
      "Routine work and lack of recognition",
      "Rushed decisions and conflict",
      "Carelessness and lack of standards",
    ],
  },
  {
    q: "In a social setting, I am...",
    options: [
      "Commanding, steering the conversation",
      "The life of the party, making everyone laugh",
      "A good listener, making others comfortable",
      "Observant, engaging in deep conversations",
    ],
  },
  {
    q: "When delegating work, I...",
    options: [
      "Give the goal and expect results",
      "Explain the exciting vision and trust creativity",
      "Provide support and check in regularly",
      "Give detailed instructions and quality criteria",
    ],
  },
  {
    q: "My learning style is...",
    options: [
      "Learn by doing and experimenting",
      "Learn by discussing and collaborating",
      "Learn step-by-step with clear guidance",
      "Learn by reading and researching thoroughly",
    ],
  },
  {
    q: "The word that best describes me is...",
    options: ["Determined", "Enthusiastic", "Dependable", "Precise"],
  },
];

export const discAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = DISC_QUESTIONS.map((q, index) => {
    return buildBlock({
      name: `Question ${index + 1}`,
      elements: [
        buildMultipleChoiceElement({
          headline: q.q,
          type: TSurveyElementTypeEnum.MultipleChoiceSingle,
          choices: q.options,
          shuffleOption: "all",
          required: true,
        }),
      ],
      t,
    });
  });

  return buildSurvey(
    {
      name: "DISC Personality Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Understand your team's behavioural styles with the DISC personality assessment. Measures Dominance, Influence, Steadiness, and Conscientiousness across 28 questions. Includes automated scoring, personalised reports, and team analytics.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
