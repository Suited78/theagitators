"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CaseStudy } from "@/content/types";
import { CaseStudyGlyph } from "./CaseStudyGlyph";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const headingId = useId();

  return (
    <li className="group border-t border-[var(--rule)] last:border-b">
      <h3 id={headingId} className="sr-only">
        {study.client} — {study.sector}
      </h3>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full cursor-pointer text-left"
      >
        <div className="grid items-start gap-x-8 gap-y-5 py-8 md:grid-cols-12 lg:py-10">
          <span className="label text-purple tabular-nums md:col-span-2 md:pt-3">
            {String(index + 1).padStart(2, "0")}
            {study.illustrative ? (
              <span className="ml-3 rounded-[4px] bg-mint px-2 py-0.5 text-[0.6875rem] text-aubergine">
                Illustrative
              </span>
            ) : null}
          </span>

          <div className="md:col-span-6">
            <p className="display-m text-balance transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] md:group-hover:translate-x-1.5">
              {study.client}
            </p>
            <p className="body-copy mt-3 max-w-[42ch] text-pretty">{study.teaser}</p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-3 md:pt-2">
            <p className="label text-muted">{study.sector}</p>
            <ul className="flex flex-wrap gap-1.5">
              {study.tags.map((tag) => (
                <li key={tag} className="rounded-[var(--radius-control)] bg-white px-3 py-1.5 text-sm font-semibold text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <span
            aria-hidden="true"
            className="hidden justify-self-end md:col-span-1 md:block md:pt-3"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border-2 border-aubergine text-aubergine transition-colors duration-300 group-hover:bg-aubergine group-hover:text-paper">
              <span className="absolute h-0.5 w-3.5 bg-current" />
              <span
                className={[
                  "absolute h-0.5 w-3.5 bg-current transition-transform duration-500",
                  "[transition-timing-function:var(--ease-out-quint)]",
                  open ? "rotate-0" : "rotate-90",
                ].join(" ")}
              />
            </span>
          </span>

          <span className="label text-purple md:hidden">
            {open ? "Close" : "Read the detail"}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            aria-labelledby={headingId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.4, ease: "linear" },
                  }
            }
            className="overflow-hidden"
          >
            <div className="grid gap-x-8 gap-y-10 pb-12 md:grid-cols-12 lg:pb-16">
              <div className="md:col-span-4 md:col-start-3">
                {study.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={study.image.src}
                    alt={study.image.alt}
                    className="aspect-[3/2] w-full rounded-[var(--radius-card)] object-cover"
                  />
                ) : (
                  <CaseStudyGlyph
                    variant={index}
                    className="aspect-[3/2] w-full rounded-[var(--radius-card)]"
                  />
                )}
                {study.metric ? (
                  <div className="mt-6 border-t border-[var(--rule)] pt-5">
                    <p className="display-s text-purple">{study.metric.value}</p>
                    <p className="body-copy mt-2 text-base">{study.metric.label}</p>
                  </div>
                ) : null}
              </div>

              <div className="md:col-span-6">
                <dl className="space-y-7">
                  <div>
                    <dt className="label text-purple">Challenge</dt>
                    <dd className="body-copy mt-2 text-aubergine">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="label text-purple">What we did</dt>
                    <dd className="body-copy mt-2 text-aubergine">{study.whatWeDid}</dd>
                  </div>
                  <div>
                    <dt className="label text-purple">Outcome</dt>
                    <dd className="body-copy mt-2 text-aubergine">{study.outcome}</dd>
                  </div>
                </dl>
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  {study.detail.map((paragraph) => (
                    <p key={paragraph} className="body-copy mt-3 text-base first:mt-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
