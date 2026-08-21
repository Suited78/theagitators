import { why } from "@/content/why";
import { Reveal } from "./Reveal";

export function WhySection() {
  return (
    <section id="why" className="section-pad scroll-mt-[var(--header-h)] hairline-t">
      <div className="shell">
        <Reveal>
          <p className="label flex items-center gap-3 text-ink-faint">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {why.eyebrow}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <h2 className="display-l text-balance lg:col-span-7">
            {why.headline.map((line, index) => (
              <Reveal key={line} as="span" index={index} className="block">
                {line}
              </Reveal>
            ))}
          </h2>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal index={2}>
              <p className="lede text-ink">{why.lede}</p>
            </Reveal>
            {why.body.map((paragraph, index) => (
              <Reveal key={paragraph} index={index + 3}>
                <p className="body-copy mt-5">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The unanswered questions — an editorial list, not a feature grid. */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <p className="label text-ink-faint">What nobody has time to work out</p>
          </Reveal>
          <ol className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {why.questions.map((question, index) => (
              <Reveal
                as="li"
                key={question}
                index={index % 3}
                className="group flex items-start gap-5 border-t border-[var(--rule)] py-6"
              >
                <span className="label mt-1.5 shrink-0 text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display-s text-pretty text-ink">{question}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <p className="display-m mt-20 max-w-[24ch] text-balance lg:mt-28 lg:ml-auto lg:text-right">
            {why.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
