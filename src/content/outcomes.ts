import type { Outcome } from "./types";

/**
 * Efficiency AI and Opportunity AI: the two outcomes every product is aimed at
 * (founders’ review, 15 October 2026). Guardrails sit under both rather than
 * being a third outcome.
 */
export const outcomeIntro = {
  eyebrow: "Two kinds of AI",
  /** One statement per line. */
  headline: ["Do what you do now, better.", "Do what wasn’t possible before."],
  supporting: "Most businesses start with efficiency. The bigger prize is usually opportunity. We help with both.",
  guardrails: "Both come with clear rules for how AI is used, so your data, clients and reputation stay safe.",
} as const;

export const outcomes: Outcome[] = [
  {
    id: "efficiency",
    title: "Efficiency AI",
    description:
      "The work you already do, faster and with less effort. Hours back from the repeatable tasks, so people spend the week on what they’re good at.",
    legend: ["Repeatable tasks, handed to AI", "Your team’s best work, amplified"],
  },
  {
    id: "opportunity",
    title: "Opportunity AI",
    description:
      "Better client work, delivered faster, and room for services that weren’t practical, or even imagined, until now.",
    legend: ["What you offer today", "Where it can take you"],
  },
];
