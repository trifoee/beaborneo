/**
 * Middleware for Locale Handling
 * 
 * Handles locale detection and redirection.
 * - Redirects root path to default locale
 * - Validates locale in URL
 */

import { NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Skip middleware for:
  // - API routes
  // - Static files
  // - Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // If pathname already has a locale, proceed
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale
  // Try to detect user's preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  let detectedLocale = defaultLocale;

  if (acceptLanguage) {
    // Parse Accept-Language header
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, priority] = lang.trim().split(';q=');
        return {
          locale: locale.split('-')[0].toLowerCase(),
          priority: priority ? parseFloat(priority) : 1,
        };
      })
      .sort((a, b) => b.priority - a.priority);

    // Find first matching locale
    for (const { locale } of preferredLocales) {
      if (locales.includes(locale)) {
        detectedLocale = locale;
        break;
      }
    }
  }

  // Build the new URL with the detected locale
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  
  // Preserve query string
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except API routes, static files, and Next.js internals
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - files with extensions (e.g., .jpg, .css, .js)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};
