import { site } from "@/content/site";
import { phoneE164 } from "@/lib/phone";
import { siteUrl } from "@/lib/url";

/** LocalBusiness structured data with the address and phone. Rendered once in the root layout. */
export function LocalBusinessJsonLd() {
  const a = site.contact.address;
  const data = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: site.name,
    description: site.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/ms-badge.svg`,
    image: `${siteUrl}/opengraph-image`,
    telephone: phoneE164() ?? site.contact.phone,
    foundingDate: site.established,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    hasMap: site.contact.directionsUrl,
    sameAs: [site.contact.instagram.url],
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; content comes from our own content file.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
