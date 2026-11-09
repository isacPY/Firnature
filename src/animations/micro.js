import gsap from 'gsap';
import { isReducedMotion } from './index';

/**
 * Triggers a subtle, premium scale bump on counter badges
 */
export function animateCounterBump(element) {
  if (!element || isReducedMotion()) return;

  gsap.fromTo(
    element,
    { scale: 1 },
    {
      scale: 1.35,
      duration: 0.18,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    }
  );
}

/**
 * Drawer slide animation helper
 */
export function animateDrawerOpen(drawerRef, backdropRef) {
  if (isReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (backdropRef) {
    tl.fromTo(backdropRef, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0);
  }

  if (drawerRef) {
    tl.fromTo(drawerRef, { x: '100%' }, { x: '0%', duration: 0.45, ease: 'expo.out' }, 0);
  }

  return tl;
}
