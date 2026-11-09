# Furniture Store Website: Full Project Brief (Design + UX + Animation)

> **How to use:** put this file in the project root and tell the agent:
> "Read FURNITURE_SITE_BRIEF.md fully and build the whole project from it. Make sensible decisions yourself instead of asking me questions."

---

## 1. Project overview

**What it is:** a premium, animation-driven website for a furniture store. It is built as a **reusable pitch template**: the design, motion and structure stay the same, and only the brand name, colors, images and products change per shop.

**Why it exists:** to pitch to furniture shop owners. The goal is that an owner opens it and thinks "this looks like a big international brand, and I want that for my shop."

**Who it's for:**
- **Client (shop owner):** wants a website that makes the shop look high-end and brings in showroom visits and WhatsApp/phone orders.
- **End visitor (shopper):** is browsing for sofas, chairs, tables and so on, usually on a phone, and wants to see products clearly and contact the shop quickly.

**Main goals**
1. Look unmistakably premium. Motion and typography do the heavy lifting.
2. Make browsing products effortless.
3. Turn interest into action (save, inquire, visit showroom).
4. Be easy to rebrand in minutes for each new shop.

**What this version is:** a front-end only website (no real backend). Products, cart and saved items are front-end demo state. Real checkout/CMS comes later if a shop buys it.

**Brand placeholders:** the brand name is a variable `[BRAND]`. All copy, product names and images are placeholders. **No prices are shown anywhere.**

---

## 2. Pitch scenario (how this will be used)

1. I send or screen-share the demo to a furniture shop owner.
2. They scroll once. The preloader, hero reveal, pinned category list and room hotspots are the "wow" moments.
3. I swap in **their** brand name, colors, logo and a few of their real product photos in minutes, to show it as theirs.
4. I explain what they get: the full site, product pages/catalogue, WhatsApp ordering, showroom info, mobile-perfect.

So: **every visual decision must be easy to swap** (CSS variables, one config file), and **the first 10 seconds must impress**.

---

## 3. Design concept

**One sentence:** an editorial furniture magazine that you can scroll. Calm, confident, a lot of space, one bold color, and motion that feels like pages turning.

**Keywords:** timeless, considered, warm, editorial, confident, quiet luxury.

**Principles**
- **One loud color.** A vivid red against cream. Red appears as big blocks and the headline, never as scattered decoration.
- **Type is the hero.** A giant condensed headline plus an elegant serif. Photos are supporting actors on clean studio backdrops.
- **Space before decoration.** No shadows, gradients or heavy borders. Only hairlines.
- **Motion has meaning.** Every animation either reveals content, guides attention or signals state. No animation for its own sake.
- **Product first.** Furniture photos are large, clean and uncluttered.

**Don'ts:** no stock-template look, no rounded cartoon buttons, no more than the 3 brand colors, no drop shadows, no auto-playing sound, no prices.

---

## 4. Design system

### Colors (CSS variables in `tokens.css`)
| Token | Value | Use |
|---|---|---|
| `--cream` | `#EEEADC` | page background |
| `--red` | `#E10A1D` | headline, big blocks, accents, active states |
| `--ink` | `#141414` | body text |
| `--grey` | `#8A8680` | secondary text only (derived from ink at 55% opacity is also fine) |
| `--white` | `#FFFFFF` | hotspot pills, small UI on photos |

Rebranding = change `--red` and `--cream` (e.g. terracotta + sand for a wood shop).

### Typography
- **Display:** Bebas Neue (or Anton). Uppercase, tracking about -0.01em, line-height 0.85. Hero headline `clamp(5rem, 16vw, 16rem)`. Micro-labels 11 to 12px, uppercase, red, letter-spacing 0.06em.
- **Serif:** Newsreader or Instrument Serif. Statement text `clamp(1.75rem, 3.6vw, 3.5rem)`, headings `clamp(2rem, 4vw, 4rem)`, list rows `clamp(1.5rem, 2.6vw, 2.6rem)`, body 16 to 18px.
- Italic + underline is used sparingly for emphasis inside the statement.

### Spacing and grid
- 12-column grid on desktop, 8 on tablet, 4 on mobile. Max content width 1440px, side padding 32px (desktop), 20px (mobile).
- Section vertical padding: 120px desktop, 72px mobile.

