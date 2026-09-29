import { finalCta, site } from "@/content/site";
import { AgitationField } from "./AgitationField";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(finalCta.action.subject)}`;

  return (
    <section id="contact" className="aubergine-panel scroll-mt-[var(--header-h)] pt-[clamp(3.5rem,8vw,7rem)]">
      <div className="shell">
        <Reveal>
          <Eyebrow tone="dark">{finalCta.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <Reveal index={1} className="lg:col-span-8">
            <h2 className="display-xl text-balance">{finalCta.headline}</h2>
          </Reveal>
          <Reveal index={2} className="lg:col-span-4 lg:self-end lg:pb-4">
            <p className="lede text-paper/80">{finalCta.supporting}</p>
          </Reveal>
        </div>

        <Reveal index={3}>
          <div className="mt-12 flex flex-col gap-6 border-t border-[var(--rule-invert)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={mailto}
              className="btn btn-on-dark group w-fit"
            >
              {finalCta.action.label}
              <span
                aria-hidden="true"
                className="block h-px w-6 bg-current transition-all duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:w-10"
              />
            </a>
            <div className="text-base text-paper">
              <a href={mailto} className="text-link">
                {site.email}
              </a>
              <p className="mt-1.5 text-sm text-paper/80">{finalCta.note}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-[clamp(3rem,6vw,5rem)] h-[clamp(160px,24vh,260px)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <AgitationField tone="dark" interactive spacing={10} className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
}
