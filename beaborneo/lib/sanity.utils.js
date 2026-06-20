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

/**
 * Rank candidate tours by content-based similarity to the current tour,
 * for the "You May Also Like" section.
 *
 * Signals (highest weight first), using the data we already store:
 *   - shared tour categories (`tourType`) — the strongest "same kind of
 *     trip" signal, e.g. both scuba-diving
 *   - same location/region — geographically relevant alternatives
 *   - same pricing model (`pricingType`) — similar trip style / budget shape
 *   - featured — a gentle nudge toward our flagship tours
 *
 * Tours with no overlap still rank (by featured, then newest), so the
 * section always fills even for a one-off tour with no obvious siblings.
 *
 * @param {object} current   The tour being viewed (full detail shape).
 * @param {object[]} candidates  Other tours (card-shaped).
 * @param {number} limit     Max number to return.
 * @returns {object[]}       Top `limit` candidates, most relevant first.
 */
export function getRelatedTours(current, candidates, limit = 3) {
  if (!current || !Array.isArray(candidates)) return [];

  const currentTypes = new Set(current.tourType || []);
  const currentLocation = (current.location || '').trim().toLowerCase();

  const scored = candidates
    .filter((tour) => tour && tour._id !== current._id)
    .map((tour) => {
      let score = 0;

      const sharedTypes = (tour.tourType || []).filter((t) =>
        currentTypes.has(t),
      ).length;
      score += sharedTypes * 10;

      if (
        currentLocation &&
        (tour.location || '').trim().toLowerCase() === currentLocation
      ) {
        score += 5;
      }

      if (current.pricingType && tour.pricingType === current.pricingType) {
        score += 1;
      }

      if (tour.featured) score += 1;

      return { tour, score };
    });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (!!b.tour.featured !== !!a.tour.featured) return b.tour.featured ? 1 : -1;
    return (b.tour._createdAt || '').localeCompare(a.tour._createdAt || '');
  });

  return scored.slice(0, limit).map((entry) => entry.tour);
}
