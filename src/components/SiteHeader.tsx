"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -68% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile menu and restore focus on close.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        "[transition-timing-function:var(--ease-out-quint)]",
        scrolled && !menuOpen
          ? "border-b border-[var(--rule)] bg-bone/80 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#top"
          className="group -mx-1 rounded-sm px-1 py-1 text-[1.0625rem] font-medium"
          aria-label={`${site.name} — back to top`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative block py-1 text-sm text-ink-soft transition-colors duration-300 hover:text-ink aria-[current]:text-ink"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent",
                        "transition-transform duration-500 [transition-timing-function:var(--ease-out-quint)]",
                        "group-hover:origin-left group-hover:scale-x-100",
                        isActive ? "origin-left scale-x-100" : "",
                      ].join(" ")}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-[var(--rule-strong)] px-5 py-2 text-sm text-ink transition-colors duration-400 [transition-timing-function:var(--ease-out-quint)] hover:border-ink hover:bg-ink hover:text-bone sm:inline-block"
          >
            Start a conversation
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex items-center gap-2 rounded-sm p-2 lg:hidden"
          >
            <span className="label text-ink">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={[
                  "absolute left-0 block h-px w-5 bg-ink transition-transform duration-400",
                  "[transition-timing-function:var(--ease-out-quint)]",
                  menuOpen ? "top-1.5 rotate-45" : "top-0.5",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-px w-5 bg-ink transition-transform duration-400",
                  "[transition-timing-function:var(--ease-out-quint)]",
                  menuOpen ? "top-1.5 -rotate-45" : "top-2.5",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-bone lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between py-10">
              <ul className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-[var(--rule)]"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="display-s flex items-baseline justify-between py-4"
                    >
                      {item.label}
                      <span className="label text-ink-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-10 block rounded-full bg-ink px-6 py-4 text-center text-base text-bone"
              >
                Start a conversation
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
