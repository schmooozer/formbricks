import { createId } from "@paralleldrive/cuid2";
import type { TAssessmentTemplatePreset } from "@formbricks/types/assessments";

/**
 * VARK Learning Styles Assessment Template
 *
 * 20 forced-choice questions measuring Visual, Auditory, Reading/Writing,
 * and Kinesthetic learning preferences. Each question presents 4 options,
 * one per VARK dimension. The respondent selects which approach best
 * describes them and the block logic increments the matching dimension variable.
 */

// Variable IDs for survey variables
const VAR_V = "ls_v";
const VAR_A = "ls_a";
const VAR_R = "ls_r";
const VAR_K = "ls_k";

export const LEARNING_STYLES_DIMENSIONS: TAssessmentTemplatePreset["dimensions"] = [
  {
    id: createId(),
    key: "V",
    name: "Visual",
    description: "Prefers images, diagrams, charts, and spatial understanding",
    variableId: VAR_V,
    minScore: 0,
    maxScore: 20,
    color: "#3B82F6",
    icon: "eye",
  },
  {
    id: createId(),
    key: "A",
    name: "Auditory",
    description: "Prefers listening, discussing, and verbal explanations",
    variableId: VAR_A,
    minScore: 0,
    maxScore: 20,
    color: "#F59E0B",
    icon: "ear",
  },
  {
    id: createId(),
    key: "R",
    name: "Reading/Writing",
    description: "Prefers reading text, writing notes, and written materials",
    variableId: VAR_R,
    minScore: 0,
    maxScore: 20,
    color: "#10B981",
    icon: "book",
  },
  {
    id: createId(),
    key: "K",
    name: "Kinesthetic",
    description: "Prefers hands-on practice, physical activity, and experimentation",
    variableId: VAR_K,
    minScore: 0,
    maxScore: 20,
    color: "#EF4444",
    icon: "hand",
  },
];

