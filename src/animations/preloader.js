import gsap from 'gsap';
import { isReducedMotion } from './index';

export function animatePreloader({
  containerRef,
  imageRef,
  frameRef,
  counterRef,
  onComplete
}) {
  if (isReducedMotion()) {
    if (onComplete) onComplete();
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  const counterObj = { value: 0 };

  // 1. Image subtle zoom & counter 0 -> 100 (ultra-fast <0.3s)
  tl.to(imageRef, {
    scale: 1.05,
    duration: 0.28,
    ease: 'power2.inOut',
  }, 0);

  tl.to(counterObj, {
    value: 100,
    duration: 0.28,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (counterRef) {
        counterRef.textContent = String(Math.floor(counterObj.value)).padStart(2, '0');
      }
    }
  }, 0);

  // 2. Expand frame to full viewport clip
  tl.to(frameRef, {
    scale: 1.08,
    opacity: 0.95,
    duration: 0.1,
    ease: 'expo.inOut',
  }, '+=0.02');

  // 3. Fade out entire preloader container
  tl.to(containerRef, {
    opacity: 0,
    duration: 0.12,
    ease: 'power2.out',
    pointerEvents: 'none',
  }, '-=0.04');

  return tl;
}
