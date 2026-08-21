import type { Capability } from "./types";

export const capabilityIntro = {
  eyebrow: "What we do",
  headline: "Six capabilities. Assembled to fit, not sold as a package.",
  supporting:
    "Most engagements use three or four of these. The labels matter less than the order they happen in.",
} as const;

export const capabilities: Capability[] = [
  {
    id: "discover",
    title: "Discover",
    summary: "Understand how the organisation actually works — not how the org chart says it does.",
    detail: [
      "Interviews, observation and a look at where time and money genuinely go.",
      "Written up plainly enough that people recognise themselves in it.",
    ],
  },
  {
    id: "prioritise",
    title: "Prioritise",
    summary: "Find where AI creates real value, and say no to the rest out loud.",
    detail: [
      "Opportunities sized against effort, risk and the appetite of the people who’d have to live with them.",
      "A defensible shortlist beats an exhaustive one.",
    ],
  },
  {
    id: "redesign",
    title: "Redesign",
    summary: "Rethink workflows, services, roles and operating models around what’s now possible.",
    detail: [
      "The hard part is rarely the technology. It’s the handoffs, incentives and habits around it.",
      "We design changes that survive contact with a busy week.",
    ],
  },
  {
    id: "build",
    title: "Build",
    summary: "Prototype and implement the systems, workflows and tools that carry the change.",
    detail: [
      "Working things, in the hands of the people who’ll use them, early.",
      "We build what’s genuinely useful and buy the rest.",
    ],
  },
  {
    id: "enable",
    title: "Enable",
    summary: "Develop the internal capability so the change doesn’t depend on us.",
    detail: [
      "Practical training against real work, not generic tool demos.",
      "We look for the people who’ll carry it on and back them.",
    ],
  },
  {
    id: "evolve",
    title: "Evolve",
    summary: "Keep testing, measuring and adjusting as the technology moves underneath you.",
    detail: [
      "A rhythm for reviewing what’s working, retiring what isn’t, and absorbing what’s new.",
      "Technology changes quickly. Capability compounds.",
    ],
  },
];
