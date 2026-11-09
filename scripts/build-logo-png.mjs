// Renders PNG versions of the logo for places that can't use SVG (email, Apple touch icon).
// Run after `npm run logos`. Uses Playwright with Chromium: NODE_PATH="$(npm root -g)" node scripts/build-logo-png.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");

const svg = (f) => `data:image/svg+xml;base64,${readFileSync(new URL(`../public/brand/${f}`, import.meta.url)).toString("base64")}`;
const jobs = [
  // Email header logo, 2x for retina at 300px wide; transparent background
  { out: "public/brand/ms-logo-email.png", w: 600, h: 190, html: `<img src="${svg("ms-logo-on-light.svg")}" style="width:600px;height:190px;display:block">`, transparent: true },
  // Apple touch icon: square, iOS rounds the corners itself
  { out: "app/apple-icon.png", w: 180, h: 180, html: `<div style="width:180px;height:180px;background:#0B0B0C"><img src="${svg("ms-icon.svg")}" style="width:180px;height:180px;display:block"></div>` },
];

const b = await chromium.launch();
for (const j of jobs) {
  const p = await b.newPage({ viewport: { width: j.w, height: j.h } });
  await p.setContent(`<html><body style="margin:0;background:transparent">${j.html}</body></html>`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: new URL(`../${j.out}`, import.meta.url).pathname, omitBackground: !!j.transparent, clip: { x: 0, y: 0, width: j.w, height: j.h } });
  console.log("wrote", j.out);
}
await b.close();
