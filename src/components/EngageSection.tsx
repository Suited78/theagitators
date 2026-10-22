import { engageIntro } from "@/content/products";
import { Motif } from "./Motif";
import { ProcessRoute } from "./ProcessRoute";
import { ProductChooser } from "./ProductChooser";
import { SectionHeading } from "./SectionHeading";

/**
 * How we engage: who we work with and what we build, the three ways in, then
 * the one route every engagement follows. Replaces the separate Who, What and
 * How sections (founders' review, 15 October 2026).
 */
export function EngageSection() {
  return (
    <section id="engage" className="section-pad scroll-mt-[var(--header-h)] bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow={engageIntro.eyebrow}
          headline={engageIntro.headline}
          supporting={engageIntro.supporting}
          align="wide"
        />
        <div className="mt-12 lg:mt-16">
          <ProductChooser />
        </div>
        <div className="mt-16 lg:mt-24">
          <ProcessRoute />
        </div>
        <p className="mt-12 flex flex-col gap-3 text-base font-semibold text-aubergine sm:flex-row sm:items-center sm:gap-4 lg:mt-16">
          <Motif />
          {engageIntro.guardrails}
        </p>
      </div>
    </section>
  );
}
