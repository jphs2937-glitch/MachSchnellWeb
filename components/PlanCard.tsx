import { site, type Plan } from "@/content/site";
import { Button } from "./Button";
import { StripeRule } from "./StripeRule";

type Props = {
  plan: Plan;
  /** 1-based position, shown as "Plan 01" */
  index: number;
  /** Compact cards (home teaser) drop the upgrade list and use a text link. */
  compact?: boolean;
  headingLevel?: "h2" | "h3";
};

/** A storage membership plan. The featured plan carries the club stripe. */
export function PlanCard({ plan, index, compact = false, headingLevel: H = "h3" }: Props) {
  const showUpgrades = !compact && plan.detailsPerMonth > 0;
  const upgrades = site.upgrades.filter((u) => u.id !== "pit-stop");
  const joinHref = `/join?plan=${plan.id}`;

  return (
    <article className={["ms-card", "ms-plan", plan.featured && "ms-plan-featured", compact && "ms-plan-compact"].filter(Boolean).join(" ")}>
      {plan.featured && <StripeRule className="ms-card-stripe" />}
      <span className="kicker kicker-muted">Plan {String(index).padStart(2, "0")}</span>
      <H className="headline">{plan.name}</H>
      <p className="ms-plan-price">
        {plan.pricePrefix && <span className="ms-plan-prefix">{plan.pricePrefix} </span>}
        <span className="ms-plan-amount">{plan.price}</span>
        <span className="ms-plan-suffix">{plan.priceSuffix}</span>
      </p>
      <p>{plan.summary}</p>

      {showUpgrades && (
        <div className="ms-plan-upgrades">
          <p className="kicker kicker-muted">{site.storage.upgradesLabel}</p>
          <ul role="list">
            {upgrades.map((u) => (
              <li key={u.id}>
                <span>
                  Upgrade to <strong>{u.name}</strong> ({u.description.replace(/\.$/, "").toLowerCase()})
                </span>
                <span className="data ms-plan-upgrade-price">{u.price}/detail</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="ms-card-foot">
        <Button
          href={joinHref}
          variant={plan.featured ? "primary" : "secondary"}
          size={compact ? "sm" : "md"}
          aria-label={`${site.cta.label}: ${plan.name}`}
        >
          {site.cta.label}
        </Button>
      </div>
    </article>
  );
}
