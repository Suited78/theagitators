/**
 * Top tips on Getting Ahead with AI (/tips).
 *
 * Source: the shared tips repository (3 October 2026), stripped back after
 * the founders' review of 21 October: no levels or audience switch, short
 * enough to read in about 90 seconds, built around prompts to copy. Linked
 * from the footer, not the top nav. Prompts use [square brackets] for the
 * parts the reader fills in.
 *
 * Tool settings and features change often: recheck tips 05, 12 and 13
 * against each provider's help pages, and update `checkedOn`.
 */

export const checkedOn = "21 October 2026";

export type Topic = "Prompting" | "Safety" | "Knowledge" | "Data" | "Content" | "Building" | "Automation" | "Research";

/** Filter order. */
export const topics: Topic[] = ["Prompting", "Safety", "Knowledge", "Data", "Content", "Building", "Automation", "Research"];

export type ToolSetting = { tool: string; path: string[]; note?: string };

export type Tip = {
  n: number;
  id: string;
  topic: Topic;
  title: string;
  /** What to do and why, in two sentences at most. */
  line: string;
  prompt?: string;
  /** "Try saying" rather than "Try this", for the voice tip. */
  spoken?: boolean;
  settings?: ToolSetting[];
};

export const tipsIntro = {
  eyebrow: "From The Agitators",
  title: "Top tips on Getting Ahead with AI",
  lede: "Quick tips for getting more out of AI at work, each with a prompt you can copy. Read them all in a couple of minutes, or pick a topic.",
} as const;

export const tips: Tip[] = [
  {
    n: 1,
    id: "context",
    topic: "Prompting",
    title: "Context is king",
    line: "Tell it who you are, who you serve and what good looks like, and the answer sounds like yours instead of anyone’s. Save it once in the tool’s custom instructions or a project.",
    prompt:
      "About us: we’re [your business]. We serve [who your customers are]. Our tone is [how you sound]. Here’s an example of work we’re proud of: [paste it]. Keep all of this in mind for everything I ask today.",
  },
  {
    n: 2,
    id: "talk",
    topic: "Prompting",
    title: "Talk, don’t type",
    line: "Tap the microphone and talk for a minute, as if you were briefing a colleague. Talking keeps in the detail you’d cut when typing, and that detail is what makes the answer good.",
    spoken: true,
    prompt:
      "So I need a one-page update by Friday. It’s for [who will read it], they mostly care about [what matters to them], and they’ll read it on their phones, so keep it short and tell them what we should change next.",
  },
  {
    n: 3,
    id: "confirm",
    topic: "Prompting",
    title: "Confirm first",
    line: "It will always answer, even when it has guessed what you meant. A question back costs ten seconds; a wrong first draft costs ten minutes.",
    prompt: "[Your request, including who it’s for and what good looks like.] Before you start, ask me any questions you need answered.",
  },
  {
    n: 4,
    id: "persona",
    topic: "Prompting",
    title: "Give it (and you) a persona",
    line: "Say who it should be, then who you are. An analyst answers differently from a generalist, and pitches it differently for an owner than for an expert.",
    prompt: "You’re an experienced [role]. I’m [who you are and what you already know]. [Your question.]",
  },
  {
    n: 5,
    id: "training",
    topic: "Safety",
    title: "Turn off “train the model”",
    line: "On personal accounts, what you paste in can be used to train future models unless you switch it off. Do it on every account your team uses; business plans usually exclude your data by default, but check.",
    settings: [
      { tool: "ChatGPT", path: ["Settings", "Data controls", "Turn off “Improve the model for everyone”"] },
      { tool: "Claude", path: ["Settings", "Privacy", "Turn off “Help improve Claude”"] },
      {
        tool: "Gemini",
        path: ["Settings & help", "Activity", "Turn off “Keep Activity”"],
        note: "May still be labelled “Gemini Apps Activity”. Chats are kept for up to 72 hours even when it’s off.",
      },
    ],
  },
  {
    n: 6,
    id: "check",
    topic: "Safety",
    title: "Read it before you send it",
    line: "It is wrong with exactly the same confidence as when it’s right. Check every name, number and date, and ask where the figures came from.",
    prompt: "What did you base that on? List each source, and mark anything you estimated.",
  },
  {
    n: 7,
    id: "knowledge",
    topic: "Knowledge",
    title: "Get what’s in people’s heads written down",
    line: "Have each manager talk through their job in a ten-minute voice note, then turn each one into a one-page how-to. AI can then induct new staff and draft things your way.",
    prompt:
      "Here’s a transcript of [name] talking through how they [do the task]: [paste it]. Turn it into a one-page how-to a new starter could follow, with a checklist at the end. Flag anything that depends on their judgement.",
  },
  {
    n: 8,
    id: "forecast",
    topic: "Data",
    title: "Forecast from your own numbers",
    line: "Export two years of weekly figures, with anything that identifies a person removed, and ask what to expect. Forecasting used to need an analyst.",
    prompt:
      "Attached: our weekly [sales or bookings] for the last two years, and what’s coming up in the next eight weeks. What should we expect each week, and what are you basing that on? Flag the weeks you’re least sure about.",
  },
  {
    n: 9,
    id: "newsletter",
    topic: "Content",
    title: "One newsletter becomes five",
    line: "Write it once, then ask for a version for each audience you serve. Same budget, more audiences. Read every version before it goes.",
    prompt:
      "Here’s this month’s newsletter: [paste it]. Rewrite it for [audience one], [audience two] and [audience three]. Keep the facts the same and change what each one leads with.",
  },
  {
    n: 10,
    id: "build",
    topic: "Building",
    title: "Build the little tool yourself",
    line: "Describe a small tool in plain English and let it build it: an afternoon instead of a quote and a wait. Keep it internal until someone technical has checked it.",
    prompt: "Attached is a spreadsheet of [your data]. Build me a simple page that shows [what you want to see], with a chart I can read on my phone.",
  },
  {
    n: 11,
    id: "day-one",
    topic: "Safety",
    title: "Don’t put it in front of customers on day one",
    line: "Test anything customer-facing behind the scenes first. Let staff check its answers for a few weeks, and go live only when you’d happily send every one.",
    prompt:
      "Here are this week’s most common customer questions and the answers our assistant drafted: [paste them]. Mark each one: fine to send, needs a change, or must go to a person. Explain each change.",
  },
  {
    n: 12,
    id: "schedule",
    topic: "Automation",
    title: "Put it on a schedule",
    line: "Set up a task that runs every week without you asking. ChatGPT calls these scheduled tasks, Gemini calls them scheduled actions, and Claude offers them in Cowork; availability depends on your plan.",
    prompt: "Every Monday at 7am, summarise last week’s news in [your industry] and tell me the three things I should know.",
  },
  {
    n: 13,
    id: "research",
    topic: "Research",
    title: "Send it off to do the research",
    line: "Switch on the research mode (Deep Research in ChatGPT and Gemini, Research in Claude) and hand it a question that would take you a day. Then check the sources it cites.",
    prompt:
      "Research how [businesses like ours] have [solved a problem] in the last three years. I’m deciding what to try next. Give me the five approaches with the best evidence, with sources.",
  },
];

export const tipsClose = {
  title: "Want help putting these to work across your team?",
  body: "Tips are where it starts. We help businesses build them into how the work gets done: the right tools, clear rules, and training on your team’s real tasks.",
  action: "Start a conversation",
} as const;
