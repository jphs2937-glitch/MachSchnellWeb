import Image from "next/image";
import type { Photo } from "@/content/site";
import { StripeRule } from "./StripeRule";

export type Ratio = "16/9" | "4/3" | "1/1" | "3/4";

type Props = {
  photo: Photo;
  ratio?: Ratio;
  /** next/image sizes attribute. Describe the rendered width at each breakpoint. */
  sizes: string;
  /** Set true only for the largest above-the-fold image (the hero). */
  priority?: boolean;
  className?: string;
};

/**
 * A photo at a fixed aspect ratio. When photo.src is empty it renders a labeled
 * placeholder: a dove box with the club stripe and "PHOTO · CAPTION".
 */
export function PhotoSlot({ photo, ratio = "4/3", sizes, priority = false, className }: Props) {
  const cls = ["ms-photo", className].filter(Boolean).join(" ");
  const style = { aspectRatio: ratio.replace("/", " / ") };

  if (!photo.src) {
    return (
      <div className={`${cls} ms-photo-placeholder`} style={style} role="img" aria-label={photo.alt} data-theme="day">
        <StripeRule className="ms-photo-stripe" />
        <span className="ms-photo-label" aria-hidden="true">
          Photo · {photo.caption}
        </span>
      </div>
    );
  }

  return (
    <div className={cls} style={style}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
