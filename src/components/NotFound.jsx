import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

export function NotFound({ onReturnHome }) {
  return (
    <main className="min-h-screen w-full bg-cream text-ink flex flex-col items-center justify-center p-6 text-center select-none">
      <span className="font-display text-xs tracking-[0.2em] text-red uppercase mb-4">
        {BRAND_CONFIG.wordmark} · ERROR 404
      </span>

      <h1 className="font-display text-[clamp(6rem,18vw,18rem)] text-red leading-[0.8] tracking-tighter">
        404
      </h1>

      <p className="font-serif italic text-2xl sm:text-3xl text-ink mt-6 max-w-lg">
        The architectural artifact or spatial monograph you seek is not in our archive.
      </p>

      <p className="font-serif text-sm text-grey mt-3 max-w-md">
        Perhaps the piece has retired into a private collection or the coordinate was mistyped.
      </p>

      <div className="mt-8">
        <button
          onClick={onReturnHome || (() => (window.location.href = '/'))}
          className="bracket-link text-xl"
        >
          <span className="bracket-left">[</span>
          <span className="px-2">RETURN TO SANCTUARY</span>
          <span className="bracket-right">]</span>
        </button>
      </div>
    </main>
  );
}
