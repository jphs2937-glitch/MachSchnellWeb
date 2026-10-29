# Mach Schnell Automotive Club · Website

Website for Mach Schnell Automotive Club, a private, climate-controlled car storage and detailing club in Houston.

Next.js (App Router) + TypeScript, plain CSS with brand tokens, deployed on Vercel. Membership requests are emailed through Resend.

---

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000.

Without `RESEND_API_KEY` in `.env.local`, the membership form still works in development: it prints the emails it would have sent to the terminal instead of sending them.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Production build (run this before deploying to catch errors) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run tokens` | Regenerate `app/tokens.css` from `brand-kit/tokens.json` |

---

## Edit the content: `content/site.ts`

Every price, phone number, address, package, FAQ answer, photo and line of copy is in **one file**: `content/site.ts`. Components never hard-code business content.

1. Open `content/site.ts` (on GitHub: open the file, click the pencil icon).
2. Change the text between the quotes. Keep the quotes, commas and brackets.
3. Save (on GitHub: **Commit changes**). Vercel redeploys automatically.

Rules of thumb:

- Write in sentence case. Headlines, buttons and nav are uppercased by the design, so `"Become a member"` shows as `BECOME A MEMBER`.
- Brand voice: short, direct, dry. No exclamation marks, no emoji, no hype words. Separate items with ` · `. Times in 24-hour format (`07:00`).
- Never name car manufacturers. Say "luxury and collector cars".
- Search the file for `TODO:` to find every placeholder.

Where things live in the file:

| You want to change | Look for |
|---|---|
| Phone number | `contact.phone` (the `tel:` link is built from it automatically) |
| Address, map, Instagram, club email | `contact` |
| Top navigation | `nav`, `cta` |
| Turn on the Events page | `events.enabled` → `true` (adds the `EVENTS` link, makes `/events` indexable and adds it to the sitemap) |
| Storage plans and prices | `plans` |
| Grand Prix / Concours upgrade prices | `upgrades` |
| Storage FAQ | `storageFaq` |
| Detailing packages, prices, inclusions | `packages` |
| Phone call-to-action text, members note | `detailing` |
| Page copy | `home`, `storage`, `detailingPage`, `gallery`, `join` |
| Gallery photos | `photos` |

---

## Add photos

No real photos exist yet. Every photo spot shows a labeled placeholder (a dove-gray box with the club stripe and a caption like `PHOTO · STORAGE FLOOR`) until it gets a real file.

1. Put the image in `public/photos/` (JPG or WebP, at least 2000px wide for the hero, 1600px for others). Use simple lowercase file names: `storage-floor-wide.jpg`.
2. In `content/site.ts`, find the matching entry and set `src`:

   ```ts
   heroPhoto: { src: "/photos/storage-floor-wide.jpg", alt: "Members' cars parked on the climate-controlled storage floor", caption: "Storage floor wide" },
   ```

3. Write a real `alt` describing the photo. It is read by screen readers and search engines.

**Gallery:** add one line to `photos` in `content/site.ts`. The first six also appear in the strip on the home page.

```ts
{ src: "/photos/morning-lineup.jpg", alt: "Members' cars lined up outside the garage at sunrise", caption: "Morning lineup" },
```

Photos are cropped to fixed shapes: 16:9 for the home hero, 4:3 for cards and section photos, 1:1 in the gallery. Next.js resizes and compresses them automatically.

Brand imagery rules (BRAND.md): real club cars, shot low and side-on, natural light, warm grade. No stock photos, no AI-generated cars, no type over busy photos, no visible manufacturer badges as a subject.

---

## Placeholders to fill in (TODO list)

All of these are in `content/site.ts`, marked `// TODO:`.

| Placeholder | Where | Current value |
|---|---|---|
| Grand Prix upgrade price per detail | `upgrades` → `grand-prix` → `price` | `+$XX` |
| Concours upgrade price per detail | `upgrades` → `concours` → `price` | `+$XX` |
| FAQ: access to your car | `storageFaq[0].a` | placeholder answer |
| FAQ: insurance | `storageFaq[1].a` | placeholder answer |
| FAQ: minimum term | `storageFaq[2].a` | placeholder answer |
| FAQ: vehicle sizes | `storageFaq[3].a` | placeholder answer |
| All photos | every `src: ""` | placeholder boxes |

Also before launch: add `RESEND_API_KEY` in Vercel and verify `mach-schnell.com` in Resend.

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. On Vercel, set them under **Project → Settings → Environment Variables**.

