"use client";

import { useEffect, useRef, useState } from "react";
import { processIntro, processSteps } from "@/content/process";
import { AgitationField } from "./AgitationField";
import { Reveal } from "./Reveal";

export function ProcessSection() {
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  // One reading of the scroll position drives both the field and the
  // highlighted step, so the two can't drift apart.
  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const raw = (anchor - rect.top) / Math.max(1, rect.height);
      const stepped = Math.min(
        1,
        Math.max(0, (raw * processSteps.length - 0.5) / (processSteps.length - 1)),
      );
      progressRef.current = stepped;
      const index = Math.min(
        processSteps.length - 1,
        Math.max(0, Math.round(stepped * (processSteps.length - 1))),
      );
      setActive((current) => (current === index ? current : index));
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

  const current = processSteps[active];

  return (
    <section id="how" className="section-pad scroll-mt-[var(--header-h)] bg-bone-deep">
      <div className="shell">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label flex items-center gap-3 text-ink-faint">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent" />
                {processIntro.eyebrow}
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="display-l mt-6 max-w-[14ch] text-balance">{processIntro.headline}</h2>
            </Reveal>
          </div>
          <div className="mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <Reveal index={2}>
              <p className="body-copy max-w-[44ch]">{processIntro.supporting}</p>
            </Reveal>
          </div>
        </div>

        {/*
          The field and the steps share this wrapper, so the field can stay
          pinned while the steps pass it — beside them on large screens, as a
          band above them on small ones.
        */}
        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="sticky top-[calc(var(--header-h)+0.5rem)] z-10 border-b border-[var(--rule)] bg-bone-deep pb-3 lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-5 lg:self-start lg:border-b-0 lg:pb-0">
            <div className="relative h-[24vh] min-h-[150px] lg:h-[min(60vh,540px)]">
              <AgitationField
                progressRef={progressRef}
                background="--color-bone-deep"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="label text-ink-faint">
                {current.step} — <span className="text-ink">{current.title}</span>
              </p>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {processSteps.map((step, index) => (
                  <span
                    key={step.id}
                    className={[
                      "h-1 rounded-full transition-all duration-700",
                      "[transition-timing-function:var(--ease-out-quint)]",
                      index === active ? "w-6 bg-accent" : "w-1.5 bg-[var(--rule-strong)]",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol ref={stepsRef} className="lg:col-span-6 lg:col-start-7">
            {processSteps.map((step, index) => {
              const isActive = index === active;
              return (
                <Reveal as="li" key={step.id} className="border-t border-[var(--rule)] first:border-t-0 last:border-b lg:first:border-t">
                  <div className="flex gap-6 py-10 lg:gap-10 lg:py-16">
                    <span
                      className={[
                        "label shrink-0 pt-2 tabular-nums transition-colors duration-700",
                        isActive ? "text-accent" : "text-ink-faint",
                      ].join(" ")}
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3
                        className={[
                          "display-m text-balance transition-colors duration-700",
                          // Dimmed by colour, not opacity, so it stays above contrast minimums.
                          isActive ? "text-ink" : "lg:text-ink-faint",
                        ].join(" ")}
                      >
                        {step.title}
                      </h3>
                      <p className="body-copy mt-4 max-w-[44ch]">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
