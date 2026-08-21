import type { Audience } from "./types";

export const audienceIntro = {
  eyebrow: "Who we help",
  headline: "Organisations small enough to move, big enough for it to matter.",
  supporting:
    "Our sweet spot is roughly ten to a hundred people — where a decision can still change the whole company, and where nobody has a spare transformation department.",
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
    id: "smaller",
    title: "Ambitious smaller organisations",
    description:
      "Teams under a hundred people who want real change, delivered by people who will actually do the work — not a pyramid of consultants.",
    signals: ["No internal transformation team", "Tool sprawl", "Ideas outrunning implementation"],
  },
];
