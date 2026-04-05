/**
 * Internationalization (i18n) Configuration
 * 
 * This file contains all locale-related configurations and utilities.
 * When CMS is integrated, this will work alongside Sanity's localized content.
 */

// Supported locales
export const locales = ['en', 'ms', 'id'];

// Default locale
export const defaultLocale = 'en';

// Locale metadata for SEO and display
export const localeNames = {
  en: 'English',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
};

// Locale codes for HTML lang attribute
export const localeHtmlLang = {
  en: 'en',
  ms: 'ms',
  id: 'id',
};

/**
 * Get localized content from a localized object
 * @param {Object} localizedObj - Object with locale keys (e.g., { en: "Hello", ms: "Halo", id: "Halo" })
 * @param {string} locale - Current locale
 * @param {string} fallback - Fallback value if content not found
 * @returns {string} - Localized content
 * 
 * Usage: getLocalizedValue(content.title, 'ms') => "Terokai Bali"
 */
export function getLocalizedValue(localizedObj, locale, fallback = '') {
  if (!localizedObj) return fallback;
  return localizedObj[locale] || localizedObj[defaultLocale] || fallback;
}

/**
 * Check if a locale is valid
 * @param {string} locale - Locale to check
 * @returns {boolean}
 */
export function isValidLocale(locale) {
  return locales.includes(locale);
}

/**
 * Get alternate language URLs for SEO
 * @param {string} pathname - Current path without locale prefix
 * @param {string} baseUrl - Base URL of the site
 * @returns {Object[]} - Array of alternate language links
 */
export function getAlternateLanguages(pathname, baseUrl) {
  return locales.map((locale) => ({
    hrefLang: localeHtmlLang[locale],
    href: `${baseUrl}/${locale}${pathname}`,
  }));
}

/**
 * Static translations for UI elements
 * TODO: Replace with CMS-managed translations when Sanity is integrated
 */
export const translations = {
  en: {
    navigation: {
      home: 'Home',
      tours: 'Tours',
      carRental: 'Car Rental',
      events: 'Events & Offers',
      about: 'About Us',
      contact: 'Contact',
    },
    common: {
      readMore: 'Read More',
      viewAll: 'View All',
      bookNow: 'Book Now',
      learnMore: 'Learn More',
      submit: 'Submit',
      loading: 'Loading...',
      error: 'Something went wrong',
    },
    footer: {
      copyright: '© 2026 Bea Borneo. All rights reserved.',
      followUs: 'Follow Us',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
    },
    contact: {
      title: 'Contact Us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
  },
  ms: {
    navigation: {
      home: 'Utama',
      tours: 'Pakej Pelancongan',
      carRental: 'Sewa Kereta',
      events: 'Acara & Tawaran',
      about: 'Tentang Kami',
      contact: 'Hubungi',
    },
    common: {
      readMore: 'Baca Lagi',
      viewAll: 'Lihat Semua',
      bookNow: 'Tempah Sekarang',
      learnMore: 'Ketahui Lebih',
      submit: 'Hantar',
      loading: 'Memuatkan...',
      error: 'Sesuatu tidak kena',
    },
    footer: {
      copyright: '© 2026 Bea Borneo. Hak cipta terpelihara.',
      followUs: 'Ikuti Kami',
      quickLinks: 'Pautan Pantas',
      contactUs: 'Hubungi Kami',
    },
    contact: {
      title: 'Hubungi Kami',
      name: 'Nama',
      email: 'Emel',
      message: 'Mesej',
      send: 'Hantar Mesej',
      success: 'Mesej berjaya dihantar!',
      error: 'Gagal menghantar mesej. Sila cuba lagi.',
    },
  },
  id: {
    navigation: {
      home: 'Beranda',
      tours: 'Paket Wisata',
      carRental: 'Sewa Mobil',
      events: 'Acara & Promo',
      about: 'Tentang Kami',
      contact: 'Kontak',
    },
    common: {
      readMore: 'Baca Selengkapnya',
      viewAll: 'Lihat Semua',
      bookNow: 'Pesan Sekarang',
      learnMore: 'Pelajari Lebih',
      submit: 'Kirim',
      loading: 'Memuat...',
      error: 'Terjadi kesalahan',
    },
    footer: {
      copyright: '© 2026 Bea Borneo. Hak cipta dilindungi.',
      followUs: 'Ikuti Kami',
      quickLinks: 'Tautan Cepat',
      contactUs: 'Hubungi Kami',
    },
    contact: {
      title: 'Hubungi Kami',
      name: 'Nama',
      email: 'Email',
      message: 'Pesan',
      send: 'Kirim Pesan',
      success: 'Pesan berhasil terkirim!',
      error: 'Gagal mengirim pesan. Silakan coba lagi.',
    },
  },
};

/**
 * Get translation by key path
 * @param {string} locale - Current locale
 * @param {string} keyPath - Dot-separated key path (e.g., 'navigation.home')
 * @returns {string}
 */
export function t(locale, keyPath) {
  const keys = keyPath.split('.');
  let value = translations[locale] || translations[defaultLocale];
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  
  return value || keyPath;
}
