"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-linked motion, driven by CSS variables so the styling stays in app/wow.css:
 *   --sp      page progress 0..1 (the stripe under the nav, with the coupé riding it)
 *   --hero-p  progress through the first screen 0..1 (the hero coupé drives off)
 *   --par     per element with [data-parallax]: -1..1 as it crosses the viewport
 *   --p       per element with [data-scene]: 0..1 through its pinned scroll range
 *   --mx/--my on [data-spot]: pointer position (the garage light); --rx/--ry tilt on plan cards
 * Also sets data-scrolled on <html> once past the first screen (mobile action bar).
 * Does nothing when the visitor prefers reduced motion, apart from data-scrolled.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const par = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scenes = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    let frame = 0;
    // After the start-lights intro has played once, later page changes skip its delays.
    const introTimer = window.setTimeout(() => root.setAttribute("data-intro-seen", ""), 2600);

    // Pointer effects: the garage light follows the pointer; plan cards lean toward it.
    const TILT = ".ms-plan, .ms-builder-total";
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const t = target?.closest?.<HTMLElement>(`[data-spot], ${TILT}`);
      if (!t) return;
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      if (t.matches("[data-spot]")) {
        t.setAttribute("data-lit", "");
        t.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        t.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      } else if (e.pointerType === "mouse") {
        t.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
        t.style.setProperty("--rx", `${((0.5 - y) * 9).toFixed(2)}deg`);
      }
    };
    const onOut = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.<HTMLElement>(TILT);
      if (!t || (e.relatedTarget instanceof Node && t.contains(e.relatedTarget))) return;
      t.style.setProperty("--rx", "0deg");
      t.style.setProperty("--ry", "0deg");
    };
    if (!reduced) {
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
    }

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      root.toggleAttribute("data-scrolled", y > vh * 0.6);
      if (reduced) return;
      const max = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--sp", Math.min(1, y / max).toFixed(4));
      root.style.setProperty("--hero-p", Math.min(1, y / (vh * 0.9)).toFixed(4));
      for (const el of scenes) {
        const r = el.getBoundingClientRect();
        const total = r.height - vh;
        el.style.setProperty("--p", (total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0).toFixed(4));
      }
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
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.clearTimeout(introTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
