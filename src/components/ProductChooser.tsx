"use client";

import { useState } from "react";
import { productNote, products } from "@/content/products";
import { Reveal } from "./Reveal";

/**
 * Visitors pick the sentence closest to their situation and that product opens
 * beneath it. Every panel is in the page from the start (hidden, not absent),
 * so search engines and AI tools read all three.
 */
export function ProductChooser() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
        <Reveal>
          <p id="product-prompt" className="label text-muted">
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
                      "group relative flex h-full min-h-28 w-full cursor-pointer flex-col justify-between gap-4 rounded-[var(--radius-card)] border-2 p-5 pr-14 text-left transition-[background-color,border-color,transform] duration-300 lg:p-6 lg:pr-16",
                      open
                        ? "border-aubergine bg-aubergine text-paper"
                        : "border-divider bg-white hover:-translate-y-0.5 hover:border-purple",
                    ].join(" ")}
                  >
                    {/* A plus that turns to a minus: the card opens, it isn't just a label. */}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
                        open ? "border-mint text-mint" : "border-aubergine text-aubergine group-hover:border-purple group-hover:text-purple",
                      ].join(" ")}
                    >
                      <span className="absolute h-0.5 w-3 bg-current" />
                      <span className={`absolute h-0.5 w-3 bg-current transition-transform duration-300 ${open ? "rotate-0" : "rotate-90"}`} />
                    </span>
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

        {selected ? null : <p className="body-copy mt-5 text-base">{productNote.unsure}</p>}
    </div>
  );
}
