import type { NavItem } from "./types";

/**
 * The launch switch. While true, every page asks search engines not to index
 * it and the footer carries a prelaunch notice. Set to false on cutover day.
 */
export const prelaunch = false;

export const site = {
  // Brand guidelines: standard title case, never "AGI" in capitals.
  name: "The Agitators",
  // Browser tab, search result and share titles. The share image pairs it with the hero headline.
  tagline: "Practical AI for businesses",
  positioningLine: "Practical AI for businesses.",
  description:
    "Practical AI for founder-led businesses and SMEs: we find where AI earns its place, build the tools and train your people to run them.",
  email: "info@theagitators.com.au",
  /** Company page: linked from the footer and listed in the structured data. */
  linkedin: "https://www.linkedin.com/company/the-agitators-ai/",
  url: "https://theagitators.com.au",
} as const;

export const nav: NavItem[] = [
  { id: "engage", label: "How we engage" },
  { id: "work", label: "Case studies" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Practical AI for businesses",
  // Founders' review, 21 October 2026: the hero makes the promise; The change makes the case.
  // 22 October: "Past the experiments. Into the everyday work." replaced, as it shut out readers
  // who hadn't started with AI yet.
  headline: ["Wherever you are with AI,", "we’ll help you get further."],
  supporting:
    "From streamlining the work you do now to building what you couldn’t before, we help founder-led businesses, SMEs and teams inside larger organisations put AI to work.",
  primaryCta: { label: "See how we engage", href: "#engage" },
  secondaryCta: { label: "See what we’ve done", href: "#work" },
} as const;

export const finalCta = {
  eyebrow: "Contact",
  headline: "Ready to put AI to work?",
  supporting:
    "Tell us what’s slow, expensive or stuck, and we’ll show you a better way with AI.",
  action: { label: "Start a conversation", subject: "Starting a conversation" },
  alternates: ["Let’s find the leverage.", "Start a conversation.", "Where would you start?"],
} as const;
