import type { TFunction } from "i18next";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildRatingElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Big Five (OCEAN) Personality Assessment Template
 *
 * 50 Likert-scale rating questions (10 per dimension) measuring the Big Five
 * personality traits: Openness, Conscientiousness, Extraversion, Agreeableness,
 * and Neuroticism.
 *
 * Reverse-scored items are marked with `reversed: true`. For these items the
 * block logic should compute (6 - rating) before adding to the dimension variable.
 */

const BIG_FIVE_QUESTIONS: { q: string; dim: "O" | "C" | "E" | "A" | "N"; reversed?: true }[] = [
  // ── Openness (O) ──────────────────────────────────────────────────────────
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

  // ── Conscientiousness (C) ─────────────────────────────────────────────────
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

  // ── Extraversion (E) ─────────────────────────────────────────────────────
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

  // ── Agreeableness (A) ─────────────────────────────────────────────────────
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

  // ── Neuroticism (N) ──────────────────────────────────────────────────────
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

export const bigFiveAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = BIG_FIVE_QUESTIONS.map((item, index) => {
    return buildBlock({
      name: `Question ${index + 1}`,
      elements: [
        buildRatingElement({
          headline: item.q,
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
      name: "Big Five Personality Assessment (OCEAN)",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "The gold standard in personality science. Measures the Big Five personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN model) with 50 research-backed questions.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
