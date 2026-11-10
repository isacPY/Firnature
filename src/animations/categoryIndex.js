import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './index';

export function animateCategoryIndex({
  containerRef,
  baseListRef,
  overlayListRef,
  totalItems,
  onActiveIndexChange
}) {
  if (!containerRef || !baseListRef || isReducedMotion()) {
    return null;
  }

  // Measure dynamic row height from actual DOM element to prevent hardcoding breakage
  const firstRow = baseListRef.querySelector('.category-row');
  const rowHeight = firstRow ? firstRow.offsetHeight : 88;
  const totalOffset = (totalItems - 1) * rowHeight;
  const baseRows = Array.from(baseListRef.querySelectorAll('.category-row'));

  // Calculate scroll height based on number of items (smooth feel)
  const scrollDistance = totalItems * 90;

  let lastActiveIdx = -1;
  let lastContinuousIdx = -1;

  // Pre-allocate quickSetters for opacity and scale on each base row to eliminate object allocations
  const opSetters = baseRows.map((row) => gsap.quickSetter(row, 'opacity'));
  const scaleSetters = baseRows.map((row) => gsap.quickSetter(row, 'scale'));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 0.35,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const continuousIdx = progress * (totalItems - 1);

        // Guard against redundant style calculations if scroll hasn't visibly progressed
        if (Math.abs(continuousIdx - lastContinuousIdx) > 0.001) {
          lastContinuousIdx = continuousIdx;
          for (let i = 0; i < baseRows.length; i++) {
            const dist = Math.abs(i - continuousIdx);
            const opacity = Math.max(0.2, 1 - dist * 0.4);
            const scaleVal = Math.max(0.92, 1 - dist * 0.035);
            opSetters[i](opacity);
            scaleSetters[i](scaleVal);
          }
        }

        const currentIdx = Math.min(
          totalItems - 1,
          Math.max(0, Math.round(continuousIdx))
        );

        if (currentIdx !== lastActiveIdx) {
          lastActiveIdx = currentIdx;
          if (onActiveIndexChange) {
            onActiveIndexChange(currentIdx);
          }
        }
      }
    }
  });

  // Move both the base ink list and the overlay cream list in exact unison with hardware acceleration
  tl.fromTo(
    [baseListRef, overlayListRef],
    { y: 0, force3D: true },
    {
      y: -totalOffset,
      ease: 'none',
      force3D: true,
    }
  );

  return {
    kill: () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
      tl.kill();
      gsap.killTweensOf([baseListRef, overlayListRef, ...baseRows]);
    }
  };
}
