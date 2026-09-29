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

        <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Reveal
              as="li"
              key={capability.id}
              index={index % 3}
              className="group flex flex-col border-t border-[var(--rule)] pt-6 pb-8 transition-[border-color] duration-500 hover:border-purple"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-s">{capability.title}</h3>
                <span className="label text-purple tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="body-copy mt-3 text-aubergine">{capability.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {capability.detail.map((line) => (
                  <li key={line} className="body-copy flex gap-3 text-base">
                    <span aria-hidden="true" className="mt-[0.75em] h-0.5 w-3 shrink-0 bg-mint" />
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
