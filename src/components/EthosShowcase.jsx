import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Armchair,
  Sofa,
  Table,
  Archive,
  Lamp,
  Bed,
  Disc,
  ChevronLeft,
  ChevronRight,
  Palette,
  Check,
  ArrowRight
} from 'lucide-react';
import { ETHOS_PILLARS, SHOWCASE_PALETTES } from '../config/ethosData';
import { animateCardSwipe } from '../animations/ethosShowcase';
import { useStore } from '../state/store';
import { getLocalSrcset } from '../utils/placeholders';
import { scrollTo } from '../animations';

const ICON_MAP = {
  Armchair,
  Sofa,
  Table,
  Archive,
  Lamp,
  Bed,
  Disc
};

export function EthosShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(ETHOS_PILLARS.length - 1);
  const [activePaletteId, setActivePaletteId] = useState('atelier');

  const { setActiveCategory } = useStore();

  // Card elements
  const currentCardRef = useRef(null);
  const leftDroppedCardRef = useRef(null);
  const badgeRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Active pillar items
  const currentPillar = ETHOS_PILLARS[activeIdx] || ETHOS_PILLARS[0];
  const leftDroppedPillar = ETHOS_PILLARS[prevIdx] || ETHOS_PILLARS[ETHOS_PILLARS.length - 1];
  const currentSrcset = getLocalSrcset(currentPillar.image, '(max-width: 768px) 94vw, 700px');
  const leftSrcset = getLocalSrcset(leftDroppedPillar.image, '(max-width: 768px) 94vw, 700px');

  // Current active palette
  const currentPalette = useMemo(() => {
    return SHOWCASE_PALETTES.find((p) => p.id === activePaletteId) || SHOWCASE_PALETTES[0];
  }, [activePaletteId]);

  // Execute the exact swipe-to-left dropping card transition
  const handleSelectPillar = useCallback((targetIdx, direction = 1) => {
    if (targetIdx === activeIdx) return;
    
    setPrevIdx(activeIdx);
    setActiveIdx(targetIdx);
    isAnimatingRef.current = true;

    animateCardSwipe({
      outgoingCardRef: leftDroppedCardRef.current,
      incomingCardRef: currentCardRef.current,
      badgeRef: badgeRef.current,
      direction,
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
  }, [activeIdx]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIdx + 1) % ETHOS_PILLARS.length;
    handleSelectPillar(nextIdx, 1);
  }, [activeIdx, handleSelectPillar]);

  const handlePrev = useCallback(() => {
    const targetIdx = (activeIdx - 1 + ETHOS_PILLARS.length) % ETHOS_PILLARS.length;
    handleSelectPillar(targetIdx, -1);
  }, [activeIdx, handleSelectPillar]);

  // Switch palette live across CSS custom properties
  const handleSwitchPalette = useCallback((palette) => {
    setActivePaletteId(palette.id);
    document.documentElement.style.setProperty('--red', palette.sidebarBgHex);
    document.documentElement.style.setProperty('--cream', palette.mainBgHex);
    
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', palette.mainBgHex);
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  const handleNavigateToCategory = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    scrollTo('#catalogue');
  }, [setActiveCategory]);

  const IconComponent = ICON_MAP[currentPillar.iconName] || Armchair;
  const LeftIconComponent = ICON_MAP[leftDroppedPillar.iconName] || Armchair;

  return (
    <section
      id="ethos-showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Curated Furniture Archetypes & Lighting Showcase"
      className="relative w-full min-h-[680px] lg:h-[740px] overflow-hidden select-none border-b border-red/20 focus:outline-none flex flex-col lg:flex-row transition-colors duration-500"
      style={{ backgroundColor: currentPalette.mainBgHex }}
    >
      {/* ============================================================== */}
      {/* LEFT COLUMN: Perfectly Balanced & Centered Category Pills       */}
      {/* ============================================================== */}
      <div
        className="relative w-full lg:w-[42%] xl:w-[38%] shrink-0 h-auto lg:h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-500 shadow-xl z-20"
        style={{ backgroundColor: currentPalette.sidebarBgHex }}
      >
        {/* Top Header Row */}
        <div className="shrink-0 pb-3 border-b border-white/15">
          <span className="font-mono text-[10px] sm:text-[11px] text-white uppercase tracking-[0.2em] font-semibold block">
            03 — ARCHETYPES & LIGHTING
          </span>
          <p className="font-serif italic text-xs text-white mt-0.5">
            Curated monolithic furniture & lighting collections
          </p>
        </div>

        {/* Center Pill List: Perfectly Centered Vertically, No Hopping, Fully Contained */}
        <div className="w-full my-auto py-5 sm:py-6 flex flex-col gap-2.5 sm:gap-3">
          {ETHOS_PILLARS.map((pillar, idx) => {
            const isActive = idx === activeIdx;
            const PillIcon = ICON_MAP[pillar.iconName] || Armchair;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => handleSelectPillar(idx, idx > activeIdx ? 1 : -1)}
                className={`w-full rounded-full py-2.5 sm:py-3 px-4 sm:px-5 flex items-center justify-between transition-all duration-200 text-left cursor-pointer box-border ${
                  isActive
                    ? 'bg-white text-ink shadow-lg shadow-black/25 ring-2 ring-white/60'
                    : 'bg-black/25 hover:bg-black/35 text-white border border-white/20 backdrop-blur-xs hover:translate-x-0.5'
                }`}
                aria-pressed={isActive}
                aria-label={`View ${pillar.title}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Left Pill Icon */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-white/90'
                    }`}
                    style={{
                      backgroundColor: isActive ? currentPalette.sidebarBgHex : 'rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <PillIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>

                  {/* Pill Label */}
                  <span
                    className={`font-display text-xs sm:text-sm tracking-[0.08em] uppercase truncate ${
                      isActive ? 'font-bold text-ink' : 'font-medium text-white'
                    }`}
                  >
                    {pillar.title}
                  </span>
                </div>

                {/* Right Piece Count Tag */}
                <span
                  className={`font-mono text-[10px] sm:text-[11px] shrink-0 ml-2 ${
                    isActive ? 'text-ink/60' : 'text-white'
                  }`}
                >
                  {pillar.pieceCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Status Row */}
        <div className="shrink-0 pt-3 border-t border-white/15 flex items-center justify-between text-white">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">
            Select Category to Inspect
          </span>
          <span className="font-mono text-[10px]">
            0{activeIdx + 1} / 0{ETHOS_PILLARS.length}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT COLUMN: Layered Card Deck with Swipe-to-Left Drop       */}
      {/* ============================================================== */}
      <div
        className="relative flex-1 w-full h-[500px] lg:h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-500 overflow-hidden"
        style={{ backgroundColor: currentPalette.mainBgHex }}
      >
        {/* Top Bar: Floating Palette Switcher (Matches Pitch Controls) */}
        <div className="w-full flex items-center justify-between z-30">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-ink/50 hidden sm:inline-block">
            {currentPillar.cardSubtitle}
          </span>

          <div className="ml-auto flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
            <Palette className="w-3.5 h-3.5 text-cream/70" />
            <span className="font-mono text-[10px] text-cream uppercase tracking-widest mr-1">
              Palette:
            </span>
            <div className="flex items-center gap-1.5">
              {SHOWCASE_PALETTES.map((pal) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => handleSwitchPalette(pal)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-transform cursor-pointer ${
                    activePaletteId === pal.id
                      ? 'border-white scale-110 shadow-sm ring-2 ring-white/30'
                      : 'border-white/30 hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: pal.sidebarBgHex }}
                  title={`${pal.name} (${pal.tagline})`}
                  aria-label={`Switch to ${pal.name} color palette`}
                >
                  {activePaletteId === pal.id && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Layered Cards with Swipe-To-Left Physics */}
        <div className="relative w-full max-w-[460px] aspect-[4/5] max-h-[500px] mx-auto my-auto flex items-center justify-center">
          
          {/* ---------------- 1. LEFT DROPPED CARD (Previous one dropped left) ---------------- */}
          <div
            ref={leftDroppedCardRef}
            className="absolute w-[90%] aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border border-white/40 pointer-events-none will-change-transform z-10"
            style={{
              transform: 'translate3d(-75px, 8px, 0) scale(0.88) rotate(-2.2deg)',
              opacity: 0.55
            }}
          >
            <img
              src={leftDroppedPillar.image}
              {...(leftSrcset ? { srcSet: leftSrcset.srcSet, sizes: leftSrcset.sizes } : {})}
              alt={leftDroppedPillar.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
            
            {/* Top Label */}
            <div className="absolute top-4 left-5 sm:top-6 sm:left-7">
              <span className="font-mono text-[9px] sm:text-[10px] text-white uppercase tracking-widest">
                {leftDroppedPillar.cardSubtitle}
              </span>
              <h3 className="font-display text-sm sm:text-base text-white uppercase tracking-wider mt-0.5">
                {leftDroppedPillar.cardTitle}
              </h3>
            </div>

            {/* Embedded Badge */}
            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-7 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <LeftIconComponent className="w-3.5 h-3.5 text-ink" />
              <span className="font-display text-[10px] sm:text-xs text-ink uppercase tracking-wider">
                {leftDroppedPillar.badgeLabel}
              </span>
            </div>
          </div>

          {/* ---------------- 2. ACTIVE FOREGROUND CARD ---------------- */}
          <div
            ref={currentCardRef}
            className="relative w-[94%] aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-white/60 z-20 will-change-transform group cursor-pointer"
            onClick={handleNext}
            title="Click card to view next archetype"
          >
            <img
              src={currentPillar.image}
              {...(currentSrcset ? { srcSet: currentSrcset.srcSet, sizes: currentSrcset.sizes } : {})}
              alt={currentPillar.title}
              fetchpriority="high"
              decoding="sync"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

            {/* Top Meta inside Card */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 right-5 sm:right-7 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentPalette.sidebarBgHex }} />
                  <span className="font-mono text-[10px] sm:text-xs text-white/90 uppercase tracking-[0.2em] font-medium drop-shadow-sm">
                    {currentPillar.cardSubtitle}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-wider drop-shadow-md mt-1">
                  {currentPillar.cardTitle}
                </h3>
                <span className="font-mono text-[10px] sm:text-[11px] text-white block mt-0.5">
                  {currentPillar.cardDimensions}
                </span>
              </div>
            </div>

            {/* Description Snippet & Link */}
            <div className="absolute bottom-20 sm:bottom-22 left-5 sm:left-7 right-5 sm:right-7">
              <p className="font-serif italic text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-md max-w-sm">
                "{currentPillar.cardDescription}"
              </p>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToCategory(currentPillar.categoryId);
                }}
                className="mt-2.5 inline-flex items-center gap-1.5 font-display text-[11px] sm:text-xs text-white uppercase tracking-widest hover:underline cursor-pointer group/link"
              >
                <span>Explore in Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </button>
            </div>

            {/* Embedded Floating Frosted Badge */}
            <div
              ref={badgeRef}
              className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full flex items-center gap-2.5 shadow-xl border border-white/60 will-change-transform"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: currentPalette.sidebarBgHex }}
              >
                <IconComponent className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="font-display text-xs sm:text-sm text-ink uppercase tracking-wider font-semibold">
                {currentPillar.badgeLabel}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Watermark + Previous / Next Arrow Controls */}
        <div className="w-full flex items-center justify-between z-30 pt-2">
          <span
            className="font-serif italic text-2xl sm:text-3xl tracking-tight opacity-80 select-none block"
            style={{ color: currentPalette.watermarkColor }}
          >
            atelier°
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ink/20 bg-white/60 backdrop-blur-md hover:bg-white text-ink flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous archetype"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ink/20 bg-white/60 backdrop-blur-md hover:bg-white text-ink flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Next archetype"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
