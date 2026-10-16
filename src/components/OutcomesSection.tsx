"use client";

import { motion } from "motion/react";
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
 * Opportunity AI: what you offer today sits inside the frame; new things grow
 * beyond it. Again conceptual: no counts implied.
 */
function OpportunityPicture({ legend }: { legend: [string, string] }) {
  const reduced = usePrefersReducedMotion();
  const today = [
    [70, 70],
    [110, 60],
    [80, 112],
    [122, 104],
  ];
  const grown = [
    [250, 34],
    [312, 72],
    [236, 126],
    [330, 140],
    [282, 104],
  ];
  return (
    <div aria-hidden="true">
      <svg viewBox="0 0 380 176" className="h-auto w-full overflow-visible">
        <rect x="36" y="30" width="124" height="116" rx="14" fill="none" stroke="var(--color-paper)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="5 6" />
        {today.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="var(--color-paper)" fillOpacity="0.55" />
        ))}
        {grown.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <motion.path
              d={`M160 ${88} C ${200} ${88}, ${x - 40} ${y}, ${x} ${y}`}
              fill="none"
              stroke="var(--color-mint)"
              strokeOpacity="0.7"
              strokeWidth="2"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inView}
              transition={{ duration: 0.9, delay: 0.3 + index * 0.18, ease }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="11"
              fill="var(--color-mint)"
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.18, ease }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          </g>
        ))}
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

          {/* "Then": the order the headline promises, drawn between the two:
              in the middle side by side, in the gap when stacked. */}
          <span
            aria-hidden="true"
            className="label relative z-10 mx-auto -my-9 flex h-16 w-16 items-center justify-center rounded-full border-4 border-paper bg-purple text-white md:absolute md:top-1/2 md:left-1/2 md:m-0 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            Then
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
