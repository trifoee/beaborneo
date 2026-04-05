import { sanityClient } from './sanity.client';

/**
 * All tours for listing page.
 * Fetches enough data for cards + filtering.
 * Grabs the first entry from whichever pricing array is active
 * so we can derive a "starting from" price on the card.
 */
export const allToursQuery = `
  *[_type == "tour"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    "mainImageUrl": mainImage.asset->url,
    tagline,
    duration,
    tourType,
    location,
    featured,
    pricingType,
    packagePricing[0]{ adult, child },
    groupPricing[0]{ adult, child },
    marketPricing[0]{ malaysian, international },
    accommodationPricingSimple[0]{ price }
  }
`;

/**
 * Single tour by slug — full detail.
 */
export const tourBySlugQuery = `
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "mainImageUrl": mainImage.asset->url,
    tagline,
    overview,
    duration,
    tourType,
    location,
    featured,
    pricingType,
    packagePricing,
    groupPricing,
    marketPricing,
    accommodationPricingSimple,
    notes,
    itinerary,
    highlights,
    included,
    notIncluded,
    gallery[]{ "url": asset->url },
    "brochureUrl": brochure.asset->url
  }
`;

/**
 * All tour slugs — for generateStaticParams.
 */
export const allTourSlugsQuery = `
  *[_type == "tour"]{ "slug": slug.current }
`;

// --------------- transport service queries ---------------

export const transportServicesByTypeQuery = `{
  "selfDrive": *[_type == "transportService" && type == "self_drive"] | order(title asc) {
    _id, title, carModel, dailyPrice, discount3Days
  },
  "privateTransfer": *[_type == "transportService" && type == "private_transfer"] | order(title asc) {
    _id, title, route, dayTimePrice, nightTimePrice
  },
  "privateTour": *[_type == "transportService" && type == "private_tour"] | order(title asc) {
    _id, title, route, packages
  }
}`;

// --------------- fetch helpers ---------------

export async function getAllTours() {
  return sanityClient.fetch(allToursQuery);
}

export async function getTourBySlug(slug) {
  return sanityClient.fetch(tourBySlugQuery, { slug });
}

export async function getAllTourSlugs() {
  return sanityClient.fetch(allTourSlugsQuery);
}

export async function getTransportServices() {
  return sanityClient.fetch(transportServicesByTypeQuery);
}
