import { caseStudies, workIntro } from "@/content/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

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

        <Reveal>
          <p className="label mt-14 flex items-center gap-3 border border-dashed border-[var(--rule-strong)] px-4 py-3 text-ink-soft">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {workIntro.notice}
          </p>
        </Reveal>

        <ul className="mt-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
