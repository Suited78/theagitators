import { manifesto, manifestoIntro } from "@/content/manifesto";
import { Reveal } from "./Reveal";

export function ManifestoSection() {
  return (
    <section className="ink-panel section-pad">
      <div className="shell">
        <Reveal>
          <p className="label flex items-center gap-3 text-paper-dim">
            <span aria-hidden="true" className="h-px w-8 bg-accent-bright" />
            {manifestoIntro.eyebrow}
          </p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="display-l mt-6 max-w-[16ch] text-balance">{manifestoIntro.headline}</h2>
        </Reveal>

        <ul className="mt-16 lg:mt-24">
          {manifesto.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.id}
              className="grid gap-x-10 gap-y-4 border-t border-[var(--rule-invert)] py-10 last:border-b md:grid-cols-12 lg:py-14"
            >
              <span className="label text-paper-dim tabular-nums md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="display-m text-balance md:col-span-6">{entry.statement}</p>
              <p className="body-copy text-paper-dim md:col-span-5">{entry.support}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
