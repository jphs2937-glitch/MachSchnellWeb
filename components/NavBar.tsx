"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { navLinks } from "@/lib/nav";
import { telHref } from "@/lib/phone";
import { Button } from "./Button";

/** Sticky top ribbon: mark + wordmark, links, red BECOME A MEMBER. Links collapse into a menu on mobile. */
export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const links = navLinks();

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Esc closes the menu and returns focus to the toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="ms-nav-wrap">
      <div className="ms-nav container">
        <Link href="/" className="ms-nav-brand" aria-label={`${site.shortName} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ms-icon.svg" alt="" width={44} height={44} className="ms-nav-mark" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ms-logo-on-light.svg" alt="" width={202} height={64} className="ms-nav-logo" />
        </Link>

        <nav className="ms-nav-links" aria-label="Main">
          <ul role="list">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-nav-actions">
          <a href={telHref()} className="ms-nav-phone" aria-label={`Call ${site.contact.phone}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
              <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
            </svg>
            <span className="ms-nav-phone-number">{site.contact.phone}</span>
          </a>
          <Button href={site.cta.href} size="sm" variant="primary" className="ms-nav-cta">
            {site.cta.label}
          </Button>
          <button
            ref={buttonRef}
            type="button"
            className="ms-nav-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ms-nav-toggle-bars" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* The stripe as the road: page progress, with the coupé riding the tip */}
      <div className="ms-progress" aria-hidden="true">
        <span className="ms-progress-bar" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ms-car-on-light.svg" alt="" width={60} height={12} className="ms-progress-car" />
      </div>

      <nav id={menuId} className="ms-nav-menu" aria-label="Main mobile" hidden={!open}>
        <ul role="list" className="container">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
