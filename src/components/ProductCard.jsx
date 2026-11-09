import React, { useState, useCallback } from 'react';
import { Bookmark, ShoppingBag, Eye, FileText, Calendar, User, Check } from 'lucide-react';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';
import { useStore } from '../state/store';

export const ProductCard = React.memo(function ProductCard({
  product,
  saved,
  onToggleSave,
  onAddToBag
}) {
  const { openTearSheet, openAppointment } = useStore();
  
  // Active swatch state (defaults to primary product image and materials)
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(0);
  const [showScale, setShowScale] = useState(false);

  const swatches = product.swatches || [
    { id: 'default', name: 'Primary Finish', colorHex: product.isAccentRed ? '#C80818' : '#3A3029', image: product.image }
  ];

  const currentSwatch = swatches[activeSwatchIndex] || swatches[0];
  const displayImage = currentSwatch.image || product.image;
  const displaySrcset = getLocalSrcset(displayImage);

  const handleSelectSwatch = (e, index) => {
    e.stopPropagation();
    setActiveSwatchIndex(index);
  };

  const toggleScaleOverlay = (e) => {
    e.stopPropagation();
    setShowScale((prev) => !prev);
  };

  return (
    <article
      className="product-card group relative flex flex-col justify-between bg-cream border border-grey/20 hover:border-red/40 transition-colors duration-300 gpu-layer will-change-transform"
      aria-label={`${product.name} card`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5 border-b border-grey/20">
        
        {/* Main Product Image */}
        <div className="product-photo w-full h-full will-change-transform">
          <img
            src={displayImage}
            {...(displaySrcset ? { srcSet: displaySrcset.srcSet, sizes: displaySrcset.sizes } : {})}
            onError={(e) => handleImageFallback(e, product.category)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Human Scale Silhouette Overlay (Toggled via [ Scale ] button) */}
        {showScale && (
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-in fade-in duration-200">
            <div className="relative w-full h-full flex items-end justify-center pb-6">
              
              {/* Proportional Human Figure Icon (Standard 1.75m Reference) */}
              <div className="flex flex-col items-center mr-6 text-cream">
                <svg className="w-12 h-28 stroke-current fill-none stroke-[1.2]" viewBox="0 0 24 64">
                  {/* Head */}
                  <circle cx="12" cy="8" r="6" />
                  {/* Torso & Legs */}
                  <path d="M12 14v22M12 22h-8v12M12 22h8v12M12 36l-5 24M12 36l5 24" />
                </svg>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cream mt-1">
                  1.75 m Reference
                </span>
              </div>

              {/* Dimension Metrics */}
              <div className="bg-ink/90 border border-white/20 p-3 rounded-sm font-mono text-[11px] text-cream space-y-1">
                <span className="text-cream uppercase block font-semibold">Proportions</span>
                <span className="block">{product.dimensions}</span>
                {product.seatHeight && (
                  <span className="block text-cream text-[10px]">{product.seatHeight}</span>
                )}
                <span className="block text-cream/80 text-[9px]">{product.weight || 'Net Weight: 35 kg'}</span>
              </div>
            </div>

            {/* Close Scale Button */}
            <button
              type="button"
              onClick={toggleScaleOverlay}
              className="absolute top-3 right-3 text-cream hover:text-white font-mono text-xs p-1"
            >
              ✕ Close
            </button>
          </div>
        )}

        {/* Top Badges: Category Label & Red Accent Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-widest bg-cream/90 text-ink px-2.5 py-1 backdrop-blur-xs border border-ink/10">
            {product.categoryLabel || product.category}
          </span>
          {product.isAccentRed && (
            <span className="font-display text-[10px] uppercase tracking-wider bg-red text-cream px-2 py-0.5">
              Haute Red
            </span>
          )}
        </div>

        {/* Top Right Quick Actions: Save & Trade Spec */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              saved
                ? 'bg-red text-cream shadow-md'
                : 'bg-cream/90 text-ink hover:bg-red hover:text-cream border border-ink/10'
            }`}
            aria-label={saved ? 'Remove from curated wishlist' : 'Save piece to wishlist'}
            title={saved ? 'Saved' : 'Save Piece'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openTearSheet(product);
            }}
            className="w-8 h-8 rounded-full bg-cream/90 text-ink hover:bg-ink hover:text-white border border-ink/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={`Open trade spec sheet for ${product.name}`}
            title="Download Trade Spec Sheet"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Floating Bar: Material Swatches & Human Scale Button */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
          {/* Swatches dots */}
          {swatches.length > 1 && (
            <div className="flex items-center gap-2.5 bg-cream/90 backdrop-blur-md px-2 py-1 rounded-full border border-ink/10 shadow-xs">
              {swatches.map((swatch, idx) => (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={(e) => handleSelectSwatch(e, idx)}
                  className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                    activeSwatchIndex === idx
                      ? 'border-red scale-110 ring-1 ring-red/60 shadow-xs'
                      : 'border-ink/20 opacity-75 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.colorHex }}
                  title={swatch.name}
                  aria-label={`Select ${swatch.name} finish`}
                />
              ))}
            </div>
          )}

          {/* Scale Toggle Pill */}
          <button
            type="button"
            onClick={toggleScaleOverlay}
            className={`ml-auto font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border transition-colors cursor-pointer ${
              showScale
                ? 'bg-red text-cream border-red'
                : 'bg-cream/90 text-ink/80 hover:text-red hover:border-red border-ink/10'
            }`}
            title="Toggle architectural human proportion overlay"
          >
            Scale 🧍
          </button>
        </div>

      </div>

      {/* Product Content Block */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif text-lg sm:text-xl font-light text-ink tracking-tight group-hover:text-red transition-colors duration-200">
              {product.name}
            </h3>
          </div>

          {/* Finish & Materials Label */}
          <p className="font-mono text-[11px] text-grey mb-1">
            {currentSwatch.name !== 'Primary Finish' ? `${currentSwatch.name} • ` : ''}{product.materials}
          </p>

          <span className="font-mono text-[10px] text-grey tracking-wider block mb-3">
            {product.dimensions}
          </span>

          <p className="font-serif italic text-xs text-grey leading-relaxed line-clamp-2">
            "{product.description}"
          </p>
        </div>

        {/* Bottom Actions: Inquire via Concierge & VIP Appointment */}
        <div className="mt-4 pt-3 border-t border-grey/15 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openAppointment(product);
            }}
            className="font-mono text-[10px] text-red uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Viewing</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToBag(product);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-cream hover:bg-red font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
            aria-label={`Add ${product.name} to acquisition inquiry`}
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Acquire</span>
          </button>
        </div>
      </div>
    </article>
  );
});
