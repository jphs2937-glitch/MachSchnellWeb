"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-linked motion, driven by CSS variables so the styling stays in app/wow.css:
 *   --sp      page progress 0..1 (the stripe under the nav, with the coupé riding it)
 *   --hero-p  progress through the first screen 0..1 (the hero coupé drives off)
 *   --par     per element with [data-parallax]: -1..1 as it crosses the viewport
 * Also sets data-scrolled on <html> once past the first screen (mobile action bar).
 * Does nothing when the visitor prefers reduced motion, apart from data-scrolled.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const par = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      root.toggleAttribute("data-scrolled", y > vh * 0.6);
      if (reduced) return;
      const max = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--sp", Math.min(1, y / max).toFixed(4));
      root.style.setProperty("--hero-p", Math.min(1, y / (vh * 0.9)).toFixed(4));
      for (const el of par) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.style.setProperty("--par", Math.max(-1, Math.min(1, p)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