| Variable | Required | What it is |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | API key from https://resend.com/api-keys. Without it the live form shows an error. |
| `MEMBERSHIP_TO_EMAIL` | No | Inbox for new member requests. Defaults to `contact.email` in `content/site.ts` (`info@mach-schnell.com`). |
| `MEMBERSHIP_FROM_EMAIL` | No | Sender. Defaults to `Mach Schnell <info@mach-schnell.com>`. The domain `mach-schnell.com` must be verified in Resend or sends fail. |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL for canonical links, sitemap and social previews. On Vercel it defaults to the production domain. |

What the form sends:

- To `MEMBERSHIP_TO_EMAIL`, subject `New member request: <Name> · <Year Make Model> · <Plan>`, with every field. Reply goes straight to the applicant.
- To the applicant, a short confirmation in the brand voice.

---

## Deploy to Vercel

The Vercel project `machschnellweb` is connected to this repository and serves **https://mach-schnell.com**. Framework (Next.js) and Node version (24) are pinned in `vercel.json` and `package.json`.

1. In Resend: **Domains → Add domain → `mach-schnell.com`**. Add the DNS records it shows in Vercel (**Domains → mach-schnell.com → DNS Records**) and wait for Resend to show the domain as verified.
2. In Resend: **API Keys → Create**, with sending access.
3. In Vercel: **machschnellweb → Settings → Environment Variables**, add `RESEND_API_KEY` (Production and Preview, type Sensitive).
4. Redeploy: **Deployments → latest production deployment → ⋯ → Redeploy**. Environment variables only apply to new deployments.
5. Submit a test request on https://mach-schnell.com/join and confirm both emails arrive.

Every push to the main branch redeploys production; other branches get preview URLs.

---

## Project structure

```
brand-kit/            Approved brand kit (source of truth). Do not edit; changes go to the board.
content/site.ts       ALL business content
app/
  tokens.css          Brand tokens as CSS variables (generated from brand-kit/tokens.json)
  globals.css         Base styles, layout helpers, type classes
  components.css      Shared component styles (stripe, buttons, nav, cards, footer)
  fonts.ts            Saira Expanded (--font-display) and Saira (--font-text), self-hosted
  layout.tsx          Header, footer, skip link, LocalBusiness JSON-LD
  page.tsx            Home
  storage/ detailing/ gallery/ join/ events/
  sitemap.ts robots.ts opengraph-image.tsx
components/           NavBar, Footer, StripeRule, Button, PlanCard, PackageCard, PhotoSlot,
                      PhoneCTA, AmenityList, MapEmbed, MembershipForm, Gallery, Faq
lib/                  Phone links, site URL, nav links, membership form schema and emails
public/brand/         Logos copied from brand-kit/logos (used as files, never redrawn)
public/photos/        Real photos go here
scripts/              Token generator, screenshot script
screenshots/          Review screenshots of every page at 360px and 1280px
```

## Screenshots

`screenshots/` holds each page at mobile (360px) and desktop (1280px), plus the open mobile menu, the gallery lightbox, and the membership form's error and success states. To regenerate them, build and start the site, then run the script. It uses a global Playwright install, which is a one-time setup:

```bash
npm install -g playwright && npx playwright install chromium
```

```bash
npm run build && npm run start
```

```bash
NODE_PATH="$(npm root -g)" node scripts/screenshot.mjs http://localhost:3000 screenshots
```

## Quality checks run before handoff

- Lighthouse (mobile and desktop) on Home, Storage, Detailing, Gallery and Join: Performance 98–100, Accessibility 100, Best Practices 100, SEO 100.
- No horizontal scroll at 360, 768, 1024, 1280 and 1440px.
- Tested: mobile menu (open, Esc to close), `?plan=` pre-selection, detailing package reveal/hide/clear when switching plans, server-side validation with inline errors, success message, gallery lightbox (click, arrows, Esc, focus return), `/events` noindex and absent from nav, sitemap and robots.

## Brand

The brand kit in `brand-kit/` is approved by the board. `BRAND.md` and `tokens.json` are the source of truth for every color, font, spacing value, logo rule and voice rule. To change a token, change `brand-kit/tokens.json` (with board approval) and run `npm run tokens`.

Key rules the code enforces:

- Colors only through tokens: bone ground, black ink, Signal Red at about 10% of any view. Small red text uses `accent-text`.
- Two themes: Day (default) and Night via `data-theme="night"` on any section.
- Saira Expanded, uppercase, for headlines, nav, buttons and kickers. Saira for body. No italics.
- The club stripe (red over black, 8px bands, 4px gap; bone instead of black on dark) is the main graphic.
- Borders, not shadows. Radii: 0 stripes, 3px buttons, 8px cards and photos, round only for the badge.
- 2px Signal Red focus ring on every interactive element. Reduced motion respected.
