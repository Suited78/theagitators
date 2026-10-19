/**
 * The Field Guide to Getting Ahead with AI (/field-guide).
 *
 * Source: the shared tips repository (3 October 2026). Not linked from the
 * nav; handed out by link and QR code, but crawlable. Every tip is still
 * proposed in the repository, so wording here is open to change.
 *
 * Examples switch between the first two audiences: cinema (the Australian
 * International Movie Convention) and health and wellness (the Health and
 * Wellness summit). Keep internal notes from the repository off the page.
 */

export type Industry = "cinema" | "health";
export type LevelId = "ask" | "assist" | "act";
/** The same language as Two kinds of AI on the home page. */
export type Theme = "Efficiency" | "Opportunity" | "Guardrails";

export const industries: { id: Industry; label: string; short: string }[] = [
  { id: "cinema", label: "Cinema", short: "Cinema" },
  { id: "health", label: "Health and wellness", short: "Health" },
];

/** When tool settings and features were last checked against each provider's help pages. */
export const checkedOn = "19 October 2026";

export const guideIntro = {
  eyebrow: "A field guide from The Agitators",
  title: "The Field Guide to Getting Ahead with AI",
  subtitle: "Ask. Assist. Act. Thirteen habits from the teams getting it right.",
  lede: "Most people use AI the way they use a search engine: one question, one answer, move on. The teams pulling ahead use it differently, and the difference comes down to habits anyone can learn. This guide sorts them into three levels, so you can see where you are and what to try next.",
} as const;

export const levels: { id: LevelId; name: string; line: string; scene: string }[] = [
  {
    id: "ask",
    name: "Ask",
    line: "You ask, it answers.",
    scene: "Where almost everyone starts. A question goes in, an answer comes out. These six habits make the answers sharper, more like yours, and safer to use.",
  },
  {
    id: "assist",
    name: "Assist",
    line: "It works with your own material and thinking.",
    scene: "Your documents, your numbers, your know-how. At this level AI stops answering in general and starts working on your business.",
  },
  {
    id: "act",
    name: "Act",
    line: "It goes and does it without you.",
    scene: "Tasks that run on a schedule, research that happens while you're in a meeting, and agents that talk to customers. The biggest gains, and the most care needed.",
  },
];

export type ToolSetting = { tool: string; path: string[]; note?: string };

export type Tip = {
  n: number;
  id: string;
  level: LevelId;
  theme: Theme;
  title: string;
  /** One line: the habit. */
  what: string;
  why: string;
  how: string;
  /** A line worth quoting on the card front. */
  pull?: string;
  /** A prompt to copy, per audience. */
  prompt?: Record<Industry, string>;
  /** An audience-specific note under the how. */
  note?: Record<Industry, string>;
  /** Where the setting lives, for tips that depend on one. */
  settings?: ToolSetting[];
  /** The old way, struck through, then the habit in practice: each entry's typographic moment. */
  before: string;
  after: string;
};

