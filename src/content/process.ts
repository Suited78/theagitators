import type { ProcessStep } from "./types";

export const processIntro = {
  eyebrow: "How we work",
  headline: "Five moves, roughly in this order.",
  supporting:
    "It’s a way of working, not a methodology. Engagements skip steps, loop back, and occasionally stop early because the answer turned out to be simple.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    step: "01",
    title: "Understand",
    description:
      "Learn how the business really operates — the work, the workarounds, the bits nobody puts in a process document.",
  },
  {
    id: "leverage",
    step: "02",
    title: "Find the leverage",
    description:
      "Locate the friction that costs the most and the opportunities that would actually move the numbers.",
  },
  {
    id: "prototype",
    step: "03",
    title: "Prototype",
    description:
      "Test the promising ideas in weeks, with real work and real people, instead of writing a large deck about them.",
  },
  {
    id: "implement",
    step: "04",
    title: "Implement",
    description:
      "Turn what worked into workflows and systems people can rely on when we’re not in the room.",
  },
  {
    id: "embed",
    step: "05",
    title: "Embed",
    description:
      "Help teams adopt the new way of working and build the internal capability to keep going.",
  },
];
