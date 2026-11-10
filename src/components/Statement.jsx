import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Statement() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.statement-word');
    if (!words.length) return;

    // Subtle scroll illumination while keeping text 100% crisp and readable
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.5 },
        {
          opacity: 1,
          stagger: 0.025,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.35,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement-section"
      ref={containerRef}
      className="relative w-full bg-cream py-16 sm:py-24 px-5 sm:px-8 border-b border-red/20 overflow-hidden"
      aria-label="Design Statement"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 mb-6 sm:mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-red animate-pulse" />
          <span className="font-display text-xs sm:text-sm text-red tracking-[0.18em] uppercase font-semibold">
            01 — THE ATELIER MANIFESTO
          </span>
        </div>

        {/* High-Contrast Editorial Statement Headline + Collection Stats */}
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          <h2
            ref={textRef}
            className="font-serif font-light text-[clamp(2.2rem,4.8vw,4.8rem)] text-ink leading-[1.12] tracking-tight max-w-5xl select-none lg:flex-1"
          >
            {[
              "We", "do", "not", "furnish", "spaces.", "We", "anchor", "them.",
              "Every", "monolithic", "silhouette", "is", "sculpted", "from", "honest",
              "geological", "stone", "and", "raw", "timber,", "engineered", "to",
              "outlast", "transient", "fashion", "and", "endure", "across", "generations."
            ].map((word, i) => {
              const isAccent = word === "anchor" || word === "them.";
              return (
                <span
                  key={i}
                  className={`statement-word inline-block mr-[0.28em] transition-opacity duration-150 ${
                    isAccent ? 'italic font-normal underline decoration-red/50 underline-offset-8 text-ink' : 'text-ink'
                  }`}
                  style={{ opacity: 1 }}
                >
                  {word}
                </span>
              );
            })}
          </h2>

          {/* Right-column collection stats — balances the manifesto */}
          <div className="shrink-0 lg:border-l lg:border-grey/20 lg:pl-10 flex lg:flex-col gap-8 lg:gap-6">
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-ink leading-none">12</div>
              <div className="font-mono text-[10px] text-grey uppercase tracking-[0.2em] mt-2">Pieces in the<br />Collection</div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-ink leading-none">07</div>
              <div className="font-mono text-[10px] text-grey uppercase tracking-[0.2em] mt-2">Architectural<br />Categories</div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl text-red leading-none">24</div>
              <div className="font-mono text-[10px] text-grey uppercase tracking-[0.2em] mt-2">Pieces per<br />Limited Run</div>
            </div>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-grey/20">
          <div className="font-mono text-xs text-grey uppercase tracking-wider">
            [ Monolithic Joinery • Un-filled Travertine • Heavy Bouclé ]
          </div>
          <div className="font-serif italic text-xs sm:text-sm text-grey">
            Handcrafted in limited atelier runs of 24 pieces worldwide.
          </div>
        </div>
      </div>
    </section>
  );
}
