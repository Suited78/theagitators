"use client";

import { useEffect, useRef, useState } from "react";
import { processIntro, processSteps } from "@/content/process";
import { workedExample } from "@/content/workedExample";
import { ProcessFigure } from "./ProcessFigure";
import { Reveal } from "./Reveal";

export function ProcessSection() {
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(0);

  // The step nearest the middle of the viewport drives the pinned figure.
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
      {/*
        Large screens: the figure pins beside the steps and follows the one in
        view. Small screens: each step carries its own copy of the figure.
      */}
      <div className="shell lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6 lg:row-start-1">
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
        <div className="mt-6 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:self-end">
          <Reveal index={2}>
            <p className="body-copy max-w-[44ch]">{processIntro.supporting}</p>
          </Reveal>
          <Reveal index={3}>
            <p className="label mt-6 text-ink-faint">{workedExample.context}</p>
          </Reveal>
        </div>

        <div className="hidden lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-16 lg:block lg:self-start">
          <ProcessFigure stageId={current.id} />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="label text-ink-faint">
              Step {current.step} — <span className="text-ink">{current.title}</span>
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

        <ol
          ref={stepsRef}
          className="mt-10 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-16"
        >
          {processSteps.map((step, index) => {
            const isActive = index === active;
            return (
              <Reveal as="li" key={step.id} className="border-t border-[var(--rule)] last:border-b">
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
                        isActive ? "text-ink" : "lg:text-ink-faint",
                      ].join(" ")}
                    >
                      {step.title}
                    </h3>
                    <p className="body-copy mt-4 max-w-[44ch]">{step.description}</p>
                    <ProcessFigure stageId={step.id} compact className="mt-6 lg:hidden" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
