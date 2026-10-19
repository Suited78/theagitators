import type { NavItem } from "./types";

/**
 * The launch switch. While true, every page asks search engines not to index
 * it and the footer carries a prelaunch notice. Set to false on cutover day.
 */
export const prelaunch = true;

export const site = {
  // Brand guidelines: standard title case, never "AGI" in capitals.
  name: "The Agitators",
  tagline: "Change is happening. Agitate appropriately.",
  positioningLine: "Practical AI for businesses that move first.",
  description:
    "Practical AI for founder-led businesses and SMEs: we find where AI earns its place, build the tools and train your people to run them.",
  email: "info@theagitators.com.au",
  /** Company page. Leave as the bare domain until it exists; links and structured data skip it. */
  linkedin: "https://www.linkedin.com/",
  url: "https://theagitators.com.au",
} as const;

export const nav: NavItem[] = [
  // Starts at the two kinds of AI, which open the how-we-engage story.
  { id: "ai", label: "How we engage", sections: ["engage"] },
  { id: "work", label: "Case studies" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Practical AI for businesses that move first.",
  headline: ["Change is happening.", "Agitate appropriately."],
  /** Options for the founders to choose between (October 2026 review). */
  headlineAlternates: [
    ["Make AI work for you."],
    ["Change is happening.", "Let’s make it work for you."],
    ["Agitating for", "better work."],
  ],
  supporting:
    "We help founder-led businesses, SMEs and teams inside larger organisations put AI to work: finding where it earns its place, building the tools, and training your people to run them.",
  primaryCta: { label: "See how we engage", href: "#ai" },
  secondaryCta: { label: "See our case studies", href: "#work" },
} as const;

export const finalCta = {
  eyebrow: "Contact",
  headline: "Ready to put AI to work?",
  supporting:
    "Tell us what’s slow, expensive or stuck. If we’re not the right people, we’ll say so and point you somewhere better.",
  action: { label: "Start a conversation", subject: "Starting a conversation" },
  alternates: ["Let’s find the leverage.", "Start a conversation.", "Where would you start?"],
} as const;
