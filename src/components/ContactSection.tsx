import { finalCta, site } from "@/content/site";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(finalCta.action.subject)}`;

  return (
    <section id="contact" className="ink-panel scroll-mt-[var(--header-h)] pt-[clamp(5rem,11vw,10rem)] pb-[clamp(4rem,7vw,7rem)]">
      <div className="shell">
        <Reveal>
          <p className="label flex items-center gap-3 text-paper-dim">
            <span aria-hidden="true" className="h-px w-8 bg-accent-bright" />
            {finalCta.eyebrow}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal index={1} className="lg:col-span-8">
            <h2 className="display-xl text-balance">{finalCta.headline}</h2>
          </Reveal>
          <Reveal index={2} className="lg:col-span-4 lg:self-end lg:pb-4">
            <p className="lede text-paper-dim">{finalCta.supporting}</p>
          </Reveal>
        </div>

        <Reveal index={3}>
          <div className="mt-12 flex flex-col gap-6 border-t border-[var(--rule-invert)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={mailto}
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-bone px-7 py-4 text-base text-ink transition-colors duration-400 [transition-timing-function:var(--ease-out-quint)] hover:bg-accent-bright"
            >
              {finalCta.action.label}
              <span
                aria-hidden="true"
                className="block h-px w-6 bg-current transition-all duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:w-10"
              />
            </a>
            <div className="text-sm text-paper-dim">
              <a href={mailto} className="underline decoration-[color-mix(in_srgb,var(--color-bone)_35%,transparent)] underline-offset-4 transition-colors duration-300 hover:text-bone">
                {site.email}
              </a>
              <p className="mt-1.5 text-xs text-paper-dim/70">{finalCta.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
