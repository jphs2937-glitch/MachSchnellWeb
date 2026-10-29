"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { site, type PlanId } from "@/content/site";
import { submitMembership } from "@/app/join/actions";
import {
  DEFAULT_PACKAGE,
  HONEYPOT_FIELD,
  MAX_LENGTHS,
  STARTED_AT_FIELD,
  initialMembershipState,
  type FieldName,
} from "@/lib/membership";
import { Button } from "./Button";
import s from "./MembershipForm.module.css";

type Props = {
  /** Plan preselected from ?plan= (already validated by the page). */
  initialPlan?: PlanId;
  /** Earliest start date, YYYY-MM-DD. */
  minDate: string;
  /** Server time when the page rendered (ms). Submissions within ~2s are treated as bots. */
  startedAt: number;
};

const f = site.join.form;
const ID = "join";
const fieldId = (name: FieldName) => `${ID}-${name}`;
const errorId = (name: FieldName) => `${ID}-${name}-error`;
const helpId = (name: FieldName) => `${ID}-${name}-help`;
const PACKAGE_REGION_ID = `${ID}-package-region`;

/** Field order for the error summary. Radio groups link to their first option. */
const SUMMARY_ORDER: { name: FieldName; label: string; target: string }[] = [
  { name: "name", label: f.name, target: fieldId("name") },
  { name: "email", label: f.email, target: fieldId("email") },
  { name: "phone", label: f.phone, target: fieldId("phone") },
  { name: "year", label: f.year, target: fieldId("year") },
  { name: "make", label: f.make, target: fieldId("make") },
  { name: "model", label: f.model, target: fieldId("model") },
  { name: "plan", label: f.planLegend, target: `${fieldId("plan")}-${site.plans[0].id}` },
  { name: "package", label: f.packageLegend, target: `${fieldId("package")}-${site.upgrades[0].id}` },
  { name: "startDate", label: f.startDate, target: fieldId("startDate") },
  { name: "message", label: f.message, target: fieldId("message") },
];

const hasDetails = (planId: string) => (site.plans.find((p) => p.id === planId)?.detailsPerMonth ?? 0) > 0;
const planPrice = (p: (typeof site.plans)[number]) => `${p.pricePrefix ? `${p.pricePrefix} ` : ""}${p.price}${p.priceSuffix}`;

function Required() {
  return (
    <>
      <span className={s.req} aria-hidden="true">
        {" "}
        *
      </span>
      <span className="visually-hidden"> ({f.requiredLabel})</span>
    </>
  );
}

function ErrorText({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(name)} className={s.error}>
      <span className="visually-hidden">{f.errorPrefix} </span>
      {message}
    </p>
  );
}

