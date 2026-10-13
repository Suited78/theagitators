/**
 * Renders the 1200×630 share images in public/og/ from the site content.
 * Re-run after changing a case study headline or adding one:
 *
 *   npx -y -p playwright@1 node --experimental-strip-types scripts/generate-og-images.mjs
 *
 * Uses the self-hosted Manrope and the reversed logo, so it needs no network.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { caseStudies } from "../src/content/caseStudies.ts";
import { hero, site } from "../src/content/site.ts";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs"));
}

const root = path.resolve(import.meta.dirname, "..");
const font = fs.readFileSync(path.join(root, "holding/manrope-latin.woff2")).toString("base64");
const logo = fs.readFileSync(path.join(root, "public/brand/the-agitators-reversed-web.svg")).toString("base64");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = ({ label, title, size }) => `<!doctype html><html><head><style>
@font-face { font-family: Manrope; font-weight: 200 800; src: url(data:font/woff2;base64,${font}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #2d163b; color: #faf8f3; font-family: Manrope, sans-serif;
  display: flex; flex-direction: column; justify-content: space-between; padding: 64px 72px; }
.label { display: flex; align-items: center; gap: 18px; color: #bee8cc; font-size: 22px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.motif { display: flex; gap: 6px; } .motif i { width: 44px; height: 9px; display: block; }
h1 { font-size: ${size}px; font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; max-width: 1000px; margin-top: 28px; text-wrap: balance; }
img { width: 300px; height: auto; }
</style></head><body>
<div><p class="label"><span class="motif"><i style="background:#faf8f3"></i><i style="background:#7b319b"></i><i style="background:#bee8cc"></i></span>${esc(label)}</p>
<h1>${esc(title)}</h1></div>
<img src="data:image/svg+xml;base64,${logo}" alt="">
</body></html>`;

const jobs = [
  { file: "default.png", label: hero.eyebrow, title: site.tagline, size: 84 },
  ...caseStudies.map((s) => ({ file: `${s.slug}.png`, label: `Case study · ${s.sector}`, title: s.headline, size: 72 })),
];

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs) {
  await tab.setContent(page(job));
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: path.join(root, "public/og", job.file) });
  console.log("wrote public/og/" + job.file);
}
await browser.close();
