# ATELIER° — Design System

The design reference for the Firnature template. Read this before changing
the look, swapping photos, or rebranding the site for a buyer. Everything
here is verified against the code in this repo — if the code and this file
disagree, the code wins and this file needs updating.

## 1. Brand

- **Name:** ATELIER° — "Haute Architecture & Editorial Living", Collection 2026.
- **Register:** editorial / museum / lookbook. The site persuades through
  craft and restraint, not hard-sell copy. Cream ground, serif headlines,
  one signal red.
- **Voice:** quiet, confident, precise. No exclamation marks, no discount
  language, no prices (see §7).

## 2. Colour — five tokens, nothing else

`src/styles/tokens.css` is the single source. Do not introduce new colours
in components; use these five.

| Token | Hex | Role |
| --- | --- | --- |
| `--cream` | `#EEEADC` | Page ground |
| `--red` | `#C80818` | Signal / accent (wordmark details, active states, CTAs) |
| `--ink` | `#141414` | Text, rules, dark surfaces |
| `--grey` | `#68645E` | Secondary text, captions |
| `--white` | `#FFFFFF` | Light surfaces, card ground |

Contrast at full opacity (all WCAG AA): ink-on-cream 15.30, grey-on-cream
4.88, red-on-cream 4.98, cream-on-red 4.98, white-on-red 5.99.

**Known lab artifact, not a defect:** catalogue cards enter at opacity 0.4
(see §6). A contrast tool that never scrolls measures the text at 40% and
flags the catalogue rows. At full opacity every pair passes. Do not "fix"
this by removing the entrance reveal.

## 3. Typography

Self-hosted WOFF2 in `public/fonts/` — no webfont requests.

- **Display:** Bebas Neue (`--font-display`), all-caps, for the wordmark,
  section numerals, and the hero headline.
- **Serif:** Newsreader (`--font-serif`, 300–600 + italic), for editorial
  headlines, the manifesto, and body copy.
- **Sans:** system-ui stack (`--font-sans`), only for small UI labels,
  buttons, and form text.

## 4. Layout

- Max width `1440px`; side padding `32px` desktop / `20px` mobile;
  section padding `120px` desktop / `72px` mobile (`--max-width`,
  `--side-pad-*`, `--section-pad-*` in `tokens.css`).
- Breakpoints: desktop ≥1024px (12-col grid, 4-col product grid),
  tablet 640–1023px (8-col, 2-col cards), mobile <640px (4-col, 1–2 col
  cards, touch targets ≥44px, magnetic cursor off).
