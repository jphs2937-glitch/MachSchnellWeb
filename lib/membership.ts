/**
 * Membership request: shared field names, the zod schema, form state types and
 * the email builders. Used by the /join Server Action (validation, email) and
 * by MembershipForm (types and constants only).
 */
import { z } from "zod";
import { site, type PlanId, type UpgradeId } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Ids and lookups                                                     */
/* ------------------------------------------------------------------ */

export const PLAN_IDS = ["storage", "storage-1-detail", "storage-2-details"] as const satisfies readonly PlanId[];
export const PACKAGE_IDS = ["pit-stop", "grand-prix", "concours"] as const satisfies readonly UpgradeId[];
export const DEFAULT_PACKAGE: UpgradeId = "pit-stop";

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLAN_IDS as readonly string[]).includes(value);
}

/** Plans that include monthly details, and so take a detailing package. */
export function planHasDetails(planId: string | undefined | null): boolean {
  if (!planId) return false;
  const plan = site.plans.find((p) => p.id === planId);
  return !!plan && plan.detailsPerMonth > 0;
}

export function planName(planId: string): string {
  return site.plans.find((p) => p.id === planId)?.name ?? planId;
}

export function packageName(packageId: string): string {
  return site.upgrades.find((u) => u.id === packageId)?.name ?? packageId;
}

/** Today's date in Houston as YYYY-MM-DD (the club's calendar, used for the start date minimum). */
export function todayInHouston(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/* ------------------------------------------------------------------ */
/* Fields and form state                                               */
/* ------------------------------------------------------------------ */

export const FIELD_NAMES = [
  "name",
  "email",
  "phone",
  "year",
  "make",
  "model",
  "plan",
  "package",
  "startDate",
  "message",
] as const;
export type FieldName = (typeof FIELD_NAMES)[number];

/** Honeypot and timing fields. Not shown to people. */
export const HONEYPOT_FIELD = "company";
export const STARTED_AT_FIELD = "startedAt";
/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 2000;

export const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  make: 60,
  model: 80,
  message: 2000,
} as const;

export type FormValues = Partial<Record<FieldName, string>>;
export type FieldErrors = Partial<Record<FieldName, string>>;

export type MembershipFormState = {
  status: "idle" | "error" | "success";
  fieldErrors: FieldErrors;
  /** Form-level error (e.g. the email could not be sent). */
  formError?: string;
  /** What was submitted, so a failed submit keeps the entered values. */
  values: FormValues;
  /** Changes on every response so the client can react to repeated errors. */
  submittedAt?: number;
};

export const initialMembershipState: MembershipFormState = {
  status: "idle",
  fieldErrors: {},
  values: {},
};

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

/*
 * Built on first use, not at import time, so the client form can import the
 * constants and types above without pulling zod into the browser bundle.
 */
function buildSchema() {
  const e = site.join.form.errors;
  const tooLong = (max: number) => e.tooLong.replace("{max}", String(max));

  /** Trimmed text with no line breaks (they would end up in email headers). */
  const line = (max: number, required: string) =>
    z
      .string()
      .transform((v) => v.replace(/\s+/g, " ").trim())
      .pipe(z.string().min(1, { error: required }).max(max, { error: tooLong(max) }));

  return z
    .object({
      name: line(MAX_LENGTHS.name, e.name),
      email: z
        .string()
        .trim()
        .max(MAX_LENGTHS.email, { error: tooLong(MAX_LENGTHS.email) })
        .pipe(z.email({ error: e.email })),
      phone: line(MAX_LENGTHS.phone, e.phone).refine(
        (v) => /^[0-9+().\-\s]+$/.test(v) && v.replace(/\D/g, "").length >= 7,
        { error: e.phone },
      ),
      year: z
        .string()
        .trim()
        .regex(/^\d{4}$/, { error: e.year })
        .refine((v) => {
          const y = Number(v);
          return y >= 1886 && y <= new Date().getFullYear() + 2;
        }, { error: e.year }),
      make: line(MAX_LENGTHS.make, e.make),
      model: line(MAX_LENGTHS.model, e.model),
      plan: z.enum(PLAN_IDS, { error: e.plan }),
      /** Only read for plans with details; ignored (and dropped) for Storage. */
      package: z.string().optional(),
      startDate: z
        .string()
        .trim()
        .refine((v) => v === "" || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && v >= todayInHouston()), {
          error: e.startDate,
        }),
      message: z
        .string()
        .trim()
        .max(MAX_LENGTHS.message, { error: tooLong(MAX_LENGTHS.message) }),
    })
    .superRefine((data, ctx) => {
      if (planHasDetails(data.plan) && data.package !== undefined && data.package !== "") {
        if (!(PACKAGE_IDS as readonly string[]).includes(data.package)) {
          ctx.addIssue({ code: "custom", path: ["package"], message: e.package });
        }
      }
    })
    .transform((data) => ({
      ...data,
      // Storage takes no package. Detail plans default to the included Pit Stop.
      package: planHasDetails(data.plan) ? ((data.package || DEFAULT_PACKAGE) as UpgradeId) : undefined,
    }));
}

let schema: ReturnType<typeof buildSchema> | undefined;
/** The server-side source of truth for a membership request. */
export function membershipSchema() {
  return (schema ??= buildSchema());
}

