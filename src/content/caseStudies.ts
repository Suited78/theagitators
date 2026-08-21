import type { CaseStudy } from "./types";

export const workIntro = {
  eyebrow: "Selected work",
  headline: "Proof, eventually. Placeholders for now.",
  supporting:
    "The three entries below are written to test the format, not to describe real engagements. Client names, sectors and results are invented and clearly marked as such until we have work we can publish.",
  /** Rendered as a standing notice above the list. */
  notice: "Illustrative examples — prototype content, not real client results.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    id: "independent-agency",
    client: "Independent creative agency",
    sector: "Creative · ~45 people",
    teaser:
      "A production team spending more time assembling deliverables than making the work in them.",
    challenge:
      "Placeholder: an agency whose margin was quietly eroding on delivery, not on ideas — with every team solving the same problems in a different tool.",
    whatWeDid:
      "Placeholder: mapped where studio hours actually went, rebuilt three high-volume production workflows around AI-assisted steps, and set a standard for what gets reviewed by a human and when.",
    outcome:
      "Placeholder: the same team handling a larger slate without extra headcount, and a pricing conversation that no longer depends on hours.",
    metric: { value: "—", label: "Headline metric pending a client result we can publish" },
    tags: ["Workflow redesign", "Production", "Commercial model"],
    detail: [
      "This entry exists so the founders can judge the expanded layout: how much room the story needs, whether the challenge / what we did / outcome split holds up, and how a headline metric should sit alongside it.",
      "When real work is cleared for publication, this becomes a genuine engagement with a named client, an approved result and — where the client allows it — a named contact who can vouch for it.",
      "Until then, treat every number and claim on this page as prototype furniture.",
    ],
    illustrative: true,
  },
  {
    id: "specialist-publisher",
    client: "Specialist publisher",
    sector: "Media · ~70 people",
    teaser:
      "Twenty years of archive that nobody could search, sitting next to an editorial team short on time.",
    challenge:
      "Placeholder: a publisher whose most valuable asset — its back catalogue — was effectively invisible to its own journalists and its audience.",
    whatWeDid:
      "Placeholder: prototyped an internal research assistant over the archive, redesigned the commissioning process around it, and trained the desk to use it without outsourcing their judgement.",
    outcome:
      "Placeholder: faster research, more reuse of existing material, and a clearer view of which formats were worth continuing.",
    metric: { value: "—", label: "Headline metric pending a client result we can publish" },
    tags: ["Archive", "Editorial workflow", "Internal tooling"],
    detail: [
      "A second placeholder, deliberately different in shape from the first: one internal tool, one process change, one capability question.",
      "It’s here to test whether the card format handles engagements where the visible output is a tool rather than an operating-model change.",
      "All names, figures and outcomes are invented.",
    ],
    illustrative: true,
  },
  {
    id: "b2b-services",
    client: "B2B services firm",
    sector: "Professional services · ~25 people",
    teaser:
      "A leadership team with forty AI ideas, no way to rank them, and a board asking for a plan.",
    challenge:
      "Placeholder: plenty of enthusiasm and several stalled pilots, but no shared view of which opportunities were worth real investment.",
    whatWeDid:
      "Placeholder: ran a short diagnostic, sized the opportunities against effort and risk, killed most of them, and built the two that survived.",
    outcome:
      "Placeholder: a twelve-month roadmap the leadership team could defend, and two changes already in use rather than in a slide.",
    metric: { value: "—", label: "Headline metric pending a client result we can publish" },
    tags: ["Diagnostic", "Prioritisation", "Roadmap"],
    detail: [
      "The third placeholder covers the shortest engagement type — a few weeks of prioritisation rather than a long build.",
      "It’s included to check that the format doesn’t make small pieces of work look thin next to longer ones.",
      "Invented throughout.",
    ],
    illustrative: true,
  },
];
