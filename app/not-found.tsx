import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/Button";
import { StripeRule } from "@/components/StripeRule";

export const metadata: Metadata = {
  title: site.notFound.seoTitle,
};

export default function NotFound() {
  const nf = site.notFound;
  return (
    <div className="container section">
      <div className="stack">
        <span className="kicker">{nf.kicker}</span>
        <h1 className="display-xl">{nf.title}</h1>
        <p className="body-l measure">{nf.text}</p>
      </div>
      <div style={{ marginBlock: "var(--space-8)" }}>
        <StripeRule bleed />
      </div>
      <div className="ms-btn-row">
        <Button href={nf.cta.href}>{nf.cta.label}</Button>
      </div>
    </div>
  );
}
