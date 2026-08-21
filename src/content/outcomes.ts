import type { Outcome } from "./types";

export const outcomeIntro = {
  eyebrow: "What changes",
  headline: "What’s different six months later.",
  supporting:
    "Not a strategy deck. A short list of things people inside the business would notice.",
} as const;

export const outcomes: Outcome[] = [
  {
    id: "priorities",
    title: "Clearer priorities",
    description: "A short, argued list of where AI is worth the effort — and where it plainly isn’t.",
  },
  {
    id: "workflows",
    title: "Redesigned workflows",
    description: "Processes rebuilt around what’s now possible, rather than automated versions of the old ones.",
  },
  {
    id: "speed",
    title: "Faster execution",
    description: "Shorter routes from idea to something real, with fewer approval detours in between.",
  },
  {
    id: "repetition",
    title: "Less repetitive work",
    description: "The grinding, low-judgement tasks handled properly, so people spend their time on the rest.",
  },
  {
    id: "capability",
    title: "Internal capability",
    description: "People who can use the tools well, teach each other, and keep improving after we’ve gone.",
  },
  {
    id: "offer",
    title: "New products and services",
    description: "Things you can sell that weren’t practical or profitable to build eighteen months ago.",
  },
  {
    id: "customers",
    title: "Better customer experience",
    description: "Faster answers, sharper work, and fewer places where clients feel the internal friction.",
  },
  {
    id: "decisions",
    title: "More confident decisions",
    description: "A leadership team that can tell hype from leverage without needing a translator.",
  },
];
