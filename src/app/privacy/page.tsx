import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles personal information on this website.`,
  alternates: { canonical: "/privacy" },
};

/** Plain-language statement. Update it if analytics, forms or cookies are added. */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="shell pt-[calc(var(--header-h)+clamp(3rem,8vw,6rem))] pb-[clamp(4rem,10vw,8rem)]">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="display-l mt-6 max-w-[20ch] text-balance">What this website collects about you</h1>
        <div className="mt-10 max-w-[62ch] space-y-5">
          <p className="body-copy text-aubergine">
            Very little. This website has no forms, no accounts, no advertising and no analytics or tracking cookies.
          </p>
          <p className="body-copy text-aubergine">
            Like any website, our hosting provider keeps standard technical logs (such as IP addresses and the pages
            requested) for security and to keep the site running. We don’t use them to identify or profile you.
          </p>
          <p className="body-copy text-aubergine">
            If you email us, we’ll use your name, address and whatever you tell us to reply and to discuss working
            together. We don’t sell or share it, and you can ask us to delete it at any time.
          </p>
          <p className="body-copy text-aubergine">
            Questions or requests:{" "}
            <a href={`mailto:${site.email}`} className="text-link">
              {site.email}
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
