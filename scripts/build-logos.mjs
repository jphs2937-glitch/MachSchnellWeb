// Builds the logo SVGs from the approved logo mockup. Run: npm run logos
// Source: brand-kit/logo-2026/MachSchnell-logo-final.dc.html (outlined shapes only; no fonts needed).
// Output: brand-kit/logo-2026/*.svg (full set) and public/brand/*.svg (the files the site uses).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const src = readFileSync(new URL("../brand-kit/logo-2026/MachSchnell-logo-final.dc.html", import.meta.url), "utf8");
const parts = Object.fromEntries([...src.matchAll(/<g id="(ms-[a-z]+)">([\s\S]*?)<\/g>/g)].map((m) => [m[1], m[2]]));

const RED = "#D3202B";
const BLACK = "#121212";
const WHITE = "#FFFFFF";
const NEGRO = "#0B0B0C";

const paint = (id, ink, accent) =>
  parts[id].replaceAll("var(--ink)", ink).replaceAll("var(--accent)", accent).replace(/ style="fill:([^"]+)"/g, ' fill="$1"');

// Measured bounds of each part in the mockup's coordinate space
const BOX = {
  car: [376.1, 51.8, 1444.6, 281.2],
  cart: [373.2, 48.3, 1450.5, 287.9],
  eur: [235, 374.4, 1727, 114.3],
  sub: [440, 542.4, 1284, 47.2],
};

const svg = (viewBox, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

const full = (ink, accent) => paint("ms-car", ink, accent) + paint("ms-eur", ink, accent) + paint("ms-sub", ink, accent) + paint("ms-red", ink, accent);
const embroidery = (ink, accent) => paint("ms-cart", ink, accent) + paint("ms-eur", ink, accent) + paint("ms-redbar", ink, accent);
const FULL_VB = "225 44 1745 554";
const EMB_VB = "225 40 1745 511";
const CAR_VB = `${BOX.car[0] - 6} ${BOX.car[1] - 6} ${BOX.car[2] + 12} ${BOX.car[3] + 12}`;

// Square app icon: coupé, wordmark, red bar and AUTOMOTIVE CLUB on workshop black
const nest = (x, y, w, id, ink) => {
  const [bx, by, bw, bh] = BOX[id];
  const h = (w * bh) / bw;
  return [`<svg x="${x}" y="${y.toFixed(1)}" width="${w}" height="${h.toFixed(1)}" viewBox="${bx} ${by} ${bw} ${bh}">${paint("ms-" + id, ink, RED)}</svg>`, h];
};
const icon = () => {
  let y = 126;
  const out = [`<rect width="400" height="400" rx="44" fill="${NEGRO}"/>`];
  const [cart, ch] = nest(50, y, 300, "cart", WHITE); out.push(cart); y += ch + 10;
  const [eur, eh] = nest(30, y, 340, "eur", WHITE); out.push(eur); y += eh + 10;
  out.push(`<rect x="30" y="${y.toFixed(1)}" width="340" height="7" fill="${RED}"/>`); y += 7 + 11;
  const [sub] = nest(30, y, 340, "sub", WHITE); out.push(sub);
  return out.join("");
};

const files = {
  "ms-logo-on-light.svg": svg(FULL_VB, "Mach Schnell Automotive Club", full(BLACK, RED)),
  "ms-logo-on-dark.svg": svg(FULL_VB, "Mach Schnell Automotive Club", full(WHITE, RED)),
  "ms-logo-on-red.svg": svg(FULL_VB, "Mach Schnell Automotive Club", full(WHITE, BLACK)),
  "ms-logo-one-color.svg": svg(FULL_VB, "Mach Schnell Automotive Club", full(BLACK, BLACK)),
  "ms-car-on-light.svg": svg(CAR_VB, "Mach Schnell coupé", paint("ms-car", BLACK, RED)),
  "ms-car-on-dark.svg": svg(CAR_VB, "Mach Schnell coupé", paint("ms-car", WHITE, RED)),
  "ms-icon.svg": svg("0 0 400 400", "Mach Schnell", icon()),
  "ms-embroidery-dark-cap.svg": svg(EMB_VB, "Mach Schnell embroidery, white and red thread", embroidery(WHITE, RED)),
  "ms-embroidery-light-cap.svg": svg(EMB_VB, "Mach Schnell embroidery, black and red thread", embroidery(BLACK, RED)),
  "ms-embroidery-navy.svg": svg(EMB_VB, "Mach Schnell embroidery, white thread", embroidery(WHITE, WHITE)),
};
const site = ["ms-logo-on-light.svg", "ms-logo-on-dark.svg", "ms-car-on-light.svg", "ms-icon.svg"];

mkdirSync(new URL("../public/brand/", import.meta.url), { recursive: true });
for (const [name, body] of Object.entries(files)) {
  writeFileSync(new URL(`../brand-kit/logo-2026/${name}`, import.meta.url), body);
  if (site.includes(name)) writeFileSync(new URL(`../public/brand/${name}`, import.meta.url), body);
}
console.log(`Wrote ${Object.keys(files).length} logo files to brand-kit/logo-2026/, ${site.length} to public/brand/`);
