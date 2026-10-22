import type { Metadata } from "next";
import { AdvantageChart } from "@/components/agent99/AdvantageChart";
import { Eyebrow } from "@/components/Eyebrow";
import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { advantage, nextStep, pathway, people, proposal, squeeze, valueShift, workshop } from "@/content/agent99";
import { site } from "@/content/site";

/**
 * A client proposal, shared by link only. Kept out of search engines here,
 * and deliberately left out of the sitemap, llms.txt and every nav.
 */
export const metadata: Metadata = {
  title: "Agent99: discovery workshop proposal",
  description: proposal.lede,
  robots: { index: false, follow: false, nocache: true },
};

const totalMinutes = workshop.agenda.reduce((sum, item) => sum + item.minutes, 0);

export default function Agent99Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Hero: the proposal in one line. */}
        <header className="shell pt-[calc(var(--header-h)+clamp(3rem,8vw,6rem))] pb-[clamp(3rem,7vw,5.5rem)]">
          <Reveal>
            <Eyebrow>{proposal.eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="display-xl mt-6 max-w-[22ch] text-balance">
            {proposal.title.map((line, index) => (
              <Reveal key={line} as="span" index={index + 1} className="block">
                {line}
              </Reveal>
            ))}
          </h1>
          <Reveal index={3}>
            <p className="lede mt-8 max-w-[52ch] text-aubergine">{proposal.lede}</p>
          </Reveal>
          <Reveal index={4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#workshop" className="btn btn-primary">
                See the workshop
              </a>
              <a href="#next" className="btn btn-secondary">
                Pick a morning
              </a>
            </div>
          </Reveal>
        </header>

        {/* The case for change, 1: three pressures. */}
        <section className="section-pad hairline-t bg-white">
          <div className="shell">
            <SectionHeading eyebrow={squeeze.eyebrow} headline={squeeze.headline} align="wide" />
            <ol className="mt-12 grid gap-x-10 md:grid-cols-3">
              {squeeze.points.map((point, index) => (
                <Reveal as="li" key={point.title} index={index} className="border-t-2 border-aubergine pt-5 pb-8">
                  <span className="text-[2rem] leading-none font-extrabold text-purple tabular-nums">{index + 1}</span>
                  <h3 className="display-s mt-3 text-balance">{point.title}</h3>
                  <p className="body-copy mt-3">{point.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* The case for change, 2: where the value is going. */}
        <section className="section-pad bg-paper">
          <div className="shell">
            <SectionHeading eyebrow={valueShift.eyebrow} headline={valueShift.headline} align="wide" />
            <p className="label mt-12 text-muted">{valueShift.label}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {valueShift.stages.map((stage) => (
                <div
                  key={stage.name}
                  className={`rounded-[var(--radius-card)] p-6 ${stage.valuable ? "aubergine-panel" : "border border-dashed border-divider bg-white"}`}
                >
                  <p className={`label ${stage.valuable ? "text-mint" : "text-muted"}`}>{stage.zone}</p>
                  <p className={`display-s mt-2 ${stage.valuable ? "" : "text-muted"}`}>{stage.name}</p>
                  <ul className="mt-4 space-y-2">
                    {stage.items.map((item) => (
                      <li key={item} className={`text-base leading-snug ${stage.valuable ? "text-paper/85" : "text-muted"}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {[valueShift.automated, valueShift.valuable].map((group, index) => (
                <div key={group.title}>
                  <h3 className={`display-s ${index === 0 ? "text-muted" : "text-purple"}`}>{group.title}</h3>
                  <p className="mt-1 text-base font-semibold text-aubergine">{group.note}</p>
                  <ul className="mt-5 border-t border-[var(--rule)]">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-[var(--rule)] py-3 text-base leading-snug text-aubergine">
                        <span aria-hidden="true" className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-divider" : "bg-purple"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The case for change, 3: what it means for Agent99. */}
        <section className="section-pad bg-white">
          <div className="shell">
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
              <SectionHeading eyebrow={advantage.eyebrow} headline={advantage.headline} className="lg:col-span-7" />
              <p className="body-copy lg:col-span-5 lg:self-end">{advantage.body}</p>
            </div>
            <div className="mt-12">
              <AdvantageChart />
            </div>
            <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {advantage.moves.map((move, index) => (
                <Reveal key={move.title} index={index} className="border-t-2 border-aubergine pt-5">
                  <h3 className="display-s text-balance">{move.title}</h3>
                  <p className="body-copy mt-3">{move.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The proposal: the workshop. */}
        <section id="workshop" className="section-pad scroll-mt-[var(--header-h)] bg-paper">
          <div className="shell">
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
              <SectionHeading eyebrow={workshop.eyebrow} headline={workshop.headline} className="lg:col-span-6" />
              <p className="body-copy lg:col-span-6 lg:self-end">{workshop.body}</p>
            </div>

            {/* The morning to scale: each block's width is its share of the time. */}
            <div className="mt-12">
              <p className="label text-muted">The morning, to scale · {Math.round((totalMinutes / 60) * 10) / 10} hours</p>
              <ol className="mt-4 grid gap-3 md:flex md:gap-2">
                {workshop.agenda.map((item, index) => (
                  <li
                    key={item.title}
                    className="flex flex-col rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-5 md:min-w-0"
                    style={{ flex: `${item.minutes} 1 0%` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-2 rounded-full ${["bg-aubergine", "bg-purple", "bg-mint", "bg-aubergine/60"][index]}`}
                    />
                    <p className="label mt-4 text-purple">{item.minutes} min</p>
                    <h3 className="mt-2 text-lg leading-snug font-extrabold text-balance">{item.title}</h3>
                    <p className="mt-2 text-base leading-snug text-muted">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-12">
              <div className="aubergine-panel rounded-[var(--radius-card)] p-7 md:col-span-7">
                <p className="label text-mint">The investment</p>
                <p className="display-m mt-3">{workshop.price}</p>
                <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-paper/85">{workshop.priceNote}</p>
              </div>
              <div className="rounded-[var(--radius-card)] border border-[var(--rule)] bg-white p-7 md:col-span-5">
                <p className="label text-purple">{workshop.before.label}</p>
                <p className="mt-3 text-base leading-relaxed text-aubergine">{workshop.before.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* After the workshop: the steps that can follow. */}
        <section className="section-pad bg-white">
          <div className="shell">
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
              <SectionHeading eyebrow={pathway.eyebrow} headline={pathway.headline} className="lg:col-span-6" />
              <p className="body-copy lg:col-span-6 lg:self-end">{pathway.body}</p>
            </div>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-3">
              {pathway.steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.name}
                  index={index}
                  className={`flex flex-col rounded-[var(--radius-card)] p-6 ${index === 0 ? "mint-panel" : "border border-[var(--rule)] bg-white"}`}
                >
                  <p className={`label ${index === 0 ? "text-aubergine" : "text-purple"}`}>{step.step}</p>
                  <h3 className="display-s mt-2 text-balance">{step.name}</h3>
                  <p className="mt-3 text-base leading-snug font-bold text-aubergine">{step.line}</p>
                  {step.body ? <p className="mt-3 text-base leading-snug text-muted">{step.body}</p> : null}
                  <p className="mt-auto pt-6 text-base font-extrabold text-aubergine">{step.price}</p>
                </Reveal>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">{pathway.note}</p>
          </div>
        </section>

        {/* Who you'd be working with. */}
        <section className="section-pad bg-paper">
          <div className="shell">
            <SectionHeading eyebrow={people.eyebrow} headline={people.headline} align="wide" />
            <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-0">
              {people.members.map((member, index) => (
                <Reveal as="li" key={member.name} index={index} className="flex flex-col md:row-span-5 md:grid md:grid-rows-subgrid">
                  <div className="relative aspect-[4/5] w-full">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 top-3.5 left-3.5 rounded-[var(--radius-card)]"
                      style={{ backgroundColor: `var(--color-${member.offset})` }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      width={800}
                      height={1000}
                      className="absolute inset-0 right-3.5 bottom-3.5 h-[calc(100%-0.875rem)] w-[calc(100%-0.875rem)] rounded-[var(--radius-card)] object-cover"
                    />
                  </div>
                  <h3 className="display-s mt-6">{member.name}</h3>
                  <p className="label mt-1.5 text-purple">{member.role}</p>
                  <p className="body-copy mt-4 text-base">{member.bio}</p>
                  <p className="mt-5 text-base text-aubergine">
                    <span className="label mr-2 text-muted">Focus</span>
                    {member.focus}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Next step. */}
        <section id="next" className="aubergine-panel section-pad scroll-mt-[var(--header-h)]">
          <div className="shell grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">{nextStep.eyebrow}</Eyebrow>
              <h2 className="display-xl mt-6 text-balance">
                {nextStep.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="lede text-paper/85">{nextStep.body}</p>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(nextStep.subject)}`} className="btn btn-on-dark mt-8">
                {nextStep.action}
              </a>
              <p className="mt-8 flex items-center gap-3 text-base text-paper/80">
                <Motif tone="dark" />
                <span>
                  {nextStep.signoff} ·{" "}
                  <a href={`mailto:${site.email}`} className="text-link text-paper">
                    {site.email}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
