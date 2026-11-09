import React, { useState, useEffect } from 'react';
import { Sliders, MonitorPlay, RotateCcw, Languages, X, Check, Palette, Sparkles, Building2, Paintbrush } from 'lucide-react';
import { useStore } from '../state/store';
import { BRAND_CONFIG } from '../config/brand';

const THEMES = [
  {
    id: 'atelier',
    name: 'Atelier Carmine',
    subtitle: 'Haute Editorial Living',
    red: '#C80818',
    cream: '#EEEADC',
  },
  {
    id: 'nordic',
    name: 'Nordic Wood',
    subtitle: 'Terracotta & Warm Sand',
    red: '#C85A32',
    cream: '#EAE6DF',
  },
  {
    id: 'forest',
    name: 'Forest Monolith',
    subtitle: 'Deep Olive & Sandstone',
    red: '#2D4A3E',
    cream: '#EDE8DF',
  },
  {
    id: 'milano',
    name: 'Milano Navy',
    subtitle: 'Royal Navy & Alabaster',
    red: '#1B365D',
    cream: '#F2EFE9',
  },
  {
    id: 'minimalist',
    name: 'Graphite Atelier',
    subtitle: 'Anthracite & Chalk',
    red: '#2B2B2B',
    cream: '#EAE8E3',
  },
];

