"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  beforeFlow,
  flows,
  formatDuration,
  formatHandoffs,
  formatHours,
  totals,
  workedExample,
  workedExampleStages,
} from "@/content/workedExample";
import { Legend, Swatch, fillFor } from "./flowMarks";

// Bars share one scale across every stage, so a wait that shrinks visibly shrinks.
const longestStep = Math.max(...beforeFlow.map((step) => step.hours));

type ProcessFigureProps = {
  /** Process step id — keys into workedExampleStages. */
  stageId: string;
  /** Tighter rows for the per-step copies shown on small screens. */
  compact?: boolean;
  className?: string;
};

export function ProcessFigure({ stageId, compact = false, className = "" }: ProcessFigureProps) {
  const stage = workedExampleStages[stageId];
  if (!stage) return null;

  const steps = flows[stage.flow];
  const stat = totals(steps);
  const notes = stage.notes ?? {};
  const trial = new Set(stage.trial ?? []);
  // Once a stage points at specific steps, everything else steps back.
  const focusing = Object.keys(notes).length > 0 || trial.size > 0;

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <figure className={`border border-[var(--rule)] bg-bone ${className}`}>
        {compact ? null : (
          <figcaption className="label border-b border-[var(--rule)] px-4 py-3 text-ink-faint">
            Fig. 2 — {workedExample.title}
          </figcaption>
        )}

        <ol className={compact ? "px-3 py-2" : "px-4 py-3"}>
          <AnimatePresence initial={false} mode="popLayout">
            {steps.map((step) => {
              const note = notes[step.id];
              const isTrial = trial.has(step.id);
              const dim = focusing && !note && !isTrial;
              const fill = fillFor(step.kind);
              return (
                <motion.li
                  key={step.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className={[
                    "relative my-0.5 rounded-[3px] border",
                    compact ? "px-2 py-1" : "px-3 py-1.5",
                    isTrial ? "border-dashed border-accent" : "border-transparent",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <Swatch kind={step.kind} className={`mt-[0.4em] transition-opacity duration-500 ${dim ? "opacity-30" : ""}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className={[
                            "transition-colors duration-500",
                            compact ? "text-[0.8125rem]" : "text-sm",
                            step.kind === "wait" ? "italic" : "",
                            // Dimmed by colour, not opacity, so it stays above contrast minimums.
                            dim ? "text-ink-faint" : step.kind === "wait" ? "text-ink-soft" : "text-ink",
                          ].join(" ")}
                        >
                          {step.label}
                        </span>
                        <span className="label shrink-0 text-ink-faint tabular-nums">
                          {step.owner && !compact ? `${step.owner} · ` : ""}
                          {formatHours(step.hours)} h
                        </span>
                      </div>
                      <div className={`mt-1 h-1 w-full transition-opacity duration-500 ${dim ? "opacity-30" : ""}`} aria-hidden="true">
                        <div
                          className={`h-full transition-[width] duration-700 [transition-timing-function:var(--ease-out-quint)] ${fill.className}`}
                          style={{ ...fill.style, width: `${Math.max(2, (step.hours / longestStep) * 100)}%` }}
                        />
                      </div>
                      {note || isTrial ? (
                        <span className="label mt-1 block text-accent">{note ?? "Trial"}</span>
                      ) : null}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
          <motion.li layout className={`flex items-center gap-3 ${compact ? "px-2 pt-1" : "px-3 pt-2"}`}>
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border border-ink" />
            <span className={`text-ink ${compact ? "text-[0.8125rem]" : "text-sm"}`}>{workedExample.endpoint}</span>
          </motion.li>
        </ol>

        <div className={`border-t border-[var(--rule)] ${compact ? "px-3 py-2" : "px-4 py-3"}`}>
          <p className="label text-ink tabular-nums">
            {formatDuration(stat.hours)} elapsed · {formatDuration(stat.waiting)} waiting · {formatHandoffs(stat.handoffs)}
          </p>
          <Legend className="mt-2.5" />
        </div>

        <p
          key={stageId}
          className={`body-copy border-t border-[var(--rule)] text-sm motion-safe:animate-[fade-in_0.5s_var(--ease-out-quint)] ${compact ? "px-3 py-2" : "px-4 py-3"}`}
        >
          {stage.caption}
        </p>
      </figure>
    </MotionConfig>
  );
}
