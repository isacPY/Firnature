import gsap from 'gsap';
import { isReducedMotion } from './index';

export function initCustomCursor(cursorRef) {
  if (typeof window === 'undefined' || !cursorRef || isReducedMotion()) {
    return () => {};
  }

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    if (cursorRef) cursorRef.style.display = 'none';
    return () => {};
  }

  const cursor = cursorRef;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isVisible = false;
  let isHovered = false;

  let isTicking = false;

  // Center alignment initialized once with hardware acceleration
  gsap.set(cursor, { xPercent: -50, yPercent: -50, force3D: true });
  const setX = gsap.quickSetter(cursor, 'x', 'px');
  const setY = gsap.quickSetter(cursor, 'y', 'px');

  // Lerp animation step using GSAP ticker with quickSetter
  const tickerFunc = () => {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      cursorX += dx * 0.25;
      cursorY += dy * 0.25;
      setX(cursorX);
      setY(cursorY);
    } else {
      // Settled at exact coordinate: snap and sleep ticker to eliminate idle CPU drain
      cursorX = mouseX;
      cursorY = mouseY;
      setX(mouseX);
      setY(mouseY);
      gsap.ticker.remove(tickerFunc);
      isTicking = false;
    }
  };

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    }

    // Wake up ticker only while mouse is moving
    if (!isTicking) {
      isTicking = true;
      gsap.ticker.add(tickerFunc);
    }
  };

  const onMouseLeave = () => {
    isVisible = false;
    gsap.to(cursor, { opacity: 0, duration: 0.15, overwrite: 'auto' });
  };

  const onMouseEnter = () => {
    isVisible = true;
    gsap.to(cursor, { opacity: 1, duration: 0.15, overwrite: 'auto' });
  };

  const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, .product-card, .hotspot-marker, .hotspot-pill, .bracket-link, .pill-btn';

  const onMouseOver = (e) => {
    const target = e.target;
    if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
      if (!isHovered) {
        isHovered = true;
        gsap.to(cursor, {
          scale: 3.5,
          opacity: 0.5,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    }
  };

  const onMouseOut = (e) => {
    const target = e.target;
    if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(INTERACTIVE_SELECTOR)) {
        if (isHovered) {
          isHovered = false;
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      }
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });
  document.documentElement.addEventListener('mouseenter', onMouseEnter, { passive: true });
  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mouseout', onMouseOut);
    if (isTicking) {
      gsap.ticker.remove(tickerFunc);
    }
  };
}
