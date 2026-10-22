import type { CaseStudyStage, ProcessStep } from "./types";

export const processIntro = {
  headline: "One route, however you start.",
  supporting:
    "Every stage ends with the next one scoped, so you always know what comes next. Stop whenever the answer is clear.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: "start",
    step: "01",
    title: "Start with a conversation",
    stop: "Conversation",
    description:
      "A short questionnaire and a discovery workshop show us where you are, and point you to the right way in.",
    keep: "A recommendation on the right way in.",
  },
  {
    id: "advise",
    step: "02",
    title: "Get advice you can act on",
    stop: "Advice",
    description: "A clear plan for your situation: what to do first, what to leave alone, and what it’s worth.",
    keep: "A plan you can act on, whether or not we stay involved.",
  },
  {
    id: "prove",
    step: "03",
    title: "See it working",
    stop: "See it working",
    description:
      "We build it: a proof of concept, a first use case or the tool that solves the problem, running on your own work with your own people.",
    keep: "Something running on your own work, with your own people.",
  },
  {
    id: "scale",
    step: "04",
    title: "Take it across the business",
    stop: "Across the business",
    description:
      "A full rollout: piloting, refining, training, and the change and communications work that gets people using it every day.",
    keep: "The change rolled out, built properly and handed to your teams.",
  },
  {
    id: "stay",
    step: "05",
    title: "Stay ahead",
    stop: "Stay ahead",
    description:
      "Ongoing support as the tools change, shaped around what you need.",
  },
];

/**
 * Case studies are written in Discover, Design, Deliver and What's next. Each
 * maps to the route's numbered stages above, so a case study can say where it
 * sits on the route. The fit isn't exact (advice spans Discover and Design),
 * so a study's row can override it with its own `route`.
 */
export const caseStudyStageMap: Record<CaseStudyStage["stage"], string[]> = {
  Discover: ["01", "02"],
  Design: ["02"],
  Deliver: ["03", "04"],
  "What’s next": ["05"],
};
