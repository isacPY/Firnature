import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_CONFIG, PRODUCTS } from '../config/brand';
import { animateHero } from '../animations/hero';
import { scrollTo } from '../animations';
import { useStore } from '../state/store';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';

export function Hero() {
  const { preloaderDone } = useStore();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Wait until lookbook preloader finishes on initial session load
    if (!preloaderDone) return;

    const headlineWords = containerRef.current.querySelectorAll('.hero-headline-word');
    const photos = containerRef.current.querySelectorAll('.hero-reveal-photo');
    const captions = containerRef.current.querySelectorAll('.hero-fade-caption');

    const anim = animateHero({
      headlineWords,
      photos,
      captions,
      onComplete: () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [preloaderDone]);

  // Selected hero imagery
  const redChair = PRODUCTS.find((p) => p.id === "prod-1") || PRODUCTS[0];
  const diningChair = PRODUCTS.find((p) => p.id === "prod-9") || PRODUCTS[1];
  const heroTable = PRODUCTS.find((p) => p.id === "prod-2") || PRODUCTS[2];
  const credenza = PRODUCTS.find((p) => p.id === "prod-4") || PRODUCTS[3];
  const heroSrcset = getLocalSrcset(heroTable.image, '(max-width: 768px) calc(100vw - 40px), 800px');
  const duoSrcset = getLocalSrcset(credenza.image, '(max-width: 768px) 50vw, 400px');
  const duo2Srcset = getLocalSrcset(PRODUCTS[4].image, '(max-width: 768px) 50vw, 400px');

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-cream pt-6 sm:pt-10 pb-20 sm:pb-32 px-5 sm:px-8 border-b border-red/20"
      aria-label="Hero Showcase"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Floating Row: Collection Badge & Top-Right Red Armchair Thumbnail */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="hero-fade-caption">
            <span className="font-display text-[11px] sm:text-xs text-red tracking-[0.08em] uppercase">
              {BRAND_CONFIG.collectionYear}
            </span>
            <p className="font-serif italic text-xs text-grey mt-0.5">
              Architectural Sanctuaries
            </p>
          </div>

          {/* Top-Right Floating Thumbnail */}
          <div className="hero-fade-caption hidden sm:flex items-center gap-3">
            <div className="text-right">
              <span className="block font-display text-[11px] text-red tracking-wider uppercase">
                {redChair.name}
              </span>
              <span className="block font-mono text-[10px] text-grey">
                {redChair.dimensions}
              </span>
            </div>
            <div className="hero-reveal-photo w-14 h-18 sm:w-16 sm:h-20 overflow-hidden bg-ink/5 border border-grey/30">
              <img
                src={redChair.image}
                onError={(e) => handleImageFallback(e, 'chairs')}
                alt={redChair.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Giant Condensed Headline: 2 Lines, Line 2 Indented Right on Desktop */}
        <div className="relative z-10 leading-[0.82] select-none my-2 sm:my-6">
          <h1 className="font-display uppercase tracking-[-0.02em] text-red text-[clamp(4.5rem,14vw,14.5rem)]">
            <div className="overflow-hidden flex">
              <span className="hero-headline-word inline-block will-change-transform">
                ARCHITECTURAL
              </span>
            </div>
            <div className="overflow-hidden flex justify-start lg:justify-end">
              <span className="hero-headline-word inline-block will-change-transform lg:mr-12">
                PROPORTION
              </span>
            </div>
          </h1>
        </div>

        {/* Middle Row: Left-Middle Floating Dining Chair Thumbnail + Bracket CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mt-6 sm:mt-10">
          
          {/* Left Column: Dining Chair Floating Thumbnail & Tagline */}
          <div className="md:col-span-5 space-y-6">
            <div className="hero-fade-caption flex items-center gap-4">
              <div className="hero-reveal-photo w-20 h-26 sm:w-24 sm:h-32 overflow-hidden bg-ink/5 border border-grey/30 shrink-0">
                <img
                  src={diningChair.image}
                  onError={(e) => handleImageFallback(e, 'chairs')}
                  alt={diningChair.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display text-xs text-red tracking-wider uppercase block">
                  {diningChair.name}
                </span>
                <p className="font-serif italic text-xs text-ink mt-1 max-w-[200px]">
                  {diningChair.materials}
                </p>
                <span className="font-mono text-[10px] text-grey block mt-0.5">
                  {diningChair.dimensions}
                </span>
              </div>
            </div>

            <div className="hero-fade-caption pt-2 max-w-sm">
              <p className="font-serif text-base sm:text-lg text-ink leading-relaxed">
                {BRAND_CONFIG.subTagline}
              </p>
              
              {/* Bracket Link CTA */}
              <div className="mt-4">
                <a
                  href="#catalogue"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#catalogue');
                  }}
                  className="bracket-link text-lg sm:text-xl"
                  aria-label="Explore Collection"
                >
                  <span className="bracket-left">[</span>
                  <span className="px-2">EXPLORE COLLECTION</span>
                  <span className="bracket-right">]</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Wide Hero Studio Photo + New Arrivals Duo */}
          <div className="md:col-span-7 space-y-4">
            {/* Wide Hero Photo */}
            <div className="hero-reveal-photo relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-ink/5 border border-grey/30">
              <img
                src={heroTable.image}
                {...(heroSrcset ? { srcSet: heroSrcset.srcSet, sizes: heroSrcset.sizes } : {})}
                onError={(e) => handleImageFallback(e, 'tables')}
                alt={heroTable.name}
                decoding="async"
                fetchpriority="high"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur-sm px-3 py-1 text-[11px] font-display text-ink tracking-wider uppercase">
                {heroTable.name} — {heroTable.materials}
              </div>
            </div>

            {/* New Arrivals Duo Below */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="hero-fade-caption">
                <span className="font-display text-[10px] text-red tracking-widest uppercase block mb-1">
                  NEW ARRIVAL · 01
                </span>
                <div className="hero-reveal-photo aspect-[4/3] w-full overflow-hidden bg-ink/5 border border-grey/30">
                  <img
                    src={credenza.image}
                    {...(duoSrcset ? { srcSet: duoSrcset.srcSet, sizes: duoSrcset.sizes } : {})}
                    onError={(e) => handleImageFallback(e, 'storage')}
                    alt={credenza.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif italic text-xs text-ink block mt-1.5 truncate">
                  {credenza.name}
                </span>
              </div>

              <div className="hero-fade-caption">
                <span className="font-display text-[10px] text-red tracking-widest uppercase block mb-1">
                  NEW ARRIVAL · 02
                </span>
                <div className="hero-reveal-photo aspect-[4/3] w-full overflow-hidden bg-ink/5 border border-grey/30">
                  <img
                    src={PRODUCTS[4].image}
                    {...(duo2Srcset ? { srcSet: duo2Srcset.srcSet, sizes: duo2Srcset.sizes } : {})}
                    onError={(e) => handleImageFallback(e, PRODUCTS[4].category)}
                    alt={PRODUCTS[4].name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif italic text-xs text-ink block mt-1.5 truncate">
                  {PRODUCTS[4].name}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
