/**
 * Agent99 proposal (/agent99-ai): the discovery workshop pitch, from the
 * working deck of 22 October 2026. A private page: shared by link only, kept
 * out of search engines, the sitemap and llms.txt. Prices are indicative and
 * ex GST, as in the deck.
 */

export const proposal = {
  eyebrow: "Agent99 · Proposal · October 2026",
  title: ["A morning to explore Agent99’s", "AI opportunities, and where to begin."],
  lede: "A half-day workshop with the whole team: where AI gives you hours back, where it lets you do more for your clients, and which to start with.",
} as const;

export const squeeze = {
  eyebrow: "The case for change: what’s changing",
  headline: "PR agencies are being squeezed from three sides",
  points: [
    { title: "Clients expect more for less", body: "Retainers are flat. Scope isn’t." },
    {
      title: "AI is doing more of the everyday work",
      body: "Journalists draft and research with it. People ask ChatGPT instead of Googling, so AI now decides which brands get mentioned.",
    },
    { title: "Clients are building it themselves", body: "In-house teams now draft, monitor and report with the same tools you do." },
  ],
} as const;

export const valueShift = {
  eyebrow: "The case for change: where the value is going",
  headline: "Hours in the middle, value at the ends",
  label: "The automation value shift, for a PR agency",
  stages: [
    { zone: "The front", name: "Strategy", items: ["The brief, the category, the angle", "Who the story is for, which outlet gets it"], valuable: true },
    { zone: "The middle", name: "Execution", items: ["Lists, research, drafting, pitching", "Monitoring, coverage logs, reporting"], valuable: false },
    { zone: "The back", name: "Advisory", items: ["Measurement and what it means", "Recommendations, new ideas, new services"], valuable: true },
  ],
  automated: {
    title: "Being automated",
    note: "Clients pay less for it every year.",
    items: [
      "Media list building and journalist research",
      "First-draft releases and pitch adaptation",
      "Coverage monitoring and reporting narratives",
      "Status, WIPs and compilation",
    ],
  },
  valuable: {
    title: "Becoming more valuable",
    note: "Clients pay a premium for it.",
    items: [
      "The angle, and whether it’s ready",
      "Journalist relationships and who gets the story",
      "Measurement that changes a client’s decision",
      "Counsel in the moment: reputation, crisis, the call",
    ],
  },
} as const;

export const advantage = {
  eyebrow: "The case for change: what it means for Agent99",
  headline: "The advantage is how fast you close the gap",
  body: "Every agency will have AI. What a team puts to work moves far more slowly than what the tools can do, and the space between is where the advantage is won or lost, before everyone catches up.",
  moves: [
    {
      title: "Lean into the human",
      body: "Judgement, relationships and real stories are what clients pay a premium for as everything else gets automated. That part is Agent99’s.",
    },
    {
      title: "Activate AI sooner, and better",
      body: "Not more tools. One platform, shared ways of working, first wins in weeks. The advantage is time, measured against the agency next door.",
    },
    {
      title: "Use the scale it gives you",
      body: "Six people with the research, reach and output of a much bigger agency. More briefs won, more stories told, same team.",
    },
  ],
} as const;

export const workshop = {
  eyebrow: "The proposal: the workshop",
  headline: "A morning to explore AI",
  body: "Two and a half hours on site with the whole team. We map Agent99’s work, put the team’s own pain points on it, show what’s possible on the two or three that matter most, and leave with three to start. Lee leads, James and Harris in the room.",
  agenda: [
    { minutes: 20, title: "Where AI is now", body: "What’s changed this year, what it can do for a PR team, what it still can’t." },
    { minutes: 30, title: "Your work on the wall", body: "Agent99’s workflow from brief to coverage report, drawn with the team." },
    {
      minutes: 60,
      title: "Pain points, and what’s possible",
      body: "Each person places the tasks they’d most like to change. For the top two or three, we show what AI does on your kind of brief.",
    },
    { minutes: 40, title: "Sequence and choose", body: "People, tool, content, rules: the slowest sets the pace. Three to start, agreed in the room." },
  ],
  price: "$3,000 + GST, fixed",
  priceNote: "All three of us on the day, pre-work and the readout within a week. Our standard fee for this workshop is $5,000.",
  before: {
    label: "Before the day, 15 minutes each",
    body: "Sharon’s known pain points as bullet points. A four-question survey per person. A ten-minute listen on AI in PR.",
  },
} as const;

export const pathway = {
  eyebrow: "After the workshop",
  headline: "Where the workshop can lead",
  body: "The workshop finds where Agent99 wants to focus. These are the steps that can follow, in the order most teams take them. Nothing beyond the workshop is committed; you choose how far to go, and when.",
  steps: [
    {
      step: "Start",
      name: "Discovery workshop",
      line: "Half a day. Where the hours go, where the growth is, and which to chase first.",
      body: "",
      price: "$3,000 + GST",
    },
    {
      step: "Step 1",
      name: "AI onboarding",
      line: "Get everyone on one tool, properly.",
      body: "One platform on accounts the business controls, a usage policy written with the team, everyone trained to the same level, starter prompts for your work.",
      price: "From $15,000 indicative",
    },
    {
      step: "Step 2",
      name: "AI bootcamp",
      line: "Get real value out of the tool you have.",
      body: "For a team already on a platform. A day on site working through your real tasks, and the prompts and skills to build the next one yourselves.",
      price: "From $15,000 indicative",
    },
    {
      step: "Step 3",
      name: "First agents",
      line: "Two or three things built properly.",
      body: "The top items from the register built and proved on real Agent99 briefs, measured before and after. A first agent where a task calls for one.",
      price: "From $25,000 indicative",
    },
    {
      step: "Step 4",
      name: "Scaling agents",
      line: "AI at the core of how Agent99 runs.",
      body: "Agents through client service, reporting and new business, with a roadmap, training and measurement as you go.",
      price: "From $50,000 indicative",
    },
  ],
  note: "Figures indicative, ex GST. Platform licences are purchased by Agent99 directly.",
} as const;

export const people = {
  eyebrow: "Who you’d be working with",
  headline: "Three operators, not a consultancy",
  members: [
    {
      name: "Lee Robson",
      role: "Co-founder. Leads this engagement",
      photo: "/team/founder-one.webp",
      offset: "purple",
      bio: "A passion for building AI-driven solutions to human problems, informed by 25 years with startups, big brands and agencies, including Foxtel and MullenLowe.",
      focus: "Agency operations, change communications, creative production",
    },
    {
      name: "James Bridges",
      role: "Co-founder",
      photo: "/team/founder-two.webp",
      offset: "mint",
      bio: "25 years running streaming and pay-TV businesses at Amazon and Foxtel, and building start-ups at iflix and iwonder. Now tailors AI to how businesses really work.",
      focus: "Media and streaming, operating models, growth strategy",
    },
    {
      name: "Harris Hutkin",
      role: "Co-founder",
      photo: "/team/founder-three.webp",
      offset: "aubergine",
      bio: "Two decades leading product, data and marketing at Disney, Time Inc, Foxtel and NRMA. Now spends his time taking AI from idea to production and leaving the team able to run it.",
      focus: "AI strategy, knowledge assistants, product and data",
    },
  ],
} as const;

export const nextStep = {
  eyebrow: "Next step",
  headline: ["Pick a morning", "in November."],
  body: "Send us two or three dates that suit the team and we’ll confirm the rest.",
  action: "Send us some dates",
  subject: "Agent99 workshop: dates that suit",
  signoff: "Lee Robson, The Agitators",
} as const;
