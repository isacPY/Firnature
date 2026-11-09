import React, { useState, useEffect, useRef } from 'react';
import { ROOM_SHOWCASE, PRODUCTS } from '../config/brand';
import { useStore } from '../state/store';
import { animateRoomShowcase } from '../animations/room';
import { scrollTo } from '../animations';
import { ArrowUpRight } from 'lucide-react';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';

export function RoomShowcase() {
  const { setActiveCategory } = useStore();
  const [activeHotspot, setActiveHotspot] = useState(null);

  const roomSrcset = getLocalSrcset(ROOM_SHOWCASE.image, '(max-width: 768px) calc(100vw - 40px), 1200px');

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const hotspotsContainerRef = useRef(null);

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

  const handleHotspotClick = (hs) => {
    setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
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
      className="relative w-full bg-cream py-20 sm:py-32 px-5 sm:px-8 border-b border-red/20 overflow-hidden"
      aria-label="Architectural Room Showcase"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="font-display text-xs sm:text-sm text-red tracking-[0.15em] uppercase block mb-1">
              05 — SPATIAL COMPOSITION
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

        {/* 16:9 Lifestyle Room Image Container with Hotspots */}
        <div
          ref={hotspotsContainerRef}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-grey/30 bg-ink/5 select-none"
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

          {/* Interactive Hotspots */}
          {ROOM_SHOWCASE.hotspots.map((hs) => {
            const isOpen = activeHotspot?.id === hs.id;
            const prod = PRODUCTS.find((p) => p.id === hs.productId);
            const categoryLabel = prod?.categoryLabel || 'Collection';

            return (
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
                    aria-label={`Inspect ${hs.name}`}
                    aria-expanded={isOpen}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ink group-hover:bg-white transition-colors" />
                  </button>
                </div>

                {/* Hotspot Card / Tooltip on Click or Hover */}
                {isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 sm:w-64 bg-white/95 backdrop-blur-md p-4 shadow-xl border border-ink/10 rounded-sm text-left animate-in fade-in slide-in-from-bottom-2 duration-200 z-30">
                    <span className="font-display text-[10px] text-red tracking-widest uppercase block">
                      {categoryLabel}
                    </span>
                    <h4 className="font-serif text-base text-ink mt-0.5 tracking-tight font-medium">
                      {hs.name}
                    </h4>
                    <p className="font-serif italic text-xs text-grey mt-1">
                      {hs.materials}
                    </p>
                    <p className="font-mono text-[10px] text-grey mt-0.5">
                      {hs.dimensions}
                    </p>

                    <button
                      onClick={() => handleNavigateToProduct(hs)}
                      className="mt-3 flex items-center gap-1 font-display text-[11px] text-red tracking-wider uppercase hover:underline"
                    >
                      <span>View in Catalogue</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Floating Caption */}
          <div className="absolute bottom-4 right-4 bg-ink/70 backdrop-blur-md text-cream px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wide hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red"></span>
            <span>Tap markers to reveal architectural specifications</span>
          </div>

        </div>

      </div>
    </section>
  );
}
