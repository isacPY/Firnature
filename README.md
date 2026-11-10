# ATELIER° — Haute Architecture & Editorial Living

An editorial, animation-driven furniture store website engineered as a reusable, high-conversion pitch vehicle for furniture showroom owners and luxury interior ateliers.

Built with **React**, **Vite**, **Tailwind CSS v4**, **GSAP (ScrollTrigger)**, **Lenis Smooth Scroll**, and **Lucide Icons**.

---

## ⚡ 5-Minute Rebranding Guide

This platform is engineered so that you can screen-share a live pitch to a furniture shop owner, or swap in their brand identity in under 5 minutes:

### Step 1: Change the Brand Name & Contact Info
Open [`src/config/brand.js`](src/config/brand.js):
```javascript
export const BRAND_CONFIG = {
  name: "YOUR_BRAND",
  wordmark: "YOUR_BRAND°",
  collectionYear: "COLLECTION 2026",
  tagline: "ARCHITECTURAL PROPORTION. TIMELESS LIVING.",
  
  showroom: {
    title: "FLAGSHIP SHOWROOM",
    address: "123 Design District Boulevard",
    city: "Milan / London / New York",
    phone: "+1 (555) 019-2834",
    email: "concierge@yourbrand.com",
    // ...
  },
  
  whatsapp: {
    phoneNumber: "15550192834", // International format without '+'
  }
};
```

### Step 2: Swap the Color Palette
Open [`src/styles/tokens.css`](src/styles/tokens.css) and customize the 2 primary color variables:
```css
:root {
  /* For an artisanal wood atelier: Terracotta & Sand */
  --cream: #EAE6DF;
  --red: #C85A32;
  --ink: #191816;
  --grey: #8C867F;
  --white: #FFFFFF;
}
```

### Step 3: Swap Product Photography & Archetypes
In [`src/config/brand.js`](src/config/brand.js), update the `PRODUCTS` array with the client's high-resolution studio imagery, materials, and dimensions. Photos are **local WebP only** — every photo ships in three files with the same aspect ratio and crop (`<name>-600.webp`, `<name>-900.webp`, `<name>-1200.webp`, quality ~75), and the `-1200.webp` path is what goes in `brand.js`; `getLocalSrcset()` builds the responsive `srcset` from it. A remote URL gets no `srcset`, so don't use one. Match the photo to its category (a chair photo for a chair), and keep the displayed size and symmetry — fix file size, never the look. Full contract: [`DESIGN.md`](DESIGN.md#8-photo-contract--how-to-swap-a-photo).
```javascript
{
  id: "prod-1",
  name: "Sculptural Lounge Chair",
  category: "chairs",
  materials: "Brushed Mohair, Smoked Oak",
  dimensions: "W 90 × D 85 × H 72 cm",
  isAccentRed: true,
  image: "/images/products/sculptural-lounge-chair-1200.webp",
}
```
> [!NOTE]
> **Strict Zero-Price Rule**: No numeric prices or currency symbols are displayed anywhere in the application. Inquiries, quantities, and specifications are dispatched directly to WhatsApp for private concierge consultation.

---

## 🏛️ Architectural Highlights & Features

- **Session-Persisted Lookbook Preloader:** Cinematic 0-100 counter and frame expansion reveal (persisted in `sessionStorage` so returning visitors skip directly to the hero).
- **Staggered Masked Hero:** Words slide behind overflow clipping masks paired with left-to-right clip-path photo wipes.
- **Manifesto Word-Rise Reveal:** Statement words rise 26px and fade in, staggered 0.025s, triggered once at 85% of the viewport (plain fully-visible text for `prefers-reduced-motion`).
- **Pinned Dual-Layer Category Index:** Centered taxonomy rows pass through a central red band with synchronized dual-layer cream text inversion and live cross-fading thumbnails.
- **Interactive Room Showcase:** 16:10 lifestyle setting (4:3 on mobile) featuring parallax with an 8% image overscan, blur-to-sharp depth resolution, and keyboard-accessible pulsing hotspots.
- **WhatsApp Concierge Ordering:** Instant showroom consultation URL generation that automatically formats every item in the user's bag into an inquiry message.
- **Full-Screen Live Search:** Fluid serif search overlay filtering by product name, archetype, materials, and specifications in real-time.
- **Local Persistence:** Wishlist and Curated Bag states persist automatically via `localStorage`.
- **Magnetic Desktop Cursor:** Subtle red dot pointer with lerp smoothing and interactive element expansion (gracefully disabled on touch viewports and `prefers-reduced-motion`).

---

## 🛠️ Development & Production

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile optimized production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📱 Responsive Breakpoints

- **Desktop ($\ge 1024\text{px}$):** 12-column grid, 4-column product grid, flanking category thumbnails, magnetic pointer.
- **Tablet ($640\text{px} - 1023\text{px}$):** 8-column grid, 2-column cards, full-width hero imagery, category thumbnails gracefully stacked.
- **Mobile ($< 640\text{px}$):** 4-column grid, full-bleed red menu overlay, 1-2 column cards, touch targets $\ge 44\text{px}$, cursor disabled.
