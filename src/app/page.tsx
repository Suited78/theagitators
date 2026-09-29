import { AudienceSection } from "@/components/AudienceSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { ManifestoSection } from "@/components/ManifestoSection";
import { OutcomesSection } from "@/components/OutcomesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { WhySection } from "@/components/WhySection";
import { WorkSection } from "@/components/WorkSection";

/**
 * Single-page narrative. The order is the argument:
 * the change → who feels it → what's different afterwards → what we do →
 * how we work → proof → what we think → who we are → talk to us.
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
      <SiteHeader />
      <main>
        <Hero />
        <WhySection />
        <AudienceSection />
        <OutcomesSection />
        <CapabilitiesSection />
        <ProcessSection />
        <WorkSection />
        <ManifestoSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
