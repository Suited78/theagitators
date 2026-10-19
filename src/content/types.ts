export type NavItem = {
  /** Anchor target, without the leading "#". */
  id: string;
  label: string;
  /** Further section ids that keep this item highlighted while in view. */
  sections?: string[];
};

export type Outcome = {
  id: string;
  title: string;
  description: string;
  /** Labels for the two parts of the section's illustration. */
  legend?: [string, string];
};

export type Product = {
  id: string;
  /** The client's own words: how they'd describe needing this. */
  quote: string;
  name: string;
  summary: string;
  /** Three short lines on what's typically involved. */
  includes: string[];
};

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  /** Short name for the route map's stop. */
  stop: string;
  description: string;
  /** What the client leaves with if they stop after this stage. */
  keep?: string;
};
export type CaseStudyStage = {
  stage: "Discover" | "Design" | "Deliver" | "What’s next";
  happened: string;
  /** What the client keeps from this stage, whether or not we stay involved. */
  keeps: string;
  /** Route stages this row covers, where the default map in process.ts doesn't fit. */
  route?: string[];
};

/**
 * One format for every case study, whatever shape the source material
 * arrives in. Optional fields render nothing when absent, so a study with
 * no hard numbers still sits beside one that has them.
 */
export type CaseStudy = {
  /** URL segment: /work/[slug]. */
  slug: string;
  /**
   * Partner and client sign-off. Drafts show on the preview while the site is
   * prelaunch, and are left out of the live site once it launches.
   */
  status: "draft" | "approved";
  sector: string;
  /** Outcome-led, short enough for the homepage card. */
  headline: string;
  /** One sentence: who, what changed. */
  summary: string;
  /** The single result shown on the homepage card and the page hero. */
  result: { value: string; label: string };
  glance: {
    client: string;
    engagement: string;
    stages: string;
    reached: string;
  };
  situation: string[];
  quote?: { text: string; attribution: string };
  approach: string[];
  stageTable: CaseStudyStage[];
  /** What surfaced once the work started. */
  exposed: { headline: string; body: string[] };
  /** Where the system's authority stops and a person's starts. */
  line: { system: { item: string; note: string }[]; person: { item: string; note: string }[] };
  results: {
    stats: { value: string; label: string }[];
    outcomes: string[];
    /** How the numbers were produced, and what the study does not claim. */
    evidence: string;
  };
  insight: { headline: string; body: string };
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  /** Optional headshot; falls back to an initials plate. */
  /**
   * `offset` sets the photo over a block of that brand colour, offset down
   * and to the right (portrait treatment C).
   */
  photo?: { src: string; alt: string; offset?: "aubergine" | "purple" | "mint" };
};
