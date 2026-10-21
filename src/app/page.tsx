import { ContactSection } from "@/components/ContactSection";
import { EngageSection } from "@/components/EngageSection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { WhySection } from "@/components/WhySection";
import { WorkSection } from "@/components/WorkSection";
import { websiteSchema } from "@/lib/structuredData";

/**
 * Single-page narrative. The order is the argument:
 * the change → how we engage → proof → who we are → talk to us. Backgrounds alternate white and cream; aubergine is kept for
 * the contact section and footer.
 */
export default function Page() {
  return (
    <>
      <a
        href="#why"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <JsonLd data={websiteSchema()} />
      <SiteHeader />
      <main>
        <Hero />
        <WhySection />
        <EngageSection />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
