"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { telHref } from "@/lib/phone";

const b = site.builder;
const money = (s: string) => Number(s.replace(/[^0-9.]/g, "")) || 0;

/** A number that rolls to its new value. Jumps straight there with reduced motion. */
function Rolling({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let frame = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 450);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(start + (value - start) * eased);
      setShown(v);
      from.current = v;
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{shown.toLocaleString("en-US")}</>;
}

function Choice({ legend, name, options, value, onChange }: { legend: string; name: string; options: { id: string; label: string; note?: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="ms-builder-group">
      <legend className="kicker kicker-muted">{legend}</legend>
      <div className="ms-builder-options">
        {options.map((o) => (
          <label key={o.id} className="ms-builder-option">
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} />
            <span>
              {o.label}
              {o.note && <small>{o.note}</small>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Pick cars, details and package; see the monthly total; carry the choice to the join form. */
export function PlanBuilder() {
  const [cars, setCars] = useState("1");
  const [planId, setPlanId] = useState<string>(site.plans[1].id);
  const [pkg, setPkg] = useState<string>(site.upgrades[0].id);

  const plan = site.plans.find((p) => p.id === planId) ?? site.plans[0];
  const upgrade = site.upgrades.find((u) => u.id === pkg) ?? site.upgrades[0];
  const hasDetails = plan.detailsPerMonth > 0;
  const perCar = money(plan.price) + (hasDetails ? plan.detailsPerMonth * money(upgrade.price) : 0);
  const many = cars === "3+";
  const total = perCar * (many ? 1 : Number(cars));
  const href = `${site.cta.href}?plan=${plan.id}&cars=${encodeURIComponent(cars)}${hasDetails ? `&package=${upgrade.id}` : ""}`;

  return (
    <div className="ms-builder">
      <div className="ms-builder-controls">
        <Choice legend={b.carsLabel} name="b-cars" value={cars} onChange={setCars} options={b.carsOptions.map((o) => ({ id: o, label: o }))} />
        <Choice
          legend={b.detailsLabel}
          name="b-plan"
          value={planId}
          onChange={setPlanId}
          options={site.plans.map((p) => ({ id: p.id, label: String(p.detailsPerMonth), note: p.name }))}
        />
        {hasDetails && (
          <Choice
            legend={b.packageLabel}
            name="b-pkg"
            value={pkg}
            onChange={setPkg}
            options={site.upgrades.map((u) => ({ id: u.id, label: u.name, note: u.id === site.upgrades[0].id ? u.price : `${u.price}/detail` }))}
          />
        )}
      </div>

      <div className="ms-builder-total" data-theme="night" aria-live="polite">
        <span className="kicker">{many ? b.manyTitle : b.totalLabel}</span>
        <p className="ms-builder-amount">
          <span className="ms-builder-dollar">$</span>
          <Rolling value={total} />
          <span className="ms-builder-suffix">{many ? ` ${b.perCar}` : "/month"}</span>
        </p>
        <p className="muted">{many ? b.manyText : b.totalNote}</p>
        {many ? (
          <a href={telHref()} className="ms-btn ms-btn-primary ms-btn-lg">
            {site.home.callLabel} {site.contact.phone}
          </a>
        ) : (
          <Link href={href} className="ms-btn ms-btn-primary ms-btn-lg">
            {b.cta}
          </Link>
        )}
      </div>
    </div>
  );
}
