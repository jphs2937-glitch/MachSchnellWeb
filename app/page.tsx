import type { Metadata } from "next";
import type React from "react";
import { ogImages } from "@/lib/seo";
import { addressLine, site } from "@/content/site";
import { telHref } from "@/lib/phone";
import { AmenityList } from "@/components/AmenityList";
import { Button } from "@/components/Button";
import { MapEmbed } from "@/components/MapEmbed";
import { PackageCard } from "@/components/PackageCard";
import { PhoneCTA } from "@/components/PhoneCTA";
import { PhotoSlot } from "@/components/PhotoSlot";
import { PlanCard } from "@/components/PlanCard";
import { SectionHead } from "@/components/SectionHead";
import { StripeRule } from "@/components/StripeRule";
import { TextLink } from "@/components/TextLink";
import { Ticker } from "@/components/Ticker";
import { galleryEnabled, galleryPhotos, hasPhoto } from "@/lib/photos";
import styles from "./home.module.css";

const home = site.home;

export const metadata: Metadata = {
  title: { absolute: home.seoTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: home.seoTitle,
    description: site.description,
    url: "/",
    images: ogImages,
  },
};

/* Rendered widths for next/image. Container: 16px gutters, 32px from 768px, 1136px max content. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FULL = "(min-width: 1200px) 1136px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
const THIRD = "(min-width: 1200px) 363px, (min-width: 900px) calc((100vw - 112px) / 3), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HALF = "(min-width: 1200px) 556px, (min-width: 768px) calc((100vw - 88px) / 2), calc(100vw - 32px)";
const GALLERY = "(min-width: 1200px) 170px, (min-width: 1100px) calc((100vw - 144px) / 6), (min-width: 768px) calc((100vw - 96px) / 3), calc((100vw - 48px) / 2)";

/**
 * Break a display title into short hand-set lines (the wide face can't wrap freely).
 * Packs words greedily up to `max` characters; a "·" stays with the word before it.
 * Later lines keep a leading space so screen readers don't run words together.
 */
function Lines({ text, max = 14 }: { text: string; max?: number }) {
  const words = text.split(" ").reduce<string[]>((acc, w) => {
    if (w === "·" && acc.length) acc[acc.length - 1] += " ·";
    else acc.push(w);
    return acc;
  }, []);
  const lines: string[] = [];
  for (const w of words) {
    const last = lines[lines.length - 1];
    if (last !== undefined && last.length + 1 + w.length <= max) lines[lines.length - 1] = `${last} ${w}`;
    else lines.push(w);
  }
  return (
    <span className="lines">
      {lines.map((l, i) => (
        <span key={i}>{i > 0 ? ` ${l}` : l}</span>
      ))}
    </span>
  );
}

/**
 * The hero name, typed on one letter at a time. The h1 keeps the real text for screen
 * readers and search; the letters are presentational. Each word is one line.
 */
