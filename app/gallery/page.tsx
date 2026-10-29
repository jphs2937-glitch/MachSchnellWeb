import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { site } from "@/content/site";
import { Gallery } from "@/components/Gallery";
import { SectionHead } from "@/components/SectionHead";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: site.gallery.seoTitle,
  description: site.gallery.seoDescription,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: site.gallery.seoTitle,
    description: site.gallery.seoDescription,
    url: "/gallery",
    images: ogImages,
  },
};

export default function GalleryPage() {
  return (
    <div className={`container section ${styles.page}`}>
      <SectionHead as="h1" size="xl" kicker={site.gallery.kicker} title={site.gallery.title} lead={site.gallery.lead} />
      <Gallery photos={site.photos} labels={site.gallery.lightbox} />
    </div>
  );
}
