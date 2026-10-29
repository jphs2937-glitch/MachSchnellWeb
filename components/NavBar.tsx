"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { navLinks } from "@/lib/nav";
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
          <img src="/brand/ms-mark.svg" alt="" width={36} height={36} className="ms-nav-mark" />
          <span className="ms-nav-word" aria-hidden="true">
            MACH <span className="ms-red">SCHNELL</span>
          </span>
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
