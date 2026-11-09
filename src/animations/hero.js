import gsap from 'gsap';
import { isReducedMotion } from './index';

export function animateHero({
  headlineWords,
  photos,
  captions,
  navElement,
  onComplete,
}) {
  if (isReducedMotion()) {
    if (headlineWords) gsap.set(headlineWords, { x: 0, opacity: 1 });
    if (photos) gsap.set(photos, { clipPath: 'inset(0 0% 0 0)' });
    if (captions) gsap.set(captions, { y: 0, opacity: 1 });
    if (navElement) gsap.set(navElement, { opacity: 1, y: 0 });
    if (onComplete) onComplete();
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', force3D: true },
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  // Initial states with GPU acceleration
  if (headlineWords && headlineWords.length) {
    gsap.set(headlineWords, { x: '-105%', skewX: -8, opacity: 0, force3D: true });
  }

  if (photos && photos.length) {
    gsap.set(photos, { clipPath: 'inset(0 100% 0 0)', force3D: true });
  }

  if (captions && captions.length) {
    gsap.set(captions, { y: 16, opacity: 0, force3D: true });
  }

  if (navElement) {
    gsap.set(navElement, { y: -12, opacity: 0, force3D: true });
  }

  // 1. Nav slide down
  if (navElement) {
    tl.to(navElement, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.05);
  }

  // 2. Headline words slide in from left mask
  if (headlineWords && headlineWords.length) {
    tl.to(headlineWords, {
      x: '0%',
      skewX: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.out',
    }, 0.08);
  }

  // 3. Photos wipe left to right
  if (photos && photos.length) {
    tl.to(photos, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.45,
      stagger: 0.05,
      ease: 'expo.out',
    }, 0.12);
  }

  // 4. Captions and details fade up
  if (captions && captions.length) {
    tl.to(captions, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
    }, 0.18);
  }

  return {
    tl,
    kill: () => {
      tl.kill();
      gsap.killTweensOf([headlineWords, photos, captions, navElement].filter(Boolean));
    }
  };
}
