"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * Pit-wall ticker: a slow band of club facts. Decorative (everything in it is said
 * elsewhere on the page), so the band is hidden from screen readers. It can be paused
 * with the button, pauses on hover, and is static with reduced motion.
 */
export function Ticker() {
  const [paused, setPaused] = useState(false);
  const items = site.home.ticker;
  const run = (
    <span className="ms-ticker-run">
      {items.map((t) => (
        <span key={t} className="ms-ticker-item">
          {t}
        </span>
      ))}
    </span>
  );
  return (
    <div className="ms-ticker-wrap" data-theme="night" data-paused={paused || undefined}>
      <div className="ms-ticker" aria-hidden="true">
        <div className="ms-ticker-track">
          {run}
          {run}
        </div>
      </div>
      <button type="button" className="ms-ticker-pause" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
        <span className="visually-hidden">{paused ? "Play the ticker" : "Pause the ticker"}</span>
        <span aria-hidden="true">{paused ? "▶" : "❙❙"}</span>
      </button>
    </div>
  );
}
