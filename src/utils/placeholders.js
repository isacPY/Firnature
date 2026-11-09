/**
 * src/utils/placeholders.js
 * 
 * Centralized offline architectural blueprint SVG placeholders.
 * Fallbacks are provided for all product categories, hero thumbnails, drawers, and showcase.
 */

export const PLACEHOLDERS = {
  chairs: '/images/placeholders/armchair.svg',
  sofas: '/images/placeholders/sofa.svg',
  tables: '/images/placeholders/table.svg',
  storage: '/images/placeholders/credenza.svg',
  lighting: '/images/placeholders/lamp.svg',
  beds: '/images/placeholders/sofa.svg',
  mirrors: '/images/placeholders/credenza.svg',
  default: '/images/placeholders/armchair.svg',
};

/**
 * Resolve local architectural blueprint SVG placeholder for a given category.
 * @param {string} category 
 * @returns {string} Relative URL to SVG placeholder
 */
export function getFallbackPlaceholder(category) {
  if (!category) return PLACEHOLDERS.default;
  const key = String(category).toLowerCase().trim();
  return PLACEHOLDERS[key] || PLACEHOLDERS.default;
}

/**
 * Build a srcset/sizes pair for a locally hosted WebP image.
 * Local product photos are saved as <photo>-600.webp, <photo>-900.webp and
 * <photo>-1200.webp (same aspect ratio, same crop — only the file changes,
 * never the displayed size); returns null for anything else (e.g. a remote
 * URL), so the <img> just uses its plain src with no srcset.
 * @param {string} src
 * @param {string} [sizes] - sizes override for this placement; defaults to
 *   the product-card width. Pass the placement's true display width so the
 *   browser picks the smallest file that stays sharp (never larger).
 * @returns {{ srcSet: string, sizes: string } | null}
 */
export function getLocalSrcset(src, sizes) {
  if (typeof src !== 'string' || !src.endsWith('-1200.webp')) return null;
  return {
    srcSet: `${src.replace('-1200.webp', '-600.webp')} 600w, ${src.replace('-1200.webp', '-900.webp')} 900w, ${src} 1200w`,
    sizes: sizes || '(max-width: 768px) calc(100vw - 40px), 600px',
  };
}

/**
 * Graceful image onError handler to swap broken/offline CDN images with technical SVG blueprints.
 * Prevents recursive looping by checking if current target is already the fallback.
 * @param {React.SyntheticEvent<HTMLImageElement>} e
 * @param {string} category
 */
export function handleImageFallback(e, category = 'default') {
  const fallback = getFallbackPlaceholder(category);
  if (e?.currentTarget) {
    // Drop srcset so the browser does not re-pick a (broken) srcset candidate
    // over the fallback image.
    e.currentTarget.removeAttribute('srcset');
    if (e.currentTarget.getAttribute('src') !== fallback) {
      e.currentTarget.src = fallback;
    }
  }
}
