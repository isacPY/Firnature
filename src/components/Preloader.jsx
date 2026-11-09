import React, { useRef, useEffect, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_CONFIG } from '../config/brand';
import { useStore } from '../state/store';
import { animatePreloader } from '../animations/preloader';
import { lockScroll, unlockScroll } from '../animations';

export function Preloader() {
  const { preloaderDone, setPreloaderDone } = useStore();
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const counterRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const completedRef = useRef(false);
  const tlRef = useRef(null);

  const completePreloader = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    if (tlRef.current && tlRef.current.kill) {
      try {
        tlRef.current.kill();
      } catch (e) {
        // ignore
      }
      tlRef.current = null;
    }

    unlockScroll();
    setPreloaderDone(true);

    try {
      ScrollTrigger.refresh();
    } catch (e) {
      // ignore
    }
  }, [setPreloaderDone]);

  useEffect(() => {
    if (preloaderDone) {
      unlockScroll();
      return;
    }

    completedRef.current = false;
    lockScroll();

    // Absolute fallback: safety timeout to guarantee preloader NEVER hangs
    safetyTimeoutRef.current = setTimeout(() => {
      completePreloader();
    }, 500);

    try {
      tlRef.current = animatePreloader({
        containerRef: containerRef.current,
        imageRef: imageRef.current,
        frameRef: frameRef.current,
        counterRef: counterRef.current,
        onComplete: () => {
          completePreloader();
        }
      });
    } catch (err) {
      console.error('Preloader initialization error, unlocking immediately:', err);
      completePreloader();
    }

    // Dismiss immediately on Escape, Space, or Enter key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        completePreloader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
      unlockScroll();
      if (tlRef.current && tlRef.current.kill) {
        try {
          tlRef.current.kill();
        } catch (e) {
          // ignore
        }
        tlRef.current = null;
      }
    };
  }, [preloaderDone, completePreloader]);

  if (preloaderDone) return null;

  return (
    <div
      ref={containerRef}
      onClick={completePreloader}
      className="fixed inset-0 z-50 bg-cream flex flex-col items-center justify-center select-none cursor-pointer"
      aria-label="Loading lookbook"
    >
      {/* Instant Skip / Dismiss Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          completePreloader();
        }}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 font-display text-[11px] sm:text-xs tracking-widest text-red hover:text-cream hover:bg-red border border-red/40 px-3 py-1.5 rounded-full uppercase transition-all duration-200 cursor-pointer z-50"
        aria-label="Skip lookbook introduction"
      >
        [ Skip Intro ✕ ]
      </button>

      {/* Centered Lookbook Frame */}
      <div className="w-[280px] sm:w-[340px]">
        <div
          ref={frameRef}
          className="relative aspect-[3/4] w-full overflow-hidden border border-grey/30 bg-ink/5"
        >
          {/* Instant Local Architectural Blueprint SVG - 0ms network latency */}
          <img
            ref={imageRef}
            src="/images/placeholders/armchair.svg"
            alt="ATELIER° Architectural Study"
            decoding="sync"
            fetchpriority="high"
            onError={completePreloader}
            className="w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Footer Meta Under Frame */}
        <div className="mt-3 flex items-center justify-between font-display text-xs text-red tracking-widest uppercase">
          <span>{BRAND_CONFIG.wordmark}</span>
          <div className="flex items-center gap-1 font-mono text-xs">
            <span ref={counterRef}>00</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
