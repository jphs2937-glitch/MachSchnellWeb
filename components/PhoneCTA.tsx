import { site } from "@/content/site";
import { telHref } from "@/lib/phone";
import { StripeRule } from "./StripeRule";

type Props = {
  /** Smaller inline version for teasers. */
  compact?: boolean;
  headingLevel?: "h2" | "h3";
};

/** "Call us to schedule your detailing appointment" with a tel: link. */
export function PhoneCTA({ compact = false, headingLevel: H = "h2" }: Props) {
  return (
    <aside className={["ms-phone", compact && "ms-phone-compact"].filter(Boolean).join(" ")} aria-label="Book a detail by phone">
      <StripeRule />
      <div className="ms-phone-body">
        <div>
          <span className="kicker">{site.detailing.bookingNotice}</span>
          <H className={compact ? "headline" : "display-l"}>{site.detailing.phoneCta}</H>
        </div>
        <a className="ms-btn ms-btn-primary ms-btn-lg ms-phone-number" href={telHref()}>
          <span className="visually-hidden">Call </span>
          {site.contact.phone}
        </a>
      </div>
    </aside>
  );
}
