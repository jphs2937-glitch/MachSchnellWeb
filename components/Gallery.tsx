"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Photo } from "@/content/site";
import { PhotoSlot } from "./PhotoSlot";
import { Button } from "./Button";
import styles from "./Gallery.module.css";

type Labels = {
  /** Tile label prefix: "<openLabel>: <alt>". */
  openLabel: string;
  prev: string;
  next: string;
  close: string;
};

type Props = {
  photos: Photo[];
  labels: Labels;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Square photo grid. Each tile opens a native <dialog> lightbox (showModal gives
 * focus trapping, Esc and an inert page). Arrow keys move between photos and wrap.
 */
export function Gallery({ photos, labels }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openerRef = useRef<number | null>(null);
  const captionId = useId();
  const count = photos.length;

  const open = (i: number) => {
    openerRef.current = i;
    setIndex(i);
  };

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  // Open the dialog once it has content, and lock page scroll while it is up.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (index === null || !dialog) return;
    if (!dialog.open) dialog.showModal();
  }, [index]);

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  // Fires for Esc, the Close button and backdrop clicks alike.
  const onClose = () => {
    setIndex(null);
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener !== null) tileRefs.current[opener]?.focus();
  };

  const close = () => dialogRef.current?.close();

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  // A click whose target is the <dialog> itself landed on the backdrop: the panel content fills the dialog box.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul role="list" className={styles.grid}>
        {photos.map((photo, i) => (
          <li key={`${i}-${photo.src || photo.caption}`}>
            <button
              type="button"
              className={styles.tile}
              aria-label={`${labels.openLabel}: ${photo.alt}`}
              aria-haspopup="dialog"
              onClick={() => open(i)}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
            >
              <PhotoSlot photo={photo} ratio="1/1" sizes="(min-width: 1100px) 25vw, (min-width: 768px) 33vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        data-theme="night"
        aria-labelledby={current ? captionId : undefined}
        onClose={onClose}
        onClick={onDialogClick}
        onKeyDown={onKeyDown}
      >
        {current && index !== null && (
          <div className={styles.panel}>
            <div className={styles.top}>
              <Button variant="ghost" onClick={close} className={styles.control}>
                {labels.close}
              </Button>
            </div>

            <figure className={styles.figure}>
              <div className={styles.stage}>
                {current.src ? (
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <PhotoSlot photo={current} ratio="4/3" sizes="100vw" />
                )}
              </div>
              <figcaption className={styles.caption} aria-live="polite">
                <span id={captionId} className="title">
                  {current.caption}
                </span>
                <span className="data">
                  {pad(index + 1)} / {pad(count)}
                </span>
              </figcaption>
            </figure>

            <div className={styles.nav}>
              <Button variant="ghost" onClick={() => step(-1)} className={styles.control}>
                {labels.prev}
              </Button>
              <Button variant="ghost" onClick={() => step(1)} className={styles.control}>
                {labels.next}
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
