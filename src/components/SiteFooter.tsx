import { nav, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ink-panel border-t border-[var(--rule-invert)] pt-14 pb-10">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Brand flourish: the AGI is picked out in the accent and bracketed. */}
            <p className="display-m select-none">
              {site.wordmark.before}
              <span className="relative inline-block font-semibold text-accent-bright">
                {site.wordmark.agi}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full bg-accent-bright/50"
                />
              </span>
              {site.wordmark.after}
            </p>
            <p className="body-copy mt-5 max-w-[36ch] text-paper-dim">{site.positioningLine}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-7">
            <p className="label text-paper-dim/70">Sections</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-paper-dim transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label text-paper-dim/70">Elsewhere</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper-dim transition-colors duration-300 hover:text-bone"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper-dim transition-colors duration-300 hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--rule-invert)] pt-6 text-xs text-paper-dim/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Concept site — placeholder content throughout.
          </p>
          <p>Working name. Nothing here is final.</p>
        </div>
      </div>
    </footer>
  );
}
