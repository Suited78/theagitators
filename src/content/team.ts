import type { TeamMember } from "./types";

export const teamIntro = {
  eyebrow: "Who we are",
  headline: "Three practitioners, three angles on the same problem.",
  supporting:
    "Not a pyramid. The people you meet are the people who do the work, which is why we choose our engagements carefully.",
} as const;

export const team: TeamMember[] = [
  {
    id: "founder-one",
    name: "Lee Robson",
    role: "Co-Founder",
    bio: "A passion for building AI-driven solutions to human problems, informed by 25 years with startups, big brands, and agencies, including Foxtel and MullenLowe.",
    expertise: ["Agency operations", "Change communications", "Creative production"],
    // Treatment C: black and white on an offset block of the founder's colour. Rendered once from the original.
    photo: { src: "/team/founder-one.webp", alt: "Portrait of Lee Robson", offset: "purple" },
    linkedin: "https://www.linkedin.com/in/lee-robson-pr/",
  },
  {
    id: "founder-two",
    name: "James Bridges",
    role: "Co-Founder",
    bio: "25 years running streaming and pay-TV businesses at Amazon and Foxtel, and building start-ups at iflix and iwonder, now tailoring AI to how businesses really work.",
    expertise: ["Media and streaming", "Operating models", "Growth strategy"],
    photo: { src: "/team/founder-two.webp", alt: "Portrait of James Bridges", offset: "mint" },
    linkedin: "https://www.linkedin.com/in/jamestbridges/",
  },
  {
    id: "founder-three",
    name: "Harris Hutkin",
    role: "Co-Founder",
    bio: "Two decades leading product, data and marketing at Disney, Time Inc, Foxtel and NRMA, now spent taking AI from idea to production and leaving the team able to run it.",
    expertise: ["AI strategy", "Knowledge assistants", "Product and data"],
    photo: { src: "/team/founder-three.webp", alt: "Portrait of Harris Hutkin", offset: "aubergine" },
    // Placeholder until Harris sends his profile URL; the bare domain is skipped in structured data.
    linkedin: "https://www.linkedin.com/",
  },
];