### Breakpoints
Desktop >= 1024px, Tablet 640 to 1023px, Mobile < 640px.

### Components
- **Link style:** bracketed `[ EXPLORE COLLECTION ]`, uppercase display font, red.
- **Pills (filters, "Add to bag", hotspots):** 1px outline, fully rounded, small text. Filled red when active.
- **Hairlines:** 1px red lines under the nav and between footer rows.
- **Cards:** no border, no shadow. A tall photo on a soft grey backdrop, with the name below.
- **Icons:** thin line icons only (heart, bag, search, arrow, WhatsApp).

### Imagery / art direction
- Studio shots on soft neutral grey/cream backdrops for products.
- Warm, natural-light interior photos for rooms.
- Red furniture pieces (armchair, sofa, chair) repeat across the page to echo the brand red. Use them in the preloader, hero and category thumbnails if the shop has any.
- All images: consistent aspect ratios (products 3:4, room 16:9), lazy-loaded below the fold.

---

## 5. UX scenario: the visitor's journey

Describe the experience as it should feel, scroll position by scroll position.

1. **Arrive.** A calm cream screen with one red armchair photo. A counter ticks up. It feels like opening a lookbook.
2. **Reveal.** The photo opens up and the giant headline slides in, with product thumbnails wiping into place around it. The visitor instantly knows: furniture, premium, confident.
3. **Read the promise.** Scrolling, a red wall rises up and a short brand statement fades in word by word. This is the brand's "why".
4. **Pick a category.** The page pins and a big list of categories scrolls through a red band. Pictures on the sides change with each category. It feels like flipping through a catalogue.
5. **Browse products.** A grid of clean product cards appears (photos wipe in). The visitor can filter by category, save items with a heart and add to bag.
6. **See it in a room.** A large lifestyle photo with hotspots lets them tap any piece to see what it is.
7. **Get in touch.** A clear showroom/WhatsApp call to action. A calm newsletter footer closes the page with the giant brand wordmark.

### Key user flows (all front-end demo)
- **Browse by category:** clicking a row in the category list (or a filter pill) filters the product grid and scrolls to it.
- **Save an item:** the heart toggles. The "Saved (n)" counter in the nav updates with a small bump animation.
- **Add to bag:** "Add to bag" increments "Bag (n)" and opens a slim side drawer listing the items (no prices, no checkout). The drawer has a primary button "Order on WhatsApp" that opens WhatsApp with a pre-filled message listing the items.
- **Inquire quickly:** a sticky WhatsApp button (bottom-right on mobile and desktop) is always available.
- **Search:** clicking Search opens a full-screen cream overlay with a big serif input that filters products live.

---

## 6. Page structure (top to bottom)

1. **Nav:** `[BRAND]°` wordmark left. Four centered links (Catalogue, Rooms, About, Materials). Right side: Search, Saved (0), Bag (0). Thin red line underneath. On scroll the nav stays minimal. On mobile it collapses to wordmark + menu button opening a full-screen red menu.

2. **Hero:** a giant two-line red headline (second line indented right). Around it float small product thumbnails with micro-captions: top-right a "Collection 2026" caption with a small red armchair thumbnail, and left-middle a dining-chair thumbnail with a name + dimensions caption (no price). An `[ EXPLORE COLLECTION ]` link, a short red tagline bottom-left, a wide hero photo bottom-right, and a "New arrivals" pair of images.
   - Tablet: headline stacks, the main photo goes full width, new arrivals below.
   - Mobile: headline stacked, single column, 2-up image grid.

3. **Statement:** a full-bleed red block with a centered cream serif paragraph (4 to 5 lines). Two small rounded inline images sit inside the sentence. One phrase is italic + underlined.

4. **Category index:** above the list, a tiny red section label on the left ("02 — CATALOGUE" style) and a short 2-line grey paragraph on the right. The list is centered serif rows (Sofas, Chairs, Tables, Storage, Beds, Lighting, Mirrors) with superscript counts. A full-width red band crosses the middle and the active row sits in it. Thumbnails sit at the far left and far right of the band.
   - Mobile: same pinned behavior, smaller type, thumbnails shrink and sit above/below the band.

5. **Product grid:** serif heading with a short 2-line intro beside it, filter pills, and a "View all products" link at the right end of the filter row. 4 cards across (2 tablet, 1 to 2 mobile). Each card: tall photo, heart icon, name, small meta line, "Add to bag" pill. **No prices.**

