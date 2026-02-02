/**
 * Sanity GROQ Queries
 * 
 * All GROQ queries for fetching content from Sanity CMS.
 * These queries are designed to work with the localized content structure.
 * 
 * TODO: Uncomment and use when Sanity is integrated
 */

// import { sanityClient } from './sanity.client';

/**
 * Query for site settings (global settings like site name, logo, etc.)
 */
export const siteSettingsQuery = `
  *[_type == "settings"][0] {
    siteName,
    logo,
    "logoUrl": logo.asset->url,
    socialLinks,
    contactInfo
  }
`;

/**
 * Query for home page content
 */
export const homePageQuery = `
  *[_type == "home"][0] {
    hero {
      title,
      subtitle,
      backgroundImage,
      "backgroundImageUrl": backgroundImage.asset->url,
      ctaText,
      ctaLink
    },
    featuredToursTitle,
    featuredTours[]-> {
      _id,
      title,
      slug,
      "mainImageUrl": mainImage.asset->url,
      shortDescription,
      duration,
      price
    },
    testimonials[] {
      name,
      quote,
      location,
      "avatarUrl": avatar.asset->url
    },
    seo
  }
`;

/**
 * Query for all tours (list view)
 */
export const allToursQuery = `
  *[_type == "tour"] | order(orderRank) {
    _id,
    title,
    slug,
    "mainImageUrl": mainImage.asset->url,
    shortDescription,
    duration,
    price,
    category,
    highlights
  }
`;

/**
 * Query for single tour by slug
 * @param {string} slug - Tour slug
 */
export const tourBySlugQuery = `
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "mainImageUrl": mainImage.asset->url,
    description,
    shortDescription,
    duration,
    price,
    category,
    highlights,
    itinerary[] {
      day,
      title,
      description,
      "imageUrl": image.asset->url
    },
    inclusions,
    exclusions,
    gallery[] {
      "url": asset->url,
      alt,
      caption
    },
    seo
  }
`;

/**
 * Query for page by slug (About, Contact, etc.)
 * @param {string} slug - Page slug
 */
export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    "heroImageUrl": heroImage.asset->url,
    seo
  }
`;

/**
 * Query for navigation items
 */
export const navigationQuery = `
  *[_type == "settings"][0].navigation[] {
    title,
    link,
    isExternal
  }
`;

/**
 * Placeholder data fetching functions
 * TODO: Replace with actual Sanity fetches when CMS is integrated
 */

// Example fetch function structure:
// export async function getHomePage() {
//   return sanityClient.fetch(homePageQuery);
// }

// export async function getAllTours() {
//   return sanityClient.fetch(allToursQuery);
// }

// export async function getTourBySlug(slug) {
//   return sanityClient.fetch(tourBySlugQuery, { slug });
// }

// export async function getPageBySlug(slug) {
//   return sanityClient.fetch(pageBySlugQuery, { slug });
// }

// export async function getSiteSettings() {
//   return sanityClient.fetch(siteSettingsQuery);
// }
