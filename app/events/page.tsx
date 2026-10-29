import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { site } from "@/content/site";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/SectionHead";
import { StripeRule } from "@/components/StripeRule";
import styles from "./events.module.css";

const { events } = site;

export const metadata: Metadata = {
  title: events.title,
  description: events.seoDescription,
  alternates: { canonical: events.href },
  // Hidden from search until events go live (site.events.enabled).
  robots: events.enabled ? undefined : { index: false, follow: false },
  openGraph: {
    title: events.title,
    description: events.seoDescription,
    url: events.href,
    images: ogImages,
  },
};

export default function EventsPage() {
  const soon = events.comingSoon;
  return (
    <>
      <div className="container section">
        <SectionHead as="h1" size="xl" kicker={events.kicker} title={events.title} lead={events.intro} />
      </div>

      <section className={`section ${styles.night}`} data-theme="night" aria-labelledby="events-soon">
        <div className="container">
          <div className={styles.panel}>
            <StripeRule />
            <div className={styles.body}>
              <span className="kicker">{soon.kicker}</span>
              <h2 id="events-soon" className="display-l">
                {soon.title}
              </h2>
              <p className={`body-l measure ${styles.text}`}>{soon.text}</p>
              <div className="ms-btn-row">
                <Button href={soon.cta.href}>
                  {soon.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
