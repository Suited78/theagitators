import type { Audience } from "./types";

export const audienceIntro = {
  eyebrow: "Who we help",
  headline: "Organisations ready to move, at a scale where it matters.",
  supporting:
    "We do our best work with leadership teams who want to change how the whole organisation works, whether or not they have a transformation team of their own.",
} as const;

export const audiences: Audience[] = [
  {
    id: "creative",
    title: "Creative & communications businesses",
    description:
      "Agencies and studios working out what AI does to production, operations, client service and the commercial model underneath it all.",
    signals: [
      "Time-based pricing under pressure",
      "Production work commoditising",
      "Teams experimenting in private",
    ],
  },
  {
    id: "media",
    title: "Media businesses",
    description:
      "Publishers and production companies adapting research, content, distribution and the unglamorous internal operations that hold it together.",
    signals: ["Search and referral traffic shifting", "Archive and rights value", "Newsroom capacity"],
  },
  {
    id: "ambitious",
    title: "Ambitious organisations ready to change",
    description:
      "Leadership teams who want real change, delivered by senior people who do the work themselves. No pyramid of consultants.",
    signals: ["Transformation team stretched or missing", "Tool sprawl", "Ideas outrunning implementation"],
  },
];
