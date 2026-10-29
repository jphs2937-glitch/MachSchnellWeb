import { site } from "@/content/site";

/** Links shown in the nav: the fixed list plus Events when it's enabled in content/site.ts. */
export function navLinks() {
  const links = [...site.nav];
  if (site.events.enabled) links.push({ label: site.events.label, href: site.events.href });
  return links;
}
