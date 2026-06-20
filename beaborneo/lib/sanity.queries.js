import { sanityClient } from './sanity.client';

/* ------------------------------------------------------------------ */
/*  Cache tags                                                         */
/* ------------------------------------------------------------------ */
/* Each Sanity document type gets a tag so the on-demand revalidation
   webhook (app/api/revalidate/route.js) can purge only the data that
   actually changed. Keep these in sync with the document _type values
   used in `backend/schemaTypes`. */

export const SANITY_TAGS = {
  tour: 'tour',
  transportService: 'transportService',
  contactInfo: 'contactInfo',
  galleryImage: 'galleryImage',
  ourStory: 'ourStory',
  ourValue: 'ourValue',
  socialLinks: 'socialLinks',
  activityPackage: 'activityPackage',
  testimonial: 'testimonial',
};

const tagged = (tags) => ({ next: { tags } });

/* ------------------------------------------------------------------ */
/*  Tours                                                              */
/* ------------------------------------------------------------------ */

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

/**
 * Candidate tours for the "You May Also Like" section on a tour detail
 * page. Excludes the current tour and returns the same card-shaped data
 * the listing uses (single-object pricing for "starting from"), plus the
 * fields needed to score similarity (tourType, location, pricingType).
 */
export const relatedTourCandidatesQuery = `
  *[_type == "tour" && slug.current != $slug] {
    _id,
    _createdAt,
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

/* ------------------------------------------------------------------ */
/*  Contact info                                                       */
/* ------------------------------------------------------------------ */

/* Singleton-ish: we fetch the first `contactInfo` document. */
export const contactInfoQuery = `
  *[_type == "contactInfo"][0]{
    _id,
    email,
    phone,
    address,
    officeHours,
    whatsappNumber,
    socialLinks[]{ platform, url, handle },
    map{ label, addressLine, googleMapsUrl, embedUrl }
  }
`;

/* ------------------------------------------------------------------ */
/*  Transport service (car rental page)                                */
/* ------------------------------------------------------------------ */

/* Self-drive groups one document per vehicle category, with the
   individual cars stored in the `vehicles` array. The CMS `category`
   field uses values like `economy_compact` — the page maps those to
   the localized labels. */

export const transportServicesByTypeQuery = `{
  "selfDrive": *[_type == "transportService" && type == "self_drive"] | order(category asc) {
    _id,
    title,
    category,
    vehicles[]{
      model,
      dailyPrice,
      multiDayPrice
    }
  },
  "privateTransfer": *[_type == "transportService" && type == "private_transfer"] | order(route asc) {
    _id,
    title,
    route,
    dayTimePrice,
    nightTimePrice
  },
  "privateTour": *[_type == "transportService" && type == "private_tour"] | order(route asc) {
    _id,
    title,
    route,
    packages
  }
}`;

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

/* We fetch the *whole* collection. The homepage component shuffles
   client-side so each visitor sees a random 3 — see
   `components/sections/Testimonials.js`. The order applied here is
   only the SSG fallback (search-engine view, no-JS visitors): featured
   first, then by `order`, then by date. */
export const allTestimonialsQuery = `
  *[_type == "testimonial"]
    | order(featured desc, coalesce(order, 9999) asc, date desc, _createdAt desc) {
      _id,
      name,
      location,
      rating,
      quote,
      "avatarUrl": avatar.asset->url,
      featured,
      order,
      date
    }
`;

export async function getAllTours() {
  return sanityClient.fetch(allToursQuery, {}, tagged([SANITY_TAGS.tour]));
}

export async function getTourBySlug(slug) {
  return sanityClient.fetch(
    tourBySlugQuery,
    { slug },
    tagged([SANITY_TAGS.tour, `tour:${slug}`]),
  );
}

export async function getAllTourSlugs() {
  return sanityClient.fetch(allTourSlugsQuery, {}, tagged([SANITY_TAGS.tour]));
}

export async function getRelatedTourCandidates(slug) {
  return sanityClient.fetch(
    relatedTourCandidatesQuery,
    { slug },
    tagged([SANITY_TAGS.tour]),
  );
}

export async function getTransportServices() {
  return sanityClient.fetch(
    transportServicesByTypeQuery,
    {},
    tagged([SANITY_TAGS.transportService]),
  );
}

export async function getContactInfo() {
  return sanityClient.fetch(
    contactInfoQuery,
    {},
    tagged([SANITY_TAGS.contactInfo]),
  );
}

export async function getAllTestimonials() {
  return sanityClient.fetch(
    allTestimonialsQuery,
    {},
    tagged([SANITY_TAGS.testimonial]),
  );
}
