import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { CATEGORIES } from '../config/brand';
import { useStore } from '../state/store';
import { animateCategoryIndex } from '../animations/categoryIndex';
import { scrollTo } from '../animations';
import { handleImageFallback } from '../utils/placeholders';

// Stable list of categories (excluding 'all') for editorial index rows
const DISPLAY_CATEGORIES = CATEGORIES.filter((c) => c.id !== "all");

// Memoized row list with uniform 96px height (h-24) to ensure exact vertical indexing
const CategoryRowList = React.memo(function CategoryRowList({ onSelect, isOverlay = false }) {
  return (
    <>
      {DISPLAY_CATEGORIES.map((cat) => (
        <div
          key={isOverlay ? `overlay-${cat.id}` : cat.id}
          onClick={() => onSelect(cat.id)}
          className="category-row h-24 flex items-center justify-center cursor-pointer group select-none"
        >
          {isOverlay ? (
            <span className="font-serif italic text-[clamp(1.9rem,4vw,3.6rem)] text-cream tracking-tight font-light group-hover:underline transition-colors duration-200">
              {cat.name}
              <sup className="font-mono text-xs sm:text-sm text-cream/80 ml-2 not-italic">
                (0{cat.count})
              </sup>
            </span>
          ) : (
            <span className="font-serif text-[clamp(1.9rem,4vw,3.6rem)] text-ink tracking-tight group-hover:italic transition-colors duration-200">
              {cat.name}
              <sup className="font-mono text-xs sm:text-sm text-grey ml-2">
                (0{cat.count})
              </sup>
            </span>
          )}
        </div>
      ))}
    </>
  );
});

export function CategoryIndex() {
  const { setActiveCategory } = useStore();
  const [activeIdx, setActiveIdx] = useState(0);

  const containerRef = useRef(null);
  const baseListRef = useRef(null);
  const overlayListRef = useRef(null);
  const thumbLeftRef = useRef(null);
  const thumbRightRef = useRef(null);

  const handleCategorySelect = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    scrollTo('#catalogue');
  }, [setActiveCategory]);

  useEffect(() => {
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
  }, []);

  // Thumbnail cross-fade when active category changes
  useEffect(() => {
    const thumbs = [thumbLeftRef.current, thumbRightRef.current].filter(Boolean);
    if (thumbs.length) {
      gsap.killTweensOf(thumbs);
      gsap.fromTo(
        thumbs,
        { opacity: 0.35, y: 3 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeIdx]);

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
        
        {/* Central Red Band: Pinned vertically at 50% with exact -48px margin */}
        <div
          className="absolute inset-x-0 h-24 bg-red z-10 flex items-center justify-between px-4 sm:px-12 pointer-events-none shadow-sm"
          style={{ top: '50%', marginTop: '-48px' }}
        >
          {/* Left Floating Category Thumbnail inside red band */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-12 h-14 sm:w-14 sm:h-16 overflow-hidden bg-cream/10 border border-cream/30">
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
            <div className="text-left font-mono text-[10px] text-cream/80 uppercase tracking-widest">
              <span>{currentCategory.count} Pieces</span>
              <span className="block text-cream font-bold">In Showroom</span>
            </div>
          </div>

          {/* Right Floating Category Thumbnail inside red band */}
          <div className="hidden md:flex items-center gap-3 text-right">
            <div className="font-mono text-[10px] text-cream/80 uppercase tracking-widest">
              <span>Archetype</span>
              <span className="block text-cream font-bold">0{activeIdx + 1} of 0{DISPLAY_CATEGORIES.length}</span>
            </div>
            <div className="w-12 h-14 sm:w-14 sm:h-16 overflow-hidden bg-cream/10 border border-cream/30">
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

        {/* LAYER 1 (Base): Normal dark ink text on cream. Row 0 starts centered at top: 50%, marginTop: -48px */}
        <div
          ref={baseListRef}
          className="absolute inset-x-0 text-center will-change-transform z-0 select-none"
          style={{ top: '50%', marginTop: '-48px' }}
        >
          <CategoryRowList onSelect={handleCategorySelect} isOverlay={false} />
        </div>

        {/* LAYER 2 (Overlay): White/cream text clipped to match red band (h-24, top: 50%, marginTop: -48px) */}
        <div
          className="absolute inset-x-0 h-24 z-20 overflow-hidden pointer-events-none"
          style={{ top: '50%', marginTop: '-48px' }}
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
