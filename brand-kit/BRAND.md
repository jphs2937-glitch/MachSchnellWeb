Mach Schnell is an automotive club with a '70s–'80s endurance-racing look: bone paper, black, and one signal red, wide Saira Expanded lettering, the two-band club stripe, and a ring badge. It should feel like heritage motorsport rather than a modern tech brand: calm, confident, a little German, never flashy.

**Approved by the board, October 2026.** Treat the logo, colors, type and club stripe as fixed: changes to any of them go back to the board. The approved one-page proposal (Assets › Applications › `mach-schnell-brand-proposal.pdf`) shows how the pieces combine; match it.

## Content fundamentals

- **Voice:** a club that knows its cars. Short, direct, dry. Facts first, then the invitation. "Coffee at seven. Wheels rolling by half past." Not "Get ready for an epic morning!"
- **Person:** "we" for the club, "you" for members and guests.
- **Casing:** headlines, titles, kickers, buttons and nav are UPPERCASE. Body copy is sentence case.
- **Numbers:** 24-hour times with a leading zero (`07:00`), distances in miles (`140 MI`), event numbers two digits (`No. 07`). Separate data items with a middle dot ` · `.
- **Words to use:** run, drive, loop, meet, members, garage, paddock, route brief.
- **Avoid:** hype words (epic, insane, beast), exclamation marks, emoji, hashtags inside designs (they go in the caption).
- **Spanish and German:** fine in captions; keep the name "Mach Schnell" untranslated.

Real examples:

| Kicker | Title | CTA |
|---|---|---|
| SUNDAY · 07:00 | CARS & COFFEE NO. 07 | RSVP |
| MEMBERS ONLY | HILL COUNTRY LOOP | RESERVE A SPOT |
| CAR OF THE WEEK | NO.12 | (owner handle) |

## Logo

- **Primary: the ring badge** (Assets › Logos › `ms-badge.svg`, component `Badge`). Black ring with "MACH SCHNELL · AUTOMOTIVE CLUB · EST 2026", bone disc with a `signal-red` inner ring, and the striped MS. Use it at 120px and larger.
- **Mark: the striped MS disc** (`ms-mark.svg`, `Badge variant="mark"`). Use it for the Instagram avatar, favicon, nav bar and post corners, anywhere the ring text would fall under about 9px.
- **Lockups:** `ms-lockup-on-light.svg` on `bone` or white, `ms-lockup-on-dark.svg` on `black`. Use them for the website header, email signatures and the windshield banner.
- On `black` grounds the badge's outer ring merges into the background; use `ms-lockup-on-dark.svg` or the mark there, or set the badge on a `bone` panel.
- **Clear space:** the width of the S on every side. **Minimum size:** badge 120px or 30mm; mark 24px or 8mm.
- **Don't:** recolor it, place it on `signal-red`, add shadows or outlines, stretch it, rotate the ring text, or set "MS" without its stripe.

## Color

- Three colors carry the brand: `bone` (the ground), `black` (the ink), `signal-red` (the accent). `warm-gray` and `dove` are supporting neutrals only.
- Aim for about 60% `surface`, 30% `ink`, and 10% `signal-red`. Red is a signal: one button, one stripe, one number per view, or a full red Car of the Week post.
- Use semantic tokens in builds: `surface`, `surface-raised`, `surface-sunken`, `ink`, `ink-muted`, `accent-text`, `line`, `line-strong`.
- Red text: `signal-red` only at 24px+ or bold 19px+. Smaller red text, like kickers and links, uses `accent-text`, which shifts per theme to stay readable.
- `on-red` (white) is the only text on red fills.
- **Themes:** Day (`bone` ground) is the default. Night (`black` ground) is for members-only content, evening events and dark photography. Set `data-theme="night"` on any container to switch.

## Typography

- **Saira Expanded** (`--font-display`) for everything that shouts: `display-xl`, `display-l`, `headline`, `title`, `kicker`. Always uppercase. Weights 700 to 900.
- **Saira** (`--font-text`) for reading: `body-l`, `body`, `data`, `caption`. Sentence case except `data`.
- Headlines sit tight: line height 0.95 on `display-xl` and `display-l`. Break titles by hand into 2–3 short lines rather than letting them wrap.
- `data` uses tabular figures for times, distances and counts.
- No italics. Speed comes from width and weight, not slant.

## The club stripe

- Two flat bands, `stripe-1` (red) over `stripe-2` (black; bone on dark grounds), each `stripe-weight` tall with `stripe-gap` between them. Component: `StripeRule`.
- It's the brand's main graphic. Run it edge to edge across posts, banners, section dividers and the website hero, usually about a third of the way down.
- Never angle it, curve it, round its ends, add a third color, or turn it into a gradient.

## Layout, shape and depth

- Spacing runs on a 4px base: `space-1` to `space-16`.
- Corners: `radius-0` for stripes and banners, `radius-sm` for buttons, `radius-md` for cards, posts and the race plate, `radius-round` only for the badge and avatars.
- Borders, not shadows. Cards use a 1px `line` border; race plates use a 3px `line-strong` border. No drop shadows, glows or gradients anywhere.
- **Focus:** a 2px solid `focus-ring` outline at 2px offset on every link and button.
- **Motion:** minimal. Fades and slides at 150–200ms, ease-out. Nothing bounces.

## Instagram

- 1080 × 1080 posts. Keep 64px of safe margin (`space-16`), and scale the stripe bands to 14px with a 7px gap.
- Three templates (`SocialPost`): **event** (bone), **members** (black) and **car** (red, Car of the Week). Alternate them so the grid reads bone / black / red.
- Put the striped MS mark in the top-right corner of event and members posts. The avatar is `ms-mark.svg`.
- Text-only cards go first in a carousel; photos follow on their own slides with no type over them.

## Website

- Header: `NavBar` (mark + wordmark, up to five links, one red CTA).
- Hero: `display-xl` headline on `surface`, with the club stripe bleeding edge to edge and the badge at the right.
- Events list: `EventCard` grid, with members-only events in `tone="dark"`.
- Section rhythm: `space-12` padding, a `StripeRule` between major sections.

## On the car and merch

- **Windshield banner** (`ms-windshield-banner.svg`): black band, the striped MS mark, "MACH SCHNELL" in `bone` and `signal-red`, and the club stripe in red over bone. Made for a 36 × 4 in banner; keep the artwork centered and the band full width.
- **Stickers:** the ring badge (`ms-badge.svg`) as a round die-cut, the mark (`ms-mark.svg`) as a small round, and the bumper sticker (`ms-bumper-sticker.svg`): white with a black border, black and red wordmark, and the club stripe.
- Print and cut only from the outlined SVGs in Assets; never rebuild the lettering in another font.
- Merch takes the same pieces: the badge on the chest or a hat front, the club stripe as a band, no new graphics.

## Imagery

- Real club cars, shot low and side-on, in natural light. Warm grade that leans toward `bone`; no heavy filters.
- Type never sits over a busy photo. Use a solid `surface` panel or a separate slide.
- No stock photos and no AI-generated cars.

## Iconography

- There's no icon set yet. The brand speaks through type, the stripe, numbers and the badge.
- If an interface needs icons, use simple 2px-stroke outline icons, square caps, colored `ink`, at 20px or 24px.
