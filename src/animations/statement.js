import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './index';

export function animateStatement({
  sectionRef,
  wordElements,
  inlineImageElements
}) {
  if (!sectionRef || isReducedMotion()) {
    if (wordElements) gsap.set(wordElements, { opacity: 1 });
    if (inlineImageElements) gsap.set(inlineImageElements, { scale: 1, rotation: 0 });
    return null;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef,
      start: 'top 80%',
      end: 'bottom 35%',
      scrub: 0.4,
    }
  });

  // Words illuminate from 15% to 100% opacity sequentially
  if (wordElements && wordElements.length) {
    tl.to(wordElements, {
      opacity: 1,
      duration: 1,
      stagger: 0.04,
      ease: 'none',
    }, 0);
  }

  // Inline images scale up from 0.6 with subtle rotation
  if (inlineImageElements && inlineImageElements.length) {
    gsap.set(inlineImageElements, { scale: 0.6, rotation: -4, force3D: true });
    tl.to(inlineImageElements, {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      force3D: true,
    }, 0.2);
  }

  return {
    kill: () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
      tl.kill();
      gsap.killTweensOf([wordElements, inlineImageElements].filter(Boolean));
    }
  };
}
