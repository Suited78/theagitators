"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * The adoption gap: AI capability compounding while what organisations can
 * absorb barely moves. Conceptual, not plotted from data, so there are no
 * values to read off and no hover layer that would imply some.
 *
 * Curves are drawn in a 0–100 box with a stretched viewBox and non-scaling
 * strokes; labels are HTML, positioned by percentage, so text stays at
 * reading size on every screen.
 */

const FIRST_YEAR = 2023;
const LAST_YEAR = 2030;
const NOW = 2026;
const years = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
const xOf = (year: number) => ((year - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR)) * 100;

// 0 = bottom of the plot, 1 = top.
const capability = (t: number) => 0.4 + 0.55 * ((Math.exp(2.7 * t) - 1) / (Math.exp(2.7) - 1));
const absorption = (t: number) => 0.14 + 0.08 * t;

const SAMPLES = 60;
const points = (fn: (t: number) => number) =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = i / SAMPLES;
    return [t * 100, (1 - fn(t)) * 100] as const;
  });
const toPath = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");

const capabilityPath = toPath(points(capability));
const absorptionPath = toPath(points(absorption));
const gapPath = `${capabilityPath} ${toPath([...points(absorption)].reverse()).replace(/^M/, "L")} Z`;

const ease = [0.22, 1, 0.36, 1] as const;

export function AdoptionGapChart({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "0px 0px -20% 0px" },
          transition: { duration: 1, delay, ease },
        };

  const gapLabelT = 0.64;
  const nowX = xOf(NOW);

  return (
    <div className={className}>
      <div
        role="img"
        aria-label="Conceptual chart, 2023 to 2030. AI capability starts moderate and rises ever faster. What organisations can absorb starts low and barely rises. The space between them, the adoption gap, widens every year."
        className="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] gap-x-3 gap-y-2"
      >
        {/* Y axis: qualitative, two anchors only. */}
        <div aria-hidden="true" className="label flex flex-col justify-between py-1 text-right text-muted">
          <span>High</span>
          <span>Low</span>
        </div>

        <div aria-hidden="true" className="relative aspect-[4/3] sm:aspect-[16/8]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {/* Recessive grid: one rule per year, four levels. */}
            <g stroke="var(--color-divider)" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {years.map((year) => (
                <line key={year} x1={xOf(year)} x2={xOf(year)} y1="0" y2="100" vectorEffect="non-scaling-stroke" />
              ))}
              {[0, 33.33, 66.67].map((y) => (
                <line key={y} x1="0" x2="100" y1={y} y2={y} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            <line x1="0" x2="100" y1="100" y2="100" stroke="var(--color-muted)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

            {/* Lines wipe in left to right; pathLength would dash a non-scaling stroke. */}
            <defs>
              <clipPath id="adoption-gap-wipe" clipPathUnits="userSpaceOnUse">
                <motion.rect
                  x="-5"
                  y="-5"
                  height="110"
                  width="110"
                  {...(reduced
                    ? {}
                    : {
                        initial: { width: 0 },
                        whileInView: { width: 110 },
                        viewport: { once: true, margin: "0px 0px -20% 0px" },
                        transition: { duration: 1.8, ease },
                      })}
                />
              </clipPath>
            </defs>

            <motion.path d={gapPath} fill="var(--color-mint)" {...fade(1.2)} />

            {/* Today. */}
            <line
              x1={nowX}
              x2={nowX}
              y1="0"
              y2="100"
              stroke="var(--color-aubergine)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />

            <motion.path
              d={absorptionPath}
              fill="none"
              stroke="var(--color-aubergine)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#adoption-gap-wipe)"
            />
            <motion.path
              d={capabilityPath}
              fill="none"
              stroke="var(--color-purple)"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#adoption-gap-wipe)"
            />
          </svg>

          {/* Direct labels. Text wears text tokens; a swatch carries identity. */}
          <span
            className="absolute flex -translate-y-1/2 items-center gap-2 text-sm font-bold sm:text-base"
            style={{ right: "6%", top: `${(1 - capability(0.86)) * 100}%` }}
          >
            <span className="h-1 w-5 rounded-full bg-purple" />
            AI capability
          </span>
          <span
            className="absolute flex items-center gap-2 text-sm font-bold sm:text-base"
            style={{ left: "2%", bottom: "2%" }}
          >
            <span className="h-1 w-5 rounded-full bg-aubergine" />
            What organisations absorb
          </span>
          <motion.span
            className="display-s absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              left: `${gapLabelT * 100}%`,
              top: `${(1 - (capability(gapLabelT) + absorption(gapLabelT)) / 2) * 100}%`,
            }}
            {...fade(1.2)}
          >
            The adoption gap
          </motion.span>
          <span
            className="label absolute top-1 -translate-x-1/2 rounded-[4px] bg-aubergine px-2 py-0.5 text-paper"
            style={{ left: `${nowX}%` }}
          >
            Now
          </span>
        </div>

        {/* X axis: years, centred on their gridlines. */}
        <div aria-hidden="true" />
        <div aria-hidden="true" className="relative h-6 text-sm font-semibold text-muted tabular-nums">
          {years.map((year, i) => (
            <span
              key={year}
              className={[
                "absolute top-0",
                i === 0 ? "" : i === years.length - 1 ? "-translate-x-full" : "-translate-x-1/2",
                // Fewer years on small screens, so labels never collide.
                [0, 2, 4, years.length - 1].includes(i) ? "" : "hidden sm:inline",
              ].join(" ")}
              style={{ left: `${xOf(year)}%` }}
            >
              {year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
