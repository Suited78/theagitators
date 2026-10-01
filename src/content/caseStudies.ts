import type { CaseStudy } from "./types";

export const workIntro = {
  eyebrow: "Selected work",
  headline: "What changed, and how we know.",
  supporting:
    "Recent engagements, written up in the same shape so they can be compared. Clients are de-identified. Every figure comes with a note on where it came from, and what we can’t claim is said plainly.",
} as const;

/**
 * Case studies in display order. Each one gets a card on the homepage and
 * its own page at /work/[slug].
 *
 * Sources: the agency program write-up (June–September 2026) and the
 * travel and tourism case study draft. The travel study is pending partner
 * sign-off; confirm before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "creative-agency-ai-integration",
    sector: "Creative agency",
    headline: "Hours handed back, with the judgement kept human",
    summary:
      "An independent creative agency brought AI into daily operations across both of its businesses in three months, and drew a hard line around the judgement its clients pay for.",
    result: {
      value: "13–16%",
      label: "of repeatable-task time returned in 90 days, against a 10% target",
    },
    glance: {
      client: "Independent creative agency, two business units, 19 people",
      engagement: "Agency-wide AI integration program",
      stages: "Discover, Design, Deliver",
      reached: "Handed over after three months, with 18 of 19 people using it every week",
    },
    situation: [
      "The agency runs two businesses under one roof: a client-services practice covering PR, social, creative production and new business, and a talent management practice. The creative work was strong and the client relationships deep. Almost every recurring process ran by hand.",
      "The brief had two halves. Return at least 10% of the time spent on repeatable tasks. And lift the quality and consistency of everything that reaches a client, so a report or a pitch stopped depending on who wrote it and how much time they had.",
      "The real constraint wasn’t technical. This is an agency that sells human craft, and a program that read internally as “replace the people” would have failed in its first week, whatever it saved.",
    ],
    quote: {
      text: "We are down the very far end of how important humans are to what we sell.",
      attribution: "Managing Director, at the kickoff session",
    },
    approach: [
      "We spent a day on site running six structured sessions across creative, social, talent, new business and leadership, and came out with a costed map of eight processes worth automating.",
      "Before building anything, we wrote down what the system could own and what only a person could. Then we built in three layers: a shared foundation everyone uses daily, four workflows aimed at the largest drains on time, and the governance and people structure that made both stick.",
    ],
    stageTable: [
      {
        stage: "Discover",
        happened:
          "One day on site, six sessions, and a costed map of eight processes. The biggest drain was reporting: 16 hours per client, per month.",
        keeps: "A priced view of where the hours go, before any build spend",
      },
      {
        stage: "Design",
        happened:
          "A Rules of Engagement framework with a signed position on environmental impact and responsible use. A 40-prompt library, client workspaces with brand voice pre-loaded, and a house tone-of-voice skill.",
        keeps: "Governance issued over the Managing Director’s name, and a foundation every new hire starts from",
      },
      {
        stage: "Deliver",
        happened:
          "Outreach pipeline, weekly status, monthly newsletter and client reporting rebuilt. Four role-based training sessions, AI Champions given ownership, daily tips for three months.",
        keeps: "All 16 signed deliverables plus nine builds outside scope, documented for a successor to learn without us",
      },
      {
        stage: "What’s next",
        happened:
          "A scoped next phase. The team has already started writing its own skills, including lead-finding and email-drafting tools nobody asked for.",
        keeps: "The choice of what to build next, and the people to build it",
      },
    ],
    exposed: {
      headline: "The processes looked healthier than they were",
      body: [
        "Reporting meant scrolling each post, reading figures off the screen and typing them into a spreadsheet, then typing the same figures again into a client deck. The data couldn’t simply be piped across. The analytics platform exported PDF and images only at the agency’s tier, extracted numbers came back garbled, and the social platforms block automated collection outright.",
        "Two senior staff raised environmental impact, creative integrity and what this means for junior development early on. Their concerns shaped the Rules of Engagement directly, and the agency issued it in its own name.",
      ],
    },
    line: {
      system: [
        { item: "The date and sender of a reply", note: "Read directly off the email" },
        { item: "A figure visible in a screenshot", note: "Extracted, then flagged if uncertain" },
        { item: "A category matched to a known company", note: "Resolved from existing records, never invented" },
        { item: "A first draft in house style", note: "Applying rules already written down" },
      ],
      person: [
        { item: "Whether a lead is warm, cold or dead", note: "The only commercial judgement on the sheet" },
        { item: "Whether a creator suits a brand", note: "Weights set by the account team" },
        { item: "Whether a story runs this month", note: "One named editor, one editorial pass" },
        { item: "Anything that reaches a client", note: "Every output is a draft until someone approves it" },
      ],
    },
    results: {
      stats: [
        { value: "13–16%", label: "Repeatable-task time returned, against a 10% target" },
        { value: "349", label: "Hours returned in 90 days, about nine working weeks" },
        { value: "18/19", label: "Team members active every week" },
        { value: "1,300", label: "Multi-step working sessions in 90 days" },
      ],
      outcomes: [
        "Every signed deliverable shipped, along with nine builds the team asked for along the way.",
        "Seat use hit 100% within three weeks of kickoff, and new seats were in use within days of being added.",
        "The team now writes its own tools, which is the clearest sign the capability stayed when we left.",
      ],
      evidence:
        "Adoption and time figures come from platform analytics, June to September 2026. Each output type carries a deliberately low minutes-saved assumption, and about a thousand direct actions in connected tools are left out of the total. The percentage assumes repeatable work is a quarter to a third of an 8,900-hour quarter.",
    },
    insight: {
      headline: "Decide what the system isn’t allowed to decide",
      body: "Say it out loud, in writing, before anything is built. In a business whose product is human judgement, that line is what lets AI in at all, and it answers the question the sceptics are really asking.",
    },
  },
  {
    slug: "travel-retailer-knowledge-assistant",
    sector: "Travel & tourism",
    headline: "Enquiries answered in seconds, not minutes",
    summary:
      "A cruise and travel retailer’s consultants now answer brand-specific enquiries from a governed knowledge assistant their own team runs.",
    result: {
      value: "Seconds",
      label: "to answer a brand-specific enquiry, down from minutes, with the source cited",
    },
    glance: {
      client: "Cruise and travel retailer, two consumer brands, about a dozen consultants",
      engagement: "Knowledge management, with replies drafted in two brand voices",
      stages: "Discover, Design, Deliver",
      reached: "Pilot with real consultants on real enquiries. Full rollout is paced to content volume",
    },
    situation: [
      "The retailer runs two consumer brands, with a retail team of about a dozen consultants answering guest enquiries by phone and email. The knowledge behind those answers lived in a sprawling wiki, in shared documents, and in the heads of the most experienced people.",
      "The same fee rule sat in two places with different wording. Retired procedures looked identical to live ones. Consultants hunted through browser tabs while a guest waited, and newer staff escalated to the senior people the business could least afford to interrupt. Every slow or inconsistent answer put a booking at risk.",
    ],
    approach: [
      "We started by spending almost nothing to find out what would be hard. A throwaway prototype, built in days on an export of the wiki and a sample of catalogue data, spoke fluently in both brand voices and invented facts. That priced the real work, grounding and live data, before any real spend.",
      "About seventy per cent of the effort that followed went into the knowledge itself. The AI was the smaller job.",
    ],
    stageTable: [
      {
        stage: "Discover",
        happened: "A throwaway prototype built in days, then a full audit of the knowledge estate",
        keeps: "A priced view of the two hard problems before committing to the build",
      },
      {
        stage: "Design",
        happened:
          "One-topic documents, each with an owner, a status and a review date. Grounding rules set before content volume",
        keeps: "A knowledge structure and governance model that will outlast any single assistant",
      },
      {
        stage: "Deliver",
        happened:
          "Assistant live in Microsoft Teams for a pilot group. Every answer cited, and an evaluation suite run on every change",
        keeps: "A working assistant their team operates, with runbooks that train a new operator in a day",
      },
      {
        stage: "What’s next",
        happened:
          "Full-team rollout as content grows. Customer-facing chat and voice on the same foundation",
        keeps: "The choice of when to extend, at their own pace, without a rebuild",
      },
    ],
    exposed: {
      headline: "The first build showed how deep the problem went",
      body: [
        "The prototype failed in a useful way: perfect tone, invented facts. Retrieval over one monolithic manual can’t be trusted. The first grounded build found more. Rules duplicated with drifted wording, processes nobody had written down, and supplier passwords sitting inside searchable procedures.",
        "So we restructured the knowledge into single-topic documents, made only approved content answerable, and taught the assistant to say “I couldn’t find that” instead of guessing.",
      ],
    },
    line: {
      system: [
        { item: "An answer from approved content", note: "Nothing outside the governed library is answerable" },
        { item: "The source behind every answer", note: "Cited, so a consultant can check it" },
        { item: "A draft reply in either brand voice", note: "Ready for the consultant to send or change" },
        { item: "“I couldn’t find that”", note: "Said plainly when the knowledge isn’t there" },
      ],
      person: [
        { item: "What counts as approved", note: "Content is published by the team, at their pace" },
        { item: "Each document’s accuracy", note: "A named owner, a status and a review date" },
        { item: "What a guest is told", note: "The consultant answers; the assistant informs" },
        { item: "When to extend it", note: "Chat and voice for customers, when the content is ready" },
      ],
    },
    results: {
      stats: [],
      outcomes: [
        "Consultants answer brand-specific enquiries in seconds, not minutes, with the source cited on every answer.",
        "Their team runs and extends the assistant without us. Content, instructions and even the model are theirs to change.",
        "The same governed foundation is built to serve customer-facing chat and voice without a rebuild.",
      ],
      evidence:
        "Adoption rates and before-and-after handling times weren’t baselined, so we don’t report them. The evaluation suite measures answer quality on every change, and this study claims only what that evidence carries.",
    },
    insight: {
      headline: "Refuse to scale the assistant past its knowledge",
      body: "The unglamorous work came first: one topic per document, an owner and a review date on each. It’s why the answers can be trusted. At handover the team had a pilot batch live from a planned library of about seventy documents, and the runbooks to keep publishing on their own.",
    },
  },
];

/** Held slot shown after the published studies until a third is cleared. */
export const workPlaceholder = {
  sector: "Next case study",
  headline: "In preparation",
  summary: "A third engagement is being written up in the same format and will appear here once the client has signed it off.",
} as const;
