import { audienceIntro, audiences } from "@/content/audiences";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AudienceSection() {
  return (
    <section id="who" className="section-pad scroll-mt-[var(--header-h)] bg-bone-deep">
      <div className="shell">
        <SectionHeading
          eyebrow={audienceIntro.eyebrow}
          headline={audienceIntro.headline}
          supporting={audienceIntro.supporting}
          align="wide"
        />

        <ul className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
          {audiences.map((audience, index) => (
            <Reveal
              as="li"
              key={audience.id}
              index={index}
              className="group flex flex-col bg-bone-deep p-8 transition-colors duration-500 [transition-timing-function:var(--ease-out-quint)] hover:bg-bone lg:p-10"
            >
              <span className="label text-ink-faint tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-s mt-6 text-balance">{audience.title}</h3>
              <p className="body-copy mt-4 flex-1">{audience.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {audience.signals.map((signal) => (
                  <li
                    key={signal}
                    className="rounded-full border border-[var(--rule-strong)] px-3 py-1 text-xs text-ink-soft"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="body-copy mt-10 max-w-[60ch] text-sm">
            Sectors are a starting point, not a boundary. If the work is interesting and the
            organisation is small enough to actually change, we&rsquo;re interested.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
