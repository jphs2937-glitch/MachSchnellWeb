import localFont from "next/font/local";

/** Saira Expanded: headlines, nav, buttons, kickers. Always uppercase. */
export const fontDisplay = localFont({
  src: "../brand-kit/fonts/SairaExpanded-Variable.woff2",
  variable: "--font-display",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Saira", "system-ui", "sans-serif"],
});

/** Saira: body copy, data, captions. */
export const fontText = localFont({
  src: "../brand-kit/fonts/Saira-Variable.woff2",
  variable: "--font-text",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