export const tips: Tip[] = [
  {
    n: 1,
    id: "context",
    level: "ask",
    theme: "Efficiency",
    title: "Context is king",
    what: "Tell it who you are, what you’re doing and what good looks like.",
    why: "Without context you get a smart, generic answer that could be for any business in the world. With it, the answer sounds like yours.",
    how: "Write a short “about us” once: your business, your audience, your tone, and one example of work you’re proud of. Paste it at the start of a chat, or save it in the tool’s custom instructions or a project so it’s there every time.",
    pull: "AI is the smartest new starter you’ll ever hire. It just turned up this morning.",
    prompt: {
      cinema:
        "About us: we’re an independent three-screen cinema in a regional town. Our audience is families on weekends and film lovers midweek. Our tone is warm, local and a little cheeky. Here’s a newsletter we were proud of: [paste it]. Keep all of this in mind for everything I ask today.",
      health:
        "About us: we’re a physiotherapy and Pilates studio with two clinics. Most of our clients are active people in their 30s to 60s getting back from an injury. Our tone is encouraging and clear, never preachy. Here’s a client email we were proud of: [paste it]. Keep all of this in mind for everything I ask today.",
    },
    before: "Write me a newsletter.",
    after: "Write our newsletter. Here’s who we are, who reads it, and one we were proud of.",
  },
  {
    n: 2,
    id: "talk",
    level: "ask",
    theme: "Efficiency",
    title: "Talk, don’t type",
    what: "Speak to it instead of typing.",
    why: "When you type, you cut yourself down to keywords, the way search engines trained us to. When you talk, you ramble, and the detail you’d have edited out is often what makes the answer good.",
    how: "Tap the microphone in the app and talk for a minute or two, as if you were briefing a colleague. Don’t tidy it up.",
    prompt: {
      cinema:
        "So I need a one-page report by Friday. It’s for the owners. They mostly care whether the school holidays beat last year, and they hate long tables, so keep it to the three things that changed and what we’d do differently next time.",
      health:
        "So I need a one-page report by Friday. It’s for the practice partners. They mostly want to know whether the new Pilates classes are filling, and they’ll read it on their phones, so keep it short and tell them what we should change next term.",
    },
    before: "report friday owners summary",
    after: "So the report’s for the owners on Friday, and what they really care about is…",
  },
  {
    n: 3,
    id: "confirm",
    level: "ask",
    theme: "Efficiency",
    title: "Confirm first",
    what: "Get it to check it has understood before it starts.",
    why: "It will always give you an answer, even when it has guessed what you meant. A question back costs ten seconds. A wrong first draft costs ten minutes.",
    how: "Say what it’s for, who will read it, what good looks like and what to avoid. Then end your request with “Before you start, ask me any questions you need answered.”",
    prompt: {
      cinema:
        "Draft a staff roster for the school holiday fortnight. It’s for our six casuals, it has to cover two sessions a day, and nobody works more than five days in a row. Before you start, ask me any questions you need answered.",
      health:
        "Draft a welcome email for new Pilates clients. It’s for people who have never done Pilates, it should take under a minute to read, and it mustn’t sound like a sales pitch. Before you start, ask me any questions you need answered.",
    },
    before: "Draft the roster.",
    after: "Draft the roster. Before you start, ask me anything you need to know.",
  },
  {
    n: 4,
    id: "persona",
    level: "ask",
    theme: "Efficiency",
    title: "Give it (and you) a persona",
    what: "Tell it who to be, and who it’s talking to.",
    why: "The same question gets a very different answer from an analyst than from a generalist, and it’s pitched differently for an owner than for an expert. The second half, saying who you are, is the one most people skip.",
    how: "Start with who it should be. Then say who you are and what you already know.",
    prompt: {
      cinema:
        "You’re an experienced box office analyst. I’m a cinema owner with a handful of sites and no data team. Which three numbers should I look at every Monday, and why?",
      health:
        "You’re an experienced practice manager for allied health clinics. I own a two-clinic physio practice with no admin team. What should I look at first to bring our no-show rate down?",
    },
    before: "What should I look at every Monday?",
    after: "You’re a seasoned analyst. I’m an owner with no data team. What should I look at every Monday?",
  },
  {
    n: 5,
    id: "training",
    level: "ask",
    theme: "Guardrails",
    title: "Turn off “train the model”",
    what: "Stop the provider using your conversations to improve its models.",
    why: "On personal accounts, anything you paste in can be used to train future models unless you switch it off. It takes a minute, and there’s no other guardrail.",
    how: "Find the setting in each tool you use, switch it off, and do the same on every account your team uses. Business and enterprise plans usually exclude your data from training by default, but check your agreement.",
    note: {
      cinema: "Include the shared logins and the duty manager’s phone. A setting only protects the account it’s switched off on.",
      health:
        "Health information is sensitive information under the Privacy Act. Even with training switched off, keep client and patient details out of personal accounts altogether.",
    },
    settings: [
      { tool: "ChatGPT", path: ["Settings", "Data controls", "Turn off “Improve the model for everyone”"] },
      { tool: "Claude", path: ["Settings", "Privacy", "Turn off “Help improve Claude”"] },
      {
        tool: "Gemini",
        path: ["Settings & help", "Activity", "Turn off “Keep Activity”"],
        note: "May still be labelled “Gemini Apps Activity”. Chats are kept for up to 72 hours even when it’s off.",
      },
    ],
    before: "Anything I paste in can train the next model.",
    after: "Training is off. My conversations stay mine.",
  },
  {
    n: 6,
    id: "check",
    level: "ask",
    theme: "Guardrails",
    title: "Read it before you send it",
    what: "Check everything it produces before it goes anywhere.",
    why: "It is wrong with exactly the same confidence as when it’s right. Names, numbers and dates are where it slips most.",
    how: "Treat it as a first draft from a keen junior. Check every name, number and date. For anything with figures, ask what it based them on.",
    prompt: {
      cinema: "What did you base those figures on? List each source, and mark anything you estimated.",
      health: "What did you base those claims on? List each source, and mark anything you estimated.",
    },
    note: {
      cinema: "Session times, classifications and prices are the ones to check before anything reaches the website.",
      health:
        "Check every health claim. Advertising rules for health services are strict, and the tool doesn’t know which ones apply to you.",
    },
    before: "Looks right. Send.",
    after: "Every name, number and date checked. Then send.",
  },
  {
    n: 7,
    id: "knowledge",
    level: "assist",
    theme: "Opportunity",
    title: "Get what’s in people’s heads written down",
    what: "Capture how your business actually runs, so AI can work from it.",
    why: "Most of what makes a business work lives in the heads of a few long-serving people. Once it’s written down, AI can induct new staff, answer their questions and draft things your way. It also protects you when those people leave.",
    how: "Ask each manager to talk through their job for ten minutes into a voice note. Have AI turn each one into a one-page how-to. Keep them together in a project, so habit 01’s induction is already done.",
    prompt: {
      cinema:
        "Here’s a transcript of our duty manager talking through how she closes the building at night: [paste it]. Turn it into a one-page how-to a new starter could follow, with a checklist at the end. Flag anything that depends on her judgement.",
      health:
        "Here’s a transcript of our practice manager talking through how she onboards a new clinician: [paste it]. Turn it into a one-page how-to the next person could follow, with a checklist at the end. Flag anything that depends on her judgement.",
    },
    note: {
      cinema: "Start with the jobs only one person knows how to do.",
      health: "Keep it to how the practice runs. Clinical decisions stay with clinicians, and client details stay out.",
    },
    before: "Ask Sue. She’s the only one who knows how it works.",
    after: "It’s written down, so anyone can do it, and so can AI.",
  },
  {
    n: 8,
    id: "forecast",
    level: "assist",
    theme: "Opportunity",
    title: "Forecast from your own numbers",
    what: "Use your own history to plan stock, staff and demand.",
    why: "Most businesses order and roster on gut feel and last year’s memory. Forecasting used to need an analyst. Now you can ask questions of your own numbers.",
    how: "Export two years of weekly figures into a spreadsheet, with anything that identifies a person removed. Add what’s coming up. Then ask what to expect, and what it’s basing that on.",
    prompt: {
      cinema:
        "Attached: our weekly candy bar sales for the last two years, and the release schedule for the next eight weeks. What should we expect to sell each week, and what are you basing that on? Flag the weeks you’re least sure about.",
      health:
        "Attached: our weekly bookings by service for the last two years, with client details removed, and the school holiday dates for next term. What should we expect each week, and what are you basing that on? Flag the weeks you’re least sure about.",
    },
    note: {
      cinema: "Sales by product and week is enough. Leave out anything that identifies a customer.",
      health: "Bookings by service and week is enough. Leave out names, contact details and anything clinical.",
    },
    before: "Feels like a big week. Order extra?",
    after: "Here’s what to expect each week, and why.",
  },
  {
    n: 9,
    id: "newsletter",
    level: "assist",
    theme: "Opportunity",
    title: "One newsletter becomes five",
    what: "Tailor one piece of content for each audience you serve.",
    why: "You send one version to everyone because writing five was never affordable. Now it is. Same budget, more audiences.",
    how: "Write the newsletter once. Then ask for a version for each audience, keeping the facts the same and changing what it leads with. Read every version before it goes (habit 06).",
    prompt: {
      cinema:
        "Here’s this month’s newsletter: [paste it]. Rewrite it three ways: for families with young kids, for seniors, and for film buffs. Keep the facts the same and change what each one leads with.",
      health:
        "Here’s this month’s newsletter: [paste it]. Rewrite it three ways: for new mums returning to exercise, for over-60s, and for weekend athletes. Keep the facts the same and change what each one leads with.",
    },
    note: {
      cinema: "Start with your two biggest audiences and see which version gets more replies.",
      health: "Check the health claims in every version, not just the first.",
    },
    before: "One newsletter for everyone.",
    after: "One newsletter, five versions, each for the people reading it.",
  },
  {
    n: 10,
    id: "build",
    level: "assist",
    theme: "Opportunity",
    title: "Build the little tool yourself",
    what: "Describe a small tool in plain English and let AI build it for you.",
    why: "Things that used to need a developer, a quote and a wait can now be done in an afternoon by the person who needs them.",
    how: "Attach your spreadsheet and describe the page you want: what it shows, who reads it and where. Keep it internal, and don’t connect it to customer data until someone technical has checked it.",
    prompt: {
      cinema:
        "Attached is a spreadsheet of our weekly box office by site. Build me a simple page that compares each site’s week with the national top ten, with a chart I can read on my phone.",
      health:
        "Attached is a spreadsheet of our weekly bookings by clinician, with client details removed. Build me a simple page that shows how full each clinician’s week was, with a chart I can read on my phone.",
    },
    before: "We’ll get a quote. Twelve weeks, minimum.",
    after: "I built it this afternoon.",
  },
  {
    n: 11,
    id: "day-one",
    level: "act",
    theme: "Guardrails",
    title: "Don’t put it in front of customers on day one",
    what: "Test anything customer-facing behind the scenes before it goes live.",
    why: "An AI talking to customers on its own is the highest-stakes use there is. Mistakes are public, and they cost trust.",
    how: "Run it behind the counter first. Let staff see and check its answers for a few weeks. Only let it talk to customers once you’d be happy for any of those answers to go out.",
    prompt: {
      cinema:
        "Here are this week’s 20 most common customer questions and the answers our assistant drafted for each: [paste them]. Mark each one: fine to send as is, needs a change, or must go to a person. Explain each change.",
      health:
        "Here are this week’s 20 most common client enquiries and the answers our assistant drafted for each: [paste them]. Mark each one: fine to send as is, needs a change, or must go to a person. Explain each change.",
    },
    note: {
      cinema: "Start with the questions you answer a hundred times a week: session times, parking, access.",
      health:
        "Never let it give health advice. Keep it to bookings, opening hours and directions, and hand anything clinical to a person.",
    },
    before: "Switch it on for customers on Saturday.",
    after: "Run it behind the counter first. Go live when every answer is one you’d send.",
  },
  {
    n: 12,
    id: "schedule",
    level: "act",
    theme: "Efficiency",
    title: "Put it on a schedule",
    what: "Set up a task that runs every week without you asking.",
    why: "This is the first step from AI that answers to AI that works while you’re doing something else.",
    how: "ChatGPT calls these scheduled tasks, Gemini calls them scheduled actions, and Claude offers them in Cowork. Availability depends on your plan. Ask for the task in plain words, including when it should run.",
    prompt: {
      cinema:
        "Every Monday at 7am, summarise the weekend’s box office and the week’s trade news, and tell me the three things I should know.",
      health:
        "Every Monday at 7am, summarise last week’s news for allied health practices, including any regulation changes, and tell me the three things I should know.",
    },
    before: "Must remember to check the news on Monday.",
    after: "Monday, 7am: the briefing is already waiting.",
  },
  {
    n: 13,
    id: "research",
    level: "act",
    theme: "Opportunity",
    title: "Send it off to do the research",
    what: "Hand it a question that would take you a day, and let it work while you do something else.",
    why: "The research modes in the main assistants read dozens of sources and come back with a report and its citations. A question you’d never have found a spare day for gets answered over lunch.",
    how: "Switch on the research mode (Deep Research in ChatGPT and Gemini, Research in Claude). Ask one specific question, say what you’ll use the answer for, then check the sources it cites (habit 06).",
    prompt: {
      cinema:
        "Research how independent cinemas in Australia and the UK have grown midweek attendance in the last three years. I’m deciding what to trial across our three screens next year. Give me the five approaches with the best evidence, with sources.",
      health:
        "Research how allied health practices in Australia have reduced appointment no-shows in the last three years. I’m deciding what to trial across our two clinics. Give me the five approaches with the best evidence, with sources.",
    },
    before: "I’ll look into it when I get a spare day.",
    after: "Researched over lunch, with sources.",
  },
];