- Motion easing everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`
  (`--ease-editorial`).
- A subtle paper-grain overlay (`.editorial-grain` in `App.jsx`) removes
  digital flatness. Keep it; it is part of the look.

## 5. Page structure (in order)

1. **Preloader** — "Loading lookbook" 0–100 counter + frame expansion.
   Skipped on return visits (`sessionStorage`).
2. **Hero** — masked headline + clip-wipe photos (see §6).
3. **Manifesto / Statement** — the editorial statement, word-rise reveal.
4. **Category Index** — pinned scroll. Lists All, Exclusive Collection,
   and the seven categories (Chairs, Sofas, Tables, Storage, Lighting,
   Beds, Mirrors). Dual-layer rows pass a central red band; the active
   category photo sits behind the rows at 14% opacity with a giant ghost
   numeral.
5. **Catalogue** — the product grid (12 pieces). Filter pills incl.
   Exclusive. Cards carry finish swatches and a SCALE human-proportion
   overlay.
6. **Spatial / RoomShowcase** — one lifestyle room, 16:10 (4:3 on mobile),
   parallax image, pulsing hotspots that name the piece in the room.
7. **Archetypes / EthosShowcase** — material and palette stories.
8. **Visit** — showroom details, hours, map.
9. **Footer** — giant wordmark, contact, showroom.

Overlays (lazy-loaded, not in the first paint): Bag drawer, Saved drawer,
full-screen Search, Private Viewing booking modal, Trade Tear Sheet modal,
and — only with `?pitch=1` — Pitch Controls and the DeviceEndCard pitch
dialog (see §9).

## 6. Motion

Lenis smooth scroll + GSAP ScrollTrigger (`src/animations/`). Every
animation respects `prefers-reduced-motion` (`isReducedMotion()`):
reduced-motion users get plain, fully visible content.

- **Hero:** headline words slide in from x −105% with a −8° skew; photos
  wipe in with a left-to-right `clip-path` reveal.
- **Manifesto:** words rise 26px and fade in, staggered 0.025s, triggered
  once when the statement reaches 85% of the viewport.
- **Category Index:** pinned scrub; rows, thumbnails, the "0X OF 08"
  counter, backdrop photo, and ghost numeral stay in sync.
- **Catalogue cards:** enter at `y: 24, opacity: 0.4` and settle to full
  opacity as they scroll into view (`productReveal.js`). This is the
  entrance reveal — see the contrast note in §2.
- **Room:** parallax image (settles at scale 1.08, ~8% overscan).
- **Preloader:** counter + frame expansion; never blocks the page for
  returning visitors.

## 7. Content rules

- **Strict zero-price rule.** No numeric prices or currency symbols
  anywhere in the app — not on cards, not in tooltips, not in the bag.
  Inquiries go to WhatsApp (`buildWhatsAppUrl()` in `brand.js`), which
  formats the bag as a private concierge message. The bag records the
  finish the shopper actually selected, so the WhatsApp message names
  the right finish.
- **12 products, 7 categories + All + Exclusive.** Three pieces are
  flagged `exclusive: true` (L'Arc Lounge Chair, Monolith Travertine
  Table, Totem Floor Lamp) and get the red "Limited" Index row, the
  filter pill, and card badges.
- **Local images only.** Every photo is a local WebP (see §8). There are
  no remote image URLs in the codebase; a remote URL gets no `srcset`
  (`getLocalSrcset()` returns null for it).
- **Fallbacks:** if a photo fails to load, the image swaps to a
  category SVG blueprint (`src/utils/placeholders.js`) instead of
  breaking the layout.

## 8. Photo contract — how to swap a photo

Every photo ships in **three files, same aspect ratio, same crop** — only
the file changes, never the displayed size:

```
<name>-600.webp   <name>-900.webp   <name>-1200.webp
```

- **Format:** WebP, quality ~75. Keep the download small; do **not** make
  the displayed image smaller and do **not** change its symmetry or
  aspect — fix file size, never the look.
- **Match the category:** a chair photo for a chair, a table photo for a
  table. A mismatched photo (e.g. a desk lamp standing in for a floor
  lamp) reads as a mistake, not a placeholder.
- **Wire it in:** put the `-1200.webp` path in `brand.js` (product
  `image`, category `image`, or hero). `getLocalSrcset()` builds the
  600/900/1200 `srcset` from it automatically, and the browser picks the
  smallest file that stays sharp for the placement.
- **Hero and room photos** follow the same rule, pre-cropped to their
  placement (hero wide, room 1600×1000 band).

## 9. Rebranding for a buyer

Everything a buyer changes lives in two files:

- **`src/config/brand.js`** — `BRAND_CONFIG` (name, wordmark, tagline,
  showroom address/phone/email/hours, WhatsApp number), `PRODUCTS`
  (name, category, materials, dimensions, swatches, image),
  `CATEGORIES`, and the showroom/consultation lists. This is the single
  source of brand truth; components read from it, they do not hard-code
  brand strings.
- **`src/styles/tokens.css`** — the five colours (§2). A recolour is a
  token change, not a component hunt.

**Pitch mode:** append `?pitch=1` to the URL while presenting. It shows
Pitch Controls (bottom-left: 5 themes — Atelier Carmine, Nordic Wood,
Forest Monolith, Milano Navy, Graphite Atelier — plus a custom hex picker
and live brand rename) and a footer "Confidential Pitch Monograph" button
that opens the pitch dialog with Desktop / Tablet / Mobile previews.
The plain URL (no `?pitch=1`) shows none of this — that is the link a
client browses alone.

**After a deal closes** (not before): the buyer's real photos, real
contact details, prices or a price-on-application path, a lead-capture
backend, Terms/Privacy pages, and a custom domain. The demo is the pitch;
the above is the delivery.

## 10. Deliberate trade-offs

- **Accessibility 95, not 100.** The only failing audit is the contrast
  lab artifact in §2. Leave it.
- **Performance ~90, LCP ~3.3s** (mobile PageSpeed). Structural: the
  catalogue moved earlier in the page and the preloader/hero gate the
  largest paint. Accepted for the sale; a proper LCP pass is post-deal
  work, not a pre-sale fix.
- **Hero has no primary CTA.** The hero is a pure statement; the
  always-visible booking action is the red "Book a Viewing" pill in the
  nav (patch 14), which opens the private-viewing modal on every screen.
- **No analytics.** Nothing is tracked. Add it after a deal, with the
  buyer's consent.
- **Error handling:** an error boundary wraps the whole app, so a render
  crash shows a styled fallback page with a reload button instead of a
  blank screen. The pitch dialog closes via X, Escape, and backdrop
  click.

## 11. File map & verification

```
src/config/brand.js        brand, products, categories, showroom, WhatsApp
src/config/ethosData.js    archetype / ethos content
src/state/store.jsx        bag, saved, drawers, pitch dialog state
src/styles/                tokens.css, index.css, luxuryAdditions.css
src/components/            23 components (see §5)
src/animations/            Lenis + GSAP: hero, statement, categoryIndex,
                           productReveal, room, ethosShowcase, preloader…
