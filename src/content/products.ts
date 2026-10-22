import type { Product } from "./types";

/**
 * Source: the product construct (12 October 2026). Website rules from it:
 * describe the ways we help rather than the matrix, lead with the client's
 * own words, and keep "start with advice, go further when ready". No prices,
 * client names or partner firms. The pack names (Prove, Scale) stay off the
 * site until they're settled; the depths are described in plain words.
 */
export const engageIntro = {
  /** Closes the section: the rules apply to every way in. */
  guardrails: "Every engagement comes with clear rules for how AI is used, so your data, clients and reputation stay safe.",
  eyebrow: "How we engage",
  headline: "Three ways in. Start with the one that sounds like you.",
  lead: "No matter where you are with AI, there’s a way in.",
  supporting:
    "We work with founder-led businesses, SMEs and teams inside larger organisations, on projects large or small. We start with audits, advice, and onboarding. We also build the tools, from a spreadsheet macro to an AI agent, and train your people to run them.",
} as const;

export const products: Product[] = [
  {
    id: "onboarding",
    quote: "We need to get started.",
    name: "AI Onboarding",
    summary:
      "For teams at the beginning. We set up the right tools, agree the rules for using them, and get your people confident with their own work.",
    includes: [
      "Tools chosen and set up for the way you work",
      "Clear rules for safe, responsible use",
      "Training built on your team’s real tasks",
    ],
  },
  {
    id: "efficiency-opportunity",
    quote: "We want to streamline how we work, and build our first agent.",
    name: "AI Efficiency + Opportunity",
    summary:
      "For teams with a few processes that are slow, expensive or stuck, or an idea they couldn’t act on before. We pick the ones worth doing, show them working on your real work, and make them stick.",
    includes: [
      "The processes mapped and costed",
      "Your first agent, built on your own work",
      "The results measured once they’re running",
    ],
  },
  {
    id: "transformation",
    quote: "We want to future-proof our business, with AI baked in.",
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
  prompt: "Tap one to see what’s involved.",
  unsure: "Not sure what’s best for you? We’ll help you to decide.",
} as const;
