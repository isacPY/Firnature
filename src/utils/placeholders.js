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
 * Graceful image onError handler to swap broken/offline CDN images with technical SVG blueprints.
 * Prevents recursive looping by checking if current target is already the fallback.
 * @param {React.SyntheticEvent<HTMLImageElement>} e 
 * @param {string} category 
 */
export function handleImageFallback(e, category = 'default') {
  const fallback = getFallbackPlaceholder(category);
  if (e?.currentTarget && e.currentTarget.getAttribute('src') !== fallback) {
    e.currentTarget.src = fallback;
  }
}
