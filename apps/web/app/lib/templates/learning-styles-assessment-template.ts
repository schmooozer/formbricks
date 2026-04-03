import { createId } from "@paralleldrive/cuid2";
import type { TFunction } from "i18next";
import { TSurveyElementTypeEnum } from "@formbricks/types/surveys/elements";
import type { TTemplate } from "@formbricks/types/templates";
import { buildBlock, buildMultipleChoiceElement } from "@/app/lib/survey-block-builder";
import { buildSurvey, getDefaultSurveyPreset, hiddenFieldsDefault } from "@/app/lib/survey-builder";

/**
 * VARK Learning Styles Assessment Template
 *
 * 20 forced-choice questions where each option maps to a VARK dimension.
 * Survey variables ls_v, ls_a, ls_r, ls_k track cumulative scores
 * via block logic (each choice increments the matching dimension by 1).
 */

const VARK_QUESTIONS = [
  {
    q: "When learning a new skill, I prefer to...",
    options: [
      "Watch a demonstration or video",
      "Listen to someone explain the steps",
      "Read the instruction manual",
      "Jump in and try it hands-on",
    ],
  },
  {
    q: "When giving directions to a colleague, I tend to...",
    options: [
      "Draw a map or sketch the route",
      "Describe the turns and landmarks verbally",
      "Write out step-by-step directions",
      "Walk them to the destination myself",
    ],
  },
  {
    q: "To remember important information, I usually...",
    options: [
      "Visualise it as an image or diagram",
      "Repeat it aloud to myself",
      "Write it down in my own words",
      "Associate it with a physical action or movement",
    ],
  },
  {
    q: "When preparing for an important presentation, I...",
    options: [
      "Create visual slides with charts and images",
      "Rehearse by speaking the content aloud",
      "Write out detailed notes and scripts",
      "Practise with props or walk through the space",
    ],
  },
  {
    q: "In a training session, I learn best when the trainer...",
    options: [
      "Uses diagrams, flowcharts, and colour coding",
      "Explains concepts through discussion and stories",
      "Provides handouts and reading materials",
      "Includes hands-on exercises and simulations",
    ],
  },
  {
    q: "When troubleshooting a problem, I prefer to...",
    options: [
      "Look at a diagram or visual representation of the system",
      "Talk through the issue with a colleague",
      "Consult the documentation or reference guide",
      "Physically test different solutions",
    ],
  },
  {
    q: "When choosing a new software tool, I would first...",
    options: [
      "Watch a video demo or screenshot tour",
      "Attend a live walkthrough or webinar",
      "Read the feature comparison documentation",
      "Sign up for a free trial and explore it myself",
    ],
  },
  {
    q: "When explaining a process to a new team member, I...",
    options: [
      "Draw a flowchart or process diagram",
      "Walk them through it in a conversation",
      "Send them a written guide or wiki page",
      "Have them shadow me while I do the task",
    ],
  },
  {
    q: "When studying for a professional certification, I...",
    options: [
      "Use colour-coded notes and mind maps",
      "Listen to audio courses or study groups",
      "Read textbooks and take detailed notes",
      "Work through practice labs and exercises",
    ],
  },
  {
    q: "At a conference, I get the most value from...",
    options: [
      "Slides and visual presentations",
      "Panel discussions and Q&A sessions",
      "Printed proceedings and detailed papers",
      "Interactive workshops and live demos",
    ],
  },
  {
    q: "When I need to understand complex data, I prefer...",
    options: [
      "Charts, graphs, and infographics",
      "A verbal explanation of the key findings",
      "A detailed written report with analysis",
      "Working with the raw data myself in a spreadsheet",
    ],
  },
  {
    q: "My preferred way to take notes in a meeting is...",
    options: [
      "Sketch diagrams and use visual symbols",
      "Record the audio and listen back later",
      "Type or write detailed text notes",
      "Jot down action items I can immediately work on",
    ],
  },
  {
    q: "When assembling something new, I prefer to...",
    options: [
      "Look at the pictures and diagrams in the instructions",
      "Have someone talk me through each step",
      "Read the written instructions carefully",
      "Start assembling and refer to instructions only if stuck",
    ],
  },
  {
    q: "To stay engaged during a long training day, I need...",
    options: [
      "Visual variety like videos, slides, and demonstrations",
      "Opportunities for group discussion and debate",
      "Comprehensive reading materials to review at my pace",
      "Frequent breaks with hands-on activities",
    ],
  },
  {
    q: "When reviewing a project plan, I focus on...",
    options: [
      "The Gantt chart and visual timeline",
      "Discussing milestones and dependencies with the team",
      "Reading the written scope and requirements document",
      "Walking through each deliverable and testing assumptions",
    ],
  },
  {
    q: "I find it easiest to recall information that was...",
    options: [
      "Presented in a colourful diagram or chart",
      "Discussed in a conversation or lecture",
      "Written in a document I read carefully",
      "Part of a hands-on exercise I completed",
    ],
  },
  {
    q: "When onboarding at a new company, I would prefer to...",
    options: [
      "Review organisational charts and visual overviews",
      "Have introductory meetings and hear about the culture",
      "Read the employee handbook and policy documents",
      "Start working on a small task to learn by doing",
    ],
  },
  {
    q: "My ideal way to receive feedback is...",
    options: [
      "Shown on a dashboard or visual scorecard",
      "Discussed face-to-face in a conversation",
      "Written in a detailed email or review document",
      "Demonstrated through examples of what good looks like",
    ],
  },
  {
    q: "When planning a team event, I tend to...",
    options: [
      "Create a visual mood board or layout",
      "Talk through ideas with the group",
      "Draft a detailed written plan with logistics",
      "Visit the venue and physically set things up",
    ],
  },
  {
    q: "The most effective way for me to review my own work is to...",
    options: [
      "Compare it against a visual checklist or template",
      "Explain it aloud to someone else",
      "Proofread the written output carefully",
      "Test it in practice and observe the results",
    ],
  },
];

export const learningStylesAssessmentTemplate = (t: TFunction): TTemplate => {
  const localSurvey = getDefaultSurveyPreset(t);

  const blocks = VARK_QUESTIONS.map((q, index) => {
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
      name: "Learning Styles Assessment (VARK)",
      role: "peopleManager",
      industries: ["other"],
      channels: ["link"],
      description:
        "Discover your preferred learning style with the VARK assessment. Measures Visual, Auditory, Reading/Writing, and Kinesthetic learning preferences across 20 questions.",
      endings: localSurvey.endings,
      hiddenFields: hiddenFieldsDefault,
      blocks,
    },
    t
  );
};
