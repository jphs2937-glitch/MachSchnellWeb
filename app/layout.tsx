import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/url";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { Motion } from "@/components/Motion";
import { ScrollFx } from "@/components/ScrollFx";
import { ActionBar } from "@/components/ActionBar";
import { fontDisplay, fontText } from "./fonts";
import "./tokens.css";
import "./globals.css";
import "./components.css";
import "./motion.css";
import "./wow.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.home.seoTitle,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/brand/ms-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ede6d8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontDisplay.variable} ${fontText.variable}`}>
      <body>
        {/* First visit of a session: five start lights, then the curtain lifts. Pure CSS; the script only skips repeats. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('ms-intro'))document.documentElement.setAttribute('data-intro-seen','');else sessionStorage.setItem('ms-intro','1')}catch(e){document.documentElement.setAttribute('data-intro-seen','')}",
          }}
        />
        <div className="ms-intro" aria-hidden="true">
          <div className="ms-intro-lights">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </div>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NavBar />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <LocalBusinessJsonLd />
        <ActionBar />
        <Motion />
        <ScrollFx />
      </body>
    </html>
  );
}
