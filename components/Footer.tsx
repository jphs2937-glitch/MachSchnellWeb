import Link from "next/link";
import { addressLine, site } from "@/content/site";
import { telHref } from "@/lib/phone";
import { StripeRule } from "./StripeRule";
import { navLinks } from "@/lib/nav";

export function Footer() {
  const links = [...navLinks(), { label: site.cta.label, href: site.cta.href }];
  return (
    <footer className="ms-footer">
      <StripeRule />
      <div className="container ms-footer-grid">
        <div className="ms-footer-brand">
          <Link href="/" aria-label={`${site.shortName} home`} className="ms-footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/ms-logo-on-light.svg" alt={site.name} width={220} height={70} loading="lazy" />
          </Link>
        </div>

        <div className="ms-footer-col">
          <p className="kicker kicker-muted">Visit</p>
          <address>
            <a href={site.contact.directionsUrl} target="_blank" rel="noopener noreferrer">
              {addressLine()}
            </a>
            <br />
            <a href={telHref()}>{site.contact.phone}</a>
            <br />
            <span className="ms-footer-hours">{site.contact.hours.label}</span>
          </address>
        </div>

        <nav className="ms-footer-col" aria-label="Footer">
          <p className="kicker kicker-muted">Club</p>
          <ul role="list">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-footer-col">
          <p className="kicker kicker-muted">Follow</p>
          <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer">
            Instagram · {site.contact.instagram.handle}
          </a>
        </div>
      </div>
      <div className="container ms-footer-base">
        <p className="caption">
          {site.footer.copyright}
          {site.footer.photoNote && ` · ${site.footer.photoNote}`}
        </p>
      </div>
    </footer>
  );
}
