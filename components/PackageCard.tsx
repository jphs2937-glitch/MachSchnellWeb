import type { Package } from "@/content/site";
import { StripeRule } from "./StripeRule";

type Props = {
  pkg: Package;
  /** Compact cards (home teaser) show the plate, name, price and tagline only. */
  compact?: boolean;
  headingLevel?: "h2" | "h3";
};

/** A detailing package with its race-plate number. */
export function PackageCard({ pkg, compact = false, headingLevel: H = "h3" }: Props) {
  return (
    <article className={["ms-card", "ms-package", compact && "ms-package-compact"].filter(Boolean).join(" ")}>
      <div className="ms-package-top">
        <span className="ms-plate" aria-label={`Package ${pkg.number}`}>
          {pkg.number}
        </span>
        <p className="ms-package-price">{pkg.price}</p>
      </div>
      <div>
        <H className="headline">{pkg.name}</H>
        <p className="data ms-package-tagline">{pkg.tagline}</p>
      </div>
      {!compact && (
        <>
          <StripeRule />
          <ul role="list" className="ms-ticks">
            {pkg.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
