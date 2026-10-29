import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Events stay out of search until site.events.enabled is true.
      ...(site.events.enabled ? {} : { disallow: site.events.href }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
