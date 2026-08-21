import { capabilities, capabilityIntro } from "@/content/capabilities";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function CapabilitiesSection() {
  return (
    <section id="what" className="section-pad scroll-mt-[var(--header-h)]">
      <div className="shell">
        <SectionHeading
          eyebrow={capabilityIntro.eyebrow}
          headline={capabilityIntro.headline}
          supporting={capabilityIntro.supporting}
          align="wide"
        />

        <ul className="mt-16 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Reveal
              as="li"
              key={capability.id}
              index={index % 3}
              className="group flex flex-col border-t border-[var(--rule)] pt-6 pb-8 transition-[border-color] duration-500 hover:border-accent"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-s">{capability.title}</h3>
                <span className="label text-ink-faint tabular-nums transition-colors duration-500 group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="body-copy mt-4 text-ink">{capability.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {capability.detail.map((line) => (
                  <li key={line} className="body-copy flex gap-3 text-sm">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-[var(--rule-strong)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
