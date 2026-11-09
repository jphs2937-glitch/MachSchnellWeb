import { site } from "@/content/site";
import { galleryEnabled } from "@/lib/photos";

/**
 * Links shown in the nav: the fixed list (Gallery only once it has photos) plus Events
 * when it's enabled in content/site.ts.
 */
export function navLinks() {
  const links = site.nav.filter((l) => l.href !== "/gallery" || galleryEnabled);
  if (site.events.enabled) links.push({ label: site.events.label, href: site.events.href });
  return links;
}
