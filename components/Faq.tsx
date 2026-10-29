type FaqItem = { q: string; a: string };

type Props = {
  items: readonly FaqItem[];
  /** Also emit FAQPage structured data for search engines. */
  jsonLd?: boolean;
  headingLevel?: "h3" | "h4";
};

/** Accordion of questions built on native <details>/<summary>: keyboard and screen reader support come free. */
export function Faq({ items, jsonLd = false, headingLevel: H = "h3" }: Props) {
  const data = jsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <div className="ms-faq">
      {items.map((item) => (
        <details key={item.q} className="ms-faq-item">
          <summary className="ms-faq-q">
            <H className="title">{item.q}</H>
            <span className="ms-faq-icon" aria-hidden="true" />
          </summary>
          <div className="ms-faq-a measure">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
      {data && (
        <script
          type="application/ld+json"
          // JSON-LD must be a raw string; content comes from our own content file.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      )}
    </div>
  );
}