src/utils/placeholders.js  srcset builder + SVG fallbacks
scripts/verify-pitch.mjs   `npm test` — 31 policy checks (zero-price,
                           WhatsApp, offline assets, pitch gating)
```

Verify before calling a change good: `npm test` (31/31), `npm run build`,
then a render check in a real browser. Build and tests alone do not catch
render crashes — they never execute the components.

## 12. Patch 14 — design-inspiration build (2026-11-12)

Seven ideas taken from the 9 design-inspiration galleries
(OnePageLove, Fonts In Use, Httpster, Minimal.gallery, Dark Mode Design,
Land-book, Hoverstat, Landing.love, SiteInspire), all built from existing
assets and tokens — no new photos, no prices, no new colours:

1. **Muuto hero** (Hero.jsx): the hero photo is full-bleed; one piece
   (Monolith) with huge cream condensed type over it, a designer credit
   ("Travertine Table — by Atelier"), and the category index as a
   clickable vertical stack on the photo's right edge (desktop only).
2. **Horizontal room showcase** (RoomShowcase.jsx): the room section is a
   snap-scrolling horizontal strip — the full room, then one large panel
   per piece in it (L'Arc, Monolith, Totem) — with a 0X / 04 counter and
   prev/next arrows. Native swipe on mobile.
3. **Swatch recolour** (ProductCard.jsx): tapping a finish already swapped
   the card photo to that finish's image; patch 14 adds a fade-in so the
   change reads as a recolour, not a hard cut.
4. **Book a Viewing pill** (Nav.jsx): a red pill in the header (desktop /
   tablet) that opens the private-viewing modal. Hidden on mobile, where
   the menu already has Private Viewing.
5. **Dark ink booking section** (VisitSection.jsx): the visit/showroom
   block is now bg-ink with cream text and the headline's "in Person" in
   serif italic, so the booking moment contrasts with the cream catalogue.
6. **Benefit strip** (Hero.jsx): three promises under the hero —
   "Private viewing — by appointment", "White-glove delivery",
   "Limited runs of 24".
7. **Hotspot view swap** (RoomShowcase.jsx): tapping a room hotspot scrolls
   the strip to that piece's panel (the old tooltip card is gone — the
   piece panel carries the same details + View in Catalogue). Hovering a
   hotspot shows the piece name.

Verified: tests 31/31, build passes, desktop 1440px + mobile 390px render
checks all pass (hero overlay, index, rooms strip, hotspot scroll, swatch
swap, dark visit, no overflow, zero errors).
