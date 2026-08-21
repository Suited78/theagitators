"use client";

import { useEffect, useRef, useState } from "react";
import { processIntro, processSteps } from "@/content/process";
import { Reveal } from "./Reveal";
import { SystemVisual } from "./SystemVisual";

export function ProcessSection() {
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  // One scroll handler drives both the motif and the active step, so the
  // visual and the copy can never disagree about where the visitor is.
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
      {/*
        Explicit rows so the motif can be a grid item on the left of the steps
        at large sizes, while on small screens it is simply the second block in
        a tall container — which is what lets it stay sticky on both.
      */}
      <div className="shell lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <Reveal>
            <p className="label flex items-center gap-3 text-ink-faint">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent" />
              {processIntro.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="display-l mt-6 max-w-[14ch] text-balance">{processIntro.headline}</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="body-copy mt-6 mb-10 max-w-[44ch]">{processIntro.supporting}</p>
          </Reveal>
        </div>

        <div className="sticky top-[calc(var(--header-h)+0.75rem)] z-10 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start lg:top-[calc(var(--header-h)+2rem)]">
          <div className="border border-[var(--rule)] bg-bone">
            <div className="relative h-[22vh] min-h-[150px] lg:h-[38vh] lg:min-h-[260px]">
              <SystemVisual
                progressRef={progressRef}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[var(--rule)] px-4 py-3">
              <p className="label text-ink-faint">
                Fig. {current.step} — <span className="text-ink">{current.state}</span>
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
        </div>

        <ol
          ref={stepsRef}
          className="mt-4 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0"
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
                  <div
                    className={[
                      "transition-opacity duration-700 [transition-timing-function:var(--ease-out-quint)]",
                      isActive ? "opacity-100" : "lg:opacity-45",
                    ].join(" ")}
                  >
                    <h3 className="display-m text-balance">{step.title}</h3>
                    <p className="body-copy mt-4 max-w-[44ch]">{step.description}</p>
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
