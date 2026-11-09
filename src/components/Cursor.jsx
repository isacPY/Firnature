import React, { useEffect, useRef } from 'react';
import { initCustomCursor } from '../animations/cursor';

export function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cleanup = initCustomCursor(cursorRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-red pointer-events-none z-[9999] opacity-0 will-change-transform mix-blend-difference hidden lg:block"
      aria-hidden="true"
    />
  );
}
