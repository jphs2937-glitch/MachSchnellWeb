"use server";

import { Resend } from "resend";
import { site } from "@/content/site";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_AT_FIELD,
  buildConfirmationEmail,
  buildTeamEmail,
  fieldErrorsFrom,
  membershipSchema,
  readForm,
  type MembershipFormState,
} from "@/lib/membership";

const DEFAULT_FROM = `${site.shortName} <${site.contact.email}>`;

/** Server Action for the /join membership form (used with useActionState). */
export async function submitMembership(_prev: MembershipFormState, formData: FormData): Promise<MembershipFormState> {
  const values = readForm(formData);
  const submittedAt = Date.now();
  const success: MembershipFormState = { status: "success", fieldErrors: {}, values: {}, submittedAt };

  // Bots: a filled honeypot, or a form sent within ~2 seconds of rendering.
  // Pretend it worked and send nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return success;
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || submittedAt - startedAt < MIN_FILL_MS) return success;

  const parsed = membershipSchema().safeParse(values);
  if (!parsed.success) {
    return { status: "error", fieldErrors: fieldErrorsFrom(parsed.error), values, submittedAt };
  }
  const request = parsed.data;
  const team = buildTeamEmail(request, new Date(submittedAt));
  const confirmation = buildConfirmationEmail(request);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MEMBERSHIP_TO_EMAIL || site.contact.email;
  const from = process.env.MEMBERSHIP_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[join] RESEND_API_KEY is not set. Email not sent.\n" +
          `--- To: ${to} · Reply-To: ${request.email}\n--- Subject: ${team.subject}\n${team.text}\n` +
          `--- To: ${request.email}\n--- Subject: ${confirmation.subject}\n${confirmation.text}`,
      );
      return success;
    }
    console.error("[join] RESEND_API_KEY is not set.");
    return { status: "error", fieldErrors: {}, formError: site.join.errorMessage, values, submittedAt };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: request.email,
      subject: team.subject,
      html: team.html,
      text: team.text,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
  } catch (err) {
    console.error("[join] Team email failed:", err);
    return { status: "error", fieldErrors: {}, formError: site.join.errorMessage, values, submittedAt };
  }

  // The request reached the club. A failed confirmation is logged, not shown.
  try {
    const { error } = await resend.emails.send({
      from,
      to: request.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
  } catch (err) {
    console.error("[join] Confirmation email failed:", err);
  }

  return success;
}
