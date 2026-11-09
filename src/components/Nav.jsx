import React from 'react';
import { ShoppingBag, Bookmark, Search, Menu } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useStore } from '../state/store';
import { scrollTo } from '../animations';

export function Nav() {
  const {
    customBrandName,
    bagCount,
    savedProducts,
    setIsBagOpen,
    setIsSavedOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    openAppointment,
  } = useStore();

  const handleNavLink = (e, href) => {
    e.preventDefault();
    if (href === '#appointment') {
      openAppointment();
      return;
    }
    scrollTo(href);
  };

  const displayWordmark = customBrandName
    ? (customBrandName.endsWith('°') ? customBrandName : `${customBrandName}°`)
    : BRAND_CONFIG.wordmark;

  return (
    <header
      className="sticky top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-red/15 py-3.5 sm:py-4 transition-all duration-200"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Left: Brand Monogram & Wordmark */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#main-content"
            onClick={(e) => handleNavLink(e, '#main-content')}
            className="flex items-baseline gap-1 group cursor-pointer"
            aria-label={`${displayWordmark} Home`}
          >
            <span className="font-display tracking-tight text-red text-2xl sm:text-3xl leading-none">
              {displayWordmark}
            </span>
          </a>

          <span className="hidden lg:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-grey pl-4 border-l border-grey/30">
            {BRAND_CONFIG.collectionYear}
          </span>
        </div>

        {/* Center: Curated Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs uppercase font-mono tracking-widest text-ink/80"
          aria-label="Primary Navigation"
        >
          {BRAND_CONFIG.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLink(e, link.href)}
              className="nav-link hover:text-red transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Search, Wishlist, Bag Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-ink hover:text-red transition-colors duration-200 cursor-pointer"
            aria-label="Open piece search"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Saved Pieces / Wishlist Trigger */}
          <button
            type="button"
            onClick={() => setIsSavedOpen(true)}
            className="relative p-1.5 text-ink hover:text-red transition-colors duration-200 cursor-pointer flex items-center gap-1"
            aria-label={`View saved pieces (${savedProducts.length})`}
          >
            <Bookmark className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {savedProducts.length > 0 && (
              <span className="inline-flex items-center justify-center font-mono text-[10px] font-semibold text-red">
                ({savedProducts.length})
              </span>
            )}
          </button>

          {/* Acquisition Inquiries Drawer (Bag) Trigger */}
          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            className="relative p-1.5 text-ink hover:text-red transition-colors duration-200 cursor-pointer flex items-center gap-1"
            aria-label={`View acquisition bag (${bagCount})`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="inline-flex items-center justify-center font-mono text-[10px] font-semibold text-red">
              ({bagCount})
            </span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-ink hover:text-red transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
