/**
 * SEO Utilities
 *
 * Helper functions for generating SEO metadata.
 * Works with Next.js 13+ metadata API.
 */

import { locales, localeHtmlLang, getLocalizedValue } from './i18n';

/**
 * Default site metadata
 */
export const siteConfig = {
  siteName: {
    en: 'Bea Borneo Travel',
    bm: 'Bea Borneo Travel',
  },

  siteDescription: {
    en: 'Discover the beauty of Borneo with our curated travel experiences. Explore pristine rainforests, meet diverse wildlife, and immerse yourself in local cultures.',
    bm: 'Temui keindahan Borneo dengan pengalaman perjalanan pilihan kami. Terokai hutan hujan yang masih asli, temui hidupan liar yang pelbagai, dan tenggelam dalam budaya tempatan.',
  },

  /**
   * IMPORTANT:
   * Use ONLY ONE canonical domain.
   * Recommended: https://www.beaborneo.com
   */
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.beaborneo.com',

  defaultImage: '/images/og-default.jpg',

  twitterHandle: '@beaborneo',
};

/**
 * Normalize path safely
 */
function normalizePath(path = '') {
  if (!path) return '';

  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Generate canonical URL
 */
function generateCanonicalUrl({
  locale,
  path = '',
  seo,
}) {
  // Use manual canonical override from CMS if available
  if (seo?.canonicalUrl) {
    return seo.canonicalUrl;
  }

  const normalizedPath = normalizePath(path);

  /**
   * Homepage handling
   *
   * Avoid duplicate homepage:
   * /
   * /en
   * /bm
   *
   * Recommended:
   * Redirect / -> /en
   */

  if (!normalizedPath || normalizedPath === '/') {
    return `${siteConfig.baseUrl}/${locale}`;
  }

  return `${siteConfig.baseUrl}/${locale}${normalizedPath}`;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  locale = 'en',
  path = '',
  image,
  seo,
} = {}) {
  /**
   * Localized SEO values
   */
  const pageTitle = seo?.title
    ? getLocalizedValue(seo.title, locale)
    : getLocalizedValue(title, locale) ||
      getLocalizedValue(siteConfig.siteName, locale);

  const pageDescription = seo?.description
    ? getLocalizedValue(seo.description, locale)
    : getLocalizedValue(description, locale) ||
      getLocalizedValue(siteConfig.siteDescription, locale);

  /**
   * Image
   */
  const pageImage =
    seo?.ogImage?.asset?.url ||
    image ||
    `${siteConfig.baseUrl}${siteConfig.defaultImage}`;

  /**
   * Canonical
   */
  const canonicalUrl = generateCanonicalUrl({
    locale,
    path,
    seo,
  });

  /**
   * Alternate languages
   */
  const normalizedPath = normalizePath(path);

  const languages = {};

  locales.forEach((loc) => {
    if (!normalizedPath || normalizedPath === '/') {
      languages[localeHtmlLang[loc]] =
        `${siteConfig.baseUrl}/${loc}`;
    } else {
      languages[localeHtmlLang[loc]] =
        `${siteConfig.baseUrl}/${loc}${normalizedPath}`;
    }
  });

  return {
    metadataBase: new URL(siteConfig.baseUrl),

    title: {
      default: pageTitle,
      template: `%s | ${getLocalizedValue(
        siteConfig.siteName,
        locale
      )}`,
    },

    description: pageDescription,

    alternates: {
      canonical: canonicalUrl,
      languages,
    },

    openGraph: {
      title: pageTitle,

      description: pageDescription,

      url: canonicalUrl,

      siteName: getLocalizedValue(
        siteConfig.siteName,
        locale
      ),

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
      index: seo?.noIndex ? false : true,

      follow: seo?.noIndex ? false : true,

      googleBot: {
        index: seo?.noIndex ? false : true,

        follow: seo?.noIndex ? false : true,

        'max-video-preview': -1,

        'max-image-preview': 'large',

        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',

    '@type': 'TravelAgency',

    name: 'Bea Borneo Travel & Tours Sdn. Bhd.',

    description: getLocalizedValue(
      siteConfig.siteDescription,
      locale
    ),

    url: siteConfig.baseUrl,

    logo: `${siteConfig.baseUrl}/images/logo.png`,

    image: `${siteConfig.baseUrl}/images/logo.png`,

    telephone: [
      '+60-88-212982',
      '+60-18-2103921',
    ],

    email: 'beaborneo@gmail.com',

    address: {
      '@type': 'PostalAddress',

      streetAddress:
        'Lot B13-2A-2, Block B, 1st Floor, Kepayan Perdana',

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
 */
export function generateTourSchema(
  tour,
  locale = 'en'
) {
  if (!tour) return null;

  return {
    '@context': 'https://schema.org',

    '@type': 'TouristTrip',

    name: getLocalizedValue(
      tour.title,
      locale
    ),

    description: getLocalizedValue(
      tour.description || tour.shortDescription,
      locale
    ),

    provider: {
      '@type': 'TravelAgency',

      name: 'Bea Borneo Travel & Tours Sdn. Bhd.',

      url: siteConfig.baseUrl,
    },

    url: `${siteConfig.baseUrl}/${locale}/tours/${tour.slug?.current || ''}`,
  };
}