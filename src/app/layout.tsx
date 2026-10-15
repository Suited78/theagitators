import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { prelaunch, site } from "@/content/site";
import { organisationSchema } from "@/lib/structuredData";
import "./globals.css";

// The brand typeface: one family, weights 400–800.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_AU",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
  // Flipped by `prelaunch` in src/content/site.ts.
  robots: prelaunch ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={manrope.variable}>
      <body className="antialiased">
        <JsonLd data={organisationSchema()} />
        {children}
      </body>
    </html>
  );
}
