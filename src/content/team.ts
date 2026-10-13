import type { TeamMember } from "./types";

export const teamIntro = {
  eyebrow: "Who we are",
  headline: "Three practitioners, three angles on the same problem.",
  supporting:
    "Not a pyramid. The people you meet are the people who do the work — which is why we choose our engagements carefully.",
} as const;

export const team: TeamMember[] = [
  {
    id: "founder-one",
    name: "Lee Robson",
    role: "Co-Founder",
    bio: "A passion for building AI-driven solutions to human problems informed by 25 years with startups and major brands.",
    expertise: ["Agency operations", "Client service", "Creative production"],
    // Treatment C: black and white on an offset block of the founder's colour. Rendered once from the original.
    photo: { src: "/team/founder-one.webp", alt: "Portrait of Lee Robson", offset: "purple" },
    linkedin: "https://www.linkedin.com/in/lee-robson-pr/",
  },
  {
    id: "founder-two",
    name: "James",
    role: "Media & transformation",
    bio: "Placeholder bio. A background in media businesses and organisational change, with a habit of asking what a process is actually for before improving it.",
    expertise: ["Operating models", "Editorial & content", "Change programmes"],
    photo: { src: "/team/founder-two.webp", alt: "Portrait of James", offset: "mint" },
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "founder-three",
    name: "Harris",
    role: "AI strategy & implementation",
    bio: "Placeholder bio. Builds the things. Spends most of the week close enough to the technology to know what it can’t do yet.",
    expertise: ["AI strategy", "Prototyping", "Internal tooling"],
    photo: { src: "/team/founder-three.webp", alt: "Portrait of Harris", offset: "aubergine" },
    linkedin: "https://www.linkedin.com/",
  },
];
