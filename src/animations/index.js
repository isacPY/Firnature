import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance = null;
let tickerCallback = null;

/**
 * Check if the user has requested reduced motion
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize Lenis Smooth Scroll and sync with GSAP ScrollTrigger
 */
export function initLenis() {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  // Reduced motion: standard scrolling
  if (isReducedMotion()) {
    return null;
  }

  try {
    lenisInstance = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // If scroll was locked before Lenis finished initializing, keep it paused
    if (typeof document !== 'undefined' && document.body.classList.contains('scroll-locked')) {
      lenisInstance.stop();
    }

    // Sync Lenis scroll with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    tickerCallback = (time) => {
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };
    gsap.ticker.add(tickerCallback);

    // Optimal lag smoothing: grace period 500ms, max 33ms catchup per frame to eliminate stuttering
    gsap.ticker.lagSmoothing(500, 33);
  } catch (err) {
    console.error('Failed to initialize Lenis smooth scroll:', err);
    lenisInstance = null;
  }

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

/**
 * Temporarily pause/lock Lenis smooth scrolling (e.g. while preloader or drawer is active)
 */
export function lockScroll() {
  if (lenisInstance) {
    try {
      lenisInstance.stop();
    } catch (e) {
      // ignore
    }
  }
  if (typeof document !== 'undefined') {
    document.body.classList.add('scroll-locked');
  }
}

/**
 * Resume Lenis smooth scrolling
 */
export function unlockScroll() {
  if (lenisInstance) {
    try {
      lenisInstance.start();
    } catch (e) {
      // ignore
    }
  }
  if (typeof document !== 'undefined') {
    document.body.classList.remove('scroll-locked');
  }
}

/**
 * Smooth scroll to target element or position
 */
export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    try {
      lenisInstance.scrollTo(target, { offset: 0, duration: 0.85, ...options });
      return;
    } catch (e) {
      // fallback to native scroll
    }
  }
  if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

/**
 * Destroy Lenis and all ScrollTrigger instances
 */
export function destroyAnimations() {
  unlockScroll();
  if (tickerCallback) {
    try {
      gsap.ticker.remove(tickerCallback);
    } catch (e) {
      // ignore
    }
    tickerCallback = null;
  }
  if (lenisInstance) {
    try {
      lenisInstance.destroy();
    } catch (e) {
      // ignore
    }
    lenisInstance = null;
  }
  try {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  } catch (e) {
    // ignore
  }
}
