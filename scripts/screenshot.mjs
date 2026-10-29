// Usage: node scripts/screenshot.mjs <baseUrl> <outDir> [paths...]
// Captures each page full-length at 360px (mobile) and 1280px (desktop).
import { createRequire } from "node:module";
// Uses the globally installed Playwright: run with NODE_PATH="$(npm root -g)"
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync } from "node:fs";

const [base = "http://localhost:3000", out = "screenshots", ...paths] = process.argv.slice(2);
const pages = paths.length ? paths : ["/", "/storage", "/detailing", "/gallery", "/join", "/events"];
const widths = [
  { name: "mobile", width: 360, height: 780 },
  { name: "desktop", width: 1280, height: 800 },
];
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w.width, height: w.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const slug = p === "/" ? "home" : p.replace(/^\//, "").replace(/[/?=&]/g, "-");
    await page.screenshot({ path: `${out}/${slug}-${w.name}.png`, fullPage: true });
    console.log(`${slug}-${w.name}${overflow > 0 ? `  HORIZONTAL OVERFLOW ${overflow}px` : ""}`);
  }
  await ctx.close();
}
await browser.close();
