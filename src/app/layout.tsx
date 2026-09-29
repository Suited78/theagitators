import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/content/site";
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
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.name,
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={manrope.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
