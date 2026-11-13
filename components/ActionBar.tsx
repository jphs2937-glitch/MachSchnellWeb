"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { telHref } from "@/lib/phone";

/** Phones only: call and join, pinned to the bottom once the visitor scrolls past the first screen. */
export function ActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith(site.cta.href)) return null;
  return (
    <div className="ms-actionbar" data-theme="night">
      <a href={telHref()} className="ms-btn ms-btn-ghost ms-btn-md">
        {site.home.callLabel}
      </a>
      <Link href={site.cta.href} className="ms-btn ms-btn-primary ms-btn-md">
        {site.cta.label}
      </Link>
    </div>
  );
}