6. **Room showcase:** serif heading and one large lifestyle room photo with 3 white pill hotspots. Hover/tap reveals the item name (and a "View in catalogue" link).

7. **Visit / contact (addition):** a calm cream section with the showroom address, opening hours, phone, WhatsApp button and an embedded map placeholder. This is what actually brings customers in, so don't skip it.

8. **Footer:** red panel with a newsletter headline ("Four emails a year, and none of them are sales" style), an email field and a "Subscribe" button. Below are 3 to 4 link columns, a thin legal row (copyright, privacy, terms) and the giant wide-tracked serif `[BRAND]` wordmark across the full width at the very bottom.

---

## 7. Animation spec

Easing: `power3.out` / `expo.out`. Durations 0.8 to 1.4s. Lenis smooth scroll synced with ScrollTrigger. All timelines live in `src/animations/`.

### A. Preloader (about 3s, plays once per session)
- Cream screen, one small red-furniture photo in a thin frame, centered. `[BRAND]` label under the left edge, a 0 to 100 counter under the right edge.
- Photo slowly scales 1 to 1.04 while loading.
- At 100%, the frame expands (clip-path/scale) to reveal the hero and the loader fades out. Scrolling is locked until it finishes.
- Skip it if the page was already loaded in this session.

### B. Hero entrance (staggered about 0.08s)
- Headline words slide in from the left behind an overflow mask (translateX -100% to 0, slight skew easing).
- Every thumbnail/photo reveals with a clip-path wipe left to right: `inset(0 100% 0 0)` to `inset(0)`. The large photo: a bar grows first, then it opens.
- Captions, tagline and nav fade up about 12px, last.

### C. Statement (scroll-scrubbed)
- The red block slides up over the hero.
- The sentence is split into words. As you scroll through the section each word goes from 15% to 100% opacity in sequence.
- Inline images scale 0.6 to 1 with a slight rotate as their words land.

### D. Category index (pinned + scrubbed)
- Pin the section. Scroll progress moves the list upward so each row passes through the fixed red band in turn.
- A row's distance from the band drives opacity (1 to 0.15), blur (0 to 3px) and scale.
- The row in the band turns cream.
- Left/right thumbnails cross-fade (with a small y-slide) to match the active row.
- Unpin after the last row.

### E. Product reveal
- Heading split into words, each rising from yPercent 110 inside a mask, staggered.
- Cards start as grey placeholder blocks with a thin loading line. Then photos wipe in left to right with a 0.12s stagger per card.
- Filtering: cards exit with a quick fade/scale, then the new set re-enters with the same wipe.

### F. Room showcase
- Heading reveals like E.
- The big photo starts blurred (12px) and scaled 1.15, then settles sharp at 1.0 with light parallax (moves about 8% slower than scroll).
- Hotspot dots pulse (scale 1 to 1.8, fade out, loop every 2s).

### G. Footer
- The red panel rises with parallax.
- Headline and form fade up.
- The giant wordmark's letters rise one by one from a mask (yPercent 100 to 0, 0.06s stagger) when it enters the viewport.

### H. Micro-interactions
- Nav links: underline wipes in from the left on hover.
- Bracket links: brackets spread apart on hover.
- Card hover: image scales to 1.05, "Add to bag" pill slides up, heart fills red.
- Counter bump: Saved/Bag counters scale up briefly when they change.
- Drawers/overlays (bag, search, mobile menu): slide/fade in over 0.5s with a staggered content reveal.
- Desktop cursor: a small red dot that grows over images. Disabled on touch devices.

### Motion rules
- Animate only `transform`, `opacity`, `clip-path` and `filter`.
- Clean up all ScrollTriggers on unmount.
- `prefers-reduced-motion`: skip the preloader, show final states, disable parallax, pinning and cursor effects.

---

## 8. Real-world essentials (additions beyond the reference)

These weren't in the reference videos, but a real furniture shop needs them. Build them, matching the same design language.