function TypedTitle({ text, className, id }: { text: string; className: string; id: string }) {
  let i = 0;
  return (
    <h1 id={id} className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} className={styles.titleLine} aria-hidden="true">
          {Array.from(word).map((ch) => (
            <span key={i} className={styles.letter} style={{ "--i": i++ } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  const a = site.contact.address;
  // Section numbers for the index plates, in page order (the gallery strip only counts when shown)
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      {/* 1 · Hero */}
      <section className={styles.hero} aria-labelledby="home-title">
        <div className="container">
          <span className="kicker" data-type>
            {home.kicker}
          </span>
          <TypedTitle id="home-title" text={home.title} className={styles.heroTitle} />
        </div>

        <div className={styles.stripeBand} data-paint>
          <StripeRule bleed />
          <div className={`container ${styles.carWrap}`}>
            {/* The coupé from the logo, parked on the club stripe */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className={styles.carScroll}>
              <img src="/brand/ms-car-on-light.svg" alt="" aria-hidden="true" width={420} height={84} className={styles.car} data-drive />
            </span>
          </div>
        </div>

        <div className={`container ${styles.heroBody}`}>
          <p className={`data ${styles.heroData}`}>
            {a.street} · {a.city}, {a.region} · Est. {site.established}
          </p>
          <p className="body-l measure">{home.lead}</p>
          <p className={`title ${styles.heroPrice}`}>{home.priceLine}</p>
          <div className="ms-btn-row">
            <Button href={home.primaryCta.href} variant="primary" size="lg">
              {home.primaryCta.label}
            </Button>
            <Button href={telHref()} variant="ghost" size="lg">
              {home.callLabel} {site.contact.phone}
            </Button>
          </div>
          <div>
            <TextLink href={home.secondaryCta.href}>{home.secondaryCta.label}</TextLink>
          </div>
        </div>

        {hasPhoto(home.heroPhoto) && (
          <div className={styles.heroPhoto} data-parallax>
            <PhotoSlot photo={home.heroPhoto} ratio="16/9" sizes="100vw" priority className="ms-photo-bleed" />
          </div>
        )}
      </section>

      <Ticker />

      {/* 2 · What we do */}
      <section className="section" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHead index={next()} id="what-we-do" kicker={home.whatWeDo.kicker} title={<Lines text={home.whatWeDo.title} />} />
          <div className="grid-3">
            {home.whatWeDo.blocks.map((b, i) => (
              <article key={b.title} className={`ms-card ${styles.block}`}>
                <PhotoSlot photo={b.photo} ratio="4/3" sizes={THIRD} />
                <span className="section-index-plate" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="headline">{b.title}</h3>
                <p>{b.text}</p>
                <div>
                  <TextLink href={b.link.href}>{b.link.label}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Storage teaser */}
      <section className="section band-sunken" aria-labelledby="storage-teaser">
        <div className="container">
          <SectionHead
            index={next()}
            id="storage-teaser"
            kicker={home.storageTeaser.kicker}
            title={<Lines text={home.storageTeaser.title} />}
            lead={home.storageTeaser.text}
            aside={<TextLink href={home.storageTeaser.link.href}>{home.storageTeaser.link.label}</TextLink>}
          />
          <div className="grid-3">
            {site.plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i + 1} compact />
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Detailing teaser (night) */}
      <section data-theme="night" className="section" aria-labelledby="detailing-teaser">
        <div className="container">
          <SectionHead
            index={next()}
            id="detailing-teaser"
            kicker={home.detailingTeaser.kicker}
            title={<Lines text={home.detailingTeaser.title} />}
            lead={home.detailingTeaser.text}
          />
          <div className={styles.packages}>
            {site.packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} compact />
            ))}
          </div>
          <div className={styles.phone}>
            <PhoneCTA compact headingLevel="h3" />
          </div>
          <div className={styles.after}>
            <TextLink href={home.detailingTeaser.link.href}>{home.detailingTeaser.link.label}</TextLink>
          </div>
        </div>
      </section>

      {/* 5 · The space (night): full-bleed photo, then the readouts */}
      <section data-theme="night" className={styles.garage} aria-labelledby="the-space">
        {hasPhoto(home.space.photos[0]) && (
          <div className={styles.garagePhoto} data-parallax>
            <PhotoSlot photo={home.space.photos[0]} ratio="16/9" sizes="100vw" className="ms-photo-bleed" />
          </div>
        )}
        <div className="container section">
          <SectionHead index={next()} id="the-space" kicker={home.space.kicker} title={<Lines text={home.space.title} />} />
          <ul role="list" className="ms-specs">
            {home.space.specs.map((s) => (
              <li key={s.label}>
                <span className="kicker">{s.label}</span>
                <span className="headline">{s.value}</span>
              </li>
            ))}
          </ul>
          <div className={styles.after}>
            <AmenityList />
          </div>
        </div>
      </section>

      {/* 6 · Access: call ahead, drive away */}
      <section className="section" aria-labelledby="ready-by">
        <div className="container">
          <SectionHead index={next()} id="ready-by" kicker={home.readyBy.kicker} title={<Lines text={home.readyBy.title} max={16} />} lead={home.readyBy.text} />
          <ol role="list" className="ms-steps">
            {home.readyBy.steps.map((s, i) => (
              <li key={s.title}>
                <span className="section-index-plate" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="kicker">{s.tag}</span>
                <h3 className="headline">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {galleryEnabled && (
        <>
          <div className="container">
            <StripeRule bleed />
          </div>

          {/* 6 · Gallery strip */}
          <section className="section" aria-labelledby="gallery-strip">
            <div className="container">
              <SectionHead
                index={next()}
                id="gallery-strip"
                kicker={home.galleryStrip.kicker}
                title={<Lines text={home.galleryStrip.title} />}
                aside={<TextLink href={home.galleryStrip.link.href}>{home.galleryStrip.link.label}</TextLink>}
              />
              <ul role="list" className={styles.gallery}>
                {galleryPhotos.slice(0, 6).map((p) => (
                  <li key={p.caption}>
                    <PhotoSlot photo={p} ratio="1/1" sizes={GALLERY} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* 7 · Location */}
      <section className="section band-sunken" aria-labelledby="location">
        <div className="container grid-2">
          <div className={styles.location}>
            <div className="section-index">
              <span className="section-index-plate">{next()}</span>
              <span className="kicker">{home.location.kicker}</span>
              <span className="section-index-rule" aria-hidden="true" />
            </div>
            <h2 id="location" className="display-l">
              <Lines text={home.location.title} />
            </h2>
            <address className={`title ${styles.address}`}>{addressLine()}</address>
            <a className={`title ${styles.phoneLink}`} href={telHref()}>
              <span className="visually-hidden">Call </span>
              {site.contact.phone}
            </a>
            <p className="data">{site.contact.hours.label}</p>
            <p className="muted measure">{home.location.text}</p>
          </div>
          <MapEmbed directionsLabel={home.location.directionsLabel} />
        </div>
      </section>

      {/* 8 · Final CTA (night) */}
      <section data-theme="night" aria-labelledby="final-cta">
        <StripeRule />
        <div className={`container section ${styles.finalBody}`}>
          <h2 id="final-cta" className="display-l">
            <Lines text={home.finalCta.title} />
          </h2>
          <p className="body-l measure">{home.finalCta.text}</p>
          <div className="ms-btn-row">
            <Button href={home.finalCta.cta.href} variant="primary" size="lg">
              {home.finalCta.cta.label}
            </Button>
            <Button href={home.finalCta.tourCta.href} variant="ghost" size="lg">
              {home.finalCta.tourCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
