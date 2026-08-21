import { outcomeIntro, outcomes } from "@/content/outcomes";
import { Reveal } from "./Reveal";

export function OutcomesSection() {
  return (
    <section className="ink-panel section-pad">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label flex items-center gap-3 text-paper-dim">
                <span aria-hidden="true" className="h-px w-8 bg-accent-bright" />
                {outcomeIntro.eyebrow}
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="display-l mt-6 max-w-[15ch] text-balance">{outcomeIntro.headline}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal index={2}>
              <p className="lede text-paper-dim">{outcomeIntro.supporting}</p>
            </Reveal>
          </div>
        </div>

        {/* An index, not a card grid — it should read like a contents page. */}
        <ol className="mt-16 lg:mt-24">
          {outcomes.map((outcome, index) => (
            <Reveal
              as="li"
              key={outcome.id}
              index={index % 4}
              distance={12}
              className="group border-t border-[var(--rule-invert)] last:border-b"
            >
              <div className="grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-12 lg:py-7">
                <span className="label text-paper-dim md:col-span-1 tabular-nums transition-colors duration-500 group-hover:text-accent-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display-s text-balance md:col-span-5 transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] md:group-hover:translate-x-2">
                  {outcome.title}
                </h3>
                <p className="body-copy text-paper-dim md:col-span-6 md:pl-4">{outcome.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
