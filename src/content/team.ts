import type { TeamMember } from "./types";

export const teamIntro = {
  eyebrow: "Who we are",
  headline: "Three practitioners, three angles on the same problem.",
  supporting:
    "Not a pyramid. The people you meet are the people who do the work — which is also the reason we stay small and turn things down.",
} as const;

export const team: TeamMember[] = [
  {
    id: "founder-one",
    name: "Founder One",
    role: "Creative & communications",
    bio: "Placeholder bio. Two decades inside creative and communications businesses, mostly on the side of the work that gets made and the teams who make it.",
    expertise: ["Agency operations", "Client service", "Creative production"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "founder-two",
    name: "Founder Two",
    role: "Media & transformation",
    bio: "Placeholder bio. A background in media businesses and organisational change, with a habit of asking what a process is actually for before improving it.",
    expertise: ["Operating models", "Editorial & content", "Change programmes"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "founder-three",
    name: "Founder Three",
    role: "AI strategy & implementation",
    bio: "Placeholder bio. Builds the things. Spends most of the week close enough to the technology to know what it can’t do yet.",
    expertise: ["AI strategy", "Prototyping", "Internal tooling"],
    linkedin: "https://www.linkedin.com/",
  },
];
