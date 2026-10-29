import type { Metadata } from "next";
import { site } from "@/content/site";
import { PackageCard } from "@/components/PackageCard";
import { PhoneCTA } from "@/components/PhoneCTA";
import { PhotoSlot } from "@/components/PhotoSlot";
import { SectionHead } from "@/components/SectionHead";
import { TextLink } from "@/components/TextLink";
import styles from "./detailing.module.css";

const page = site.detailingPage;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/detailing" },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/detailing",
  },
};

/** Full container width (max 1200px less padding). */
const FULL = "(min-width: 1200px) 1136px, 100vw";
/** Half the container on tablet and up. */
const HALF = "(min-width: 1200px) 556px, (min-width: 768px) 50vw, 100vw";

export default function DetailingPage() {
  return (
    <>
      <section className="section" aria-labelledby="detailing-title">
        <div className="container">
          <div className={styles.intro}>
            <span className="kicker">{page.kicker}</span>
            <h1 id="detailing-title" className="display-xl">
              {page.title}
            </h1>
            <p className="body-l measure">{page.lead}</p>
            <p className={`data ${styles.notice}`}>{site.detailing.bookingNotice}</p>
          </div>

          <div className={styles.phone}>
            <PhoneCTA />
          </div>
        </div>
      </section>

      <div className={`container ${styles.photoBand}`}>
        <PhotoSlot photo={page.photos[0]} ratio="16/9" sizes={FULL} />
      </div>

      <section className="section" data-theme="night" aria-labelledby="packages-title">
        <div className="container">
          <SectionHead id="packages-title" kicker={page.packagesKicker} title={page.packagesTitle} />
          <div className={`grid-2 ${styles.packageGrid}`}>
            {site.packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className={styles.members}>
            <p className="body-l measure">{site.detailing.membersNote}</p>
            <TextLink href={page.membersLink.href}>{page.membersLink.label}</TextLink>
          </div>
        </div>
      </section>

      <div className={`container ${styles.photoPair}`}>
        <div className="grid-2">
          <PhotoSlot photo={page.photos[1]} ratio="4/3" sizes={HALF} />
          <PhotoSlot photo={page.photos[2]} ratio="4/3" sizes={HALF} />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <PhoneCTA />
        </div>
      </section>
    </>
  );
}
