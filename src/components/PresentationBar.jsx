import React, { useEffect, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2, X, MonitorPlay } from 'lucide-react';
import { useStore } from '../state/store';
import { scrollTo } from '../animations';

const CHAPTERS = [
  { id: 'hero', title: '01 Vision & Scale', target: '#main-content' },
  { id: 'manifesto', title: '02 Architectural Statement', target: '#statement-section' },
  { id: 'index', title: '03 Taxonomy Index', target: '#category-index' },
  { id: 'archetypes', title: '04 Craft & Archetypes', target: '#ethos-showcase' },
  { id: 'catalogue', title: '05 Curated Collection', target: '#catalogue' },
  { id: 'rooms', title: '06 Spatial Sanctuary', target: '#rooms' },
  { id: 'visit', title: '07 Showroom & Concierge', target: '#visit' },
];

export function PresentationBar() {
  const { isPresentationMode, togglePresentationMode, customBrandName } = useStore();
  const [currentChapter, setCurrentChapter] = React.useState(0);

  const goToChapter = useCallback((index) => {
    const safeIdx = Math.max(0, Math.min(CHAPTERS.length - 1, index));
    setCurrentChapter(safeIdx);
    scrollTo(CHAPTERS[safeIdx].target);
  }, []);

  const handleNext = useCallback(() => {
    goToChapter(currentChapter + 1);
  }, [currentChapter, goToChapter]);

  const handlePrev = useCallback(() => {
    goToChapter(currentChapter - 1);
  }, [currentChapter, goToChapter]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!isPresentationMode) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        togglePresentationMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, handleNext, handlePrev, togglePresentationMode]);

  if (!isPresentationMode) return null;

  return (
    <aside
      aria-label="Executive Client Pitch Presentation Deck"
      className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 bg-ink/90 text-cream backdrop-blur-xl border border-white/20 rounded-full shadow-2xl px-4 sm:px-6 py-2.5 flex items-center gap-3 sm:gap-6 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Brand Badge */}
      <div className="hidden md:flex items-center gap-2 pr-3 border-r border-white/20">
        <MonitorPlay className="w-4 h-4 text-red" />
        <span className="font-display text-xs uppercase tracking-wider text-white">
          {customBrandName || 'ATELIER'} Pitch
        </span>
      </div>

      {/* Chapters Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[50vw]">
        {CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => goToChapter(idx)}
            className={`px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              currentChapter === idx
                ? 'bg-red text-white font-semibold shadow-md scale-105'
                : 'text-cream/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {ch.title}
          </button>
        ))}
      </div>

      {/* Prev / Next controls */}
      <div className="flex items-center gap-1 pl-2 border-l border-white/20">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentChapter === 0}
          className="w-7 h-7 rounded-full flex items-center justify-center text-cream/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          aria-label="Previous pitch chapter"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-mono text-[10px] text-cream/60 px-1">
          {currentChapter + 1}/{CHAPTERS.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentChapter === CHAPTERS.length - 1}
          className="w-7 h-7 rounded-full flex items-center justify-center text-cream/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          aria-label="Next pitch chapter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Exit Button */}
      <button
        type="button"
        onClick={togglePresentationMode}
        className="ml-2 w-7 h-7 rounded-full flex items-center justify-center text-cream/60 hover:text-red hover:bg-white/10 transition-colors cursor-pointer"
        title="Exit Presentation Mode (Esc)"
        aria-label="Exit presentation mode"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
