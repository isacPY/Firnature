import React from 'react';

/**
 * MaskedWords - Splits text into words wrapped in overflow-hidden containers.
 * Allows directional slide-in animations (e.g. translateY or translateX) without Club GSAP SplitText.
 */
export function MaskedWords({ text, className = "", wordClassName = "masked-word" }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0"
        >
          <span className={`inline-block ${wordClassName}`}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * ScrubbedWords - Wraps each word for scroll-scrubbed opacity animations.
 * Words initialize at 15% opacity and illuminate to 100% on scroll.
 */
export function ScrubbedWords({ text, className = "", wordClassName = "scrub-word" }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block mr-[0.25em] opacity-15 ${wordClassName}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/**
 * MaskedLetters - Splits text into individual letters wrapped in overflow-hidden masks.
 * Perfect for giant editorial wordmark entrance animations.
 */
export function MaskedLetters({ text, className = "", letterClassName = "masked-letter" }) {
  if (!text) return null;
  const letters = Array.from(text);

  return (
    <span className={`inline-flex items-center overflow-hidden ${className}`}>
      {letters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className={`inline-block will-change-transform ${letterClassName}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
