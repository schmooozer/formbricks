import type { TFunction } from "i18next";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildRatingElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Motivators Assessment Template
 *
 * 30 Likert-scale questions (5 per dimension) measuring six core workplace
 * motivators: Achievement, Affiliation, Power, Autonomy, Mastery, and Purpose.
 */

const MOTIVATOR_QUESTIONS = [
  // Achievement (ACH) - 5 questions
  { q: "I thrive when I can measure my progress against clear targets.", dim: "ACH" },
  { q: "Completing challenging tasks gives me a strong sense of satisfaction.", dim: "ACH" },
  { q: "I am energised by opportunities to exceed expectations.", dim: "ACH" },
  { q: "I regularly track my performance to ensure I am meeting my goals.", dim: "ACH" },
  { q: "I feel most fulfilled when I accomplish something others thought was difficult.", dim: "ACH" },

  // Affiliation (AFF) - 5 questions
  { q: "I prefer working in teams over working alone.", dim: "AFF" },
  { q: "Building strong relationships at work is very important to me.", dim: "AFF" },
  { q: "I go out of my way to help colleagues even when it is not part of my role.", dim: "AFF" },
  { q: "I feel most productive when I have a sense of belonging with my team.", dim: "AFF" },
  { q: "I value social connection and camaraderie in the workplace.", dim: "AFF" },

  // Power (POW) - 5 questions
  { q: "I enjoy being in a position to influence decisions.", dim: "POW" },
  { q: "I am drawn to leadership roles and responsibilities.", dim: "POW" },
  { q: "I feel motivated when I can shape the direction of a project or team.", dim: "POW" },
  { q: "Having authority to make important decisions energises me.", dim: "POW" },
  { q: "I actively seek opportunities to take on greater responsibility.", dim: "POW" },

  // Autonomy (AUT) - 5 questions
  { q: "I work best when I can set my own schedule and priorities.", dim: "AUT" },
  { q: "I prefer to choose my own methods for completing tasks.", dim: "AUT" },
  { q: "I feel stifled when I have to follow rigid processes with no room for flexibility.", dim: "AUT" },
  { q: "I am most creative when I have the freedom to approach problems my own way.", dim: "AUT" },
  { q: "Having control over how I spend my workday is essential to my satisfaction.", dim: "AUT" },

  // Mastery (MAS) - 5 questions
  { q: "I spend time developing deep expertise in my field.", dim: "MAS" },
  { q: "I enjoy learning new skills even when they are not required for my current role.", dim: "MAS" },
  { q: "I seek out challenging work that pushes me to grow professionally.", dim: "MAS" },
  { q: "I dedicate time to practice and refine my craft.", dim: "MAS" },
  { q: "I feel restless when I am not learning something new.", dim: "MAS" },

  // Purpose (PUR) - 5 questions
  { q: "I need to feel my work contributes to something meaningful.", dim: "PUR" },
  { q: "I am most engaged when I can see the impact of my work on others.", dim: "PUR" },
  { q: "I would choose meaningful work over a higher salary.", dim: "PUR" },
  { q: "I am motivated by knowing that my efforts make a positive difference.", dim: "PUR" },
  { q: "I actively seek roles that align with my personal values and beliefs.", dim: "PUR" },
];

export const motivatorsAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = MOTIVATOR_QUESTIONS.map((q, index) => {
    return buildBlock({
      name: `Question ${index + 1}`,
      elements: [
        buildRatingElement({
          headline: q.q,
          scale: "number",
          range: 5,
          lowerLabel: "Not at all like me",
          upperLabel: "Very much like me",
          required: true,
        }),
      ],
      t,
    });
  });

  return buildSurvey(
    {
      name: "Motivators Assessment",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Discover what drives you at work. This assessment measures six core motivators: Achievement, Affiliation, Power, Autonomy, Mastery, and Purpose across 30 questions.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
