import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { site } from "@/content/site";
import { CallbackForm } from "@/components/CallbackForm";
import { MembershipForm } from "@/components/MembershipForm";
import { StripeRule } from "@/components/StripeRule";
import { CAR_COUNTS, PACKAGE_IDS, isPlanId, todayInHouston } from "@/lib/membership";
import styles from "./join.module.css";

const page = site.join;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/join" },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/join",
    images: ogImages,
  },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JoinPage({ searchParams }: Props) {
  const { plan, cars, package: pkg } = await searchParams;
  const initialPlan = isPlanId(plan) ? plan : undefined;
  const initialCars = typeof cars === "string" && (CAR_COUNTS as readonly string[]).includes(cars) ? cars : undefined;
  const initialPackage = typeof pkg === "string" && (PACKAGE_IDS as readonly string[]).includes(pkg) ? pkg : undefined;
  const startedAt = Date.now();

  return (
    <section className="section" aria-labelledby="join-title">
      <div className="container">
        <header className={styles.head}>
          <span className="kicker">{page.kicker}</span>
          <h1 id="join-title" className="display-xl">
            {page.title}
          </h1>
          <p className="body-l measure">{page.lead}</p>
        </header>

        <StripeRule bleed className={styles.stripe} />

        <div className={styles.layout}>
          <aside className={styles.aside} aria-labelledby="join-steps-title">
            <h2 id="join-steps-title" className="title">
              {page.stepsTitle}
            </h2>
            <ol role="list" className={styles.steps}>
              {page.steps.map((step, i) => (
                <li key={step}>
                  <span className={`data ${styles.stepNo}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <CallbackForm startedAt={startedAt} />
          </aside>

          <div className={styles.formCol}>
            <MembershipForm initialPlan={initialPlan} initialCars={initialCars} initialPackage={initialPackage} minDate={todayInHouston()} startedAt={startedAt} />
          </div>
        </div>
      </div>
    </section>
  );
}
