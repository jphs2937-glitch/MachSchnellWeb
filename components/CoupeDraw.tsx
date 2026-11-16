import { readFileSync } from "node:fs";
import { join } from "node:path";

/* The coupé from the logo, read once at build time so the artwork is never redrawn by hand. */
const svg = readFileSync(join(process.cwd(), "public/brand/ms-car-on-light.svg"), "utf8");
const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1456 293";
const d = svg.match(/<path d="([^"]+)"/)?.[1] ?? "";

/**
 * The logo coupé, sketched on as it scrolls into view and then inked in. Two layers sit
 * at different depths and lean toward the pointer (components/ScrollFx.tsx sets --rx/--ry).
 * Decorative: hidden from screen readers. Static and fully inked without motion.
 */
export function CoupeDraw({ className }: { className?: string }) {
  if (!d) return null;
  return (
    <div className={["ms-coupe", className].filter(Boolean).join(" ")} aria-hidden="true" data-reveal>
      <div className="ms-coupe-stage">
        <svg viewBox={viewBox} className="ms-coupe-back" focusable="false">
          <path d={d} />
        </svg>
        <svg viewBox={viewBox} className="ms-coupe-front" focusable="false">
          <path d={d} pathLength={1} />
        </svg>
      </div>
    </div>
  );
}
