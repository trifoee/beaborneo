/**
 * Utility Functions
 * 
 * General helper functions used throughout the application.
 */

/**
 * Combine class names, filtering out falsy values
 * @param  {...string} classes - Class names to combine
 * @returns {string} - Combined class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format price with currency
 * @param {number} price - Price value
 * @param {string} locale - Locale for formatting
 * @param {string} currency - Currency code (default: MYR)
 * @returns {string} - Formatted price string
 */
export function formatPrice(price, locale = 'en', currency = 'MYR') {
  const localeMap = {
    en: 'en-MY',
    ms: 'ms-MY',
    id: 'id-ID',
  };

  return new Intl.NumberFormat(localeMap[locale] || 'en-MY', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export function formatDate(date, locale = 'en', options = {}) {
  const localeMap = {
    en: 'en-MY',
    ms: 'ms-MY',
    id: 'id-ID',
  };

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(localeMap[locale] || 'en-MY', defaultOptions).format(
    new Date(date)
  );
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength, suffix = '...') {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
}

/**
 * Generate slug from string
 * @param {string} text - Text to convert to slug
 * @returns {string} - URL-safe slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '');         // Trim - from end
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if we're in a browser environment
 * @returns {boolean}
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Get reading time estimate
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} - Estimated reading time in minutes
 */
export function getReadingTime(text, wordsPerMinute = 200) {
  if (!text) return 0;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get error message from error object
 * @param {Error|string|unknown} error - Error to extract message from
 * @returns {string} - Error message
 */
export function getErrorMessage(error) {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
}
