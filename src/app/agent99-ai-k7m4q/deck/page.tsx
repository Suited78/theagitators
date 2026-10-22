import type { Metadata } from "next";
import { ProposalDeck } from "@/components/agent99/ProposalDeck";
import { proposal } from "@/content/agent99";

/**
 * The same proposal as a presentation, one slide at a time. Private like the
 * one-page version: link only, out of search engines, the sitemap and llms.txt.
 */
export const metadata: Metadata = {
  title: "Agent99: discovery workshop proposal",
  description: proposal.lede,
  robots: { index: false, follow: false, nocache: true },
};

export default function Agent99DeckPage() {
  return (
    <main id="main">
      <ProposalDeck onePageHref="/agent99-ai-k7m4q" />
    </main>
  );
}
