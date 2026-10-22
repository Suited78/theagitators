import type { CaseStudy } from "./types";

export const workIntro = {
  eyebrow: "Case studies",
  headline: "Past work, and what it changed.",
  supporting:
    "Case studies from engagements we’ve delivered, each written up the same way so they can be compared. Clients are de-identified, and every figure says where it came from.",
} as const;

/**
 * Case studies in display order. Each one gets a card on the homepage and
 * its own page at /work/[slug].
 *
 * Sources: the agency program write-up (June–September 2026) and the
 * travel and tourism and television distribution case study drafts. All
 * three are drafts until signed off (the television quote also needs the
 * client's approval of its trimmed wording). Set `status: "approved"` once
 * each is cleared; the site reads them through `published.ts`.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "creative-agency-ai-integration",
    status: "approved",
    sector: "Creative agency",
    headline: "Hours handed back, with the judgement kept human",
    summary:
      "An independent creative agency brought AI into daily operations across its businesses in three months, and drew a hard line around the judgement its clients pay for.",
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
        keeps: "A clear view of where the effort goes, before any build started",
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
        "Reporting meant scrolling each post, reading figures off the screen and typing them into a spreadsheet, then typing the same figures again into a client deck. The data couldn’t simply be piped across. The analytics platform exported PDF and images only at the agency’s tier, extracted numbers came back garbled, and the social platforms blocked automated collection outright.",
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
    status: "approved",
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
        route: ["03"],
      },
      {
        stage: "What’s next",
        happened:
          "Full-team rollout as content grows. Customer-facing chat and voice on the same foundation",
        keeps: "The choice of when to extend, at their own pace, without a rebuild",
        route: ["04"],
      },
    ],
    exposed: {
      headline: "The first build showed how deep the problem went",
      body: [
        "The prototype failed in a useful way: perfect tone, invented facts. Retrieval over one monolithic manual can’t be trusted. The first grounded build found more. Rules duplicated with drifted wording, processes nobody had written down, and sensitive operational details sitting inside searchable procedures.",
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
  {
    slug: "television-sales-team-ai-tools",
    status: "approved",
    sector: "Television distribution",
    headline: "A sales team trained, then tooled",
    summary:
      "A multinational television sales team gained new AI skills and fixes across creative, sales activity and finance automation, several of them already delivered.",
    result: {
      value: "3 weeks",
      label: "of on-site discovery, so the team raised problems a single day would have missed",
    },
    glance: {
      client: "International television producer and distributor, sales team of nine",
      engagement: "AI upskilling and tools development, across workflow automation and knowledge management",
      stages: "Discover and Design. Build and handover in progress",
      reached: "Ongoing. One prototype and several automations delivered to date",
    },
    situation: [
      "A sales team of nine sits inside an international television producer and distributor, selling programmes and formats to broadcasters and streamers.",
      "Most of their manual work could already be fixed with the productivity suite they paid for. What they lacked was someone to set those tools up and train the team to use them. Pipeline reporting ran off a spreadsheet kept by hand as a copy of the CRM. Sales admins looked up trailers and imagery by hand. Availability windows lived in tracking sheets, with nothing to tell the team when a title opened up. Format pitches went out as plain text documents.",
    ],
    quote: {
      text: "…accelerated our AI learning, leading to really tangible optimisations for our workflow… we’re using the tools we co-created every day now.",
      attribution: "Executive vice president of distribution",
    },
    approach: [
      "Capability first, build second. Three on-site sessions ran across three weeks rather than one day, so they caught the team at different points in its fortnightly reporting cycle and gave people time to bring up problems they wouldn’t have thought of on the day. The sessions worked on whatever the team brought.",
      "The work falls into workflow automation (alerts, change monitoring, pulling data out of PDFs) and knowledge management (contract queries, and a short context file for each person on the team).",
    ],
    stageTable: [
      {
        stage: "Discover",
        happened:
          "Three on-site sessions. Requirements captured across creative, sales activity and finance automation, each traced to the person who raised it, in two priorities",
        keeps: "A ranked list of problems in the team’s own words",
      },
      {
        stage: "Design",
        happened:
          "Specifications for the highest-priority builds, including hardening the alerting prototype. Scope trimmed where the team could do the work themselves",
        keeps: "Specifications and a delivery plan: two build drops, then an on-site install day",
      },
      {
        stage: "Deliver",
        happened: "In progress. One prototype and several automations delivered to date",
        keeps: "New, automated ways of running what were entrenched manual processes",
        route: ["03"],
      },
      {
        stage: "What’s next",
        happened:
          "Further build drops, then a fourth day on site installing each tool in each person’s environment and testing it on live data",
        keeps: "Tools with plain-language documentation, maintainable without outside help",
        route: ["04"],
      },
    ],
    exposed: {
      headline: "A working demo isn’t a year of running unattended",
      body: [
        "The alerting prototype worked as a demo. It also showed what a year on its own would take: it treated every territory as one list, its lead time was fixed in the code, and it would have failed silently if someone moved a column. So the specification now routes alerts by territory, keeps its settings on a tab anyone can read, and emails the owner when the sheet changes shape.",
        "The scope moved too. One build stopped being separate because it falls out of two others. One became a free specification, because the team could build it themselves. Two builds are waiting on a single missing identifier in a client export.",
      ],
    },
    line: {
      system: [
        { item: "An alert when a title’s availability window opens", note: "Sent by email from the team’s own tracking sheet" },
        { item: "Which territory an alert goes to", note: "Routed by rules on a tab anyone can read" },
        { item: "Noticing the sheet has changed shape", note: "The owner is emailed, instead of the alert failing silently" },
        { item: "Dates pulled from a contract", note: "Extracted from the PDF for the team to use" },
      ],
      person: [
        { item: "What goes on the list", note: "Nothing without a named person who has the problem" },
        { item: "What’s worth paying to build", note: "Some work became a specification the team builds itself" },
        { item: "Lead times and settings", note: "Held where the team can read and change them" },
        { item: "Each tool, once installed", note: "Tested on live data and run by the team" },
      ],
    },
    results: {
      stats: [],
      outcomes: [
        "A prototype sends scheduled availability alerts by email from the team’s own tracking sheet.",
        "Contract date extraction goes to the team as a specification they can build from, rather than a paid build.",
        "Requirements across creative, sales activity and finance automation are specified with plain-language documentation and a handover day on live data, so someone other than the builder can run each one.",
      ],
      evidence:
        "Nothing has been measured, so this study reports no figures. It claims only what has been specified and delivered so far, in an engagement that is still running.",
    },
    insight: {
      headline: "Run discovery longer than a day",
      body: "A team only raises the problems it meets that week. Spreading the sessions over three weeks found what one day would have missed, and nothing went on the list without a named person who had the problem. The team now holds a ranked list, a prototype, several automations and specifications for the rest, and can extend contract extraction themselves. Build and handover continue.",
    },
  },
];
