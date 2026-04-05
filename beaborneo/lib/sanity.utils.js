/**
 * Convert Sanity Portable Text blocks to plain text.
 * Used for overview/description fields.
 */
export function portableTextToPlainText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child) => child.text).join('');
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Extract a "starting from" display price string from a tour's pricing data.
 * Returns the raw string as stored in Sanity (e.g. "RM850").
 */
export function getStartingPrice(tour) {
  if (!tour) return null;

  const { pricingType } = tour;

  if (pricingType === 'package' && tour.packagePricing) {
    return tour.packagePricing.adult || tour.packagePricing.child || null;
  }
  if (pricingType === 'group' && tour.groupPricing) {
    return tour.groupPricing.adult || tour.groupPricing.child || null;
  }
  if (pricingType === 'market' && tour.marketPricing) {
    return tour.marketPricing.malaysian || tour.marketPricing.international || null;
  }
  if (pricingType === 'accommodation' && tour.accommodationPricingSimple) {
    return tour.accommodationPricingSimple.price || null;
  }

  return null;
}

/**
 * Get the localized value from a dual-language object { en, ms }.
 * Falls back through: requested locale → 'en' → empty string.
 */
export function getLocalizedField(obj, locale) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj.en || '';
}
