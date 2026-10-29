import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Site-wide share image: the ring badge on bone, with the club stripe running edge to edge behind it.
// Satori cannot read CSS variables, so the brand values from app/tokens.css are written out here.
const BONE = "#ede6d8";
const BLACK = "#121212";
const RED = "#e1251b";
const BAND = 16; // --stripe-weight (8px) scaled for a 1200px canvas
const GAP = BAND / 2; // --stripe-gap is half the band
const BADGE = 440;

export const alt = "Mach Schnell Automotive Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Embed the approved badge file as-is; never redraw it.
  const svg = await readFile(join(process.cwd(), "public/brand/ms-badge.svg"));
  const badge = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: BONE,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: (size.height - (2 * BAND + GAP)) / 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: BAND, background: RED }} />
          <div style={{ height: GAP }} />
          <div style={{ height: BAND, background: BLACK }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={badge} width={BADGE} height={BADGE} style={{ position: "relative" }} />
      </div>
    ),
    { ...size },
  );
}
