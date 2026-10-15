import { outcomeIntro, outcomes } from "@/content/outcomes";
import { Motif } from "./Motif";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Efficiency AI and Opportunity AI, side by side, with the guardrails under both. */
export function OutcomesSection() {
  return (
    <section id="ai" className="section-pad scroll-mt-[var(--header-h)] bg-paper">
      <div className="shell">
        <SectionHeading
          eyebrow={outcomeIntro.eyebrow}
          headline={outcomeIntro.headline}
          supporting={outcomeIntro.supporting}
          align="wide"
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {outcomes.map((outcome, index) => (
            <Reveal
              as="li"
              key={outcome.id}
              index={index}
              className="rounded-[var(--radius-card)] bg-white p-7 lg:p-10"
            >
              <p className="label text-purple tabular-nums">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="display-m mt-3">{outcome.title}</h3>
              <p className="body-copy mt-4 max-w-[46ch] text-aubergine">{outcome.description}</p>
            </Reveal>
          ))}
        </ul>

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
