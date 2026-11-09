"use client";

import { useEffect, useState } from "react";

/** True once the first page has rendered, so the very first load plays no page transition. */
let hasNavigated = false;

/**
 * Re-mounts on every page change. After the first load, each new page enters with a
 * red-and-black stripe wipe across the screen while the content rises in. CSS only plays
 * it when the visitor allows motion (app/motion.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animate) return <>{children}</>;
  return (
    <>
      <div className="page-enter">{children}</div>
      <div className="page-wipe" aria-hidden="true">
        <span />
        <span />
      </div>
    </>
  );
}
