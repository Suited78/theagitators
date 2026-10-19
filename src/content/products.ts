import type { Product } from "./types";

/**
 * Source: the product construct (12 October 2026). Website rules from it:
 * describe the ways we help rather than the matrix, lead with the client's
 * own words, and keep "start with advice, go further when ready". No prices,
 * client names or partner firms. The pack names (Prove, Scale) stay off the
 * site until they're settled; the depths are described in plain words.
 */
export const engageIntro = {
  eyebrow: "How we engage",
  headline: "Wherever you are with AI, there’s a way in.",
  supporting:
    "We work with founder-led businesses, SMEs and teams inside larger organisations, on projects large or small. Advice is where we start. We also build the tools, from a spreadsheet macro to an AI agent, and train your people to run them.",
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
    id: "enablement",
    quote: "We’ve got one use case to get right.",
    name: "AI Enablement",
    summary:
      "For a critical process that’s slow, expensive or stuck. We work out what to change, show it working on your real work, and make it stick.",
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

/** The chooser's prompt. */
export const productNote = {
  prompt: "Which sounds most like you? Tap one to see what’s involved.",
  unsure: "Not sure? That’s what the first conversation is for.",
} as const;
