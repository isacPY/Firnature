import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './index';

export function animateFooter({
  footerRef,
  headlineRef,
  formRef,
  wordmarkLetters
}) {
  const triggers = [];

  if (!footerRef || isReducedMotion()) {
    if (wordmarkLetters) gsap.set(wordmarkLetters, { yPercent: 0, opacity: 1 });
    if (headlineRef) gsap.set(headlineRef, { y: 0, opacity: 1 });
    if (formRef) gsap.set(formRef, { y: 0, opacity: 1 });
    return { kill: () => {} };
  }

  // 1. Footer parallax rise
  const parallaxTween = gsap.fromTo(
    footerRef,
    { yPercent: 10, force3D: true },
    {
      yPercent: 0,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: footerRef,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    }
  );
  if (parallaxTween.scrollTrigger) triggers.push(parallaxTween.scrollTrigger);

  // 2. Headline and form fade up
  if (headlineRef || formRef) {
    const targets = [headlineRef, formRef].filter(Boolean);
    const fadeTween = gsap.fromTo(
      targets,
      { y: 30, opacity: 0, force3D: true },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: footerRef,
          start: 'top 75%',
          once: true,
        }
      }
    );
    if (fadeTween.scrollTrigger) triggers.push(fadeTween.scrollTrigger);
  }

  // 3. Giant Wordmark letters rising from mask
  if (wordmarkLetters && wordmarkLetters.length) {
    gsap.set(wordmarkLetters, { yPercent: 105, force3D: true });
    const markTween = gsap.to(wordmarkLetters, {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.06,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: footerRef,
        start: 'bottom 100%',
        once: true,
      }
    });
    if (markTween.scrollTrigger) triggers.push(markTween.scrollTrigger);
  }

  return {
    kill: () => {
      triggers.forEach((t) => t && t.kill && t.kill(true));
      gsap.killTweensOf([footerRef, headlineRef, formRef, wordmarkLetters].filter(Boolean));
    }
  };
}
