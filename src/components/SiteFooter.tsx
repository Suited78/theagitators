import { nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="aubergine-panel border-t border-[var(--rule-invert)] pt-14 pb-10">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="reversed" className="w-[220px]" />
            <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-paper/80">{site.positioningLine}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="label text-mint">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="inline-flex min-h-10 items-center text-base text-paper/80 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="label text-mint">Elsewhere</p>
            <ul className="mt-4 space-y-1 text-base">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-link inline-flex min-h-10 items-center text-paper/80 hover:text-paper"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-link inline-flex min-h-10 items-center text-paper/80 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--rule-invert)] pt-6 text-sm text-paper/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Concept site — placeholder content throughout.
          </p>
          <p>Nothing here is final.</p>
        </div>
      </div>
    </footer>
  );
}
