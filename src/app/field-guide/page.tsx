import type { Metadata } from "next";
import { FieldGuide } from "@/components/fieldguide/FieldGuide";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { guideIntro } from "@/content/fieldGuide";

const description =
  "Thirteen habits for working with AI, from asking better questions to letting it work on its own, with prompts to copy. From The Agitators.";

/** Not linked from the nav: shared by link and QR code, but crawlable. */
export const metadata: Metadata = {
  title: guideIntro.title,
  description,
  alternates: { canonical: "/field-guide" },
  openGraph: { title: guideIntro.title, description, url: "/field-guide" },
};

export default function FieldGuidePage() {
  return (
    <>
      <SiteHeader solid />
      <main id="main">
        <FieldGuide />
      </main>
      <SiteFooter />
    </>
  );
}