- **WhatsApp ordering:** sticky WhatsApp button + "Order on WhatsApp" in the bag drawer with a pre-filled message. The phone number comes from `config/brand.js`.
- **Visit/contact section:** address, hours, phone, map placeholder.
- **Bag drawer, Saved drawer, Search overlay, Mobile menu:** front-end only.
- **SEO:** proper `<title>`, meta description, Open Graph tags, semantic headings (one `h1`), alt text on every image, `LocalBusiness` / `FurnitureStore` JSON-LD schema with the config values.
- **Accessibility:** keyboard navigable, visible focus states, ARIA labels on icon buttons, color contrast checked (cream text on red must pass AA at the used sizes), hotspots reachable by keyboard.
- **Performance:** target Lighthouse 90+ on mobile. WebP/AVIF images, explicit width/height to avoid layout shift, lazy-load below the fold, preload the two fonts.
- **404 / error state** in the same style.
- **Favicon + social share image** using the brand mark.
- **Optional (flag, default off):** Urdu/RTL support, and a `SHOW_DEVICE_ENDCARD` flag. The end-card zooms the page out into a laptop mockup with a toast "Perfectly responsive on any desktop screen", useful only for a pitch video.

---

## 9. Tech stack (decided)

- Vite + React + Tailwind CSS
- GSAP (ScrollTrigger + SplitText), Lenis
- No backend. Demo data in `config/brand.js`.

### Project structure
```
src/
  config/brand.js          # brand name, tagline, nav links, categories, products, WhatsApp number, address, hours
  styles/tokens.css        # color, font, spacing variables
  animations/              # ALL GSAP code
    index.js  preloader.js  hero.js  statement.js  categoryIndex.js
    productReveal.js  room.js  footer.js  micro.js  drawers.js
  components/
    Nav.jsx  MobileMenu.jsx  Preloader.jsx  Hero.jsx  Statement.jsx
    CategoryIndex.jsx  ProductGrid.jsx  ProductCard.jsx  RoomShowcase.jsx
    VisitSection.jsx  Footer.jsx  Cursor.jsx
    BagDrawer.jsx  SavedDrawer.jsx  SearchOverlay.jsx  WhatsAppButton.jsx
  state/store.js           # saved items + bag (simple context or zustand)
  App.jsx
public/images/             # placeholder photos
README.md                  # how to rebrand for a new shop
```

---

## 10. Build order for the agent

1. Scaffold, install dependencies, set up `tokens.css`, fonts and `brand.js`.
2. Build static, responsive layouts for all sections (no animation).
3. Add state (saved/bag), drawers, search overlay, mobile menu.
4. Add Lenis + ScrollTrigger setup.
5. Add animations in order: A, B, C, D, E, F, G, H.
6. Add SEO, accessibility and performance work (section 8).
7. Test at 1440, 1024, 768, 390 widths. Fix layout shifts and scroll jank.
8. Write the README.

## 11. Definition of done

- [ ] All sections match the layout and design system above on desktop, tablet and mobile.
- [ ] Preloader, hero reveal, statement scrub, pinned category index, product reveal, room photo, footer wordmark all work smoothly (no jank, no layout jumps).
- [ ] Filters, saved, bag drawer, search overlay and WhatsApp link all work.
- [ ] No prices anywhere.
- [ ] Changing `--red`, `--cream`, brand name and images in config/tokens rebrands the whole site.
- [ ] Works with `prefers-reduced-motion`.
- [ ] Lighthouse mobile 90+, no console errors.
- [ ] README explains rebranding step by step.

## 12. Rules for the agent

- Make sensible decisions yourself. Do not stop to ask questions.
- Never show prices.
- All text, images, colors and contact info must be replaceable from `config/brand.js` and `tokens.css`.
- Keep animation code out of components where possible.
- Do not use the reference site's photos, copy or brand name. Use original placeholders.

---

## 13. Notes: what's from the reference vs. inferred

- **Taken directly from the reference (screenshot + videos):** palette, type style, section order, hero layout, red statement block, pinned category list with red band, product grid, room photo with pills, red footer with giant wordmark, preloader, hero reveal, word-by-word text reveal, placeholder-to-image card reveal, letter-by-letter wordmark rise, the laptop end-card.
- **Inferred or added by me** (tune by feel): exact durations/easings, all hover states, hotspot pulse, blur/scale values on the category list, parallax amounts, and everything in section 8 (WhatsApp, visit section, drawers, SEO, etc.).
- The exact fonts couldn't be identified from the footage. Bebas Neue and Newsreader are close matches.
