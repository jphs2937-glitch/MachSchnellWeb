"use client";

import { useActionState } from "react";
import { site } from "@/content/site";
import { requestCallback, type CallbackState } from "@/app/join/actions";
import { telHref } from "@/lib/phone";
import { Button } from "./Button";

const c = site.join.callback;
const initial: CallbackState = { status: "idle" };

/** The short path: name, phone and what the call is for. Emails the club only. */
export function CallbackForm({ startedAt }: { startedAt: number }) {
  const [state, action, pending] = useActionState(requestCallback, initial);

  return (
    <section id="callback" className="ms-callback ms-card" aria-labelledby="callback-title">
      <h2 id="callback-title" className="title">
        {c.title}
      </h2>
      {state.status === "success" ? (
        <p role="status" className="headline">
          {c.success}
        </p>
      ) : (
        <form action={action} aria-busy={pending || undefined}>
          <p className="muted">{c.text}</p>
          <input type="hidden" name="startedAt" value={startedAt} />
          <div className="ms-callback-hp" aria-hidden="true">
            <label>
              {site.join.form.honeypot}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="ms-callback-field">
            <span>{site.join.form.name}</span>
            <input name="name" type="text" autoComplete="name" required maxLength={100} />
          </label>
          <label className="ms-callback-field">
            <span>{site.join.form.phone}</span>
            <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={30} />
          </label>
          <fieldset className="ms-callback-reasons">
            <legend>{c.reasonLegend}</legend>
            {c.reasons.map((r, i) => (
              <label key={r.id}>
                <input type="radio" name="reason" value={r.id} defaultChecked={i === 0} />
                <span>{r.label}</span>
              </label>
            ))}
          </fieldset>
          {state.status === "error" && (
            <p role="alert" className="ms-callback-error">
              {state.message}
            </p>
          )}
          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? site.join.sendingLabel : c.submitLabel}
          </Button>
          <p className="caption">
            {c.orCall} <a href={telHref()}>{site.contact.phone}</a> · {site.contact.hours.label}
          </p>
        </form>
      )}
    </section>
  );
}
