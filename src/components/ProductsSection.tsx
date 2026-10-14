import { depths, productIntro, products } from "@/content/products";
import { Motif } from "./Motif";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ProductsSection() {
  return (
    <section id="what" className="section-pad scroll-mt-[var(--header-h)]">
      <div className="shell">
        <SectionHeading
          eyebrow={productIntro.eyebrow}
          headline={productIntro.headline}
          supporting={productIntro.supporting}
          align="wide"
        />

        {/* Each way in is led by the client's own words, then named. */}
        <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3 lg:mt-16">
          {products.map((product, index) => (
            <Reveal
              as="li"
              key={product.id}
              index={index}
              className="group flex flex-col border-t-2 border-aubergine pt-6 transition-[border-color] duration-500 hover:border-purple"
            >
              <p className="display-s text-balance">“{product.quote}”</p>
              <h3 className="label mt-5 text-purple">{product.name}</h3>
              <p className="body-copy mt-3 text-aubergine">{product.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {product.includes.map((line) => (
                  <li key={line} className="body-copy flex gap-3 text-base">
                    <span aria-hidden="true" className="mt-[0.75em] h-0.5 w-3 shrink-0 bg-mint" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        {/* The same three depths apply to every product. */}
        <Reveal>
          <div className="mt-14 rounded-[var(--radius-card)] bg-white p-6 sm:p-8 lg:mt-20">
            <p className="label flex items-center gap-4 text-purple">
              <Motif />
              {depths.label}
            </p>
            <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-0">
              {depths.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="relative md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[var(--rule)] md:[&:not(:first-child)]:pl-8"
                >
                  <p className="label text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</p>
                  <p className="display-s mt-2">{step.title}</p>
                  <p className="body-copy mt-2 text-base">{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-[var(--rule)] pt-5 text-base font-semibold">{depths.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
