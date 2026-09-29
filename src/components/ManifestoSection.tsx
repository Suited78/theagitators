import { manifesto, manifestoIntro } from "@/content/manifesto";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function ManifestoSection() {
  return (
    <section className="mint-panel section-pad">
      <div className="shell">
        <Reveal>
          <Eyebrow tone="mint">{manifestoIntro.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal index={1}>
          <h2 className="display-l mt-5 max-w-[16ch] text-balance">{manifestoIntro.headline}</h2>
        </Reveal>

        <ul className="mt-16 lg:mt-24">
          {manifesto.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.id}
              className="grid gap-x-10 gap-y-4 border-t border-[var(--rule-invert)] py-10 last:border-b md:grid-cols-12 lg:py-14"
            >
              <span className="label text-purple tabular-nums md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="display-m text-balance md:col-span-6">{entry.statement}</p>
              <p className="body-copy text-aubergine md:col-span-5">{entry.support}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