/** "Where are you now?" Three yes-or-no questions; the highest yes sets the level. */
export const quiz: { q: string; yes: LevelId }[] = [
  { q: "Do you use an AI assistant at least once a week?", yes: "ask" },
  { q: "Have you given it your own files, notes or numbers to work from?", yes: "assist" },
  { q: "Does anything run on AI without you starting it each time?", yes: "act" },
];

export const quizResults: Record<LevelId | "start", { title: string; body: string; tip: number }> = {
  start: {
    title: "Start at Ask",
    body: "You’re in good company: most people are here. Begin with the first habit, context, and the rest of Ask will follow quickly.",
    tip: 1,
  },
  ask: {
    title: "You’re at Ask",
    body: "You’re using it, so the gains now come from using it well. Confirm first and the persona habit will change your answers this week.",
    tip: 3,
  },
  assist: {
    title: "You’re at Assist",
    body: "It’s working with your material. The next step is getting your team’s know-how written down, so it can do far more with it.",
    tip: 7,
  },
  act: {
    title: "You’re at Act",
    body: "You’re ahead of most businesses. The habit that matters most now is the one that keeps it safe in front of customers.",
    tip: 11,
  },
};

export const briefBuilder = {
  title: "Write your brief once",
  lede: "The first habit, done in two minutes. Fill this in, copy it, and paste it at the start of any chat or save it in your tool’s custom instructions.",
  fields: {
    business: { label: "Your business", placeholder: { cinema: "An independent three-screen cinema in a regional town", health: "A physiotherapy and Pilates studio with two clinics" } },
    audience: { label: "Who you serve", placeholder: { cinema: "Families on weekends, film lovers midweek", health: "Active people in their 30s to 60s getting back from injury" } },
    tone: { label: "How you sound", placeholder: { cinema: "Warm, local, a little cheeky", health: "Encouraging and clear, never preachy" } },
    proud: { label: "Something you’re proud of", placeholder: { cinema: "Our school holidays newsletter", health: "Our new-client welcome email" } },
  },
} as const;

export const guideClose = {
  title: "Want help getting your team from Ask to Act?",
  body: "Habits are where it starts. We help businesses build them into how the work gets done: the right tools, clear rules, and training on your team’s real tasks.",
  action: "Start a conversation",
} as const;
