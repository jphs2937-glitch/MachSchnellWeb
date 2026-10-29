import type { Metadata } from "next";
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
  },
};

/* Rendered widths for next/image. Container: 16px gutters, 32px from 768px, 1136px max content. */
const FULL = "(min-width: 1200px) 1136px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
const THIRD = "(min-width: 1200px) 363px, (min-width: 900px) calc((100vw - 112px) / 3), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
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

export default function Home() {
  const titleWords = home.title.split(" ");

  return (
    <>
      {/* 1 · Hero */}
      <section className={styles.hero} aria-labelledby="home-title">
        <div className="container">
          <span className="kicker">{home.kicker}</span>
          <h1 id="home-title" className={`display-xl lines ${styles.heroTitle}`}>
            {titleWords.map((w, i) => (
              <span key={w}>{i > 0 ? ` ${w}` : w}</span>
            ))}
          </h1>
        </div>

        <div className={styles.stripeBand}>
          <StripeRule bleed />
          <div className={`container ${styles.badgeWrap}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/ms-badge.svg" alt="" aria-hidden="true" width={224} height={224} className={styles.badge} />
          </div>
        </div>

        <div className={`container ${styles.heroBody}`}>
          <p className="body-l measure">{home.lead}</p>
          <div className="ms-btn-row">
            <Button href={home.primaryCta.href} variant="primary">
              {home.primaryCta.label}
            </Button>
            <Button href={home.secondaryCta.href} variant="ghost">
              {home.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className={`container ${styles.heroPhoto}`}>
          <PhotoSlot photo={home.heroPhoto} ratio="16/9" sizes={FULL} priority />
        </div>
      </section>

      {/* 2 · What we do */}
      <section className="section" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHead id="what-we-do" kicker={home.whatWeDo.kicker} title={<Lines text={home.whatWeDo.title} />} />
          <div className="grid-3">
            {home.whatWeDo.blocks.map((b) => (
              <article key={b.title} className={styles.block}>
                <PhotoSlot photo={b.photo} ratio="4/3" sizes={THIRD} />
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
      <section className={`section ${styles.ruled}`} aria-labelledby="storage-teaser">
        <div className="container">
          <SectionHead
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

      {/* 5 · The space */}
      <section className="section" aria-labelledby="the-space">
        <div className="container">
          <SectionHead id="the-space" kicker={home.space.kicker} title={<Lines text={home.space.title} />} />
          <AmenityList />
          <div className={`grid-2 ${styles.after}`}>
            {home.space.photos.map((p) => (
              <PhotoSlot key={p.caption} photo={p} ratio="4/3" sizes={HALF} />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <StripeRule bleed />
      </div>

      {/* 6 · Gallery strip */}
      <section className="section" aria-labelledby="gallery-strip">
        <div className="container">
          <SectionHead
            id="gallery-strip"
            kicker={home.galleryStrip.kicker}
            title={<Lines text={home.galleryStrip.title} />}
            aside={<TextLink href={home.galleryStrip.link.href}>{home.galleryStrip.link.label}</TextLink>}
          />
          <ul role="list" className={styles.gallery}>
            {site.photos.slice(0, 6).map((p) => (
              <li key={p.caption}>
                <PhotoSlot photo={p} ratio="1/1" sizes={GALLERY} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · Location */}
      <section className={`section ${styles.ruled}`} aria-labelledby="location">
        <div className="container grid-2">
          <div className={styles.location}>
            <span className="kicker">{home.location.kicker}</span>
            <h2 id="location" className="display-l">
              <Lines text={home.location.title} />
            </h2>
            <address className={`title ${styles.address}`}>{addressLine()}</address>
            <a className={`title ${styles.phoneLink}`} href={telHref()}>
              <span className="visually-hidden">Call </span>
              {site.contact.phone}
            </a>
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
          </div>
        </div>
      </section>
    </>
  );
}
