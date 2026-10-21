import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Tips } from "@/components/tips/Tips";
import { tipsIntro } from "@/content/tips";

const description =
  "Quick tips for getting more out of AI at work, each with a prompt you can copy. From The Agitators.";

/** Linked from the footer, not the top nav: shared by link and QR code, and crawlable. */
export const metadata: Metadata = {
  title: tipsIntro.title,
  description,
  alternates: { canonical: "/tips" },
  openGraph: { title: tipsIntro.title, description, url: "/tips" },
};

export default function TipsPage() {
  return (
    <>
      <SiteHeader solid />
      <main id="main">
        <Tips />
      </main>
      <SiteFooter />
    </>
  );
}
