import type { NavItem } from "./types";

export const site = {
  // Brand guidelines: standard title case, never "AGI" in capitals.
  name: "The Agitators",
  tagline: "Change is happening. Agitate accordingly.",
  positioningLine:
    "A small consultancy helping smaller organisations redesign how they work — with AI as the lever, not the point.",
  description:
    "The Agitators help creative, communications and media businesses turn AI-era disruption into practical advantage: clearer priorities, better workflows, stronger internal capability.",
  email: "hello@theagitators.example",
  linkedin: "https://www.linkedin.com/",
  url: "https://theagitators.example",
} as const;

export const nav: NavItem[] = [
  { id: "why", label: "Why" },
  { id: "who", label: "Who" },
  { id: "what", label: "What" },
  { id: "how", label: "How" },
  { id: "work", label: "Work" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Transformation consultancy for the AI era",
  headline: ["Change is happening.", "Agitate accordingly."],
  /** Swap-in alternates the founders can argue about. */
  headlineAlternates: [
    ["AI is changing the way", "businesses work.", "We help you change with it."],
    ["Turn AI disruption", "into business advantage."],
    ["Most companies don’t need", "more AI. They need", "a better way to work."],
  ],
  supporting:
    "We work with agencies, media companies and ambitious smaller organisations to redesign how work actually gets done — deciding where AI earns its place, and building the capability to keep going without us.",
  primaryCta: { label: "Explore our approach", href: "#how" },
  secondaryCta: { label: "View our work", href: "#work" },
} as const;

export const finalCta = {
  eyebrow: "Contact",
  headline: "Something worth changing?",
  supporting:
    "Tell us what’s slow, expensive or stuck. If we’re not the right people, we’ll say so and point you somewhere better.",
  action: { label: "Start a conversation", subject: "Starting a conversation" },
  alternates: ["Let’s find the leverage.", "Start a conversation.", "Where would you start?"],
  note: "Prototype site — this address is a placeholder.",
} as const;
