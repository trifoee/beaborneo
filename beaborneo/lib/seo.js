/**
 * SEO Utilities
 * 
 * Helper functions for generating SEO metadata.
 * Works with Next.js 13+ metadata API.
 */

import { locales, localeHtmlLang, getLocalizedValue } from './i18n';

/**
 * Default site metadata
 * TODO: Replace with CMS-managed values when Sanity is integrated
 */
export const siteConfig = {
  siteName: {
    en: 'Bea Borneo Travel',
    ms: 'Bea Borneo Travel',
    id: 'Bea Borneo Travel',
  },
  siteDescription: {
    en: 'Discover the beauty of Borneo with our curated travel experiences. Explore pristine rainforests, meet diverse wildlife, and immerse yourself in local cultures.',
    ms: 'Temui keindahan Borneo dengan pengalaman perjalanan pilihan kami. Terokai hutan hujan yang masih asli, temui hidupan liar yang pelbagai, dan tenggelam dalam budaya tempatan.',
    id: 'Temukan keindahan Borneo dengan pengalaman perjalanan pilihan kami. Jelajahi hutan hujan yang masih asli, temui satwa liar yang beragam, dan benamkan diri dalam budaya lokal.',
  },
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://beaborneo.com',
  defaultImage: '/images/og-default.jpg', // TODO: Add actual OG image
  twitterHandle: '@beaborneo',
};

/**
 * Generate metadata for a page
 * @param {Object} options - Metadata options
 * @param {Object} options.title - Localized title object
 * @param {Object} options.description - Localized description object
 * @param {string} options.locale - Current locale
 * @param {string} options.path - Current path (without locale prefix)
 * @param {string} options.image - OG image URL
 * @param {Object} options.seo - CMS SEO data (when available)
 * @returns {Object} - Next.js metadata object
 */
export function generateMetadata({
  title,
  description,
  locale,
  path = '',
  image,
  seo,
} = {}) {
  // Use CMS SEO data if available, otherwise use provided values
  const pageTitle = seo?.title 
    ? getLocalizedValue(seo.title, locale)
    : getLocalizedValue(title, locale) || getLocalizedValue(siteConfig.siteName, locale);
  
  const pageDescription = seo?.description
    ? getLocalizedValue(seo.description, locale)
    : getLocalizedValue(description, locale) || getLocalizedValue(siteConfig.siteDescription, locale);
  
  const pageImage = seo?.ogImage || image || siteConfig.defaultImage;
  const canonicalUrl = `${siteConfig.baseUrl}/${locale}${path}`;

  // Generate alternate language URLs
  const languages = {};
  locales.forEach((loc) => {
    languages[localeHtmlLang[loc]] = `${siteConfig.baseUrl}/${loc}${path}`;
  });

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: getLocalizedValue(siteConfig.siteName, locale),
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: localeHtmlLang[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 * @param {string} locale - Current locale
 * @returns {Object} - JSON-LD schema
 */
export function generateOrganizationSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Bea Borneo Travel & Tours Sdn. Bhd.',
    description: getLocalizedValue(siteConfig.siteDescription, locale),
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/images/logo.png`,
    image: `${siteConfig.baseUrl}/images/logo.png`,
    telephone: ['+60-88-212982', '+60-18-2103921'],
    email: 'beaborneo@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lot B13-2A-2, Block B, 1st Floor, Kepayan Perdana',
      addressLocality: 'Penampang',
      addressRegion: 'Sabah',
      postalCode: '88300',
      addressCountry: 'MY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.9714,
      longitude: 116.0533,
    },
    sameAs: [
      'https://facebook.com/beaborneotravel',
      'https://instagram.com/beaborneotravel',
      'https://tiktok.com/@beaborneotravel',
    ],
    priceRange: '$$',
  };
}

/**
 * Generate JSON-LD structured data for a tour
 * @param {Object} tour - Tour data from CMS
 * @param {string} locale - Current locale
 * @returns {Object} - JSON-LD schema
 */
export function generateTourSchema(tour, locale) {
  if (!tour) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: getLocalizedValue(tour.title, locale),
    description: getLocalizedValue(tour.description || tour.shortDescription, locale),
    // TODO: Add more fields based on CMS data
    // image: tour.mainImageUrl,
    // provider: generateOrganizationSchema(locale),
  };
}
