import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../state/store';
import { handleImageFallback } from '../utils/placeholders';

export function SavedDrawer() {
  const {
    isSavedOpen,
    setIsSavedOpen,
    savedProducts,
    toggleSave,
    addToBag,
  } = useStore();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSavedOpen) {
        setIsSavedOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSavedOpen, setIsSavedOpen]);

  if (!isSavedOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Wishlist"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsSavedOpen(false)}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-In Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col justify-between border-l border-red/20 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-grey/20 flex items-center justify-between">
            <div>
              <span className="font-display text-xs text-red tracking-widest uppercase block">
                PRIVATE ARCHIVE
              </span>
              <h2 className="font-serif text-2xl text-ink tracking-tight">
                Saved Pieces ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsSavedOpen(false)}
              className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-red hover:border-red hover:text-cream transition-colors"
              aria-label="Close saved drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Saved Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="font-display text-3xl text-grey/50 tracking-wider">
                  ARCHIVE EMPTY
                </span>
                <p className="font-serif italic text-sm text-grey mt-2 max-w-xs">
                  Tap the heart icon on any piece to save it for your private design consultation.
                </p>
              </div>
            ) : (
              savedProducts.map((p) => (
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
                          onClick={() => toggleSave(p)}
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

                    {/* Move to Bag Action */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToBag(p);
                          toggleSave(p);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/40 hover:border-red hover:bg-red hover:text-cream font-sans text-[11px] uppercase tracking-wider transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="p-6 border-t border-grey/20 bg-white/40 text-center">
            <span className="font-serif italic text-xs text-grey">
              Pieces remain in your local archive across visits.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
