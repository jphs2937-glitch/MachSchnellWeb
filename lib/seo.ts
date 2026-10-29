import { site } from "@/content/site";

/**
 * Site-wide share image (app/opengraph-image.tsx). A page-level openGraph replaces the root one,
 * so every page that sets openGraph spreads this in.
 */
export const ogImages = [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }];
