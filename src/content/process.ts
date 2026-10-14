import type { ProcessStep } from "./types";

export const processIntro = {
  eyebrow: "How we work",
  headline: "From first conversation to lasting change.",
  supporting:
    "Every stage ends with the next one scoped, so you always know what comes next and why. Stop whenever the answer is clear.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: "start",
    step: "01",
    title: "Start with a conversation",
    stop: "Conversation",
    description:
      "A short questionnaire and a discovery conversation show us where you are, and point you to the right way in.",
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
      "We get it running on your own work, with your own people, so you can judge the value before going further.",
    keep: "Something running on your own work, with your own people.",
  },
  {
    id: "scale",
    step: "04",
    title: "Take it across the business",
    stop: "Across the business",
    description: "We roll out what worked, build what’s needed and train the teams who’ll use it every day.",
    keep: "The change rolled out, built properly and handed to your teams.",
  },
  {
    id: "stay",
    step: "05",
    title: "Stay ahead",
    stop: "Stay ahead",
    description:
      "Ongoing support once the work is done: an annual check-up, quarterly reviews, courses and practical tips as the tools change.",
  },
];
