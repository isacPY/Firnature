import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, PRODUCTS } from '../config/brand';
import { useStore } from '../state/store';
import { scrollTo } from '../animations';
import { handleImageFallback } from '../utils/placeholders';

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, addToBag, setActiveCategory } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setActiveCategory(product.category);
    scrollTo('#catalogue');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalogue"
      className="fixed inset-0 z-50 bg-cream overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-8 sm:py-12 min-h-screen flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-red/20 pb-6">
          <span className="font-display text-xs text-red tracking-[0.2em] uppercase">
            LIVE ARCHIVE SEARCH
          </span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-red hover:border-red hover:text-cream transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Big Serif Search Input */}
        <div className="my-10 sm:my-16">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chairs, travertine, bouclé, lighting..."
              className="w-full bg-transparent font-serif italic text-[clamp(1.8rem,4vw,3.8rem)] text-ink placeholder:text-grey/40 border-b border-ink/40 pb-4 focus:outline-none focus:border-red transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-0 bottom-6 text-xs font-display text-grey hover:text-red uppercase"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-grey">
            <span className="font-display uppercase tracking-wider text-red">Suggestions:</span>
            {['Travertine', 'Bouclé', 'Walnut', 'Alabaster', 'Mohair'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="font-serif italic hover:text-ink hover:underline"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        <div className="flex-1">
          {query.trim() && (
            <div>
              <div className="font-display text-xs text-grey tracking-widest uppercase mb-6">
                Matching Pieces ({results.length})
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif italic text-xl text-grey">
                    No pieces found matching “{query}”.
                  </p>
                  <p className="font-serif text-sm text-grey/80 mt-2">
                    Our atelier crafts bespoke commissions for private architects. Contact concierge for custom sourcing.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="group p-3 bg-white/70 border border-grey/20 rounded-sm cursor-pointer hover:border-red transition-all"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-ink/5 mb-3">
                        <img
                          src={p.image}
                          onError={(e) => handleImageFallback(e, p.category)}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-ink group-hover:text-red">
                          {p.name}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-grey group-hover:text-red shrink-0" />
                      </div>
                      <p className="font-serif italic text-xs text-grey mt-0.5">
                        {p.materials}
                      </p>
                      <p className="font-mono text-[10px] text-grey mt-0.5">
                        {p.dimensions}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-grey/20 flex items-center justify-between text-xs text-grey">
          <span className="font-mono text-[11px]">Press ESC to close</span>
          <span className="font-display uppercase tracking-wider text-red">{BRAND_CONFIG.wordmark} ARCHIVE</span>
        </div>

      </div>
    </div>
  );
}