export const LEARNING_STYLES_INTERPRETATIONS: TAssessmentTemplatePreset["interpretations"] = [
  {
    dimensionKey: "V",
    ranges: [
      {
        min: 0,
        max: 6,
        label: "Low Visual",
        description:
          "You do not strongly rely on visual methods for learning. You may find diagrams and charts helpful but they are not your primary way of absorbing new information. You tend to prefer other sensory channels when processing content.",
        strengths: [
          "Open to multiple learning methods",
          "Not overly dependent on visual aids",
          "Flexible in low-resource settings",
        ],
        blindSpots: [
          "May miss insights that visual formats reveal quickly",
          "Could overlook the value of diagrams in communication",
        ],
        recommendations: [
          "Experiment with mind maps when tackling unfamiliar topics",
          "Use colour coding to organise notes and see if retention improves",
        ],
      },
      {
        min: 7,
        max: 13,
        label: "Moderate Visual",
        description:
          "You have a balanced appreciation for visual learning. Diagrams, charts, and images are useful to you but you also draw on other methods. You can adapt well to training environments that mix visual and non-visual content.",
        strengths: [
          "Comfortable interpreting charts and graphs",
          "Able to switch between visual and other formats",
          "Good at creating simple visual summaries",
        ],
        blindSpots: [
          "May not fully leverage advanced visual tools",
          "Could underestimate how much visuals help your retention",
        ],
        recommendations: [
          "Try converting key concepts into flowcharts before meetings",
          "Use whiteboard sketches during brainstorming sessions",
        ],
      },
      {
        min: 14,
        max: 20,
        label: "Strong Visual",
        description:
          "You strongly prefer visual learning. Diagrams, videos, colour-coded notes, and spatial layouts are your primary tools for understanding and remembering information. You think in pictures and benefit greatly from visual organisation.",
        strengths: [
          "Excellent at interpreting and creating visual materials",
          "Strong spatial reasoning and pattern recognition",
          "Quickly grasps information presented graphically",
        ],
        blindSpots: [
          "May struggle in text-heavy or audio-only environments",
          "Could over-rely on visuals and miss verbal nuances",
        ],
        recommendations: [
          "Pair visual notes with brief written summaries for completeness",
          "When attending audio-only meetings, sketch notes in real time to stay engaged",
        ],
      },
    ],
  },
  {
    dimensionKey: "A",
    ranges: [
      {
        min: 0,
        max: 6,
        label: "Low Auditory",
        description:
          "Listening and verbal discussion are not your preferred learning channels. You may find lectures hard to follow without accompanying visuals or written materials. You tend to process information better through other senses.",
        strengths: [
          "Less distracted by background noise",
          "Good at independent, quiet study",
          "Strong focus in non-verbal tasks",
        ],
        blindSpots: [
          "May miss important verbal cues in meetings",
          "Could seem disengaged during group discussions",
        ],
        recommendations: [
          "Request meeting agendas in advance so you can follow spoken content",
          "Pair audio content with note-taking to reinforce retention",
        ],
      },
      {
        min: 7,
        max: 13,
        label: "Moderate Auditory",
        description:
          "You can learn effectively through listening and discussion, though it is not your dominant preference. You appreciate verbal explanations as a complement to other methods and participate comfortably in group conversations.",
        strengths: [
          "Able to absorb information from discussions",
          "Comfortable in collaborative verbal settings",
          "Can explain concepts clearly to others",
        ],
        blindSpots: [
          "May not retain long lectures without supplementary materials",
          "Could benefit from more active listening techniques",
        ],
        recommendations: [
          "Summarise key points aloud after meetings to reinforce learning",
          "Use podcasts or audio summaries as a secondary study tool",
        ],
      },
      {
        min: 14,
        max: 20,
        label: "Strong Auditory",
        description:
          "You learn best through listening, discussion, and verbal exchange. You retain information well from conversations, lectures, and audio content. Talking through problems is your natural way of processing ideas.",
        strengths: [
          "Excellent listener and verbal communicator",
          "Retains information from conversations and lectures",
          "Effective in brainstorming and group discussion",
        ],
        blindSpots: [
          "May struggle with dense written materials",
          "Could dominate discussions without realising it",
        ],
        recommendations: [
          "Balance verbal processing with written follow-up notes",
          "In text-heavy tasks, read important sections aloud to improve comprehension",
        ],
      },
    ],
  },
  {
    dimensionKey: "R",
    ranges: [
      {
        min: 0,
        max: 6,
        label: "Low Reading/Writing",
        description:
          "Written materials are not your primary learning channel. You may find long documents tedious and prefer to absorb information through other means such as visuals, discussion, or hands-on practice.",
        strengths: [
          "Efficient at extracting key points without reading everything",
          "Comfortable learning without extensive documentation",
          "Adaptable in informal learning settings",
        ],
        blindSpots: [
          "May miss details buried in written documentation",
          "Could struggle with roles that require extensive report reading",
        ],
        recommendations: [
          "Use text-to-speech tools to convert documents into audio",
          "Highlight only key sentences when reviewing written materials",
        ],
      },
      {
        min: 7,
        max: 13,
        label: "Moderate Reading/Writing",
        description:
          "You are comfortable with written materials and use them as one of several learning tools. You can work through documentation effectively and appreciate well-written guides, though you also value other input methods.",
        strengths: [
          "Competent at processing written information",
          "Can produce clear written summaries",
          "Balanced approach to documentation",
        ],
        blindSpots: [
          "May not fully exploit note-taking as a memory aid",
          "Could undervalue the depth that careful reading provides",
        ],
        recommendations: [
          "Try rewriting key concepts in your own words after reading",
          "Maintain a learning journal to consolidate insights from training",
        ],
      },
      {
        min: 14,
        max: 20,
        label: "Strong Reading/Writing",
        description:
          "You strongly prefer learning through text. Reading manuals, taking detailed notes, and writing summaries are your most effective study techniques. You process and retain information best when it is in written form.",
        strengths: [
          "Excellent at detailed note-taking and documentation",
          "Strong written communication skills",
          "Thorough in reviewing written materials",
        ],
        blindSpots: [
          "May over-rely on text and miss visual or experiential insights",
          "Could spend excessive time reading when a quick demo would suffice",
        ],
        recommendations: [
          "Supplement reading with visual diagrams to reinforce understanding",
          "Set time limits for document review to maintain efficiency",
        ],
      },
    ],
  },
  {
    dimensionKey: "K",
    ranges: [
      {
        min: 0,
        max: 6,
        label: "Low Kinesthetic",
        description:
          "Hands-on learning is not your go-to approach. You are comfortable learning through observation, listening, or reading without needing to physically engage with the material. You may prefer conceptual understanding before practical application.",
        strengths: [
          "Can learn effectively from theoretical materials",
          "Comfortable in classroom and lecture settings",
          "Patient with abstract or conceptual topics",
        ],
        blindSpots: [
          "May lack confidence when first applying skills practically",
          "Could benefit from more experiential learning opportunities",
        ],
        recommendations: [
          "Schedule dedicated practice time after absorbing new concepts",
          "Volunteer for pilot projects to build hands-on confidence",
        ],
      },
      {
        min: 7,
        max: 13,
        label: "Moderate Kinesthetic",
        description:
          "You appreciate hands-on learning but do not require it exclusively. You can learn from demonstrations and written materials, though you retain information better when you can practise or apply it relatively soon after learning.",
        strengths: [
          "Balanced between theory and practice",
          "Can adapt to different training formats",
          "Applies learning practically when given the chance",
        ],
        blindSpots: [
          "May become restless in purely theoretical sessions",
          "Could underestimate the value of extended practice",
        ],
        recommendations: [
          "Request hands-on components in training sessions when possible",
          "Create personal practice exercises after learning new concepts",
        ],
      },
      {
        min: 14,
        max: 20,
        label: "Strong Kinesthetic",
        description:
          "You learn best by doing. Physical engagement, hands-on experiments, and real-world practice are essential for you to truly absorb and retain new information. You find it difficult to stay focused in passive learning environments.",
        strengths: [
          "Excellent practical skills and motor memory",
          "Quick to apply new knowledge in real settings",
          "Energetic and action-oriented learner",
        ],
        blindSpots: [
          "May struggle with long lectures or reading-heavy courses",
          "Could rush into action before fully understanding the theory",
        ],
        recommendations: [
          "Pair hands-on practice with brief written summaries to reinforce concepts",
          "Take movement breaks during long theoretical sessions to maintain focus",
        ],
      },
    ],
  },
];

