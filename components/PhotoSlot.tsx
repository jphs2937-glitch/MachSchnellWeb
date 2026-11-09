import Image from "next/image";
import type { Photo } from "@/content/site";

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

/** A photo at a fixed aspect ratio. Renders nothing until photo.src is set in content/site.ts. */
export function PhotoSlot({ photo, ratio = "4/3", sizes, priority = false, className }: Props) {
  const cls = ["ms-photo", className].filter(Boolean).join(" ");
  const style = { aspectRatio: ratio.replace("/", " / ") };

  if (!photo.src) return null;

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
