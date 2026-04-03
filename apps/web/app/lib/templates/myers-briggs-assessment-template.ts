import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * Myers-Briggs Type Indicator (MBTI) Assessment Template
 *
 * 32 forced-choice questions (8 per dichotomy pair) where each question
 * presents two options representing opposite poles of a dimension.
 * Survey variables mb_e, mb_i, mb_s, mb_n, mb_t, mb_f, mb_j, mb_p
 * track cumulative scores via block logic.
 */

const MBTI_QUESTIONS = [
  // ── E/I (Extraversion vs Introversion) ────────────────────────────────────
  {
    q: "At a work event, I prefer to...",
    options: [
      "Talk to many different people and circulate the room",
      "Have deep conversations with a few people I know well",
    ],
  },
  {
    q: "After a long day of meetings, I recharge by...",
    options: [
      "Going out with colleagues for dinner or drinks",
      "Spending quiet time alone or with one close friend",
    ],
  },
  {
    q: "When brainstorming ideas, I work best by...",
    options: ["Discussing ideas out loud with a group", "Thinking things through quietly on my own first"],
  },
  {
    q: "In my ideal role, I would spend most of my time...",
    options: [
      "Collaborating face-to-face with team members and clients",
      "Working independently on focused, in-depth tasks",
    ],
  },
  {
    q: "When solving a difficult problem, I tend to...",
    options: [
      "Talk it through with others to clarify my thinking",
      "Reflect on it privately before sharing my conclusions",
    ],
  },
  {
    q: "I am energised most by...",
    options: [
      "Being in a lively environment with lots of interaction",
      "Having uninterrupted time to concentrate deeply",
    ],
  },
  {
    q: "When learning something new, I prefer to...",
    options: [
      "Jump into group activities and learn by doing with others",
      "Study the material on my own and process it internally",
    ],
  },
  {
    q: "People who know me well would say I am...",
    options: [
      "Outgoing, talkative, and easy to get to know",
      "Private, thoughtful, and harder to read at first",
    ],
  },

  // ── S/N (Sensing vs Intuition) ────────────────────────────────────────────
  {
    q: "I trust...",
    options: ["Concrete facts and direct experience", "Intuition and patterns I sense beneath the surface"],
  },
  {
    q: "When reading a report, I focus on...",
    options: [
      "The specific data, figures, and evidence presented",
      "The overarching themes, implications, and possibilities",
    ],
  },
  {
    q: "I am more interested in...",
    options: ["What is real and actual right now", "What could be possible in the future"],
  },
  {
    q: "When describing an event to a colleague, I tend to...",
    options: [
      "Relay the facts in a sequential, step-by-step way",
      "Share the overall impression and what it could mean",
    ],
  },
  {
    q: "I prefer work that involves...",
    options: [
      "Applying established methods to produce tangible results",
      "Exploring new concepts and developing innovative strategies",
    ],
  },
  {
    q: "When making a plan, I start with...",
    options: [
      "Concrete details and practical logistics",
      "The big picture vision and then work out the details later",
    ],
  },
  {
    q: "I value colleagues who are...",
    options: [
      "Realistic, practical, and grounded in experience",
      "Visionary, creative, and open to unconventional ideas",
    ],
  },
  {
    q: "When given instructions, I prefer them to be...",
    options: ["Clear, specific, and step-by-step", "General guidelines that leave room for interpretation"],
  },

  // ── T/F (Thinking vs Feeling) ─────────────────────────────────────────────
  {
    q: "When making decisions, I rely more on...",
    options: ["Logic and objective analysis", "Values and how people will be affected"],
  },
  {
    q: "When giving feedback, I prioritise...",
    options: [
      "Being honest and accurate, even if it is uncomfortable",
      "Being tactful and considerate of the person's feelings",
    ],
  },
  {
    q: "In a disagreement, I tend to...",
    options: [
      "Focus on the logical merits of each position",
      "Consider how the outcome will affect relationships and morale",
    ],
  },
  {
    q: "I am more persuaded by...",
    options: [
      "A well-structured argument supported by evidence",
      "A compelling story about the human impact",
    ],
  },
  {
    q: "When evaluating a proposal, I first consider...",
    options: [
      "Whether it is logically sound and cost-effective",
      "Whether it aligns with our values and supports the team",
    ],
  },
  {
    q: "I would rather be known as...",
    options: ["Fair and competent", "Compassionate and understanding"],
  },
  {
    q: "When a colleague is underperforming, I first think about...",
    options: [
      "The objective standards they are failing to meet",
      "What personal challenges they might be facing",
    ],
  },
  {
    q: "I find it easier to...",
    options: [
      "Analyse the pros and cons of a situation objectively",
      "Tune into how a situation is affecting people emotionally",
    ],
  },

  // ── J/P (Judging vs Perceiving) ──────────────────────────────────────────
  {
    q: "I prefer my work environment to be...",
    options: ["Structured, planned, and predictable", "Flexible, spontaneous, and open to change"],
  },
  {
    q: "When starting a project, I prefer to...",
    options: [
      "Create a detailed plan with milestones and deadlines",
      "Explore options and let the approach evolve naturally",
    ],
  },
  {
    q: "I feel most comfortable when...",
    options: [
      "Decisions are made and I know what to expect",
      "Options are still open and I can adapt as I go",
    ],
  },
  {
    q: "My desk and workspace tend to be...",
    options: [
      "Neat, organised, and everything in its place",
      "A creative spread of current projects and materials",
    ],
  },
  {
    q: "When a deadline is approaching, I typically...",
    options: [
      "Have completed most of the work well in advance",
      "Do my best work in a final burst of energy close to the deadline",
    ],
  },
  {
    q: "I prefer to handle tasks by...",
    options: [
      "Finishing one thing completely before moving to the next",
      "Working on several things at once and keeping my options open",
    ],
  },
  {
    q: "When plans change unexpectedly, I...",
    options: [
      "Feel frustrated and prefer to get back on track quickly",
      "See it as an opportunity and adapt easily",
    ],
  },
  {
    q: "In my personal life, I tend to...",
    options: [
      "Plan activities and trips well in advance",
      "Decide things in the moment and stay spontaneous",
    ],
  },
];

export const myersBriggsAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = MBTI_QUESTIONS.map((q, index) => {
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
      name: "Myers-Briggs Type Indicator (MBTI)",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Discover your Myers-Briggs personality type across four dimensions: Energy (E/I), Information (S/N), Decisions (T/F), and Lifestyle (J/P). 32 questions to identify your 4-letter type code.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
