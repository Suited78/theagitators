import type { Product } from "./types";

/**
 * Source: the product construct (12 October 2026). Website rules from it:
 * describe the ways we help rather than the matrix, lead with the client's
 * own words, and keep "start with advice, go further when ready". No prices,
 * client names or partner firms. The pack names (Prove, Scale) stay off the
 * site until they're settled; the depths are described in plain words.
 */
export const productIntro = {
  eyebrow: "What we do",
  headline: "Three ways in. Start with advice, go further when you’re ready.",
  supporting:
    "Pick the one that sounds like you. Each starts with advice you can act on and goes as far as you want to take it. Many clients combine them.",
} as const;

export const products: Product[] = [
  {
    id: "onboarding",
    quote: "We need to get started.",
    name: "AI Onboarding",
    summary:
      "For teams at the beginning. We set up the right tools, agree the rules for using them, and get your people confident on their own work.",
    includes: [
      "Tools chosen and set up for the way you work",
      "Clear rules for safe, responsible use",
      "Training built on your team’s real tasks",
    ],
  },
  {
    id: "efficiency",
    quote: "We’ve got one use case to get right.",
    name: "First Efficiency",
    summary:
      "For one process that’s slow, expensive or stuck. We work out what to change, show it working on your real work, and make it stick.",
    includes: [
      "The process mapped and costed",
      "A redesign that uses AI where it earns its place",
      "The saving measured once it’s running",
    ],
  },
  {
    id: "transformation",
    quote: "We’ve got several use cases, or want to find them.",
    name: "AI Transformation",
    summary:
      "For organisations ready to change how several parts of the business work. We find and rank the opportunities, then build the ones worth building.",
    includes: [
      "A workshop and roadmap that ranks the opportunities",
      "A proof of concept on the strongest one",
      "The full build, across the business",
    ],
  },
];

/** How far any product can go. Internally: core, Prove, Scale. */
export const depths = {
  label: "How far each one goes",
  steps: [
    { id: "advice", title: "Advice", description: "A plan you can act on, whether or not we stay involved." },
    { id: "prove", title: "See it working", description: "Running on your own work, with your own people." },
    {
      id: "scale",
      title: "Across the business",
      description: "Rolled out, built properly and handed to the teams who use it.",
    },
  ],
  note: "Products can run side by side, each at its own depth.",
} as const;
