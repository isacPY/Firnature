import gsap from 'gsap';
import { isReducedMotion } from './index';

/**
 * Animate the exact card swipe & drop effect matching the video:
 * - Current card drops and swipes to the LEFT (x: -75px, scale: 0.88, rotate: -2deg, opacity: 0.55)
 * - Incoming card emerges from the right (x: 65px -> 0px, scale: 0.93 -> 1.0, opacity: 0.35 -> 1.0)
 */
export function animateCardSwipe({
  outgoingCardRef,
  incomingCardRef,
  badgeRef,
  direction = 1,
  onComplete
}) {
  if (isReducedMotion()) {
    if (incomingCardRef) gsap.set(incomingCardRef, { x: 0, opacity: 1, scale: 1, rotate: 0 });
    if (outgoingCardRef) gsap.set(outgoingCardRef, { x: -75, opacity: 0.55, scale: 0.88 });
    if (onComplete) onComplete();
    return null;
  }

  gsap.killTweensOf([outgoingCardRef, incomingCardRef, badgeRef].filter(Boolean));

  const tl = gsap.timeline({
    defaults: { force3D: true },
    onComplete
  });

  const DURATION = 0.34;
  const EASE = 'power2.out';

  if (direction > 0) {
    // FORWARD: Outgoing card drops and swipes to the LEFT
    if (outgoingCardRef) {
      tl.fromTo(
        outgoingCardRef,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 20,
        },
        {
          x: -75,
          y: 8,
          scale: 0.88,
          rotate: -2.2,
          opacity: 0.55,
          zIndex: 10,
          duration: DURATION,
          ease: EASE,
        },
        0
      );
    }

    // Incoming card emerges from right into active center
    if (incomingCardRef) {
      tl.fromTo(
        incomingCardRef,
        {
          x: 65,
          y: -4,
          scale: 0.93,
          rotate: 1.8,
          opacity: 0.35,
          zIndex: 30,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 20,
          duration: DURATION,
          ease: EASE,
        },
        0.02
      );
    }
  } else {
    // BACKWARD: Incoming card sweeps from left back to center
    if (incomingCardRef) {
      tl.fromTo(
        incomingCardRef,
        {
          x: -75,
          y: 8,
          scale: 0.88,
          rotate: -2.2,
          opacity: 0.55,
          zIndex: 30,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 20,
          duration: DURATION,
          ease: EASE,
        },
        0
      );
    }

    // Outgoing card retreats to right
    if (outgoingCardRef) {
      tl.fromTo(
        outgoingCardRef,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 10,
        },
        {
          x: 65,
          y: -4,
          scale: 0.93,
          rotate: 1.8,
          opacity: 0,
          duration: DURATION,
          ease: EASE,
        },
        0.02
      );
    }
  }

  // Floating frosted badge pop
  if (badgeRef) {
    tl.fromTo(
      badgeRef,
      {
        y: 8,
        opacity: 0,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: 'back.out(1.6)',
      },
      0.1
    );
  }

  return tl;
}

/**
 * Smoothly scroll pill track with strict boundary clamping:
 * - Never over-scrolls past the top
 * - Never over-scrolls past the bottom when the last pill is selected
 */
export function centerPillInTrack({
  trackRef,
  containerRef,
  pillIndex,
  duration = 0.32
}) {
  if (!trackRef || !containerRef || isReducedMotion()) return null;

  const pills = trackRef.querySelectorAll('.ethos-pill-btn');
  const targetPill = pills[pillIndex];
  if (!targetPill) return null;

  const containerHeight = containerRef.offsetHeight;
  const trackHeight = trackRef.scrollHeight;
  const pillHeight = targetPill.offsetHeight;
  const pillTop = targetPill.offsetTop;

  // Ideal target: center the pill in the viewport
  let targetY = -(pillTop - (containerHeight / 2) + (pillHeight / 2));

  // Boundary clamp:
  // If track fits inside container, stay at 0
  if (trackHeight <= containerHeight) {
    targetY = 0;
  } else {
    // Cannot scroll higher than 0 (top of track)
    // Cannot scroll lower than -(trackHeight - containerHeight) (bottom of track)
    const minScrollY = -(trackHeight - containerHeight);
    targetY = Math.min(0, Math.max(minScrollY, targetY));
  }

  return gsap.to(trackRef, {
    y: targetY,
    duration,
    ease: 'power2.out',
    overwrite: 'auto',
    force3D: true,
  });
}
