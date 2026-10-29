import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/url";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const entries: MetadataRoute.Sitemap = [
    page("/", "monthly", 1),
    page("/storage", "monthly", 0.9),
    page("/detailing", "monthly", 0.9),
    page("/join", "yearly", 0.8),
    page("/gallery", "monthly", 0.6),
  ];
  if (site.events.enabled) entries.push(page(site.events.href, "weekly", 0.7));
  return entries;
}
