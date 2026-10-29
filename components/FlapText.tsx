"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/** Each character flips this many times longer than the one before it settles. */
const FLIPS_PER_CHAR = 3;
const FRAME_MS = 55;

function scramble(target: string, frame: number) {
  return Array.from(target, (ch, i) => {
    if (frame >= (i + 2) * FLIPS_PER_CHAR) return ch;
    const set = /\d/.test(ch) ? DIGITS : /[A-Z]/i.test(ch) ? LETTERS : null;
    return set ? set[(frame * 7 + i * 3) % set.length] : ch;
  }).join("");
}

/**
 * Split-flap text, like a '70s pit board: the characters flip through digits or letters
 * and settle left to right the first time it scrolls into view. The real text stays in
 * the DOM (and sizes the box), so screen readers, search engines and layout never see the
 * animation. Skipped when the visitor prefers reduced motion.
 */
export function FlapText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let frame = 0;
        const last = (text.length + 2) * FLIPS_PER_CHAR;
        setDisplay(scramble(text, 0));
        timer = window.setInterval(() => {
          frame += 1;
          if (frame >= last) {
            window.clearInterval(timer);
            setDisplay(null);
          } else setDisplay(scramble(text, frame));
        }, FRAME_MS);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [text]);

  return (
    <span ref={ref} className={["flap", display !== null && "flap-on", className].filter(Boolean).join(" ")}>
      <span className="flap-final">{text}</span>
      {display !== null && (
        <span className="flap-live" aria-hidden="true">
          {display}
        </span>
      )}
    </span>
  );
}