/** Membership request form for /join. Validated on the server; inline errors and a focused summary on failure. */
export function MembershipForm({ initialPlan, minDate, startedAt }: Props) {
  const [state, formAction, isPending] = useActionState(submitMembership, initialMembershipState);
  const [plan, setPlan] = useState<string>(initialPlan ?? "");
  const [pkg, setPkg] = useState<string>(DEFAULT_PACKAGE);
  /** Fade the package group in only when the visitor reveals it, never on first render. */
  const [fadePackage, setFadePackage] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.values;
  const errorCount = Object.keys(errors).length;
  const showPackage = hasDetails(plan);

  // Move focus to the summary after a failed submit, or to the message after success.
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    else if (state.status === "success") successRef.current?.focus();
  }, [state]);

  // Submit through onSubmit instead of <form action>: React resets a form after an action runs,
  // which would wipe what the visitor typed and desync the plan radios from state on a failed submit.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  function onPlanChange(next: string) {
    const wasShown = hasDetails(plan);
    const willShow = hasDetails(next);
    setPlan(next);
    if (willShow && !wasShown) {
      setPkg(DEFAULT_PACKAGE);
      setFadePackage(true);
      setAnnouncement(f.packageShown);
    } else if (!willShow && wasShown) {
      setAnnouncement(f.packageHidden);
    }
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className={s.success}>
        <p className="headline">{site.join.successMessage}</p>
      </div>
    );
  }

  /** aria-describedby built from help text and error ids that exist. */
  const describedBy = (name: FieldName, help = false) =>
    [help && helpId(name), errors[name] && errorId(name)].filter(Boolean).join(" ") || undefined;
  const invalid = (name: FieldName) => (errors[name] ? true : undefined);

  return (
    <form onSubmit={onSubmit} className={s.form} aria-labelledby={`${ID}-form-title`} aria-busy={isPending || undefined}>
      <h2 id={`${ID}-form-title`} className="title">
        {f.title}
      </h2>
      <p className="caption">{f.requiredNote}</p>

      {state.status === "error" && (
        <div ref={summaryRef} tabIndex={-1} className={s.summary} aria-labelledby={`${ID}-summary-title`} role="group">
          <h3 id={`${ID}-summary-title`} className={s.summaryTitle}>
            {f.summaryTitle}
          </h3>
          {state.formError && <p>{state.formError}</p>}
          {errorCount > 0 && (
            <>
              <p>{f.summaryIntro}</p>
              <ul className={s.summaryList}>
                {SUMMARY_ORDER.filter((x) => errors[x.name]).map((x) => (
                  <li key={x.name}>
                    <a href={`#${x.target}`}>
                      {x.label}: {errors[x.name]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <input type="hidden" name={STARTED_AT_FIELD} value={startedAt} />

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor={`${ID}-${HONEYPOT_FIELD}`}>{f.honeypot}</label>
        <input id={`${ID}-${HONEYPOT_FIELD}`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* About you */}
      <div className={s.field}>
        <label className={s.label} htmlFor={fieldId("name")}>
          {f.name}
          <Required />
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          className={s.input}
          autoComplete="name"
          required
          aria-required="true"
          maxLength={MAX_LENGTHS.name}
          defaultValue={values.name ?? ""}
          aria-invalid={invalid("name")}
          aria-describedby={describedBy("name")}
        />
        <ErrorText name="name" message={errors.name} />
      </div>

      <div className={s.row2}>
        <div className={s.field}>
          <label className={s.label} htmlFor={fieldId("email")}>
            {f.email}
            <Required />
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            className={s.input}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            aria-required="true"
            maxLength={MAX_LENGTHS.email}
            defaultValue={values.email ?? ""}
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
          />
          <ErrorText name="email" message={errors.email} />
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor={fieldId("phone")}>
            {f.phone}
            <Required />
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            className={s.input}
            autoComplete="tel"
            required
            aria-required="true"
            maxLength={MAX_LENGTHS.phone}
            defaultValue={values.phone ?? ""}
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone", true)}
          />
          <p id={helpId("phone")} className={s.help}>
            {f.phoneHelp}
          </p>
          <ErrorText name="phone" message={errors.phone} />
        </div>
      </div>

      {/* Car */}
      <fieldset className={s.fieldset}>
        <legend className={s.legend}>{f.carLegend}</legend>
        <div className={s.carRow}>
          <div className={s.field}>
            <label className={s.label} htmlFor={fieldId("year")}>
              {f.year}
              <Required />
            </label>
            <input
              id={fieldId("year")}
              name="year"
              type="text"
              className={s.input}
              inputMode="numeric"
              pattern="[0-9]{4}"
              minLength={4}
              maxLength={4}
              autoComplete="off"
              required
              aria-required="true"
              defaultValue={values.year ?? ""}
              aria-invalid={invalid("year")}
              aria-describedby={describedBy("year")}
            />
            <ErrorText name="year" message={errors.year} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor={fieldId("make")}>
              {f.make}
              <Required />
            </label>
            <input
              id={fieldId("make")}
              name="make"
              type="text"
              className={s.input}
              autoComplete="off"
              required
              aria-required="true"
              maxLength={MAX_LENGTHS.make}
              defaultValue={values.make ?? ""}
              aria-invalid={invalid("make")}
              aria-describedby={describedBy("make")}
            />
            <ErrorText name="make" message={errors.make} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor={fieldId("model")}>
              {f.model}
              <Required />
            </label>
            <input
              id={fieldId("model")}
              name="model"
              type="text"
              className={s.input}
              autoComplete="off"
              required
              aria-required="true"
              maxLength={MAX_LENGTHS.model}
              defaultValue={values.model ?? ""}
              aria-invalid={invalid("model")}
              aria-describedby={describedBy("model")}
            />
            <ErrorText name="model" message={errors.model} />
          </div>
        </div>
      </fieldset>

      {/* Plan. The group reports whether it has expanded the detailing package options it controls
          (aria-expanded is not allowed on the individual radios). */}
      <fieldset
        className={s.fieldset}
        aria-describedby={errors.plan ? errorId("plan") : undefined}
        aria-controls={PACKAGE_REGION_ID}
        aria-expanded={showPackage}
      >
        <legend className={s.legend}>
          {f.planLegend}
          <Required />
        </legend>
        <div className={s.tiles}>
          {site.plans.map((p) => {
            const id = `${fieldId("plan")}-${p.id}`;
            return (
              <label key={p.id} htmlFor={id} className={s.tile}>
                <input
                  id={id}
                  type="radio"
                  name="plan"
                  value={p.id}
                  className={s.radio}
                  required
                  checked={plan === p.id}
                  onChange={() => onPlanChange(p.id)}
                  aria-controls={PACKAGE_REGION_ID}
                  aria-invalid={invalid("plan")}
                />
                <span className={s.tileText}>
                  <span className={s.tileName}>{p.name}</span>
                  <span className={s.tilePrice}>{planPrice(p)}</span>
                </span>
              </label>
            );
          })}
        </div>
        <ErrorText name="plan" message={errors.plan} />
      </fieldset>

      {/* Detailing package: only for plans with details. Not rendered (so not submitted) otherwise. */}
      <div id={PACKAGE_REGION_ID} className={s.packageRegion}>
        {showPackage && (
          <fieldset
            className={[s.fieldset, fadePackage && s.fadeIn].filter(Boolean).join(" ")}
            aria-describedby={[helpId("package"), errors.package && errorId("package")].filter(Boolean).join(" ")}
          >
            <legend className={s.legend}>{f.packageLegend}</legend>
            <p id={helpId("package")} className={s.help}>
              {f.packageHelp}
            </p>
            <div className={s.tiles}>
              {site.upgrades.map((u) => {
                const id = `${fieldId("package")}-${u.id}`;
                const included = u.id === DEFAULT_PACKAGE;
                return (
                  <label key={u.id} htmlFor={id} className={s.tile}>
                    <input
                      id={id}
                      type="radio"
                      name="package"
                      value={u.id}
                      className={s.radio}
                      checked={pkg === u.id}
                      onChange={() => setPkg(u.id)}
                      aria-invalid={invalid("package")}
                    />
                    <span className={s.tileText}>
                      <span className={s.tileName}>{u.name}</span>
                      <span className={s.tilePrice}>
                        {u.price}
                        {!included && f.perDetail}
                      </span>
                      <span className={s.tileNote}>{u.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <ErrorText name="package" message={errors.package} />
          </fieldset>
        )}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>

      {/* Start date */}
      <div className={`${s.field} ${s.narrow}`}>
        <label className={s.label} htmlFor={fieldId("startDate")}>
          {f.startDate} <span className={s.optional}>· {f.optionalLabel}</span>
        </label>
        <input
          id={fieldId("startDate")}
          name="startDate"
          type="date"
          className={s.input}
          min={minDate}
          defaultValue={values.startDate ?? ""}
          aria-invalid={invalid("startDate")}
          aria-describedby={describedBy("startDate")}
        />
        <ErrorText name="startDate" message={errors.startDate} />
      </div>

      {/* Message */}
      <div className={s.field}>
        <label className={s.label} htmlFor={fieldId("message")}>
          {f.message} <span className={s.optional}>· {f.optionalLabel}</span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          className={`${s.input} ${s.textarea}`}
          rows={5}
          maxLength={MAX_LENGTHS.message}
          defaultValue={values.message ?? ""}
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message", true)}
        />
        <p id={helpId("message")} className={s.help}>
          {f.messageHelp}
        </p>
        <ErrorText name="message" message={errors.message} />
      </div>

      <div className={s.actions}>
        <Button type="submit" variant="primary" size="lg" className={s.submit} disabled={isPending} aria-busy={isPending || undefined}>
          {isPending ? site.join.sendingLabel : site.join.submitLabel}
        </Button>
      </div>
    </form>
  );
}
