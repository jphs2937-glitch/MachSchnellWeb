"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Elements that step in as they scroll into view. */
const TARGETS = [
  ".ms-stripe:not([data-motion-skip])",
  ".section-head :is(h1, h2)",
  ".ms-card",
  ".ms-amenities > li",
  ".ms-photo",
  ".ms-ticks > li",
  "[data-reveal]",
].join(", ");

/**
 * Retro scroll reveals. Runs after hydration and only touches elements that are still
 * below the fold, so nothing on screen is ever hidden and no-JS visitors see everything.
 * Siblings get a staggered delay. Does nothing when the visitor prefers reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fold = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.closest("dialog, .ms-nav-wrap, .ms-ticker") && el.getBoundingClientRect().top > fold * 0.9,
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--rv-delay", `${Math.min(i, 5) * 90}ms`);
      el.classList.add("rv");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
