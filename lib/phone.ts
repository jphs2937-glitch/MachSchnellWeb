import { site } from "@/content/site";

/**
 * tel: link for the club phone. Built from the digits in site.contact.phone.
 * While the number is still the placeholder it falls back to "tel:" + the raw text,
 * so the link exists but dials nothing useful until the real number is set.
 */
export function telHref(phone: string = site.contact.phone): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  if (digits.length > 0) return `tel:+${digits}`;
  return `tel:${phone}`;
}

/** E.164 number for structured data, or undefined while the phone is a placeholder. */
export function phoneE164(phone: string = site.contact.phone): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}
