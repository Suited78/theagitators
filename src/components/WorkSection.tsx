import Link from "next/link";
import { caseStudies, workIntro, workPlaceholder } from "@/content/caseStudies";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const number = (index: number) => String(index + 1).padStart(2, "0");

/** Shared row grid, so published studies and the held slot line up exactly. */
const row = "grid items-start gap-x-8 gap-y-5 py-8 md:grid-cols-12 lg:py-10";

export function WorkSection() {
  return (
    <section id="work" className="section-pad scroll-mt-[var(--header-h)]">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <SectionHeading
            eyebrow={workIntro.eyebrow}
            headline={workIntro.headline}
            className="lg:col-span-6"
          />
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal index={2}>
              <p className="body-copy">{workIntro.supporting}</p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12">
          {caseStudies.map((study, index) => (
            <Reveal as="li" key={study.slug} index={index} className="border-t border-[var(--rule)]">
              <Link href={`/work/${study.slug}`} className="group block">
                <div className={row}>
                  <p className="label text-purple tabular-nums md:col-span-2 md:pt-2">
                    {number(index)}
                    <span className="mt-1 block text-muted">{study.sector}</span>
                  </p>

                  <div className="md:col-span-6">
                    <h3 className="display-m text-balance transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] md:group-hover:translate-x-1.5">
                      {study.headline}
                    </h3>
                    <p className="body-copy mt-3 max-w-[48ch] text-pretty">{study.summary}</p>
                  </div>

                  <div className="border-l-4 border-mint pl-4 md:col-span-3">
                    <p className="display-m text-purple">{study.result.value}</p>
                    <p className="mt-1.5 text-base leading-snug text-muted">{study.result.label}</p>
                  </div>

                  <span className="label flex items-center gap-3 text-aubergine md:col-span-1 md:justify-self-end md:pt-1">
                    <span className="md:sr-only">Read the case study</span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border-2 border-aubergine transition-colors duration-300 group-hover:bg-aubergine group-hover:text-paper"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal as="li" index={caseStudies.length} className="border-y border-[var(--rule)]">
            <div className={row}>
              <p className="label text-muted tabular-nums md:col-span-2 md:pt-2">
                {number(caseStudies.length)}
                <span className="mt-1 block">{workPlaceholder.sector}</span>
              </p>
              <div className="md:col-span-6">
                <h3 className="display-m text-muted">{workPlaceholder.headline}</h3>
                <p className="body-copy mt-3 max-w-[48ch] text-pretty">{workPlaceholder.summary}</p>
              </div>
              <div className="border-l-4 border-divider pl-4 md:col-span-3">
                <p className="display-m text-muted" aria-hidden="true">
                  —
                </p>
                <p className="mt-1.5 text-base leading-snug text-muted">Result to follow</p>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
