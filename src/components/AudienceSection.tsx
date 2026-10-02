import { audienceIntro, audiences } from "@/content/audiences";
import { Motif } from "./Motif";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AudienceSection() {
  return (
    <section id="who" className="section-pad scroll-mt-[var(--header-h)] bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow={audienceIntro.eyebrow}
          headline={audienceIntro.headline}
          supporting={audienceIntro.supporting}
          align="wide"
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {audiences.map((audience, index) => (
            <Reveal
              as="li"
              key={audience.id}
              index={index}
              className="flex flex-col rounded-[var(--radius-card)] bg-paper p-7 lg:p-8"
            >
              <Motif />
              <h3 className="display-s mt-6 text-balance">{audience.title}</h3>
              <p className="body-copy mt-4 flex-1">{audience.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {audience.signals.map((signal) => (
                  <li
                    key={signal}
                    className="rounded-[var(--radius-control)] bg-white px-3 py-1.5 text-sm font-semibold text-muted"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="body-copy mt-8 max-w-[60ch] text-base">
            Sectors are a starting point, not a boundary. If the work is interesting and the
            organisation is ready to change, we&rsquo;re interested.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
