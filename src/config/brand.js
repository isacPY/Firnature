/**
 * ATELIER° Brand & Product Configuration
 * 
 * Rebranding Guide:
 * To rebrand this entire website for a new client:
 * 1. Update `BRAND_CONFIG.name` and `BRAND_CONFIG.wordmark`.
 * 2. Update contact details (phone, showroomAddress, whatsappNumber).
 * 3. Update the color tokens in `src/styles/tokens.css` (e.g., change --red and --cream).
 * 4. Replace product images and titles in `PRODUCTS`.
 * 
 * RULE: ABSOLUTELY NO PRICES ARE SHOWN ANYWHERE IN THIS APPLICATION.
 */

export const BRAND_CONFIG = {
  name: "ATELIER",
  wordmark: "ATELIER°",
  collectionYear: "COLLECTION 2026",
  tagline: "ARCHITECTURAL PROPORTION. TIMELESS LIVING.",
  subTagline: "Handcrafted monolithic furniture pieces engineered for residential sanctuaries and monumental interiors.",
  
  navLinks: [
    { label: "Catalogue", href: "#catalogue" },
    { label: "Archetypes", href: "#ethos-showcase" },
    { label: "Rooms", href: "#rooms" },
    { label: "Private Viewing", href: "#appointment" },
    { label: "Materials", href: "#ethos-showcase" },
  ],

  showroom: {
    title: "SOHO FLAGSHIP ATELIER",
    address: "442 West Broadway",
    city: "SoHo, New York, NY 10012",
    country: "United States",
    phone: "+1 (212) 555-0199",
    displayPhone: "+1 (212) 555-0199",
    email: "concierge@atelier-living.com",
    hours: [
      { days: "Tuesday – Saturday", time: "10:00 — 18:00" },
      { days: "Sunday", time: "12:00 — 17:00" },
      { days: "Monday", time: "By Private Appointment" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.6337189154247!2d-74.00288882356763!3d40.72590213675095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598c1995cb53%3A0xc3b5e43bc3585d85!2s442%20W%20Broadway%2C%20New%20York%2C%20NY%2010012!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    mapDirectUrl: "https://maps.google.com/?q=442+West+Broadway+New+York+NY"
  },

  whatsapp: {
    phoneNumber: "12125550199", // International format without '+'
    defaultInquiryMessage: "Hello ATELIER°, I would like to schedule a private showroom viewing and discuss your current collection."
  },

  // Pitch options
  showDeviceEndCard: false,
  isRtl: false,
};

export const CATEGORIES = [
  { id: "all", name: "All Pieces", count: 12 },
  { id: "chairs", name: "Chairs", count: 3, image: "/images/products/photo-1586023492125-27b2c045efd7-1200.webp" },
  { id: "sofas", name: "Sofas", count: 2, image: "/images/products/photo-1555041469-a586c61ea9bc-1200.webp" },
  { id: "tables", name: "Tables", count: 2, image: "/images/products/photo-1530018607912-eff2daa1bac4-1200.webp" },
  { id: "storage", name: "Storage", count: 2, image: "/images/products/photo-1595428774223-ef52624120d2-1200.webp" },
  { id: "lighting", name: "Lighting", count: 1, image: "/images/products/photo-1507473885765-e6ed057f782c-1200.webp" },
  { id: "beds", name: "Beds", count: 1, image: "/images/products/photo-1505693416388-ac5ce068fe85-1200.webp" },
  { id: "mirrors", name: "Mirrors", count: 1, image: "/images/products/photo-1618221195710-dd6b41faaea6-1200.webp" },
];

export const PRODUCTS = [
  {
    id: "prod-1",
    name: "L'Arc Lounge Chair",
    category: "chairs",
    categoryLabel: "Chairs",
    materials: "Carmine Wool Bouclé, Matte Black Steel",
    dimensions: "W 92 × D 88 × H 74 cm",
    seatHeight: "42 cm",
    weight: "34 kg",
    provenance: "Flanders Weaving Guild / Milanese Forging",
    leadTime: "6 — 8 Weeks",
    isAccentRed: true,
    isHeroFeatured: true,
    image: "/images/products/photo-1586023492125-27b2c045efd7-1200.webp",
    description: "An iconic monolithic silhouette enveloping the sitter in heavy wool bouclé, grounded by concealed steel framing.",
    swatches: [
      { id: "carmine", name: "Carmine Bouclé", colorHex: "#C80818", image: "/images/products/photo-1586023492125-27b2c045efd7-1200.webp" },
      { id: "chalk", name: "Chalk Linen", colorHex: "#EAE5DA", image: "/images/products/photo-1567538096630-e0c55bd6374c-1200.webp" },
      { id: "charcoal", name: "Charcoal Wool", colorHex: "#222120", image: "/images/products/larc-charcoal-chair-1200.webp" }
    ]
  },
  {
    id: "prod-2",
    name: "Monolith Travertine Table",
    category: "tables",
    categoryLabel: "Tables",
    materials: "Honed Roman Travertine, Raw Oak Core",
    dimensions: "W 260 × D 110 × H 75 cm",
    seatHeight: "Standard Clearance 71 cm",
    weight: "210 kg",
    provenance: "Tivoli Quarry, Lazio / Black Forest Oak",
    leadTime: "8 — 10 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1530018607912-eff2daa1bac4-1200.webp",
    description: "Sculpted from a single block of un-filled Italian travertine with a double-chamfered architectural edge.",
    swatches: [
      { id: "travertine", name: "Roman Travertine", colorHex: "#D8CEBD", image: "/images/products/photo-1530018607912-eff2daa1bac4-1200.webp" },
      { id: "marquina", name: "Nero Marquina", colorHex: "#1E1E1E", image: "/images/products/photo-1600585154340-be6161a56a0c-1200.webp" },
      { id: "oak", name: "Smoked French Oak", colorHex: "#4A3B32", image: "/images/products/photo-1533090161767-e6ffed986c88-1200.webp" }
    ]
  },
  {
    id: "prod-3",
    name: "Palazzo Modular Sofa",
    category: "sofas",
    categoryLabel: "Sofas",
    materials: "Belgian Sand Linen, Down Cushioning",
    dimensions: "W 340 × D 160 × H 68 cm",
    seatHeight: "38 cm",
    weight: "140 kg",
    provenance: "Ghent Mills / Tuscan Beech Subframe",
    leadTime: "10 — 12 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1555041469-a586c61ea9bc-1200.webp",
    description: "Low-slung modular seating system configured with deep rectilinear cushions and solid walnut plinth base.",
    swatches: [
      { id: "sand", name: "Belgian Sand Linen", colorHex: "#D5CAB9", image: "/images/products/photo-1555041469-a586c61ea9bc-1200.webp" },
      { id: "boucle", name: "Heavy Bouclé Ivory", colorHex: "#EDE8DF", image: "/images/products/photo-1493663284031-b7e3aefcae8e-1200.webp" },
      { id: "carmine", name: "Carmine Velvet", colorHex: "#8B1E2B", image: "/images/products/photo-1586023492125-27b2c045efd7-1200.webp" }
    ]
  },
  {
    id: "prod-4",
    name: "Brutalist Credenza",
    category: "storage",
    categoryLabel: "Storage",
    materials: "Smoked Oak, Patinated Bronze Hardware",
    dimensions: "W 220 × D 50 × H 78 cm",
    seatHeight: "N/A",
    weight: "115 kg",
    provenance: "Burgundy French Oak / Cast Bronze Foundry",
    leadTime: "6 — 8 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1595428774223-ef52624120d2-1200.webp",
    description: "Hand-hewn fluted smoked oak fascia with patinated bronze pulls and soft-closing architectural reveals.",
    swatches: [
      { id: "smoked-oak", name: "Smoked Oak", colorHex: "#3A3029", image: "/images/products/photo-1595428774223-ef52624120d2-1200.webp" },
      { id: "natural-walnut", name: "Fluted Walnut", colorHex: "#684F3E", image: "/images/products/photo-1538688525198-9b88f6f53126-1200.webp" }
    ]
  },
  {
    id: "prod-5",
    name: "Totem Floor Lamp",
    category: "lighting",
    categoryLabel: "Lighting",
    materials: "Cast Bronze, Alabaster Diffuser",
    dimensions: "W 38 × D 38 × H 185 cm",
    seatHeight: "N/A",
    weight: "48 kg",
    provenance: "Aragonese Alabaster / Verona Foundry",
    leadTime: "4 — 6 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1507473885765-e6ed057f782c-1200.webp",
    description: "Monolithic cast bronze column holding an internally illuminated sphere of honed Spanish alabaster.",
    swatches: [
      { id: "bronze", name: "Cast Patinated Bronze", colorHex: "#453428", image: "/images/products/photo-1507473885765-e6ed057f782c-1200.webp" },
      { id: "brass", name: "Brushed Raw Brass", colorHex: "#B89B5F", image: "/images/products/photo-1513506003901-1e6a229e2d15-1200.webp" }
    ]
  },
  {
    id: "prod-6",
    name: "Arch Column Mirror",
    category: "mirrors",
    categoryLabel: "Mirrors",
    materials: "Solid Cast Aluminum, Antiqued Glass",
    dimensions: "W 85 × D 8 × H 210 cm",
    seatHeight: "N/A",
    weight: "52 kg",
    provenance: "Venetian Mirror Studios / Sand Cast Aluminum",
    leadTime: "4 — 6 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1618221195710-dd6b41faaea6-1200.webp",
    description: "Floor-standing architectural mirror framed in heavy textured cast aluminum with hand-silvered glass.",
    swatches: [
      { id: "raw-alum", name: "Cast Aluminum", colorHex: "#A0A0A0", image: "/images/products/photo-1618221195710-dd6b41faaea6-1200.webp" },
      { id: "antique-bronze", name: "Antiqued Bronze", colorHex: "#4E3629", image: "/images/products/photo-1583847268964-b28dc8f51f92-1200.webp" }
    ]
  },
  {
    id: "prod-7",
    name: "Koto Daybed",
    category: "beds",
    categoryLabel: "Beds",
    materials: "Natural Canvas, Blackened Ash Plinth",
    dimensions: "W 205 × D 95 × H 42 cm",
    seatHeight: "42 cm",
    weight: "68 kg",
    provenance: "Kyoto Joinery Methods / Alpine Ash",
    leadTime: "8 — 10 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1505693416388-ac5ce068fe85-1200.webp",
    description: "Minimalist Japanese-joinery daybed framed in blackened ash with custom saddle leather bolster tie-downs.",
    swatches: [
      { id: "canvas", name: "Natural Canvas", colorHex: "#E5DAC9", image: "/images/products/photo-1505693416388-ac5ce068fe85-1200.webp" },
      { id: "saddle", name: "Saddle Tan Leather", colorHex: "#8B4513", image: "/images/products/koto-saddle-leather-1200.webp" }
    ]
  },
  {
    id: "prod-8",
    name: "Pavilion Low Coffee Table",
    category: "tables",
    categoryLabel: "Tables",
    materials: "Brushed Jura Stone, Fluted Walnut",
    dimensions: "W 140 × D 90 × H 32 cm",
    seatHeight: "N/A",
    weight: "85 kg",
    provenance: "Bavarian Jura Beds / American Walnut",
    leadTime: "6 — 8 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1533090161767-e6ffed986c88-1200.webp",
    description: "Sculptural coffee table balancing a monolithic Jura limestone slab over fluted walnut architectural fins."
  },
  {
    id: "prod-9",
    name: "Curvature Dining Chair",
    category: "chairs",
    categoryLabel: "Chairs",
    materials: "Saddle Leather, Solid Walnut Frame",
    dimensions: "W 56 × D 58 × H 82 cm",
    seatHeight: "46 cm",
    weight: "12 kg",
    provenance: "Tuscan Tannery / Piedmont Walnut",
    leadTime: "4 — 6 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1567538096630-e0c55bd6374c-1200.webp",
    description: "Ergonomic continuous saddle leather sling suspended across sculpted solid walnut joinery."
  },
  {
    id: "prod-10",
    name: "Strata Highboard",
    category: "storage",
    categoryLabel: "Storage",
    materials: "Quartered French Oak, Hand-Forged Iron",
    dimensions: "W 110 × D 48 × H 165 cm",
    seatHeight: "N/A",
    weight: "92 kg",
    provenance: "Alsatian Forest Reserve / Forge Haute",
    leadTime: "8 — 10 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1538688525198-9b88f6f53126-1200.webp",
    description: "Vertical monumental storage piece showcasing end-grain quartered oak and hand-burnished iron hardware."
  },
  {
    id: "prod-11",
    name: "Dune Occasional Chair",
    category: "chairs",
    categoryLabel: "Chairs",
    materials: "Raw Sheepskin, Sculptural Oak Legs",
    dimensions: "W 82 × D 78 × H 72 cm",
    seatHeight: "40 cm",
    weight: "22 kg",
    provenance: "Gotland Organic Shearling / Danish Oak",
    leadTime: "6 — 8 Weeks",
    isAccentRed: false,
    image: "/images/products/dune-occasional-chair-1200.webp",
    description: "Organic sculptural seating object upholstered in untrimmed Swedish shearling with rounded oak cylindrical legs."
  },
  {
    id: "prod-12",
    name: "Forma Chaise Sectional",
    category: "sofas",
    categoryLabel: "Sofas",
    materials: "Heavy Bouclé, Concealed Solid Beech Base",
    dimensions: "W 310 × D 180 × H 70 cm",
    seatHeight: "39 cm",
    weight: "165 kg",
    provenance: "Como Velvet & Bouclé Mills / Swiss Beech",
    leadTime: "10 — 12 Weeks",
    isAccentRed: false,
    image: "/images/products/photo-1493663284031-b7e3aefcae8e-1200.webp",
    description: "Architectural corner seating anchor with generous proportions, floating reveal base, and double-padded ergonomics."
  }
];

export const ROOM_HOTSPOTS = [
  {
    id: "hotspot-1",
    productId: "prod-1",
    name: "L'Arc Lounge Chair",
    x: 32,
    y: 58,
    materials: "Carmine Wool Bouclé",
    dimensions: "W 92 × D 88 × H 74 cm",
    description: "Anchoring the seating circle with sculptural carmine wool volume."
  },
  {
    id: "hotspot-2",
    productId: "prod-2",
    name: "Monolith Travertine Table",
    x: 64,
    y: 65,
    materials: "Honed Roman Travertine",
    dimensions: "W 260 × D 110 × H 75 cm",
    description: "Centerpiece travertine slab catching natural light with un-filled texture."
  },
  {
    id: "hotspot-3",
    productId: "prod-5",
    name: "Totem Floor Lamp",
    x: 82,
    y: 35,
    materials: "Cast Bronze, Alabaster",
    dimensions: "H 185 cm",
    description: "Vertical light sculpture anchoring the gallery transition."
  }
];

export const ROOM_SHOWCASE = {
  title: "Spatial Sanctuary № 01",
  roomType: "Penthouse Living Gallery",
  dimensions: "140 sq m • 3.8m Ceiling Clearance",
  image: "/images/products/photo-1600210492486-724fe5c67fb0-1200.webp",
  hotspots: ROOM_HOTSPOTS
};

/**
 * WhatsApp Concierge URL Builder
 * Generates direct chat inquiry links. STRICT RULE: ZERO prices are ever included.
 */
export function buildWhatsAppUrl(items = [], customNote = null) {
  const phone = BRAND_CONFIG.whatsapp.phoneNumber.replace(/[^0-9]/g, "");
  
  if ((!items || items.length === 0) && customNote) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(customNote)}`;
  }

  if ((!items || items.length === 0) && !customNote) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(BRAND_CONFIG.whatsapp.defaultInquiryMessage)}`;
  }

  let text = `Hello ${BRAND_CONFIG.wordmark} Concierge,\n\nI am inquiring about the following pieces:\n\n`;

  items.forEach((item, index) => {
    const prod = item.product || item;
    const name = prod.name || 'Bespoke Piece';
    const qty = item.quantity || 1;
    text += `${index + 1}. ${name} — Qty: ${qty}\n`;
    if (prod.materials) {
      text += `   Finish: ${prod.materials}\n`;
    }
  });

  if (customNote) {
    text += `\nNote: ${customNote}\n`;
  }

  text += `\nPlease confirm availability and showroom viewing details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
