import React, { useState, useEffect } from 'react';
import { Monitor, X, CheckCircle2, Laptop, Smartphone, Tablet } from 'lucide-react';
import { useStore } from '../state/store';

export function DeviceEndCard() {
  const { isDeviceEndCardOpen, setIsDeviceEndCardOpen } = useStore();
  const [viewportMode, setViewportMode] = useState('desktop');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDeviceEndCardOpen) {
        setIsDeviceEndCardOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeviceEndCardOpen, setIsDeviceEndCardOpen]);

  if (!isDeviceEndCardOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Responsive Pitch Demonstration"
      className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={() => setIsDeviceEndCardOpen(false)}
    >
      <div 
        className="relative max-w-4xl w-full bg-cream p-6 sm:p-8 rounded-lg shadow-2xl border border-red max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsDeviceEndCardOpen(false)}
          className="absolute top-4 right-4 p-2 text-ink hover:text-red transition-colors cursor-pointer"
          aria-label="Close pitch mockup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 text-red mb-3">
          <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-display text-xs sm:text-sm tracking-widest uppercase">
            PITCH PRESENTATION DEMONSTRATION
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-ink tracking-tight">
          Perfect Architectural Responsiveness Across All Viewports.
        </h3>

        <p className="font-serif italic text-sm sm:text-base text-grey mt-2">
          Engineered with fluid clamp scaling, touch-first micro-interactions, and zero layout shift.
        </p>

        {/* Realistic Laptop Shell Mockup */}
        <div className="mt-6 border border-grey/40 rounded-t-xl bg-ink p-3 sm:p-4 shadow-xl">
          {/* Laptop Screen Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-white/70">atelier-living.com</span>
            </div>
            
            {/* Interactive Viewport Tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded border border-white/10 text-[10px]">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-red text-cream font-medium shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-pressed={viewportMode === 'desktop'}
              >
                <Laptop className="w-3 h-3" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setViewportMode('tablet')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                  viewportMode === 'tablet'
                    ? 'bg-red text-cream font-medium shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-pressed={viewportMode === 'tablet'}
              >
                <Tablet className="w-3 h-3" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-red text-cream font-medium shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-pressed={viewportMode === 'mobile'}
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Screen Content Preview */}
          <div className="mt-3 overflow-hidden transition-all duration-300">
            <div
              className={`bg-cream text-ink p-4 sm:p-6 rounded-md border border-grey/20 transition-all duration-300 ${
                viewportMode === 'mobile'
                  ? 'max-w-[280px] mx-auto shadow-2xl'
                  : viewportMode === 'tablet'
                  ? 'max-w-md mx-auto shadow-xl'
                  : 'w-full'
              }`}
            >
              <div className="flex justify-between items-center border-b border-red pb-2 mb-4">
                <span className="font-display text-lg tracking-wider text-red">ATELIER°</span>
                <span className="text-[9px] font-mono text-grey uppercase tracking-widest">
                  {viewportMode === 'mobile' ? '390px' : viewportMode === 'tablet' ? '768px' : '1440px'}
                </span>
              </div>
              
              <div
                className={`grid gap-3 transition-all duration-300 ${
                  viewportMode === 'mobile'
                    ? 'grid-cols-1'
                    : viewportMode === 'tablet'
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                <div className="aspect-[3/4] bg-ink/5 border border-grey/20 p-2 flex flex-col justify-between">
                  <span className="text-[9px] font-display text-red tracking-wider">CHAIRS</span>
                  <div className="w-full h-12 bg-red/10 rounded flex items-center justify-center text-[10px] text-red font-mono">3:4 RATIO</div>
                </div>
                <div className="aspect-[3/4] bg-ink/5 border border-grey/20 p-2 flex flex-col justify-between">
                  <span className="text-[9px] font-display text-red tracking-wider">SOFAS</span>
                  <div className="w-full h-12 bg-red/10 rounded flex items-center justify-center text-[10px] text-red font-mono">FLUID CLAMP</div>
                </div>
                {(viewportMode !== 'mobile') && (
                  <div className="aspect-[3/4] bg-ink/5 border border-grey/20 p-2 flex flex-col justify-between">
                    <span className="text-[9px] font-display text-red tracking-wider">TABLES</span>
                    <div className="w-full h-12 bg-red/10 rounded flex items-center justify-center text-[10px] text-red font-mono">TOUCH READY</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base/Hinge */}
        <div className="h-3 bg-grey/40 rounded-b-xl border-t border-grey/50 max-w-[94%] mx-auto shadow-md"></div>

        {/* Pitch Toast */}
        <div className="mt-6 p-4 bg-white/90 border border-grey/30 rounded flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-sans text-xs sm:text-sm text-ink">
            Ready for client rebrand: update <code>brand.js</code> and <code>tokens.css</code> in under 5 minutes.
          </span>
        </div>
      </div>
    </div>
  );
}
