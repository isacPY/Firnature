import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { CATEGORIES } from '../config/brand';
import { useStore } from '../state/store';
import { animateCategoryIndex } from '../animations/categoryIndex';
import { scrollTo } from '../animations';
import { handleImageFallback } from '../utils/placeholders';

// Stable list of categories (excluding 'all') for editorial index rows
const DISPLAY_CATEGORIES = CATEGORIES.filter((c) => c.id !== "all");

// Memoized row list with uniform 112px height (h-28) to ensure exact vertical indexing
const CategoryRowList = React.memo(function CategoryRowList({ onSelect, isOverlay = false }) {
  return (
    <>
      {DISPLAY_CATEGORIES.map((cat) => {
        const isExclusive = cat.id === 'exclusive';
        return (
          <div
            key={isOverlay ? `overlay-${cat.id}` : cat.id}
            onClick={() => onSelect(cat.id)}
            className="category-row h-28 flex items-center justify-center cursor-pointer group select-none"
          >
            {isOverlay ? (
              <span className="font-serif italic text-[clamp(2rem,4.4vw,4.5rem)] text-cream tracking-tight font-light group-hover:underline transition-colors duration-200">
                {cat.name}
                <sup className="font-mono text-xs sm:text-sm text-cream ml-2 not-italic">
                  (0{cat.count})
                </sup>
                {isExclusive && (
                  <span className="font-mono text-[10px] sm:text-xs text-cream tracking-[0.25em] ml-3 align-middle border border-cream/50 px-2 py-0.5 not-italic">
                    Limited
                  </span>
                )}
              </span>
            ) : (
              <span className={`font-serif text-[clamp(2rem,4.4vw,4.5rem)] tracking-tight transition-colors duration-200 ${isExclusive ? 'italic text-red' : 'text-ink group-hover:italic'}`}>
                {cat.name}
                <sup className="font-mono text-xs sm:text-sm text-grey ml-2">
                  (0{cat.count})
                </sup>
                {isExclusive && (
                  <span className="font-mono text-[10px] sm:text-xs text-red tracking-[0.25em] ml-3 align-middle border border-red/40 px-2 py-0.5">
                    Limited
                  </span>
                )}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
});

export function CategoryIndex() {
  const { setActiveCategory, activeCategory } = useStore();
  const [activeIdx, setActiveIdx] = useState(0);

  // Mobile scroll-active row: the category the red bar + thumbnails follow
  // as the user scrolls through the mobile index (HALDEN behaviour — the
  // bar moves with the scroll, and the images show for the category you
  // stop on). Tapping a row sets this too, so tap and scroll stay in sync.
  const [scrollActiveId, setScrollActiveId] = useState('all');

  // Mobile (<768px) uses a simple scrolling list instead of the pinned
  // full-screen dual-layer effect — the pinned version is too long and slow
  // on a phone, and its non-active rows read as faint grey text.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const containerRef = useRef(null);
  const baseListRef = useRef(null);
  const overlayListRef = useRef(null);
  const thumbLeftRef = useRef(null);
  const thumbRightRef = useRef(null);

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setScrollActiveId(categoryId);
    scrollTo('#catalogue');
  }, [setActiveCategory]);

  // Mobile: as the user scrolls through the index, the red bar + thumbnails
  // follow the row nearest the viewport centre; when they stop scrolling,
  // the images for that category are showing. Tapping a row still selects it.
  useEffect(() => {
    if (!isMobile) return;
    const rows = Array.from(document.querySelectorAll('#category-index button'));
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0].target.getAttribute('data-cat-id');
        if (id) setScrollActiveId((prev) => (prev === id ? prev : id));
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!containerRef.current || !baseListRef.current || !overlayListRef.current) return;

    const anim = animateCategoryIndex({
      containerRef: containerRef.current,
      baseListRef: baseListRef.current,
      overlayListRef: overlayListRef.current,
      totalItems: DISPLAY_CATEGORIES.length,
      onActiveIndexChange: (idx) => {
        setActiveIdx((prev) => (prev === idx ? prev : idx));
      }
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [isMobile]);

  // Thumbnail cross-fade when active category changes
  useEffect(() => {
    if (isMobile) return;
    const thumbs = [thumbLeftRef.current, thumbRightRef.current].filter(Boolean);
    if (thumbs.length) {
      gsap.killTweensOf(thumbs);
      gsap.fromTo(
        thumbs,
        { opacity: 0.35, y: 3 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeIdx, isMobile]);

  // --- Mobile: simple scrolling list, red bar on the selected category ---
  // HALDEN's index: "All products" first, then the categories, with small
  // product thumbnails flanking the red active-row bar.
  if (isMobile) {
    // Mobile list = every category, starting with "All products" (HALDEN's
    // first row). 'all' has no image of its own — thumbnails fall back to
    // the Exclusive Collection image. The red bar + thumbnails follow the
    // scroll-active row (scrollActiveId), not the tapped filter.
    const MOBILE_CATEGORIES = CATEGORIES;
    const activeId = MOBILE_CATEGORIES.some((c) => c.id === scrollActiveId)
      ? scrollActiveId
      : 'all';
    const activePos = MOBILE_CATEGORIES.findIndex((c) => c.id === activeId) + 1;
    const activeCat = MOBILE_CATEGORIES.find((c) => c.id === activeId) || MOBILE_CATEGORIES[0];
    const thumbSrc = activeCat.image || DISPLAY_CATEGORIES[0].image;
    const thumbFallbackId = activeId === 'all' ? 'exclusive' : activeId;

    return (
      <section
        id="category-index"
        className="relative w-full bg-cream py-10 px-5 select-none"
        aria-label="Category Index"
      >
        <div className="max-w-[1440px] w-full mx-auto">
          <span className="font-display text-xs text-red tracking-[0.18em] uppercase font-semibold">
            02 — CATEGORY INDEX
          </span>
          <p className="font-serif italic text-xs text-grey mt-0.5">
            Curated Architectural Taxonomy
          </p>
          <p className="font-serif text-sm text-grey leading-relaxed mt-3 max-w-sm">
            Nine categories, and that is the whole company. Tap any archetype to view it in the catalogue.
          </p>
        </div>

        <div className="mt-8">
          {MOBILE_CATEGORIES.map((cat) => {
            const isExclusive = cat.id === 'exclusive';
            const isActive = cat.id === activeId;
            const label = cat.id === 'all' ? 'All products' : cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                data-cat-id={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative w-full h-16 flex items-center justify-center cursor-pointer select-none transition-colors duration-200 ${
                  isActive ? 'bg-red' : 'bg-transparent'
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <>
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-12 overflow-hidden bg-cream/10 border border-cream/30 pointer-events-none">
                      <img
                        src={thumbSrc}
                        onError={(e) => handleImageFallback(e, thumbFallbackId)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-12 overflow-hidden bg-cream/10 border border-cream/30 pointer-events-none">
                      <img
                        src={thumbSrc}
                        onError={(e) => handleImageFallback(e, thumbFallbackId)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </>
                )}
                <span className={`font-serif text-[1.9rem] leading-none tracking-tight ${
                  isActive ? 'italic text-cream font-light' : isExclusive ? 'italic text-red' : 'text-ink'
                }`}>
                  {label}
                  <sup className={`font-mono text-xs ml-2 not-italic ${isActive ? 'text-cream' : 'text-grey'}`}>
                    (0{cat.count})
                  </sup>
                  {isExclusive && !isActive && (
                    <span className="font-mono text-[10px] tracking-[0.25em] ml-3 align-middle border px-2 py-0.5 not-italic text-red border-red/40">
                      Limited
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between text-grey font-mono text-[10px] uppercase tracking-widest pt-6">
          <span>0{activePos} / 0{MOBILE_CATEGORIES.length} Archetype Selected</span>
          <span>Tap any row to jump to catalogue</span>
        </div>
      </section>
    );
  }

  const currentCategory = DISPLAY_CATEGORIES[activeIdx] || DISPLAY_CATEGORIES[0];

  return (
    <section
      id="category-index"
      ref={containerRef}
      className="relative w-full h-screen bg-cream overflow-hidden flex flex-col justify-between py-6 sm:py-10 select-none gpu-layer will-change-transform"
      aria-label="Category Index"
    >
      {/* Top Header Row */}
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 flex items-start justify-between z-30 shrink-0">
        <div>
          <span className="font-display text-xs sm:text-sm text-red tracking-[0.18em] uppercase font-semibold">
            02 — CATEGORY INDEX
          </span>
          <p className="font-serif italic text-xs text-grey mt-0.5">
            Curated Architectural Taxonomy
          </p>
        </div>
        <div className="text-right max-w-xs hidden sm:block">
          <p className="font-serif text-xs text-grey leading-relaxed">
            Scroll vertically to traverse our structural categories or select any archetype to view current inventory.
          </p>
        </div>
      </div>

      {/* Central Area: Red Band + Dual-Layer Text Stack */}
      <div className="relative w-full flex-1 overflow-hidden select-none">

        {/* Soft category backdrop — fills the void behind the rows */}
        <img
          key={`bg-${currentCategory.id}`}
          src={currentCategory.image}
          onError={(e) => handleImageFallback(e, currentCategory.id)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none animate-in fade-in duration-700"
        />

        {/* Giant ghost index numeral */}
        <div
          key={`ghost-${activeIdx}`}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none animate-in fade-in duration-700"
        >
          <span className="font-display leading-none text-[clamp(16rem,38vw,26rem)] text-ink/[0.05]">0{activeIdx + 1}</span>
        </div>

        {/* Central Red Band: Pinned vertically at 50% with exact -56px margin */}
        <div
          className="absolute inset-x-0 h-28 bg-red z-10 flex items-center justify-between px-4 sm:px-12 pointer-events-none shadow-sm"
          style={{ top: '50%', marginTop: '-56px' }}
        >
          {/* Left Floating Category Thumbnail inside red band */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-14 h-20 sm:w-16 sm:h-20 overflow-hidden bg-cream/10 border border-cream/30">
              <img
                ref={thumbLeftRef}
                src={currentCategory.image}
                onError={(e) => handleImageFallback(e, currentCategory.id)}
                alt={currentCategory.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left font-mono text-[10px] text-cream uppercase tracking-widest">
              <span>{currentCategory.count} Pieces</span>
              <span className="block text-cream font-bold">In Showroom</span>
            </div>
          </div>

          {/* Right Floating Category Thumbnail inside red band */}
          <div className="hidden md:flex items-center gap-3 text-right">
            <div className="font-mono text-[10px] text-cream uppercase tracking-widest">
              <span>Archetype</span>
              <span className="block text-cream font-bold">0{activeIdx + 1} of 0{DISPLAY_CATEGORIES.length}</span>
            </div>
            <div className="w-14 h-20 sm:w-16 sm:h-20 overflow-hidden bg-cream/10 border border-cream/30">
              <img
                ref={thumbRightRef}
                src={currentCategory.image}
                onError={(e) => handleImageFallback(e, currentCategory.id)}
                alt={currentCategory.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* LAYER 1 (Base): Normal dark ink text on cream. Row 0 starts centered at top: 50%, marginTop: -56px */}
        <div
          ref={baseListRef}
          className="absolute inset-x-0 text-center will-change-transform z-0 select-none"
          style={{ top: '50%', marginTop: '-56px' }}
        >
          <CategoryRowList onSelect={handleCategorySelect} isOverlay={false} />
        </div>

        {/* LAYER 2 (Overlay): White/cream text clipped to match red band (h-24, top: 50%, marginTop: -48px) */}
        <div
          className="absolute inset-x-0 h-28 z-20 overflow-hidden pointer-events-none"
          style={{ top: '50%', marginTop: '-56px' }}
        >
          <div
            ref={overlayListRef}
            className="w-full text-center will-change-transform select-none"
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            <CategoryRowList onSelect={handleCategorySelect} isOverlay={true} />
          </div>
        </div>

      </div>

      {/* Bottom Minimal Hint */}
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 flex items-center justify-between text-grey font-mono text-[10px] uppercase tracking-widest z-30 shrink-0">
        <span>0{activeIdx + 1} / 0{DISPLAY_CATEGORIES.length} Archetype Selected</span>
        <span>Click any row to jump to catalogue</span>
      </div>
    </section>
  );
}
