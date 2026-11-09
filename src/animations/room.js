import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './index';

export function animateRoomShowcase({
  sectionRef,
  imageRef,
  headingWords,
  hotspots
}) {
  const triggers = [];

  if (!sectionRef || isReducedMotion()) {
    if (imageRef) gsap.set(imageRef, { opacity: 1, scale: 1, y: 0 });
    if (headingWords) gsap.set(headingWords, { yPercent: 0, opacity: 1 });
    return { kill: () => {} };
  }

  // 1. Heading reveal
  if (headingWords && headingWords.length) {
    gsap.set(headingWords, { yPercent: 110, opacity: 0 });
    const hTween = gsap.to(headingWords, {
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
    if (hTween.scrollTrigger) triggers.push(hTween.scrollTrigger);
  }

  // 2. Room Photo: smooth GPU parallax scrub
  if (imageRef) {
    gsap.set(imageRef, {
      opacity: 1,
      scale: 1.08,
      force3D: true,
    });

    // Parallax scrub: pure GPU translateY, scaled 1.08 so edges are never revealed
    const parallaxTween = gsap.fromTo(
      imageRef,
      { yPercent: -4, force3D: true },
      {
        yPercent: 6,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        }
      }
    );
    if (parallaxTween.scrollTrigger) triggers.push(parallaxTween.scrollTrigger);
  }

  // 3. Hotspots entrance stagger
  if (hotspots && hotspots.length) {
    gsap.set(hotspots, { scale: 0, opacity: 0 });
    const hsTween = gsap.to(hotspots, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top 65%',
        once: true,
      }
    });
    if (hsTween.scrollTrigger) triggers.push(hsTween.scrollTrigger);
  }

  return {
    kill: () => {
      triggers.forEach((t) => t && t.kill && t.kill(true));
      gsap.killTweensOf([imageRef, headingWords, hotspots].filter(Boolean));
    }
  };
}
