import { why } from "@/content/why";
import { AdoptionGapChart } from "./AdoptionGapChart";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function WhySection() {
  return (
    <section id="why" className="section-pad scroll-mt-[var(--header-h)] hairline-t">
      <div className="shell">
        <Reveal>
          <Eyebrow>{why.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <h2 className="display-l text-balance lg:col-span-7">
            {why.headline.map((line, index) => (
              <Reveal key={line} as="span" index={index} className="block">
                {line}
              </Reveal>
            ))}
          </h2>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal index={2}>
              <p className="lede text-aubergine">{why.lede}</p>
            </Reveal>
            {why.body.map((paragraph, index) => (
              <Reveal key={paragraph} index={index + 3}>
                <p className="body-copy mt-5">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The unanswered questions — an editorial list, not a feature grid. */}
        <div className="mt-16 lg:mt-24">
          <Reveal>
            <p className="label text-purple">What nobody has time to work out</p>
          </Reveal>
          <ol className="mt-6 grid gap-x-12 md:grid-cols-2">
            {why.questions.map((question, index) => (
              <Reveal
                as="li"
                key={question}
                index={index % 3}
                className="flex items-start gap-5 border-t border-[var(--rule)] py-5"
              >
                <span className="label mt-1 shrink-0 text-purple tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty text-[1.25rem] leading-snug font-semibold">{question}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* The adoption gap: the picture behind the closer below. */}
        <figure className="mt-16 grid gap-x-12 gap-y-8 border-t border-[var(--rule)] pt-10 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label text-purple">{why.gap.label}</p>
            </Reveal>
            <Reveal index={1}>
              <h3 className="display-m mt-4 text-balance">{why.gap.headline}</h3>
            </Reveal>
            <Reveal index={2}>
              <p className="body-copy mt-4">{why.gap.body}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <AdoptionGapChart />
            <figcaption className="mt-4 text-sm text-muted">{why.gap.caption}</figcaption>
          </div>
        </figure>

        {/* Mint callout, after the guidelines' "voice in practice" panel. */}
        <Reveal>
          <div className="mt-10 rounded-[var(--radius-card)] bg-mint px-6 py-8 sm:px-10 sm:py-10 lg:mt-12">
            <p className="display-m max-w-[40ch] text-balance">{why.closer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
