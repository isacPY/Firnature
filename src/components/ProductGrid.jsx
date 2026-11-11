import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../config/brand';
import { useStore } from '../state/store';
import { ProductCard } from './ProductCard';
import { animateProductSection, animateFilterTransition } from '../animations/productReveal';

export function ProductGrid() {
  const { activeCategory, setActiveCategory, savedIds, toggleSave, addToBag } = useStore();
  const gridContainerRef = useRef(null);
  const headingRef = useRef(null);

  // Mobile-only catalogue sort (the intro block below is md:hidden)
  const [sort, setSort] = useState('curated');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : activeCategory === 'exclusive'
      ? PRODUCTS.filter((p) => p.exclusive)
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const sortedProducts =
    sort === 'name-asc'
      ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
      : sort === 'name-desc'
        ? [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name))
        : filteredProducts;

  // Stable callbacks so ProductCard memo is never broken
  const handleToggleSave = useCallback((product) => toggleSave(product), [toggleSave]);
  const handleAddToBag   = useCallback((product, swatch) => addToBag(product, swatch), [addToBag]);

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const headingWords = headingRef.current?.querySelectorAll('.product-heading-word');
    const cards = gridContainerRef.current.querySelectorAll('.product-card');

    const anim = animateProductSection({
      headingWords,
      gridRef: gridContainerRef.current,
      cards: Array.from(cards),
      isFiltering: activeCategory !== 'all',
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [activeCategory]);

  const handleFilterClick = (catId) => {
    if (catId === activeCategory) return;
    const cards = gridContainerRef.current?.querySelectorAll('.product-card');
    
    animateFilterTransition({
      cards: Array.from(cards || []),
      onMiddle: () => {
        setActiveCategory(catId);
      },
    });
  };

  return (
    <section
      id="catalogue"
      className="relative w-full bg-cream py-16 sm:py-24 px-5 sm:px-8 border-b border-red/20"
      aria-label="Furniture Collection Catalogue"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Heading & Brief Intro Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-grey/20">
          <div>
            <span className="font-display text-xs sm:text-sm text-red tracking-[0.15em] uppercase block mb-2">
              03 — MONOLITHIC CATALOGUE
            </span>
            <h2
              ref={headingRef}
              className="font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] text-ink leading-[0.95] tracking-tight"
            >
              <div className="overflow-hidden">
                <span className="product-heading-word inline-block will-change-transform">
                  Curated Living
                </span>
                <span className="product-heading-word italic font-light ml-3 inline-block will-change-transform">
                  Artifacts.
                </span>
              </div>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-serif text-sm sm:text-base text-grey leading-relaxed">
              Every creation is available exclusively through our SoHo atelier and private showroom consultations. Finished by hand in limited editions.
            </p>
          </div>
        </div>

        {/* Mobile-only catalogue intro: punchy framing + sort, above the pills */}
        <div className="md:hidden pt-8 pb-2">
          <h3 className="font-serif text-[2rem] text-ink leading-[1.05] tracking-tight">
            Ready to <em className="font-light">live with.</em>
          </h3>
          <p className="font-serif text-sm text-grey leading-relaxed mt-2 max-w-sm">
            The current collection — finished by hand, in limited runs of 24 pieces.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <label htmlFor="catalogue-sort" className="font-mono text-[10px] text-grey uppercase tracking-widest shrink-0">
              Sorted by
            </label>
            <select
              id="catalogue-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pill-btn bg-transparent text-ink border-ink/30 cursor-pointer"
              aria-label="Sort catalogue"
            >
              <option value="curated">Curated</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="py-6 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar select-none">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilterClick(cat.id)}
                  className={`pill-btn ${isActive ? 'active' : 'bg-transparent text-ink border-ink/30 hover:border-red hover:text-red'}`}
                  aria-pressed={isActive}
                >
                  <span>{cat.name}</span>
                  <span className={`ml-1.5 text-[10px] ${isActive ? 'text-cream' : 'text-grey'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {activeCategory !== 'all' && (
            <button
              onClick={() => handleFilterClick('all')}
              className="font-serif italic text-xs text-red hover:underline shrink-0 pl-2"
            >
              View all ({PRODUCTS.length}) →
            </button>
          )}
        </div>

        {/* 4-Column Product Grid (Desktop: 4, Tablet: 2, Mobile: 1-2) */}
        <div
          ref={gridContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4"
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              saved={savedIds.includes(product.id)}
              onToggleSave={handleToggleSave}
              onAddToBag={handleAddToBag}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
