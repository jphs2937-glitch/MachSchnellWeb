import { site } from "@/content/site";

/**
 * Pit-wall ticker: a slow band of club facts. Decorative (everything in it is said
 * elsewhere on the page), so it is hidden from screen readers. Static with reduced motion.
 */
export function Ticker() {
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
    <div className="ms-ticker" data-theme="night" aria-hidden="true">
      <div className="ms-ticker-track">
        {run}
        {run}
      </div>
    </div>
  );
}
