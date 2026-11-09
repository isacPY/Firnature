import React, { useEffect, useCallback } from 'react';
import { X, Printer, MessageSquare, Download, Check, ShieldCheck, Ruler } from 'lucide-react';
import { useStore } from '../state/store';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';
import { handleImageFallback } from '../utils/placeholders';

export function TradeTearSheetModal() {
  const { isTearSheetOpen, closeTearSheet, tearSheetProduct } = useStore();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeTearSheet();
  }, [closeTearSheet]);

  useEffect(() => {
    if (isTearSheetOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isTearSheetOpen, handleKeyDown]);

  if (!isTearSheetOpen || !tearSheetProduct) return null;

  const product = tearSheetProduct;
  const whatsAppInquiryUrl = buildWhatsAppUrl(
    [product],
    `Hello ${BRAND_CONFIG.wordmark} Concierge, I am requesting the trade specification and commission details for ${product.name} (${product.dimensions}).`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} Trade Specification Tear Sheet`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/75 backdrop-blur-sm overflow-y-auto"
    >
      {/* Background backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={closeTearSheet} />

      {/* Printable Sheet Container */}
      <div className="relative w-full max-w-4xl bg-white text-ink shadow-2xl rounded-sm overflow-hidden my-auto max-h-[92vh] flex flex-col border border-ink/10">
        
        {/* Screen-Only Action Bar (Hidden when printed) */}
        <div className="no-print bg-cream px-5 py-3.5 border-b border-ink/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">
              Architectural Trade Tear Sheet
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink text-white font-mono text-xs uppercase tracking-wider hover:bg-red transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <a
              href={whatsAppInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-ink/20 font-mono text-xs uppercase tracking-wider text-ink hover:border-red hover:text-red transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>

            <button
              type="button"
              onClick={closeTearSheet}
              className="w-8 h-8 rounded-full flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors cursor-pointer"
              aria-label="Close specification sheet"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Editorial Document */}
        <div id="printable-tear-sheet" className="p-6 sm:p-10 lg:p-12 overflow-y-auto flex-1 font-serif">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-ink pb-6 mb-8">
            <div>
              <span className="font-display text-2xl sm:text-3xl text-red uppercase tracking-tight block">
                {BRAND_CONFIG.wordmark}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-grey uppercase tracking-[0.2em] block mt-1">
                Haute Architecture & Monolithic Living • Trade Specimen
              </span>
            </div>

            <div className="text-right font-mono text-[10px] sm:text-xs text-grey">
              <span className="block font-semibold text-ink">SPEC NO: AT-{product.id.toUpperCase()}</span>
              <span className="block">{BRAND_CONFIG.collectionYear}</span>
              <span className="block">SoHo Atelier NYC</span>
            </div>
          </div>

          {/* Product Hero Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-grey/20">
            {/* Left Photo */}
            <div className="md:col-span-7 aspect-[4/3] bg-cream/50 overflow-hidden border border-grey/30 relative">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => handleImageFallback(e, product.category)}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-wider uppercase">
                {product.categoryLabel || product.category}
              </div>
            </div>

            {/* Right Quick Specs */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-red uppercase tracking-widest block mb-1">
                  Item Specification
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-ink font-light tracking-tight mb-3">
                  {product.name}
                </h1>
                <p className="font-serif italic text-xs sm:text-sm text-grey leading-relaxed mb-4">
                  "{product.description}"
                </p>
              </div>

              <div className="space-y-2 border-t border-grey/20 pt-4 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-grey/10">
                  <span className="text-grey">Dimensions:</span>
                  <span className="font-semibold text-ink">{product.dimensions}</span>
                </div>
                {product.seatHeight && (
                  <div className="flex justify-between py-1 border-b border-grey/10">
                    <span className="text-grey">Seat Height / Clr:</span>
                    <span className="text-ink">{product.seatHeight}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-grey/10">
                  <span className="text-grey">Net Weight:</span>
                  <span className="text-ink">{product.weight || '38 kg (Estimated)'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-grey/10">
                  <span className="text-grey">Commission Lead:</span>
                  <span className="text-ink">{product.leadTime || '6 — 8 Weeks'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Architectural Specifications Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-grey/20">
            <div>
              <span className="font-display text-xs text-red uppercase tracking-widest block mb-2">
                Primary Materials & Core
              </span>
              <p className="font-mono text-xs text-ink/80 leading-relaxed">
                {product.materials}
              </p>
              <p className="font-serif italic text-[11px] text-grey mt-2">
                Sustainably sourced timber and hand-hewn minerals verified by direct quarry origin certificates.
              </p>
            </div>

            <div>
              <span className="font-display text-xs text-red uppercase tracking-widest block mb-2">
                Guild Provenance
              </span>
              <p className="font-mono text-xs text-ink/80 leading-relaxed">
                {product.provenance || 'European Master Craftsmen / Certified Regional Guilds'}
              </p>
              <p className="font-serif italic text-[11px] text-grey mt-2">
                Hand-finished in small monolithic batches to guarantee heirloom structural permanence.
              </p>
            </div>

            <div>
              <span className="font-display text-xs text-red uppercase tracking-widest block mb-2">
                Trade & Customization
              </span>
              <p className="font-mono text-xs text-ink/80 leading-relaxed">
                COM / COL Available on Request. Custom dimension adjustments accommodated for certified architectural trade accounts.
              </p>
            </div>
          </div>

          {/* Footer & Concierge Stamp */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-grey gap-4">
            <div>
              <span className="font-bold text-ink uppercase block">{BRAND_CONFIG.showroom.title}</span>
              <span>{BRAND_CONFIG.showroom.address}, {BRAND_CONFIG.showroom.city}</span>
              <span className="block mt-0.5">Concierge: {BRAND_CONFIG.showroom.displayPhone} • {BRAND_CONFIG.showroom.email}</span>
            </div>

            <div className="p-3 border border-red/40 rounded-sm bg-red/5 text-center sm:text-right">
              <span className="font-display text-xs text-red tracking-wider uppercase block">
                Official Provenance Certified
              </span>
              <span className="font-mono text-[9px] text-grey block">
                Zero planned obsolescence • Built for two centuries
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
