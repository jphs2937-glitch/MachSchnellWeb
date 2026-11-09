import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Site-wide share image: the coupé logo on bone, with the club stripe running edge to edge below it.
// Satori cannot read CSS variables, so the brand values from app/tokens.css are written out here.
const BONE = "#ede6d8";
const BLACK = "#121212";
const RED = "#d3202b";
const BAND = 16; // --stripe-weight (8px) scaled for a 1200px canvas
const GAP = BAND / 2; // --stripe-gap is half the band
const LOGO_W = 820;
const LOGO_H = Math.round((LOGO_W * 554) / 1745); // logo viewBox 1745 × 554

export const alt = "Mach Schnell Automotive Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Embed the approved logo file as-is; never redraw it.
  const svg = await readFile(join(process.cwd(), "public/brand/ms-logo-on-light.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: BONE }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logo} width={LOGO_W} height={LOGO_H} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 96 }}>
          <div style={{ height: BAND, background: RED }} />
          <div style={{ height: GAP }} />
          <div style={{ height: BAND, background: BLACK }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
