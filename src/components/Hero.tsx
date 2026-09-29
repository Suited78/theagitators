"use client";

import { motion } from "motion/react";
import { hero } from "@/content/site";
import { AgitationField } from "./AgitationField";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  const rise = (delay: number, distance = 16) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="flex min-h-[100svh] flex-col pt-[var(--header-h)]"
    >
      {/* Headline sits on its own full-width band so the lines stay unbroken. */}
      <div className="shell flex flex-1 flex-col justify-center py-10 lg:py-14">
        <motion.p
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 0.05 } })}
          className="label flex items-center gap-3 text-ink-faint"
        >
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent" />
          {hero.eyebrow}
        </motion.p>

        {/* Masks extend past the baseline so descenders survive the reveal. */}
        <h1 className="display-xl mt-7 lg:mt-10">
          {hero.headline.map((text, index) => (
            <span key={text} className="block overflow-hidden pb-[0.18em] -mb-[0.14em]">
              <motion.span
                className="block"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: "0.42em" },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 1, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] as const },
                    })}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Supporting statement and CTAs left; the field bleeds off the right edge. */}
      <div className="shell grid grid-cols-1 items-end gap-x-10 gap-y-8 pb-8 lg:grid-cols-12 lg:pb-12">
        <motion.div {...rise(0.5)} className="lg:col-span-5">
          <p className="lede max-w-[44ch] text-ink">{hero.supporting}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-6 py-3 text-sm text-bone transition-colors duration-400 [transition-timing-function:var(--ease-out-quint)] hover:bg-accent"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border border-[var(--rule-strong)] px-6 py-3 text-sm text-ink transition-colors duration-400 [transition-timing-function:var(--ease-out-quint)] hover:border-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        <div className="relative -mx-[var(--gutter)] h-[clamp(220px,34vh,380px)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:col-span-7 lg:col-start-6 lg:ml-0 lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]">
          <AgitationField interactive className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  );
}
