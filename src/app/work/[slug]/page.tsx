import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ContactSection } from "@/components/ContactSection";
import { Eyebrow } from "@/components/Eyebrow";
import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { caseStudies } from "@/content/caseStudies";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);
  if (!study) return {};
  return {
    title: `${study.headline} · ${study.sector}`,
    description: study.summary,
  };
}

/** Label on the left, content on the right: every block on the page uses this. */
function Block({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <section className={`grid gap-x-10 gap-y-6 border-t border-[var(--rule)] py-12 lg:grid-cols-12 lg:py-16 ${className}`}>
      <Reveal className="lg:col-span-3">
        <h2 className="label flex items-center gap-4 text-purple">
          <Motif />
          {label}
        </h2>
      </Reveal>
      <Reveal index={1} className="min-w-0 lg:col-span-9">
        {children}
      </Reveal>
    </section>
  );
}

function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {items.map((text) => (
        <p key={text} className="body-copy max-w-[64ch] text-aubergine">
          {text}
        </p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <a
        href="#case-study"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="case-study">
        <header className="shell pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))] pb-12 lg:pb-16">
          <Reveal>
            <Link href="/#work" className="text-link label inline-flex min-h-10 items-center text-muted hover:text-aubergine">
              ← Selected work
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow>Case study · {study.sector}</Eyebrow>
              </Reveal>
              <Reveal index={1}>
                <h1 className="display-xl mt-6 text-balance">{study.headline}</h1>
              </Reveal>
              <Reveal index={2}>
                <p className="lede mt-6 max-w-[48ch] text-pretty">{study.summary}</p>
              </Reveal>
            </div>
            <Reveal index={3} className="lg:col-span-4 lg:self-end">
              <div className="mint-panel rounded-[var(--radius-card)] p-6 lg:p-8">
                <p className="label">Headline result</p>
                <p className="display-l mt-3">{study.result.value}</p>
                <p className="mt-2 text-base leading-snug">{study.result.label}</p>
              </div>
            </Reveal>
          </div>

          <Reveal index={4}>
            <dl className="mt-14 grid gap-x-8 gap-y-6 border-t-2 border-aubergine pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  ["Client", study.glance.client],
                  ["Engagement", study.glance.engagement],
                  ["Stages", study.glance.stages],
                  ["Where it got to", study.glance.reached],
                ] as const
              ).map(([term, detail]) => (
                <div key={term}>
                  <dt className="label text-muted">{term}</dt>
                  <dd className="mt-2 text-base font-semibold leading-snug">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        <div className="shell">
          <Block label="The situation">
            <Paragraphs items={study.situation} />
            {study.quote ? (
              <figure className="mt-10 border-l-4 border-purple pl-6">
                <blockquote className="display-s max-w-[36ch] text-balance">“{study.quote.text}”</blockquote>
                <figcaption className="mt-3 text-base text-muted">{study.quote.attribution}</figcaption>
              </figure>
            ) : null}
          </Block>

          <Block label="The approach">
            <Paragraphs items={study.approach} />
            <ol className="mt-10 border-t-2 border-aubergine">
              {study.stageTable.map((row) => (
                <li
                  key={row.stage}
                  className="grid gap-x-6 gap-y-3 border-b border-[var(--rule)] py-5 md:grid-cols-[9rem_minmax(0,1.2fr)_minmax(0,1fr)]"
                >
                  <h3 className="text-base font-extrabold">{row.stage}</h3>
                  <p className="text-base leading-relaxed text-muted">{row.happened}</p>
                  <p className="text-base leading-relaxed font-semibold">
                    <span className="label mb-1 block text-purple">What the client keeps</span>
                    {row.keeps}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="What it exposed">
            <h3 className="display-m max-w-[24ch] text-balance">{study.exposed.headline}</h3>
            <Paragraphs items={study.exposed.body} className="mt-6" />
          </Block>
        </div>

        <section className="aubergine-panel section-pad mt-4">
          <div className="shell">
            <Reveal>
              <Eyebrow tone="dark">Where we drew the line</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <p className="display-m mt-6 max-w-[30ch] text-balance">
                Written down before anything was built: what the system may own, and what stays with a person.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {(
                [
                  ["The system may own", study.line.system, "bg-paper/[0.06] text-paper"],
                  ["Only a person may own", study.line.person, "bg-mint text-aubergine"],
                ] as const
              ).map(([title, items, surface], column) => (
                <Reveal key={title} index={2 + column}>
                  <div className={`h-full rounded-[var(--radius-card)] p-6 lg:p-8 ${surface}`}>
                    <h3 className="label">{title}</h3>
                    <ul className="mt-5">
                      {items.map(({ item, note }) => (
                        <li key={item} className="border-t border-current/20 py-4 first:border-t-0 first:pt-0 last:pb-0">
                          <p className="text-lg font-bold leading-snug">{item}</p>
                          <p className="mt-1 text-base opacity-85">{note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="shell">
          <Block label="Results" className="border-t-0">
            {study.results.stats.length > 0 ? (
              <dl className="mb-10 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
                {study.results.stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-aubergine pt-4">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="display-m block whitespace-nowrap text-purple tabular-nums">{stat.value}</span>
                      <span aria-hidden="true" className="mt-2 block text-base leading-snug text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <ul className="space-y-4">
              {study.results.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-5 shrink-0 bg-purple" />
                  <p className="body-copy max-w-[60ch] text-aubergine">{outcome}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[var(--radius-card)] bg-white p-6">
              <p className="label text-muted">How we measured this</p>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-muted">{study.results.evidence}</p>
            </div>
          </Block>

          <Block label="What transfers">
            <h3 className="display-l max-w-[20ch] text-balance">{study.insight.headline}</h3>
            <p className="lede mt-6 max-w-[56ch]">{study.insight.body}</p>
          </Block>

          {next.slug !== study.slug ? (
            <nav aria-label="More case studies" className="border-t border-[var(--rule)] py-12 lg:py-16">
              <Link href={`/work/${next.slug}`} className="group block">
                <p className="label text-muted">Next case study · {next.sector}</p>
                <p className="display-m mt-3 max-w-[28ch] text-balance transition-colors duration-300 group-hover:text-purple">
                  {next.headline} <span aria-hidden="true">→</span>
                </p>
              </Link>
            </nav>
          ) : null}
        </div>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
