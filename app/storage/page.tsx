import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { site } from "@/content/site";
import { telHref } from "@/lib/phone";
import { AmenityList } from "@/components/AmenityList";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { PlanBuilder } from "@/components/PlanBuilder";
import { PhotoSlot } from "@/components/PhotoSlot";
import { PlanCard } from "@/components/PlanCard";
import { SectionHead } from "@/components/SectionHead";
import { StripeRule } from "@/components/StripeRule";
import { hasPhoto } from "@/lib/photos";
import styles from "./storage.module.css";

const page = site.storage;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/storage" },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/storage",
    images: ogImages,
  },
};

/** Half the container on tablet and up (max 1200px less padding), full width on phones. */
const HALF = "(min-width: 1200px) 556px, (min-width: 768px) 50vw, 100vw";
/** Full container width. */
const FULL = "(min-width: 1200px) 1136px, 100vw";

export default function StoragePage() {
  return (
    <>
      <section className="section" aria-labelledby="storage-title">
        <div className="container">
          <div className={hasPhoto(page.introPhoto) ? `grid-2 ${styles.intro}` : styles.intro}>
            <div className={styles.introText}>
              <span className="kicker">{page.kicker}</span>
              <h1 id="storage-title" className="display-xl lines">
                {page.titleLines.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </h1>
              <p className="body-l measure">{page.lead}</p>
              <div className="ms-btn-row">
                <Button href={site.cta.href}>{site.cta.label}</Button>
                <Button href={page.plansLink.href} variant="ghost">
                  {page.plansLink.label}
                </Button>
              </div>
              <p className="data">
                {site.contact.hours.label} · <a href={telHref()}>{site.contact.phone}</a>
              </p>
            </div>
            {hasPhoto(page.introPhoto) && <PhotoSlot photo={page.introPhoto} ratio="4/3" sizes={HALF} priority />}
          </div>

          <div className={styles.amenities}>
            <h2 className="visually-hidden">{page.amenitiesTitle}</h2>
            <AmenityList />
          </div>
        </div>
      </section>

      {hasPhoto(page.betweenPhotos[0]) && (
        <div className={styles.photoBleed} data-parallax>
          <PhotoSlot photo={page.betweenPhotos[0]} ratio="16/9" sizes="100vw" className="ms-photo-bleed" />
        </div>
      )}

      <section className="section" data-theme="night" aria-labelledby="facility-title">
        <div className="container">
          <SectionHead index="01" id="facility-title" kicker={site.facility.kicker} title={site.facility.title} />
          <ul role="list" className="ms-facility">
            {site.facility.items.map((item, i) => (
              <li key={item.title}>
                <span className="data">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="title">{item.title}</h3>
                <p className="muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StripeRule bleed />

      <section id="plans" className="section band-sunken" aria-labelledby="plans-title">
        <div className="container">
          <SectionHead index="02" id="plans-title" kicker={page.plansKicker} title={page.plansTitle} lead={site.facility.termNote} />
          <div className={`grid-3 ${styles.planGrid}`}>
            {site.plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="builder-title">
        <div className="container">
          <SectionHead index="03" id="builder-title" kicker={site.builder.kicker} title={site.builder.title} />
          <PlanBuilder />
        </div>
      </section>

      {hasPhoto(page.betweenPhotos[1]) && (
        <div className={`container ${styles.photoBand}`}>
          <PhotoSlot photo={page.betweenPhotos[1]} ratio="16/9" sizes={FULL} />
        </div>
      )}

      <StripeRule bleed />

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <div className={styles.faq}>
            <SectionHead index="04" id="faq-title" title={page.faqTitle} />
            <Faq items={site.storageFaq} jsonLd />
          </div>
        </div>
      </section>

      <section className="section" data-theme="night" aria-labelledby="storage-cta-title">
        <div className={`container ${styles.ctaBody}`}>
          <div className={styles.ctaText}>
            <h2 id="storage-cta-title" className="display-l">
              {page.finalCta.title}
            </h2>
            <p className="body-l measure">{page.finalCta.text}</p>
          </div>
          <div className="ms-btn-row">
            <Button href={site.cta.href} size="lg">
              {site.cta.label}
            </Button>
            <Button href={site.home.finalCta.tourCta.href} variant="ghost" size="lg">
              {site.home.finalCta.tourCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
