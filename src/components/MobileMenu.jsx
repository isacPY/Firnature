import React from 'react';
import { X, Search, Heart, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useStore } from '../state/store';
import { scrollTo } from '../animations';

export function MobileMenu() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openAppointment,
    savedProducts,
    bagCount,
    setIsSearchOpen,
    setIsSavedOpen,
    setIsBagOpen
  } = useStore();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    // "Private Viewing" is a booking action, not a scroll target — open the modal.
    if (href === '#appointment') {
      openAppointment();
      return;
    }
    setTimeout(() => {
      scrollTo(href);
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 bg-red text-cream flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300 overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-cream/25 pb-6">
        <span className="font-display text-4xl text-cream tracking-tight">
          {BRAND_CONFIG.wordmark}
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-cream/40 hover:bg-cream hover:text-red transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex flex-col gap-6 my-10" aria-label="Mobile Menu Links">
        {BRAND_CONFIG.navLinks.map((link, idx) => (
          <button
            key={link.label}
            onClick={() => handleLinkClick(link.href)}
            className="text-left font-serif italic text-4xl sm:text-5xl text-cream hover:translate-x-3 transition-transform duration-300 flex items-baseline gap-4"
          >
            <span className="font-display text-sm tracking-widest text-cream/60 not-italic">
              0{idx + 1}
            </span>
            <span>{link.label}</span>
          </button>
        ))}

        <button
          onClick={() => handleLinkClick('#contact')}
          className="text-left font-serif italic text-4xl sm:text-5xl text-cream hover:translate-x-3 transition-transform duration-300 flex items-baseline gap-4"
        >
          <span className="font-display text-sm tracking-widest text-cream/60 not-italic">
            06
          </span>
          <span>Showroom Visit</span>
        </button>
      </nav>

      {/* Bottom Actions & Details */}
      <div className="border-t border-cream/25 pt-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="flex-1 py-3 border border-cream/40 rounded-full flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest text-cream hover:bg-cream hover:text-red transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSavedOpen(true);
            }}
            className="flex-1 py-3 border border-cream/40 rounded-full flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest text-cream hover:bg-cream hover:text-red transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span>Saved ({savedProducts.length})</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsBagOpen(true);
            }}
            className="flex-1 py-3 border border-cream/40 rounded-full flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest text-cream hover:bg-cream hover:text-red transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({bagCount})</span>
          </button>
        </div>

        <div className="text-xs text-cream/70 font-sans flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>{BRAND_CONFIG.showroom.address}, {BRAND_CONFIG.showroom.city}</span>
          <span>{BRAND_CONFIG.showroom.phone}</span>
        </div>
      </div>
    </div>
  );
}
