"use client";

import { motion, type TargetAndTransition } from "motion/react";
import { outcomeIntro, outcomes } from "@/content/outcomes";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Eyebrow } from "./Eyebrow";
import { Motif } from "./Motif";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "0px 0px -15% 0px" } as const;

/**
 * Efficiency AI: the same week, rebalanced. Each bar is a working week; the
 * repeatable share shrinks and the work people are good at takes its place.
 * Conceptual, so there are no figures on it.
 */
function EfficiencyPicture({ legend }: { legend: [string, string] }) {
  const reduced = usePrefersReducedMotion();
  const rows = [0.68, 0.6, 0.72];
  return (
    <div aria-hidden="true">
      <div className="space-y-3">
        {rows.map((start, index) => (
          <div key={index} className="flex h-7 gap-1 overflow-hidden rounded-md">
            <motion.span
              className="rounded-md bg-[color-mix(in_srgb,var(--color-aubergine)_22%,white)]"
              initial={reduced ? false : { flexBasis: `${start * 100}%` }}
              whileInView={{ flexBasis: `${(start - 0.4) * 100}%` }}
              viewport={inView}
              transition={{ duration: 1.4, delay: 0.3 + index * 0.15, ease }}
              style={reduced ? { flexBasis: `${(start - 0.4) * 100}%` } : undefined}
            />
            <span className="flex-1 rounded-md bg-purple" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[color-mix(in_srgb,var(--color-aubergine)_22%,white)]" />
          {legend[0]}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-purple" />
          {legend[1]}
        </span>
      </div>
    </div>
  );
}

/**
 * Opportunity AI: the same three bars as Efficiency, making a braver move.
 * They lift into a staircase, two new steps grow beyond them, and a spark
 * lands on the top one. Conceptual: no axis, no counts, no growth figures.
 */
function OpportunityPicture({ legend }: { legend: [string, string] }) {
  const reduced = usePrefersReducedMotion();
  // Start stacked like the efficiency bars, end as the first three steps.
  const today = [
    { y: 66, dx: 0, dy: 110 },
    { y: 96, dx: 70, dy: 50 },
    { y: 126, dx: 140, dy: -10 },
  ];
  const grown = [
    { x: 230, y: 86 },
    { x: 300, y: 56 },
  ];
  const motionProps = (from: TargetAndTransition, to: TargetAndTransition, delay: number, duration = 0.9) =>
    reduced
      ? {}
      : { initial: from, whileInView: to, viewport: inView, transition: { duration, delay, ease } };
  return (
    <div aria-hidden="true">
      {/* Keyed on the preference, which is only known after the first render,
          so a reduced-motion visitor gets the end state rather than a half-start. */}
      <svg key={reduced ? "still" : "animated"} viewBox="0 0 420 200" className="h-auto w-full overflow-visible">
        {today.map(({ y, dx, dy }, index) => (
          <motion.g
            key={y}
            style={reduced ? { transform: `translate(${dx}px, ${dy}px)` } : undefined}
            {...motionProps({ x: 0, y: 0 }, { x: dx, y: dy }, 0.15 + index * 0.1, 1)}
          >
            <rect x="20" y={y} width="100" height="22" rx="6" fill="var(--color-paper)" fillOpacity="0.55" />
          </motion.g>
        ))}
        {grown.map(({ x, y }, index) => (
          <motion.rect
            key={x}
            x={x}
            y={y}
            width="100"
            height="22"
            rx="6"
            fill="var(--color-mint)"
            style={{ originX: 0 }}
            {...motionProps({ scaleX: 0 }, { scaleX: 1 }, 1.05 + index * 0.2, 0.7)}
          />
        ))}
        <motion.path
          d="M404 26 L408 38 L420 42 L408 46 L404 58 L400 46 L388 42 L400 38 Z"
          fill="var(--color-mint)"
          {...motionProps({ scale: 0, rotate: -45 }, { scale: 1, rotate: 0 }, 1.6, 0.6)}
        />
      </svg>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-paper/80">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/60" />
          {legend[0]}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          {legend[1]}
        </span>
      </div>
    </div>
  );
}

/** Efficiency AI and Opportunity AI as two contrasting panels, with the guardrails under both. */
export function OutcomesSection() {
  const [efficiency, opportunity] = outcomes;

  return (
    <section id="ai" className="section-pad scroll-mt-[var(--header-h)] bg-paper">
      <div className="shell">
        <Reveal>
          <Eyebrow>{outcomeIntro.eyebrow}</Eyebrow>
        </Reveal>
        <h2 className="display-l mt-5 text-balance">
          {outcomeIntro.headline.map((line, index) => (
            <Reveal key={line} as="span" index={index + 1} className="block">
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal index={3}>
          <p className="lede mt-6 max-w-[52ch]">{outcomeIntro.supporting}</p>
        </Reveal>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          <Reveal className="flex flex-col rounded-[var(--radius-card)] bg-white p-7 sm:p-9 lg:p-12">
            <div className="flex flex-col justify-center md:h-[16rem]">
              <EfficiencyPicture legend={efficiency.legend ?? ["", ""]} />
            </div>
            <p className="label mt-10 text-purple tabular-nums">01</p>
            <h3 className="display-l mt-2">{efficiency.title}</h3>
            <p className="body-copy mt-4 max-w-[44ch] text-aubergine">{efficiency.description}</p>
          </Reveal>

          {/* "+": both kinds, not a choice between them. Side by side only;
              stacked on small screens, the panels read in order without it. */}
          <span
            aria-hidden="true"
            className="relative z-10 hidden h-16 w-16 text-4xl leading-none font-extrabold items-center justify-center rounded-full border-4 border-paper bg-purple text-white md:absolute md:flex md:top-1/2 md:left-1/2 md:m-0 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            +
          </span>

          <Reveal index={1} className="aubergine-panel flex flex-col rounded-[var(--radius-card)] p-7 sm:p-9 lg:p-12">
            <div className="flex flex-col justify-center md:h-[16rem]">
              <OpportunityPicture legend={opportunity.legend ?? ["", ""]} />
            </div>
            <p className="label mt-10 text-mint tabular-nums">02</p>
            <h3 className="display-l mt-2">{opportunity.title}</h3>
            <p className="body-copy mt-4 max-w-[44ch] text-paper/85">{opportunity.description}</p>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 flex items-center gap-4 text-base font-semibold text-aubergine">
            <Motif />
            {outcomeIntro.guardrails}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
