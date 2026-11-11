import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Globe } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';
import { useStore } from '../state/store';
import { MaskedLetters } from '../utils/textSplitter';
import { animateFooter } from '../animations/footer';
import { scrollTo } from '../animations';

export function Footer() {
  const { toggleDeviceEndCard, customBrandName, openAppointment } = useStore();
  const wordmarkRef = useRef(null);

  // Mobile-only newsletter capture (no backend on the demo — confirms inline)
  const [email, setEmail] = useState('');
  const [emailJoined, setEmailJoined] = useState(false);

  useEffect(() => {
    if (!wordmarkRef.current) return;
    const letters = wordmarkRef.current.querySelectorAll('.footer-wordmark-letter');
    const anim = animateFooter({
      wordmarkElement: wordmarkRef.current,
      letters: Array.from(letters)
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, []);

  const displayWordmark = customBrandName
    ? (customBrandName.endsWith('°') ? customBrandName : `${customBrandName}°`)
    : BRAND_CONFIG.wordmark;

  // Pitch tools are for live demos only — hide them on the public site
  // unless opened with ?pitch=1 (e.g. http://localhost:5173/?pitch=1)
  const isPitchMode =
    typeof window !== 'undefined' && window.location.search.includes('pitch=1');

  return (
    <footer
      id="about"
      className="relative w-full bg-ink text-cream pt-20 sm:pt-28 pb-10 sm:pb-16 px-5 sm:px-8 overflow-hidden select-none"
      aria-label="Atelier Footer"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Mobile-only newsletter band — red, like the manifesto band */}
        <div className="md:hidden bg-red -mx-5 sm:-mx-8 px-5 sm:px-8 py-10 mb-14">
          <h2 className="font-serif text-[1.9rem] text-cream leading-[1.08] tracking-tight">
            One letter a month. New pieces, private viewings, nothing else.
          </h2>
          {emailJoined ? (
            <p className="font-serif italic text-cream text-base mt-4">
              You are on the list — welcome to the atelier.
            </p>
          ) : (
            <form
              className="mt-5 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim().includes('@')) setEmailJoined(true);
              }}
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-transparent border border-cream/60 text-cream placeholder:text-cream/60 px-4 py-3 text-sm outline-none focus:border-cream"
              />
              <button
                type="submit"
                className="shrink-0 border border-cream text-cream px-4 py-3 text-xs font-sans uppercase tracking-wider hover:bg-cream hover:text-red transition-colors"
              >
                Join the list
              </button>
            </form>
          )}
        </div>

        {/* Top Grid: Manifesto & Atelier Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-cream/15">
          
          {/* Col 1: Brand Manifesto & Year */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-display text-xs sm:text-sm text-cream tracking-[0.2em] uppercase block mb-3">
                Architectural Monoliths
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-cream leading-snug tracking-tight max-w-md">
                Timeless proportions engineered for monumental interiors and private sanctuaries.
              </h2>
            </div>

            <div className="mt-8 font-mono text-xs text-cream/60 space-y-1">
              <p>Catalogue Monograph № {BRAND_CONFIG.collectionYear}</p>
              <p>All designs copyrighted under architectural provenance.</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-widest text-cream/70">
            <span className="font-display text-xs text-cream tracking-wider block mb-4">
              Explore
            </span>
            <div>
              <a
                href="#catalogue"
                onClick={(e) => { e.preventDefault(); scrollTo('#catalogue'); }}
                className="hover:text-cream transition-colors block py-1"
              >
                Full Catalogue
              </a>
            </div>
            <div>
              <a
                href="#ethos-showcase"
                onClick={(e) => { e.preventDefault(); scrollTo('#ethos-showcase'); }}
                className="hover:text-cream transition-colors block py-1"
              >
                Craft & Archetypes
              </a>
            </div>
            <div>
              <a
                href="#rooms"
                onClick={(e) => { e.preventDefault(); scrollTo('#rooms'); }}
                className="hover:text-cream transition-colors block py-1"
              >
                Spatial Rooms
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={() => openAppointment()}
                className="hover:text-red transition-colors text-left uppercase font-mono block py-2 cursor-pointer"
              >
                Book VIP Viewing
              </button>
            </div>
          </div>

          {/* Col 3: Direct Flagship Concierge */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs text-cream/70">
            <span className="font-display text-xs text-cream tracking-wider block mb-4">
              Concierge & Flagship
            </span>

            <div className="pt-2 space-y-1.5">
              <a
                href={`tel:+${BRAND_CONFIG.showroom.phone.replace(/[^0-9]/g, '')}`}
                className="hover:text-red transition-colors flex items-center gap-2 py-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-red" />
                <span>{BRAND_CONFIG.showroom.displayPhone}</span>
              </a>

              <a
                href={`mailto:${BRAND_CONFIG.showroom.email}`}
                className="hover:text-red transition-colors flex items-center gap-2 py-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-red" />
                <span>{BRAND_CONFIG.showroom.email}</span>
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red transition-colors flex items-center gap-2 py-1.5"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-red" />
                <span>Direct WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Pitch Monogram Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-cream/70 gap-4">
          <p>© {new Date().getFullYear()} {displayWordmark} All architectural rights reserved.</p>
          
          <div className="flex items-center gap-6">
            {isPitchMode && (
              <button
                type="button"
                onClick={toggleDeviceEndCard}
                className="hover:text-white cursor-pointer transition-colors"
                aria-label="Confidential Pitch Monograph — Open demonstration"
              >
                Confidential Pitch Monograph
              </button>
            )}
          </div>
        </div>

        {/* Giant Wide-Tracked Brand Wordmark Rising from Mask */}
        <div
          ref={wordmarkRef}
          className="w-full text-center overflow-hidden pt-4 select-none pointer-events-none"
        >
          <div className="inline-block overflow-hidden leading-[0.8] tracking-[-0.03em]">
            <MaskedLetters
              text={displayWordmark}
              className="footer-wordmark-letter font-display uppercase text-cream/90 text-[clamp(4.5rem,18.5vw,22rem)] max-md:text-[clamp(3.25rem,15vw,6rem)] inline-block will-change-transform"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
