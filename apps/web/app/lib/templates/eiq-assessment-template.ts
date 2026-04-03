import type { TFunction } from "i18next";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildRatingElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * EIQ (Emotional Intelligence Quotient) Assessment Template
 *
 * 30 Likert-scale questions (6 per dimension) measuring emotional intelligence
 * across five key dimensions based on the Goleman EI framework:
 * Self-Awareness, Self-Regulation, Motivation, Empathy, and Social Skills.
 */

const EIQ_QUESTIONS = [
  // Self-Awareness (SA) - 6 questions
  { q: "I can accurately identify my emotions as I experience them.", dim: "SA" },
  { q: "I understand how my feelings affect my performance at work.", dim: "SA" },
  { q: "I recognize my strengths and limitations honestly.", dim: "SA" },
  { q: "I am aware of how my mood influences my interactions with others.", dim: "SA" },
  { q: "I can describe why I feel a certain way in most situations.", dim: "SA" },
  { q: "I seek feedback from others to better understand my impact.", dim: "SA" },

  // Self-Regulation (SR) - 6 questions
  { q: "I stay calm under pressure and manage stress effectively.", dim: "SR" },
  { q: "I think before acting when I feel frustrated or angry.", dim: "SR" },
  { q: "I can adapt quickly when circumstances change unexpectedly.", dim: "SR" },
  { q: "I hold myself accountable for my mistakes rather than blaming others.", dim: "SR" },
  { q: "I manage disruptive impulses and keep them from interfering with my work.", dim: "SR" },
  { q: "I remain composed and positive even during difficult conversations.", dim: "SR" },

  // Motivation (MOT) - 6 questions
  { q: "I set challenging goals for myself and work hard to achieve them.", dim: "MOT" },
  { q: "I remain optimistic even when facing setbacks or obstacles.", dim: "MOT" },
  { q: "I am driven by a desire to improve and excel, not just external rewards.", dim: "MOT" },
  { q: "I persist in pursuing my goals even when progress is slow.", dim: "MOT" },
  { q: "I take initiative and act on opportunities without being asked.", dim: "MOT" },
  { q: "I align my daily efforts with my long-term professional aspirations.", dim: "MOT" },

  // Empathy (EMP) - 6 questions
  { q: "I can sense how others are feeling even when they do not say it directly.", dim: "EMP" },
  { q: "I consider others' perspectives before making decisions that affect them.", dim: "EMP" },
  { q: "I listen attentively without interrupting when someone shares a concern.", dim: "EMP" },
  { q: "I recognize and respect cultural and individual differences in the workplace.", dim: "EMP" },
  { q: "I pick up on unspoken tensions or dynamics within a group.", dim: "EMP" },
  { q: "I show genuine interest in the well-being of my colleagues.", dim: "EMP" },

  // Social Skills (SS) - 6 questions
  { q: "I can resolve conflicts effectively by finding common ground.", dim: "SS" },
  { q: "I build rapport easily with different types of people.", dim: "SS" },
  { q: "I communicate my ideas clearly and persuasively.", dim: "SS" },
  { q: "I collaborate well and contribute to a positive team environment.", dim: "SS" },
  { q: "I can influence others without resorting to pressure or authority.", dim: "SS" },
  { q: "I give constructive feedback that others can receive openly.", dim: "SS" },
];

export const eiqAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = EIQ_QUESTIONS.map((q, index) => {
    return buildBlock({
      name: `Question ${index + 1}`,
      elements: [
        buildRatingElement({
          headline: q.q,
          scale: "number",
          range: 5,
          lowerLabel: "Strongly Disagree",
          upperLabel: "Strongly Agree",
          required: true,
        }),
      ],
      t,
    });
  });

  return buildSurvey(
    {
      name: "Emotional Intelligence (EIQ) Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Measure your emotional intelligence across five key dimensions: self-awareness, self-regulation, motivation, empathy, and social skills. 30 questions based on the Goleman EI framework.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
