import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="shell pt-[calc(var(--header-h)+clamp(3rem,8vw,6rem))] pb-[clamp(4rem,10vw,8rem)]">
        <Eyebrow>404</Eyebrow>
        <h1 className="display-xl mt-6 max-w-[16ch] text-balance">This page has wandered off.</h1>
        <p className="lede mt-6 max-w-[48ch]">
          The link may be old, or the address mistyped. Everything we have is on the home page, or you can ask us
          directly at{" "}
          <a href={`mailto:${site.email}`} className="text-link text-aubergine">
            {site.email}
          </a>
          .
        </p>
        <Link href="/" className="btn btn-primary mt-10">
          Back to the home page
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
