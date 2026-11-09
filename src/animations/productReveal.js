import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './index';

export function animateProductSection({
  headingWords,
  gridRef,
  cards,
  isFiltering = false,
}) {
  const triggers = [];

  if (isReducedMotion()) {
    if (headingWords) gsap.set(headingWords, { yPercent: 0, opacity: 1 });
    if (cards) {
      cards.forEach((card) => {
        const photo = card.querySelector('.product-photo');
        if (photo) gsap.set(photo, { clipPath: 'inset(0 0% 0 0)' });
        gsap.set(card, { opacity: 1, y: 0 });
      });
    }
    return { kill: () => {} };
  }

  // Heading reveal on scroll (only on initial non-filter view)
  if (headingWords && headingWords.length && !isFiltering) {
    gsap.set(headingWords, { yPercent: 115, opacity: 0 });
    const headingTween = gsap.to(headingWords, {
      yPercent: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingWords[0],
        start: 'top 85%',
        once: true,
      }
    });
    if (headingTween.scrollTrigger) triggers.push(headingTween.scrollTrigger);
  }

  // Product cards staggered clip wipe
  if (cards && cards.length) {
    cards.forEach((card) => {
      const photo = card.querySelector('.product-photo');
      if (photo) {
        gsap.set(photo, { clipPath: 'inset(0 100% 0 0)', force3D: true });
      }
      gsap.set(card, { y: 24, opacity: 0.4, force3D: true });
    });

    const revealBatch = (batch) => {
      const tl = gsap.timeline({
        defaults: { force3D: true }
      });
      tl.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
        force3D: true,
      });

      batch.forEach((card, idx) => {
        const photo = card.querySelector('.product-photo');
        if (photo) {
          tl.to(photo, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.45,
            ease: 'expo.out',
          }, idx * 0.04);
        }
      });
    };

    // If filtering or grid is already in viewport, animate in immediately
    const isGridInView = gridRef && gridRef.getBoundingClientRect().top < (window.innerHeight || 800);

    if (isFiltering || isGridInView) {
      revealBatch(cards);
    } else {
      const batchTriggers = ScrollTrigger.batch(cards, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => revealBatch(batch),
      });
      if (Array.isArray(batchTriggers)) {
        batchTriggers.forEach((t) => triggers.push(t));
      }
    }
  }

  return {
    kill: () => {
      triggers.forEach((t) => t && t.kill && t.kill(true));
      gsap.killTweensOf([headingWords, cards].filter(Boolean));
    }
  };
}

/**
 * Filter transition: animate out current cards, invoke callback, then animate in new cards
 */
export function animateFilterTransition({ cards, onMiddle, onComplete }) {
  if (isReducedMotion()) {
    if (onMiddle) onMiddle();
    if (onComplete) onComplete();
    return;
  }

  if (cards && cards.length) {
    gsap.to(cards, {
      opacity: 0,
      scale: 0.96,
      duration: 0.22,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        if (onMiddle) onMiddle();
        if (onComplete) onComplete();
      }
    });
  } else {
    if (onMiddle) onMiddle();
    if (onComplete) onComplete();
  }
}