export type MembershipRequest = z.output<ReturnType<typeof buildSchema>>;

/** Reads the form fields into plain strings for the schema. Missing fields become "". */
export function readForm(formData: FormData): Record<FieldName, string> {
  const out = {} as Record<FieldName, string>;
  for (const name of FIELD_NAMES) {
    const v = formData.get(name);
    out[name] = typeof v === "string" ? v : "";
  }
  return out;
}

/** First error message per field. */
export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && (FIELD_NAMES as readonly string[]).includes(key) && !out[key as FieldName]) {
      out[key as FieldName] = issue.message;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Emails                                                              */
/* ------------------------------------------------------------------ */

export type BuiltEmail = { subject: string; html: string; text: string };

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps a header value on one line. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export function carLine(r: Pick<MembershipRequest, "year" | "make" | "model">): string {
  return `${r.year} ${r.make} ${r.model}`;
}

/* Brand values for email clients, which cannot read the site's CSS variables. */
const EMAIL = {
  bone: "#EDE6D8",
  black: "#121212",
  red: "#E1251B",
  muted: "#6B655C",
  line: "#D8D3CA",
  display: "'Saira Expanded', 'Arial Black', Arial, sans-serif",
  text: "Saira, Arial, Helvetica, sans-serif",
};

function emailShell(title: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${EMAIL.bone};color:${EMAIL.black};font-family:${EMAIL.text};font-size:15px;line-height:24px;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;background:${EMAIL.bone};color:${EMAIL.black};">
<div style="font-family:${EMAIL.display};font-weight:900;font-size:20px;letter-spacing:0.02em;text-transform:uppercase;">MACH <span style="color:${EMAIL.red};">SCHNELL</span></div>
<div style="margin:16px 0 24px;">
<div style="height:8px;background:${EMAIL.red};font-size:0;line-height:0;">&nbsp;</div>
<div style="height:4px;font-size:0;line-height:0;">&nbsp;</div>
<div style="height:8px;background:${EMAIL.black};font-size:0;line-height:0;">&nbsp;</div>
</div>
${inner}
<div style="margin-top:32px;padding-top:16px;border-top:1px solid ${EMAIL.line};font-size:12px;line-height:16px;color:${EMAIL.muted};">${escapeHtml(site.footer.copyright)}</div>
</div>
</body>
</html>`;
}

function rowHtml(label: string, value: string): string {
  return `<div style="padding:12px 0;border-bottom:1px solid ${EMAIL.line};">
<div style="font-family:${EMAIL.display};font-weight:700;font-size:11px;line-height:14px;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.muted};">${escapeHtml(label)}</div>
<div style="margin-top:4px;white-space:pre-wrap;">${escapeHtml(value)}</div>
</div>`;
}

/** The email the club receives. */
export function buildTeamEmail(r: MembershipRequest, submittedAt: Date = new Date()): BuiltEmail {
  const f = site.join.form;
  const t = site.join.teamEmail;
  const plan = planName(r.plan);
  const subject = oneLine(`New member request: ${r.name} · ${carLine(r)} · ${plan}`);

  const rows: [string, string][] = [
    [f.name, r.name],
    [f.email, r.email],
    [f.phone, r.phone],
    [f.carLegend, carLine(r)],
    [f.planLegend, plan],
  ];
  if (r.package) rows.push([f.packageLegend, packageName(r.package)]);
  rows.push([f.startDate, r.startDate || t.notGiven]);
  rows.push([f.message, r.message || t.notGiven]);
  rows.push([
    t.submittedLabel,
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", hourCycle: "h23", timeZone: "America/Chicago" }).format(submittedAt),
  ]);

  const html = emailShell(
    subject,
    `<h1 style="margin:0 0 16px;font-family:${EMAIL.display};font-weight:900;font-size:24px;line-height:28px;text-transform:uppercase;">${escapeHtml(t.heading)}</h1>
<div style="border-top:1px solid ${EMAIL.black};">${rows.map(([l, v]) => rowHtml(l, v)).join("\n")}</div>`,
  );
  const text = [t.heading.toUpperCase(), "", ...rows.map(([l, v]) => `${l}: ${v}`)].join("\n");
  return { subject, html, text };
}

/** The confirmation the applicant receives. */
export function buildConfirmationEmail(r: MembershipRequest): BuiltEmail {
  const c = site.join.confirmationEmail;
  const greeting = c.greeting.replace("{name}", r.name);
  const planLine = c.planLine.replace("{plan}", planName(r.plan));
  const packageLine = r.package ? c.packageLine.replace("{package}", packageName(r.package)) : null;
  const [first, ...rest] = c.lines;
  const body = [first, planLine, packageLine, ...rest.slice(0, -1)].filter((l): l is string => !!l);
  const signoff = rest[rest.length - 1];

  const p = (s: string) => `<p style="margin:0 0 12px;">${escapeHtml(s)}</p>`;
  const html = emailShell(
    c.subject,
    `${p(greeting)}
${body.map(p).join("\n")}
${signoff ? `<p style="margin:24px 0 0;font-size:13px;line-height:18px;color:${EMAIL.muted};">${escapeHtml(signoff)}</p>` : ""}`,
  );
  const text = [greeting, "", ...body, "", signoff].filter((l) => l !== undefined).join("\n");
  return { subject: oneLine(c.subject), html, text };
}
