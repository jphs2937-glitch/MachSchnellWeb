import { site, type Photo } from "@/content/site";

/** A photo is shown only once its file is set in content/site.ts. */
export const hasPhoto = (p: Photo | undefined): p is Photo => Boolean(p?.src);

/** Gallery photos that have a file. */
export const galleryPhotos = site.photos.filter(hasPhoto);

/** The gallery page, its nav link and the home strip appear once at least one photo has a file. */
export const galleryEnabled = site.gallery.enabled && galleryPhotos.length > 0;
