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
export type CaseStudy = {
  id: string;
  /** Client or organisation name. Placeholder until real work is cleared. */
  client: string;
  sector: string;
  /** Short teaser shown before the card is expanded. */
  teaser: string;
  challenge: string;
  whatWeDid: string;
  outcome: string;
  /** Optional headline result. Kept deliberately unquantified while illustrative. */
  metric?: { value: string; label: string };
  tags: string[];
  /** Longer expanded description, rendered as paragraphs. */
  detail: string[];
  /** Optional image; when absent the card renders a generated visual. */
  image?: { src: string; alt: string };
  /** Marks the entry as prototype content rather than a real engagement. */
  illustrative: boolean;
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
