import { addressLine, site } from "@/content/site";

/** Lazy-loaded Google Map (no API key) with a "Get directions" link. */
export function MapEmbed({ directionsLabel = "Get directions" }: { directionsLabel?: string }) {
  return (
    <div className="ms-map">
      <div className="ms-map-frame">
        <iframe
          src={site.contact.mapEmbedUrl}
          title={`Map: ${addressLine()}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a className="text-link" href={site.contact.directionsUrl} target="_blank" rel="noopener noreferrer">
        {directionsLabel}
        <span className="visually-hidden"> (opens Google Maps)</span>
      </a>
    </div>
  );
}