export const LEARNING_STYLES_REPORT_CONFIG: TAssessmentTemplatePreset["reportConfig"] = {
  title: "Learning Styles Assessment Report",
  subtitle: "Understanding your VARK learning preferences",
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

export const LEARNING_STYLES_SCORING_RULES: TAssessmentTemplatePreset["scoringRules"] = {
  method: "variableSum",
  normalizeToPercentage: true,
};

export const LEARNING_STYLES_ASSESSMENT_PRESET: TAssessmentTemplatePreset = {
  type: "custom",
  dimensions: LEARNING_STYLES_DIMENSIONS,
  interpretations: LEARNING_STYLES_INTERPRETATIONS,
  reportConfig: LEARNING_STYLES_REPORT_CONFIG,
  scoringRules: LEARNING_STYLES_SCORING_RULES,
};

/**
 * VARK survey questions.
 *
 * Each question presents 4 options. The respondent picks which
 * approach best describes them. Each choice maps to a VARK dimension.
 * The block logic adds 1 point to the selected dimension's variable.
 */
export const LEARNING_STYLES_QUESTIONS = [
  {
    q: "When learning a new skill, I prefer to...",
    options: [
      { label: "Watch a demonstration or video", dim: "V" },
      { label: "Listen to someone explain the steps", dim: "A" },
      { label: "Read the instruction manual", dim: "R" },
      { label: "Jump in and try it hands-on", dim: "K" },
    ],
  },
  {
    q: "When giving directions to a colleague, I tend to...",
    options: [
      { label: "Draw a map or sketch the route", dim: "V" },
      { label: "Describe the turns and landmarks verbally", dim: "A" },
      { label: "Write out step-by-step directions", dim: "R" },
      { label: "Walk them to the destination myself", dim: "K" },
    ],
  },
  {
    q: "To remember important information, I usually...",
    options: [
      { label: "Visualise it as an image or diagram", dim: "V" },
      { label: "Repeat it aloud to myself", dim: "A" },
      { label: "Write it down in my own words", dim: "R" },
      { label: "Associate it with a physical action or movement", dim: "K" },
    ],
  },
  {
    q: "When preparing for an important presentation, I...",
    options: [
      { label: "Create visual slides with charts and images", dim: "V" },
      { label: "Rehearse by speaking the content aloud", dim: "A" },
      { label: "Write out detailed notes and scripts", dim: "R" },
      { label: "Practise with props or walk through the space", dim: "K" },
    ],
  },
  {
    q: "In a training session, I learn best when the trainer...",
    options: [
      { label: "Uses diagrams, flowcharts, and colour coding", dim: "V" },
      { label: "Explains concepts through discussion and stories", dim: "A" },
      { label: "Provides handouts and reading materials", dim: "R" },
      { label: "Includes hands-on exercises and simulations", dim: "K" },
    ],
  },
  {
    q: "When troubleshooting a problem, I prefer to...",
    options: [
      { label: "Look at a diagram or visual representation of the system", dim: "V" },
      { label: "Talk through the issue with a colleague", dim: "A" },
      { label: "Consult the documentation or reference guide", dim: "R" },
      { label: "Physically test different solutions", dim: "K" },
    ],
  },
  {
    q: "When choosing a new software tool, I would first...",
    options: [
      { label: "Watch a video demo or screenshot tour", dim: "V" },
      { label: "Attend a live walkthrough or webinar", dim: "A" },
      { label: "Read the feature comparison documentation", dim: "R" },
      { label: "Sign up for a free trial and explore it myself", dim: "K" },
    ],
  },
  {
    q: "When explaining a process to a new team member, I...",
    options: [
      { label: "Draw a flowchart or process diagram", dim: "V" },
      { label: "Walk them through it in a conversation", dim: "A" },
      { label: "Send them a written guide or wiki page", dim: "R" },
      { label: "Have them shadow me while I do the task", dim: "K" },
    ],
  },
  {
    q: "When studying for a professional certification, I...",
    options: [
      { label: "Use colour-coded notes and mind maps", dim: "V" },
      { label: "Listen to audio courses or study groups", dim: "A" },
      { label: "Read textbooks and take detailed notes", dim: "R" },
      { label: "Work through practice labs and exercises", dim: "K" },
    ],
  },
  {
    q: "At a conference, I get the most value from...",
    options: [
      { label: "Slides and visual presentations", dim: "V" },
      { label: "Panel discussions and Q&A sessions", dim: "A" },
      { label: "Printed proceedings and detailed papers", dim: "R" },
      { label: "Interactive workshops and live demos", dim: "K" },
    ],
  },
  {
    q: "When I need to understand complex data, I prefer...",
    options: [
      { label: "Charts, graphs, and infographics", dim: "V" },
      { label: "A verbal explanation of the key findings", dim: "A" },
      { label: "A detailed written report with analysis", dim: "R" },
      { label: "Working with the raw data myself in a spreadsheet", dim: "K" },
    ],
  },
  {
    q: "My preferred way to take notes in a meeting is...",
    options: [
      { label: "Sketch diagrams and use visual symbols", dim: "V" },
      { label: "Record the audio and listen back later", dim: "A" },
      { label: "Type or write detailed text notes", dim: "R" },
      { label: "Jot down action items I can immediately work on", dim: "K" },
    ],
  },
  {
    q: "When assembling something new, I prefer to...",
    options: [
      { label: "Look at the pictures and diagrams in the instructions", dim: "V" },
      { label: "Have someone talk me through each step", dim: "A" },
      { label: "Read the written instructions carefully", dim: "R" },
      { label: "Start assembling and refer to instructions only if stuck", dim: "K" },
    ],
  },
  {
    q: "To stay engaged during a long training day, I need...",
    options: [
      { label: "Visual variety like videos, slides, and demonstrations", dim: "V" },
      { label: "Opportunities for group discussion and debate", dim: "A" },
      { label: "Comprehensive reading materials to review at my pace", dim: "R" },
      { label: "Frequent breaks with hands-on activities", dim: "K" },
    ],
  },
  {
    q: "When reviewing a project plan, I focus on...",
    options: [
      { label: "The Gantt chart and visual timeline", dim: "V" },
      { label: "Discussing milestones and dependencies with the team", dim: "A" },
      { label: "Reading the written scope and requirements document", dim: "R" },
      { label: "Walking through each deliverable and testing assumptions", dim: "K" },
    ],
  },
  {
    q: "I find it easiest to recall information that was...",
    options: [
      { label: "Presented in a colourful diagram or chart", dim: "V" },
      { label: "Discussed in a conversation or lecture", dim: "A" },
      { label: "Written in a document I read carefully", dim: "R" },
      { label: "Part of a hands-on exercise I completed", dim: "K" },
    ],
  },
  {
    q: "When onboarding at a new company, I would prefer to...",
    options: [
      { label: "Review organisational charts and visual overviews", dim: "V" },
      { label: "Have introductory meetings and hear about the culture", dim: "A" },
      { label: "Read the employee handbook and policy documents", dim: "R" },
      { label: "Start working on a small task to learn by doing", dim: "K" },
    ],
  },
  {
    q: "My ideal way to receive feedback is...",
    options: [
      { label: "Shown on a dashboard or visual scorecard", dim: "V" },
      { label: "Discussed face-to-face in a conversation", dim: "A" },
      { label: "Written in a detailed email or review document", dim: "R" },
      { label: "Demonstrated through examples of what good looks like", dim: "K" },
    ],
  },
  {
    q: "When planning a team event, I tend to...",
    options: [
      { label: "Create a visual mood board or layout", dim: "V" },
      { label: "Talk through ideas with the group", dim: "A" },
      { label: "Draft a detailed written plan with logistics", dim: "R" },
      { label: "Visit the venue and physically set things up", dim: "K" },
    ],
  },
  {
    q: "The most effective way for me to review my own work is to...",
    options: [
      { label: "Compare it against a visual checklist or template", dim: "V" },
      { label: "Explain it aloud to someone else", dim: "A" },
      { label: "Proofread the written output carefully", dim: "R" },
      { label: "Test it in practice and observe the results", dim: "K" },
    ],
  },
];

/**
 * Generate survey variables for the VARK Learning Styles template.
 */
export function getLearningStylesSurveyVariables() {
  return [
    { id: VAR_V, name: "ls_v", type: "number" as const, value: 0 },
    { id: VAR_A, name: "ls_a", type: "number" as const, value: 0 },
    { id: VAR_R, name: "ls_r", type: "number" as const, value: 0 },
    { id: VAR_K, name: "ls_k", type: "number" as const, value: 0 },
  ];
}

/**
 * Map a VARK dimension key to its survey variable ID.
 */
export function getVariableIdForDimension(dim: "V" | "A" | "R" | "K"): string {
  const map: Record<string, string> = { V: VAR_V, A: VAR_A, R: VAR_R, K: VAR_K };
  return map[dim];
}