export function PitchControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('atelier');
  const [customHex, setCustomHex] = useState('#C80818');
  
  const {
    toggleDeviceEndCard,
    replayPreloader,
    customBrandName,
    setCustomBrandName,
    togglePresentationMode,
    isPresentationMode
  } = useStore();

  const [inputBrandName, setInputBrandName] = useState(customBrandName || BRAND_CONFIG.name);

  const [isRtl, setIsRtl] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('dir') === 'rtl' || (BRAND_CONFIG?.isRtl ?? false);
    }
    return false;
  });

  // Synchronize initial RTL state on mount
  useEffect(() => {
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }, [isRtl]);

  const handleApplyTheme = (theme) => {
    setActiveTheme(theme.id);
    setCustomHex(theme.red);
    document.documentElement.style.setProperty('--red', theme.red);
    document.documentElement.style.setProperty('--cream', theme.cream);
    
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme.cream);
    }
  };

  const handleCustomColorChange = (e) => {
    const val = e.target.value;
    setCustomHex(val);
    setActiveTheme('custom');
    document.documentElement.style.setProperty('--red', val);
  };

  const handleBrandNameChange = (e) => {
    const val = e.target.value;
    setInputBrandName(val);
    setCustomBrandName(val);
  };

  const handleToggleRtl = () => {
    const nextRtl = !isRtl;
    setIsRtl(nextRtl);
    document.documentElement.setAttribute('dir', nextRtl ? 'rtl' : 'ltr');

    if (nextRtl && !document.getElementById('rtl-fonts-loaded')) {
      const link = document.createElement('link');
      link.id = 'rtl-fonts-loaded';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Amiri:ital,wght@0,400;1,400&display=swap';
      document.head.appendChild(link);
    }
  };

  const handleReplayPreloader = () => {
    try {
      sessionStorage.removeItem('atelier_seen');
    } catch (e) {
      // ignore
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    replayPreloader();
  };

  const handleLaunchPresentation = () => {
    setIsOpen(false);
    if (!isPresentationMode) {
      togglePresentationMode();
    }
  };

  // Close panel on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Pitch Badge Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 z-40 bg-ink text-cream hover:bg-red border border-white/20 px-3.5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
        aria-label="Open Client Pitch Demonstration Engine"
      >
        <span className="w-2 h-2 rounded-full bg-red group-hover:bg-cream animate-pulse" />
        <span className="font-display tracking-widest text-[11px] sm:text-xs">
          Pitch Controls ⚡
        </span>
      </button>

      {/* Floating Pitch Engine Drawer */}
      {isOpen && (
        <div
          dir="ltr"
          role="dialog"
          aria-modal="true"
          aria-label="Client Pitch Demonstration Suite"
          className="fixed bottom-16 left-5 z-50 w-[340px] sm:w-[380px] bg-ink/95 text-cream backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red" />
                <h3 className="font-display text-base tracking-widest uppercase text-white font-semibold">
                  Client Pitch Engine
                </h3>
              </div>
              <p className="font-mono text-[10px] text-cream/70 mt-0.5">
                Live Rebranding & Boardroom Presentation Suite
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-cream/60 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Close pitch engine"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
            
            {/* 1. Live Brand Name Input (Type Client Name on Call) */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <label htmlFor="brand-name-input" className="font-mono text-[10px] text-red uppercase tracking-wider block mb-1 font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Live Client Brand Name</span>
              </label>
              <input
                id="brand-name-input"
                type="text"
                value={inputBrandName}
                onChange={handleBrandNameChange}
                placeholder="e.g. MINOTTI NYC or BAXTER"
                className="w-full bg-black/40 border border-white/20 rounded px-2.5 py-1.5 font-display text-sm uppercase tracking-wider text-white focus:border-red focus:outline-none"
              />
              <span className="font-mono text-[9px] text-cream/50 block mt-1">
                Updates wordmark, navigation & footer across the entire site instantly.
              </span>
            </div>

            {/* 2. Boardroom Presentation Mode CTA */}
            <div>
              <button
                type="button"
                onClick={handleLaunchPresentation}
                className="w-full py-2.5 px-3 rounded-lg bg-red text-cream font-display text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <MonitorPlay className="w-4 h-4" />
                <span>Launch Presentation Mode (P)</span>
              </button>
            </div>

            {/* 3. Preset Luxury Palettes */}
            <div>
              <span className="font-mono text-[10px] text-red uppercase tracking-wider block mb-2 font-semibold">
                Curated Luxury Palettes
              </span>
              <div className="space-y-1.5">
                {THEMES.map((theme) => {
                  const isActive = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleApplyTheme(theme)}
                      className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'border-red bg-white/10 shadow-sm'
                          : 'border-white/10 hover:border-white/30 bg-black/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                          style={{ backgroundColor: theme.red }}
                        />
                        <div>
                          <span className="font-display text-xs uppercase tracking-wider block text-white">
                            {theme.name}
                          </span>
                          <span className="font-mono text-[9px] text-cream/60 block">
                            {theme.subtitle}
                          </span>
                        </div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-red shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Custom Accent Color Picker */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <label htmlFor="custom-hex-input" className="font-mono text-[10px] text-red uppercase tracking-wider block mb-1.5 font-semibold flex items-center gap-1.5">
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Custom Client Accent Hex</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customHex}
                  onChange={handleCustomColorChange}
                  className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                  title="Pick custom hex color"
                />
                <input
                  id="custom-hex-input"
                  type="text"
                  value={customHex}
                  onChange={handleCustomColorChange}
                  className="flex-1 bg-black/40 border border-white/20 rounded px-2.5 py-1 font-mono text-xs text-white uppercase focus:border-red focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Additional Demo Toggles */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleToggleRtl}
                className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded text-center font-mono text-[10px] uppercase tracking-wider text-cream transition-colors cursor-pointer"
              >
                RTL: {isRtl ? 'ON (Urdu/Ar)' : 'OFF'}
              </button>

              <button
                type="button"
                onClick={handleReplayPreloader}
                className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded text-center font-mono text-[10px] uppercase tracking-wider text-cream transition-colors cursor-pointer"
              >
                Replay Intro ↺
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleDeviceEndCard();
                  setIsOpen(false);
                }}
                className="py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded text-center font-mono text-[10px] uppercase tracking-wider text-cream transition-colors cursor-pointer"
                title="Mockup frames"
              >
                Frames
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
