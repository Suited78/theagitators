export type NavItem = {
  /** Anchor target, without the leading "#". */
  id: string;
  label: string;
};

export type Audience = {
  id: string;
  title: string;
  description: string;
  /** Short signals of the kind of pressure this audience is under. */
  signals: string[];
};

export type Outcome = {
  id: string;
  title: string;
  description: string;
};

export type Capability = {
  id: string;
  /** Two-digit index rendered as an editorial marker. */
  title: string;
  summary: string;
  detail: string[];
};

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};
export type CaseStudyStage = {
  stage: "Discover" | "Design" | "Deliver" | "What’s next";
  happened: string;
  /** What the client keeps from this stage, whether or not we stay involved. */
  keeps: string;
};

/**
 * One format for every case study, whatever shape the source material
 * arrives in. Optional fields render nothing when absent, so a study with
 * no hard numbers still sits beside one that has them.
 */
export type CaseStudy = {
  /** URL segment: /work/[slug]. */
  slug: string;
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
  photo?: { src: string; alt: string };
};
