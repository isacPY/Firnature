import React from 'react';
import { X, Trash2, Plus, Minus, MessageSquare } from 'lucide-react';
import { useStore } from '../state/store';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';
import { handleImageFallback } from '../utils/placeholders';

export function BagDrawer() {
  const {
    isBagOpen,
    setIsBagOpen,
    bag,
    removeFromBag,
    updateBagQuantity,
    clearBag,
  } = useStore();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isBagOpen) {
        setIsBagOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBagOpen, setIsBagOpen]);

  if (!isBagOpen) return null;

  const whatsappUrl = buildWhatsAppUrl(bag);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curated Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsBagOpen(false)}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-In Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col justify-between border-l border-red/20 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-grey/20 flex items-center justify-between">
            <div>
              <span className="font-display text-xs text-red tracking-widest uppercase block">
                CURATED SELECTION
              </span>
              <h2 className="font-serif text-2xl text-ink tracking-tight">
                Your Bag ({bag.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsBagOpen(false)}
              className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-red hover:border-red hover:text-cream transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Bag Items List (ZERO PRICES) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {bag.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="font-display text-3xl text-grey/50 tracking-wider">
                  BAG EMPTY
                </span>
                <p className="font-serif italic text-sm text-grey mt-2 max-w-xs">
                  Browse our monolithic catalogue to curate pieces for your private residence.
                </p>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full border border-ink text-xs font-sans tracking-widest uppercase hover:bg-red hover:border-red hover:text-cream transition-colors"
                >
                  Explore Catalogue
                </button>
              </div>
            ) : (
              bag.map((item) => {
                const p = item.product;
                return (
                  <div
                    key={p.id}
                    className="flex gap-4 p-3 bg-white/60 border border-grey/20 rounded-sm"
                  >
                    <div className="w-20 h-24 bg-ink/5 overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        onError={(e) => handleImageFallback(e, p.category)}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base text-ink tracking-tight">
                            {p.name}
                          </h4>
                          <button
                            onClick={() => removeFromBag(p.id)}
                            className="text-grey hover:text-red p-1"
                            aria-label={`Remove ${p.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-serif italic text-xs text-grey mt-0.5 line-clamp-1">
                          {p.materials}
                        </p>
                        <p className="font-mono text-[10px] text-grey mt-0.5">
                          {p.dimensions}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3 pt-2">
                        <span className="font-display text-[10px] tracking-wider text-grey uppercase">
                          QTY:
                        </span>
                        <div className="flex items-center border border-ink/20 rounded-full px-2 py-0.5 bg-white">
                          <button
                            onClick={() => updateBagQuantity(p.id, -1)}
                            className="text-ink hover:text-red p-0.5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs px-2 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateBagQuantity(p.id, 1)}
                            className="text-ink hover:text-red p-0.5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer: WhatsApp Order / Inquiry Call to Action (ZERO PRICES) */}
          {bag.length > 0 && (
            <div className="p-6 border-t border-grey/20 bg-white/40 space-y-4">
              <div className="text-xs text-grey font-serif italic text-center">
                Showroom consultations & private bespoke orders are scheduled via WhatsApp concierge.
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-red hover:bg-ink text-cream font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-lg transition-colors duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={clearBag}
                  className="font-serif text-grey hover:text-red transition-colors"
                >
                  Clear Selection
                </button>
                <span className="font-mono text-[10px] text-grey">
                  {BRAND_CONFIG.showroom.city}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
