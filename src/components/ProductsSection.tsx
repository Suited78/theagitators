"use client";

import { useState } from "react";
import { productIntro, productNote, products } from "@/content/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Visitors pick the sentence closest to their situation and that product opens
 * beneath it. Every panel is in the page from the start (hidden, not absent),
 * so search engines and AI tools read all three.
 */
export function ProductsSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="what" className="section-pad scroll-mt-[var(--header-h)]">
      <div className="shell">
        <SectionHeading
          eyebrow={productIntro.eyebrow}
          headline={productIntro.headline}
          supporting={productIntro.supporting}
          align="wide"
        />

        <Reveal>
          <p id="product-prompt" className="label mt-12 text-muted lg:mt-16">
            {productNote.prompt}
          </p>
        </Reveal>

        {/* On small screens each panel opens directly under its quote; on larger
            ones the quotes sit in a row with the open panel beneath them. */}
        <div role="group" aria-labelledby="product-prompt" className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
          {products.map((product, index) => {
            const open = selected === product.id;
            return (
              <div key={product.id} className="contents">
                <Reveal index={index} className="md:row-start-1">
                  <button
                    type="button"
                    id={`product-${product.id}-button`}
                    aria-expanded={open}
                    aria-controls={`product-${product.id}`}
                    onClick={() => setSelected(open ? null : product.id)}
                    className={[
                      "flex h-full min-h-28 w-full flex-col justify-between gap-4 rounded-[var(--radius-card)] border-2 p-5 text-left transition-colors duration-300 lg:p-6",
                      open
                        ? "border-aubergine bg-aubergine text-paper"
                        : "border-divider bg-white hover:border-purple",
                    ].join(" ")}
                  >
                    <span className="display-s text-balance">“{product.quote}”</span>
                    <span className={`label ${open ? "text-mint" : "text-purple"}`}>{product.name}</span>
                  </button>
                </Reveal>

                <div
                  id={`product-${product.id}`}
                  role="region"
                  aria-labelledby={`product-${product.id}-button`}
                  hidden={!open}
                  className="md:col-span-3 md:row-start-2"
                >
                  <div className="grid gap-x-10 gap-y-6 border-t border-[var(--rule)] pt-6 pb-2 md:mt-4 md:grid-cols-12 md:pt-8">
                    <div className="md:col-span-7">
                      <h3 className="label text-purple">{product.name}</h3>
                      <p className="body-copy mt-3 text-aubergine">{product.summary}</p>
                    </div>
                    <ul className="space-y-2.5 md:col-span-5">
                      {product.includes.map((line) => (
                        <li key={line} className="body-copy flex gap-3 text-base">
                          <span aria-hidden="true" className="mt-[0.75em] h-0.5 w-3 shrink-0 bg-purple" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--rule)] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="body-copy text-aubergine">
              {selected ? null : `${productNote.unsure} `}
              {productNote.text}
            </p>
            <a href={productNote.link.href} className="text-link shrink-0 text-base font-semibold text-purple">
              {productNote.link.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
