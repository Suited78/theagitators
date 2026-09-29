import type { FlowStep, WorkedExampleStage } from "./types";

/**
 * One illustrative process, carried through the page: the hero shows it
 * before and after, and "How we work" walks it through each step.
 * Hours are elapsed working hours. Every total shown on the page is
 * computed from these rows, so changing a number here changes it everywhere.
 */
export const workedExample = {
  title: "One quote request, start to finish",
  context: "Illustrative example: a 40-person agency answering a client brief.",
  endpoint: "Quote sent",
} as const;

export const beforeFlow: FlowStep[] = [
  { id: "brief", label: "Brief arrives and is logged", owner: "Account lead", hours: 1, kind: "work" },
  { id: "wait-estimator", label: "Waits for the estimator", hours: 12, kind: "wait" },
  { id: "build", label: "Quote built from scratch", owner: "Estimator", hours: 6, kind: "work" },
  { id: "wait-signoff", label: "Waits for sign-off", hours: 8, kind: "wait" },
  { id: "signoff", label: "Director reviews every quote", owner: "Director", hours: 1, kind: "work" },
  { id: "reformat", label: "Reformatted into the house template", owner: "Account lead", hours: 2, kind: "work" },
];

/** The before flow with only the drafting step changed — the thing being trialled. */
export const prototypeFlow: FlowStep[] = [
  beforeFlow[0],
  beforeFlow[1],
  { id: "draft", label: "Draft built from past jobs and the rate card", owner: "AI-assisted", hours: 0.5, kind: "ai" },
  { id: "check", label: "Estimator checks and adjusts", owner: "Estimator", hours: 1.5, kind: "work" },
  beforeFlow[3],
  beforeFlow[4],
  beforeFlow[5],
];

export const afterFlow: FlowStep[] = [
  { id: "brief", label: "Brief arrives and is logged", owner: "Account lead", hours: 0.5, kind: "work" },
  { id: "draft", label: "Draft built from past jobs and the rate card", owner: "AI-assisted", hours: 0.5, kind: "ai" },
  { id: "wait-estimator", label: "Queued for the estimator", hours: 1, kind: "wait" },
  { id: "check", label: "Estimator checks and adjusts", owner: "Estimator", hours: 1.5, kind: "work" },
  { id: "signoff", label: "Director signs off above a set value only", owner: "Director", hours: 0.5, kind: "work" },
];

/** Keyed by process step id — see process.ts. */
export const workedExampleStages: Record<string, WorkedExampleStage> = {
  understand: {
    flow: "before",
    caption: "Mapped as it actually runs, including the waiting nobody writes down.",
  },
  leverage: {
    flow: "before",
    caption: "Four points hold most of the time. Only one of them needs AI.",
    notes: {
      "wait-estimator": "Sits in one inbox",
      build: "Rebuilt every time",
      "wait-signoff": "Every quote, any size",
      reformat: "Done by hand",
    },
  },
  prototype: {
    flow: "prototype",
    caption: "The drafting step is trialled on a handful of live briefs before anything else changes.",
    trial: ["draft", "check"],
  },
  implement: {
    flow: "after",
    caption: "The waits go by rule, not software: sign-off above a set value only, template filled automatically.",
  },
  embed: {
    flow: "after",
    caption: "The team owns the rate card and the rules, and changes them without us.",
    notes: {
      draft: "Rate card owned by ops",
      check: "Estimator trains the next hire",
      signoff: "Threshold reviewed quarterly",
    },
  },
};

export const flows = { before: beforeFlow, prototype: prototypeFlow, after: afterFlow } as const;

export function totals(flow: FlowStep[]) {
  const hours = flow.reduce((sum, step) => sum + step.hours, 0);
  const waiting = flow.filter((step) => step.kind === "wait").reduce((sum, step) => sum + step.hours, 0);
  const owners = flow.filter((step) => step.owner && step.kind !== "ai").map((step) => step.owner);
  const handoffs = owners.filter((owner, i) => i > 0 && owner !== owners[i - 1]).length;
  return { hours, waiting, handoffs };
}

/** The comparison the hero states in words, computed rather than asserted. */
export function savings() {
  const before = totals(beforeFlow);
  const after = totals(afterFlow);
  const saved = before.hours - after.hours;
  const fromWaiting = before.waiting - after.waiting;
  return { saved, fromWaiting };
}

export function formatHours(hours: number) {
  return Number.isInteger(hours) ? `${hours}` : hours.toFixed(1);
}

export function formatDuration(hours: number) {
  return `${formatHours(hours)} ${hours === 1 ? "hr" : "hrs"}`;
}

export function formatHandoffs(count: number) {
  return `${count} ${count === 1 ? "handoff" : "handoffs"}`;
}
