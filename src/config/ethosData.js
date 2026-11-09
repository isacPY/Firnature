/**
 * Furniture & Lighting Showcase Pillars Data
 * Directly mapped to the showroom catalog categories and signature pieces:
 * - Chairs & Armchairs
 * - Sofas & Lounging
 * - Monolithic Tables
 * - Architectural Storage
 * - Monumental Lighting
 * - Beds & Daybeds
 * - Sculptural Mirrors
 */

export const ETHOS_PILLARS = [
  {
    id: 'chairs',
    categoryId: 'chairs',
    title: 'Chairs & Armchairs',
    shortLabel: 'Chairs',
    iconName: 'Armchair',
    cardTitle: "L'ARC LOUNGE CHAIR",
    cardSubtitle: 'Carmine Wool Bouclé • Matte Steel',
    cardDimensions: 'W 92 × D 88 × H 74 cm',
    cardDescription: 'An iconic monolithic silhouette enveloping the sitter in heavy wool bouclé, grounded by concealed steel framing.',
    badgeLabel: 'Chairs',
    image: '/images/products/photo-1586023492125-27b2c045efd7-1200.webp',
    pieceCount: '03 Pieces'
  },
  {
    id: 'sofas',
    categoryId: 'sofas',
    title: 'Modular Sofas',
    shortLabel: 'Sofas',
    iconName: 'Sofa',
    cardTitle: 'PALAZZO MODULAR SOFA',
    cardSubtitle: 'Belgian Sand Linen • Down Plinth',
    cardDimensions: 'W 340 × D 160 × H 68 cm',
    cardDescription: 'Low-slung modular seating system configured with deep rectilinear cushions and solid walnut plinth base.',
    badgeLabel: 'Sofas',
    image: '/images/products/photo-1555041469-a586c61ea9bc-1200.webp',
    pieceCount: '02 Pieces'
  },
  {
    id: 'tables',
    categoryId: 'tables',
    title: 'Monolithic Tables',
    shortLabel: 'Tables',
    iconName: 'Table',
    cardTitle: 'MONOLITH TRAVERTINE TABLE',
    cardSubtitle: 'Honed Roman Travertine • Raw Oak',
    cardDimensions: 'W 260 × D 110 × H 75 cm',
    cardDescription: 'Sculpted from a single block of un-filled Italian travertine with a double-chamfered architectural edge.',
    badgeLabel: 'Tables',
    image: '/images/products/photo-1530018607912-eff2daa1bac4-1200.webp',
    pieceCount: '02 Pieces'
  },
  {
    id: 'storage',
    categoryId: 'storage',
    title: 'Credenzas & Storage',
    shortLabel: 'Storage',
    iconName: 'Archive',
    cardTitle: 'BRUTALIST CREDENZA',
    cardSubtitle: 'Smoked Oak • Patinated Bronze',
    cardDimensions: 'W 220 × D 50 × H 78 cm',
    cardDescription: 'Hand-hewn fluted smoked oak fascia with patinated bronze pulls and soft-closing architectural reveals.',
    badgeLabel: 'Storage',
    image: '/images/products/photo-1595428774223-ef52624120d2-1200.webp',
    pieceCount: '02 Pieces'
  },
  {
    id: 'lighting',
    categoryId: 'lighting',
    title: 'Monumental Lighting',
    shortLabel: 'Lighting',
    iconName: 'Lamp',
    cardTitle: 'TOTEM FLOOR LAMP',
    cardSubtitle: 'Cast Bronze • Alabaster Diffuser',
    cardDimensions: 'W 38 × D 38 × H 185 cm',
    cardDescription: 'Monolithic cast bronze column holding an internally illuminated sphere of honed Spanish alabaster.',
    badgeLabel: 'Lighting',
    image: '/images/products/photo-1507473885765-e6ed057f782c-1200.webp',
    pieceCount: '01 Piece'
  },
  {
    id: 'beds',
    categoryId: 'beds',
    title: 'Beds & Daybeds',
    shortLabel: 'Beds',
    iconName: 'Bed',
    cardTitle: 'KOTO DAYBED',
    cardSubtitle: 'Natural Canvas • Blackened Ash',
    cardDimensions: 'W 205 × D 95 × H 42 cm',
    cardDescription: 'Minimalist Japanese-joinery daybed framed in blackened ash with custom saddle leather bolster tie-downs.',
    badgeLabel: 'Beds',
    image: '/images/products/photo-1505693416388-ac5ce068fe85-1200.webp',
    pieceCount: '01 Piece'
  },
  {
    id: 'mirrors',
    categoryId: 'mirrors',
    title: 'Sculptural Mirrors',
    shortLabel: 'Mirrors',
    iconName: 'Disc',
    cardTitle: 'ARCH COLUMN MIRROR',
    cardSubtitle: 'Cast Aluminum • Antiqued Glass',
    cardDimensions: 'W 85 × D 8 × H 210 cm',
    cardDescription: 'Floor-standing architectural mirror framed in heavy textured cast aluminum with hand-silvered glass.',
    badgeLabel: 'Mirrors',
    image: '/images/products/photo-1618221195710-dd6b41faaea6-1200.webp',
    pieceCount: '01 Piece'
  }
];

export const SHOWCASE_PALETTES = [
  {
    id: 'atelier',
    name: 'Atelier Carmine',
    tagline: 'Carmine Red & Warm Cream',
    sidebarBgHex: '#E10A1D',
    mainBgHex: '#EEEADC',
    activePillBg: '#FFFFFF',
    activePillText: '#141414',
    inactivePillBg: 'rgba(255, 255, 255, 0.16)',
    inactivePillBorder: 'rgba(255, 255, 255, 0.25)',
    inactivePillText: '#FFFFFF',
    accentColor: '#E10A1D',
    watermarkColor: '#141414'
  },
  {
    id: 'nordic',
    name: 'Nordic Wood',
    tagline: 'Terracotta & Warm Sand',
    sidebarBgHex: '#C85A32',
    mainBgHex: '#EAE6DF',
    activePillBg: '#FFFFFF',
    activePillText: '#141414',
    inactivePillBg: 'rgba(255, 255, 255, 0.18)',
    inactivePillBorder: 'rgba(255, 255, 255, 0.28)',
    inactivePillText: '#FFFFFF',
    accentColor: '#C85A32',
    watermarkColor: '#141414'
  },
  {
    id: 'forest',
    name: 'Forest Monolith',
    tagline: 'Deep Olive & Sandstone',
    sidebarBgHex: '#2D4A3E',
    mainBgHex: '#EDE8DF',
    activePillBg: '#FFFFFF',
    activePillText: '#141414',
    inactivePillBg: 'rgba(255, 255, 255, 0.16)',
    inactivePillBorder: 'rgba(255, 255, 255, 0.24)',
    inactivePillText: '#FFFFFF',
    accentColor: '#2D4A3E',
    watermarkColor: '#141414'
  }
];
