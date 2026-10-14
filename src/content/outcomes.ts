import type { Outcome } from "./types";

/** The three outcomes every product is aimed at (product construct, Part 1). */
export const outcomeIntro = {
  eyebrow: "What changes",
  headline: "Whichever way in, three things change.",
  supporting: "Every engagement is aimed at the same three outcomes, and judged by them.",
} as const;

export const outcomes: Outcome[] = [
  {
    id: "time",
    title: "Save time",
    description: "Hours back from the repeatable work, so people spend the week on what they’re good at.",
  },
  {
    id: "growth",
    title: "Grow the business",
    description: "Better client work, delivered faster, and room for services that weren’t practical before.",
  },
  {
    id: "protection",
    title: "Protect yourself",
    description: "Clear rules for how AI is used, so your data, clients and reputation stay safe as use grows.",
  },
];
