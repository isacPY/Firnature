import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Truck, Layers } from 'lucide-react';
import { BRAND_CONFIG, PRODUCTS, CATEGORIES } from '../config/brand';
import { animateHero } from '../animations/hero';
import { scrollTo } from '../animations';
import { useStore } from '../state/store';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';

export function Hero() {
  const { preloaderDone, setActiveCategory, activeCategory } = useStore();
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
  const heroSrcset = getLocalSrcset(heroTable.image, '(max-width: 768px) calc(100vw - 40px), 1440px');
  const duoSrcset = getLocalSrcset(credenza.image, '(max-width: 768px) 50vw, 400px');
  const duo2Srcset = getLocalSrcset(PRODUCTS[4].image, '(max-width: 768px) 50vw, 400px');

  const handleIndexSelect = (e, catId) => {
    e.preventDefault();
    setActiveCategory(catId);
    scrollTo('#catalogue');
  };

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

        {/* Tagline Row: Dining Chair Thumbnail + Tagline + Bracket CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-6 sm:mt-10 mb-8 sm:mb-10">
          <div className="hero-fade-caption hidden md:flex items-center gap-4 shrink-0">
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

          <div className="hero-fade-caption max-w-sm">
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

        {/* Full-Bleed Hero Photo — one piece, huge type over it, designer credit,
            category index on the right edge (Muuto model) */}
        <div className="hero-reveal-photo relative -mx-5 sm:-mx-8 aspect-[4/3] sm:aspect-[16/9] w-[calc(100%+2.5rem)] sm:w-[calc(100%+4rem)] overflow-hidden bg-ink/5 border-y border-grey/30">
          <img
            src={heroTable.image}
            {...(heroSrcset ? { srcSet: heroSrcset.srcSet, sizes: heroSrcset.sizes } : {})}
            onError={(e) => handleImageFallback(e, 'tables')}
            alt={heroTable.name}
            decoding="async"
            fetchpriority="high"
            className="w-full h-full object-cover"
          />
          {/* Bottom scrim so the overlaid type reads */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent pointer-events-none" />
          {/* Right scrim so the category index reads */}
          <div className="absolute inset-y-0 right-0 w-56 bg-gradient-to-l from-ink/60 to-transparent pointer-events-none hidden lg:block" />

          {/* Huge product name + designer credit, bottom-left */}
          <div className="hero-fade-caption absolute bottom-4 sm:bottom-6 left-5 sm:left-8 z-10">
            <span className="font-display uppercase tracking-[-0.02em] text-cream leading-[0.85] text-[clamp(3rem,9vw,8rem)] block select-none">
              MONOLITH
            </span>
            <p className="font-serif italic text-sm sm:text-base text-cream/90 mt-1">
              Travertine Table — by Atelier
            </p>
          </div>

          {/* Category index on the right edge (desktop) */}
          <nav
            className="hero-fade-caption hidden lg:flex flex-col items-end gap-2 absolute right-6 top-1/2 -translate-y-1/2 z-10"
            aria-label="Catalogue index"
          >
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href="#catalogue"
                onClick={(e) => handleIndexSelect(e, cat.id)}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'text-red'
                    : 'text-cream/85 hover:text-red'
                }`}
              >
                {cat.name} ({String(cat.count).padStart(2, '0')})
              </a>
            ))}
          </nav>
        </div>

        {/* New Arrivals Duo Below */}
        <div className="grid grid-cols-2 gap-4 pt-6">
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

      {/* Benefit strip — three promises under the hero */}
      <div className="mt-12 sm:mt-16 -mx-5 sm:-mx-8 border-t border-red/20 bg-cream">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-red/15">
          <div className="flex items-center justify-center gap-2.5 py-4">
            <Calendar className="w-4 h-4 text-red shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink">
              Private viewing — by appointment
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-4">
            <Truck className="w-4 h-4 text-red shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink">
              White-glove delivery
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-4">
            <Layers className="w-4 h-4 text-red shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink">
              Limited runs of 24
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
