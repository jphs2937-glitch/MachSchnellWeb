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
    logo: `${siteUrl}/brand/ms-logo-email.png`,
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.contact.hours.days,
        opens: site.contact.hours.opens,
        closes: site.contact.hours.closes,
      },
    ],
    makesOffer: [
      ...site.plans.map((p) => ({
        "@type": "Offer",
        name: `Car storage: ${p.name}`,
        price: p.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        description: `${p.summary} Billed monthly.`,
      })),
      ...site.packages.map((p) => ({
        "@type": "Offer",
        name: `Detailing: ${p.name}`,
        price: p.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        description: p.tagline,
      })),
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; content comes from our own content file.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
