// Generates app/tokens.css from brand-kit/tokens.json. Run: npm run tokens
import { readFileSync, writeFileSync } from "node:fs";

const t = JSON.parse(readFileSync(new URL("../brand-kit/tokens.json", import.meta.url), "utf8"));
const ref = (v) => {
  const m = /^\{(.+)\}$/.exec(v);
  return m ? `var(--${m[1]})` : v;
};

const root = [];
const day = [];
const night = [];
for (const c of t.color.tokens) {
  if (typeof c.value === "string") root.push(`  --${c.name}: ${ref(c.value)};`);
  else {
    day.push(`  --${c.name}: ${ref(c.value.day)};`);
    night.push(`  --${c.name}: ${ref(c.value.night)};`);
  }
}
for (const s of t.spacing.tokens) root.push(`  --${s.name}: ${s.value};`);
for (const r of t.radius.tokens) root.push(`  --${r.name}: ${r.value};`);
for (const s of t.stripe.tokens) root.push(`  --${s.name}: ${s.value};`);
for (const g of t.type.groups)
  for (const s of g.styles) {
    root.push(`  --type-${s.name}-size: ${s.fontSize};`);
    root.push(`  --type-${s.name}-line: ${s.lineHeight};`);
    root.push(`  --type-${s.name}-weight: ${s.fontWeight};`);
    if (s.letterSpacing) root.push(`  --type-${s.name}-tracking: ${s.letterSpacing};`);
  }

const css = `/* Generated from brand-kit/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */
/* Font families --font-display and --font-text are set by next/font/local in app/layout.tsx. */

:root {
${root.join("\n")}
}

:root,
[data-theme="day"] {
${day.join("\n")}
}

[data-theme="night"] {
${night.join("\n")}
}
`;
writeFileSync(new URL("../app/tokens.css", import.meta.url), css);
console.log("app/tokens.css written");
