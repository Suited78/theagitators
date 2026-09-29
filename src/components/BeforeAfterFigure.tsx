"use client";

import { useEffect, useRef, useState } from "react";
import {
  afterFlow,
  beforeFlow,
  formatDuration,
  formatHandoffs,
  formatHours,
  savings,
  totals,
  workedExample,
} from "@/content/workedExample";
import type { FlowStep } from "@/content/types";
import { Legend, fillFor } from "./flowMarks";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type View = "before" | "after";

/**
 * Every step from both flows, in an order that is correct for each: a step
 * missing from the current flow just collapses to zero width, so switching
 * views reads as the same process being rebuilt rather than a new chart.
 * Derived by merging the two sequences, so editing either flow keeps it valid.
 */
function mergeOrder(...sequences: FlowStep[][]): string[] {
  const seen: string[] = [];
  const mustFollow = new Map<string, Set<string>>();
  for (const sequence of sequences) {
    sequence.forEach((step, i) => {
      if (!mustFollow.has(step.id)) {
        mustFollow.set(step.id, new Set());
        seen.push(step.id);
      }
      if (i > 0) mustFollow.get(step.id)!.add(sequence[i - 1].id);
    });
  }
  const order: string[] = [];
  const placed = new Set<string>();
  while (order.length < seen.length) {
    const next = seen.find((id) => !placed.has(id) && [...mustFollow.get(id)!].every((p) => placed.has(p)));
    // The flows disagree on order: keep what's left in first-seen order.
    if (!next) break;
    order.push(next);
    placed.add(next);
  }
  return [...order, ...seen.filter((id) => !placed.has(id))];
}

const track = mergeOrder(beforeFlow, afterFlow);

const byId = (flow: FlowStep[]) => new Map(flow.map((step) => [step.id, step]));
const flows = { before: byId(beforeFlow), after: byId(afterFlow) };
const stats = { before: totals(beforeFlow), after: totals(afterFlow) };
// One scale for both views, so the after bar is visibly shorter, not rescaled.
const scale = stats.before.hours;
const { saved, fromWaiting } = savings();

const AUTOPLAY_DELAY_MS = 2600;

export function BeforeAfterFigure() {
  const [view, setView] = useState<View>("before");
  const touched = useRef(false);
  const figureRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Play the change once, the first time the figure is actually seen. Anyone
  // who has already used the toggle keeps control.
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || reduced) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setView("after");
        }, AUTOPLAY_DELAY_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(figure);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reduced]);

  const choose = (next: View) => {
    touched.current = true;
    setView(next);
  };

  const current = stats[view];
  const steps = flows[view];

  return (
    <figure ref={figureRef} className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <figcaption className="label text-ink-faint">Fig. 1 — {workedExample.title}</figcaption>
        <div role="group" aria-label="Show the process" className="flex shrink-0 rounded-full border border-[var(--rule-strong)] p-0.5">
          {([["before", "Before"], ["after", "After"]] as const).map(([option, label]) => (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              aria-pressed={view === option}
              className={[
                "rounded-full px-3 py-1 text-xs transition-colors duration-300",
                view === option ? "bg-ink text-bone" : "text-ink-soft hover:text-ink",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-baseline gap-4" aria-live="polite">
        <p key={view} className="display-m tabular-nums motion-safe:animate-[fade-in_0.5s_var(--ease-out-quint)]">
          {formatDuration(current.hours)}
        </p>
        <p className="body-copy text-sm">
          brief to sent · {formatDuration(current.waiting)} of it waiting · {formatHandoffs(current.handoffs)}
        </p>
      </div>

      <div className="relative mt-4 flex h-7 w-full" aria-hidden="true">
        {/* Where the original process ended, so the after view is read against it. */}
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[var(--rule-strong)]" />
        <div className="absolute inset-y-0 right-0 border-r border-[var(--rule-strong)]" />
        {track.map((id) => {
          const step = steps.get(id);
          const width = step ? (step.hours / scale) * 100 : 0;
          const fill = step ? fillFor(step.kind) : null;
          return (
            <div
              key={id}
              className="relative h-full overflow-hidden transition-[width] duration-[900ms] [transition-timing-function:var(--ease-out-quint)]"
              style={{ width: `${width}%` }}
            >
              {fill ? <div className={`mr-[2px] h-full ${fill.className}`} style={fill.style} /> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Legend />
        <p
          className={`label text-ink-faint tabular-nums transition-opacity duration-500 ${view === "after" ? "opacity-100" : "opacity-0"}`}
          aria-hidden={view !== "after"}
        >
          Before: {formatDuration(stats.before.hours)}
        </p>
      </div>

      <p className="body-copy mt-5 max-w-[52ch] text-sm">
        Illustrative. {formatHours(fromWaiting)} of the {formatHours(saved)} hours saved come from removing the
        waiting, not from the AI step.{" "}
        <a href="#how" className="whitespace-nowrap text-ink underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-ink">
          How we&rsquo;d get there
        </a>
      </p>
    </figure>
  );
}
