"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { hero } from "@/content/site";
import { SystemVisual } from "./SystemVisual";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  // The hero only travels a fraction into the second state — the system should
  // look like it is beginning to resolve, not resolved.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = section.offsetHeight || 1;
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / height)) * 0.2;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
      ref={sectionRef}
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

      {/* Supporting statement and CTAs left; the motif bleeds off the right. */}
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

        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.2, delay: 0.55 } })}
          className="relative lg:col-span-6 lg:col-start-7"
        >
          <div className="relative h-[clamp(160px,24vh,270px)] border-t border-[var(--rule)] lg:border-t-0 lg:border-l lg:pl-8">
            <SystemVisual
              progressRef={progressRef}
              className="absolute inset-0 h-full w-full lg:left-8 lg:w-[calc(100%-2rem)]"
              density={0.9}
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-4 lg:pl-8">
            <p className="label text-ink-faint">Fig. 01 — Complexity</p>
            <p className="label hidden items-center gap-3 text-ink-faint sm:flex">
              {hero.scrollCue}
              <span aria-hidden="true" className="block h-px w-10 bg-[var(--rule-strong)]" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
