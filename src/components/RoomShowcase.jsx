import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ROOM_SHOWCASE, ROOM_HOTSPOTS, PRODUCTS } from '../config/brand';
import { useStore } from '../state/store';
import { animateRoomShowcase } from '../animations/room';
import { scrollTo } from '../animations';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';

// The strip holds the room plus one panel per hotspot piece, in hotspot order.
const PANELS = ROOM_HOTSPOTS.map((hs) => PRODUCTS.find((p) => p.id === hs.productId)).filter(Boolean);

export function RoomShowcase() {
  const { setActiveCategory } = useStore();
  const [activePanel, setActivePanel] = useState(0);

  const roomSrcset = getLocalSrcset(ROOM_SHOWCASE.image, '(max-width: 768px) calc(100vw - 40px), 1200px');

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const hotspotsContainerRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const headingWords = headingRef.current?.querySelectorAll('.room-heading-word');
    const hotspots = hotspotsContainerRef.current?.querySelectorAll('.hotspot-marker');

    const anim = animateRoomShowcase({
      sectionRef: sectionRef.current,
      imageRef: imageRef.current,
      headingWords,
      hotspots: Array.from(hotspots || []),
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, []);

  const scrollToPanel = useCallback((index) => {
    const strip = stripRef.current;
    if (!strip) return;
    const clamped = Math.max(0, Math.min(PANELS.length, index));
    const child = strip.children[clamped];
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
    setActivePanel(clamped);
  }, []);

  const handleStripScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip || !strip.children.length) return;
    const first = strip.children[0];
    const step = first.offsetWidth + 16; // panel width + gap-4
    if (step <= 0) return;
    const idx = Math.round(strip.scrollLeft / step);
    setActivePanel(Math.max(0, Math.min(PANELS.length, idx)));
  }, []);

  // Tapping a hotspot moves the strip to that piece's panel — the view swaps.
  const handleHotspotClick = (hs) => {
    const panelIndex = 1 + ROOM_HOTSPOTS.findIndex((h) => h.id === hs.id);
    scrollToPanel(panelIndex);
  };

  const handleNavigateToProduct = (hs) => {
    const prod = PRODUCTS.find((p) => p.id === hs.productId);
    if (prod) setActiveCategory(prod.category);
    scrollTo('#catalogue');
  };

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="relative w-full bg-cream py-16 sm:py-24 px-5 sm:px-8 border-b border-red/20 overflow-hidden"
      aria-label="Architectural Room Showcase"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="font-display text-xs sm:text-sm text-red tracking-[0.15em] uppercase block mb-1">
              04 — SPATIAL COMPOSITION
            </span>
            <h2
              ref={headingRef}
              className="font-serif text-[clamp(2.2rem,4.2vw,4.2rem)] text-ink leading-[0.95] tracking-tight"
            >
              <div className="overflow-hidden">
                <span className="room-heading-word inline-block will-change-transform">
                  {ROOM_SHOWCASE.title}
                </span>
              </div>
            </h2>
          </div>

          <p className="font-serif italic text-sm sm:text-base text-grey max-w-md">
            {ROOM_SHOWCASE.subtitle}
          </p>
        </div>

        {/* Horizontal-scrolling showcase strip: the room, then each piece in it */}
        <div
          ref={stripRef}
          onScroll={handleStripScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Panel 0 — the full room, with hotspots */}
          <div className="snap-start shrink-0 w-full sm:w-[85%] lg:w-[78%]">
            <div
              ref={hotspotsContainerRef}
              className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border border-grey/30 bg-ink/5 select-none"
            >
              <img
                ref={imageRef}
                src={ROOM_SHOWCASE.image}
                {...(roomSrcset ? { srcSet: roomSrcset.srcSet, sizes: roomSrcset.sizes } : {})}
                onError={(e) => handleImageFallback(e, 'sofas')}
                alt="Interior Room Composition"
                className="w-full h-full object-cover will-change-transform gpu-layer"
                loading="lazy"
                decoding="async"
              />

              {/* Interactive Hotspots — tap one to visit that piece */}
              {ROOM_SHOWCASE.hotspots.map((hs) => (
                <div
                  key={hs.id}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="hotspot-marker absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  {/* Hotspot Outer Pulsing Ring */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping-slow absolute inline-flex h-9 w-9 rounded-full bg-red/40"></span>
                    
                    {/* Central Hotspot Button */}
                    <button
                      onClick={() => handleHotspotClick(hs)}
                      className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-ink/20 shadow-md hover:scale-125 hover:bg-red hover:border-red transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red"
                      aria-label={`Visit ${hs.name}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ink group-hover:bg-white transition-colors" />
                    </button>
                  </div>

                  {/* Piece name on hover (desktop) */}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-ink/85 text-cream font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {hs.name}
                  </span>
                </div>
              ))}

              {/* Bottom Floating Caption */}
              <div className="absolute bottom-4 right-4 bg-ink/70 backdrop-blur-md text-cream px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wide hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red"></span>
                <span>Tap a marker to visit that piece</span>
              </div>
            </div>
          </div>

          {/* Panels 1–3 — each piece in the room, large */}
          {PANELS.map((prod, i) => {
            const hs = ROOM_HOTSPOTS[i];
            const srcset = getLocalSrcset(prod.image, '(max-width: 768px) calc(100vw - 40px), 1200px');
            return (
              <div key={prod.id} className="snap-start shrink-0 w-full sm:w-[85%] lg:w-[78%]">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border border-grey/30 bg-ink/5">
                  <img
                    src={prod.image}
                    {...(srcset ? { srcSet: srcset.srcSet, sizes: srcset.sizes } : {})}
                    onError={(e) => handleImageFallback(e, prod.category)}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-cream/90 text-ink px-2.5 py-1 backdrop-blur-xs border border-ink/10">
                    {prod.categoryLabel || prod.category}
                  </span>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink tracking-tight">
                      {prod.name}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-grey mt-0.5">
                      {hs?.materials || prod.materials}
                    </p>
                    <p className="font-mono text-[10px] text-grey mt-0.5">
                      {hs?.dimensions || prod.dimensions}
                    </p>
                    {hs?.description && (
                      <p className="font-serif italic text-xs text-grey mt-1 max-w-md">
                        {hs.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleNavigateToProduct(hs)}
                    className="shrink-0 flex items-center gap-1 font-display text-[11px] text-red tracking-wider uppercase hover:underline cursor-pointer"
                  >
                    <span>View in Catalogue</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strip controls — counter + prev/next */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-grey">
            {String(activePanel + 1).padStart(2, '0')} / {String(PANELS.length + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToPanel(activePanel - 1)}
              disabled={activePanel === 0}
              className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-red hover:text-red transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous room view"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToPanel(activePanel + 1)}
              disabled={activePanel === PANELS.length}
              className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-red hover:text-red transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Next room view"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Caption strip — the three pieces in situ */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-grey">
          <span>Spatial Sanctuary № 01 — In Situ</span>
          <span className="text-ink">L'Arc Lounge Chair · Monolith Travertine Table · Totem Floor Lamp</span>
        </div>

      </div>
    </section>
  );
}
