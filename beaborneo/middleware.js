/**
 * Combined Middleware
 * 1. Locale detection and redirection
 * 2. HTML formatting for "View Page Source"
 */

import { NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';
import { formatHTML } from '@/lib/htmlFormatter';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ============================================
  // PART 1: Locale Handling
  // ============================================
  
  // Legacy locale redirects
  if (pathname === '/ms' || pathname.startsWith('/ms/')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/ms(?=\/|$)/, '/bm');
    return NextResponse.redirect(newUrl);
  }
  if (pathname === '/id' || pathname.startsWith('/id/')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/id(?=\/|$)/, '/en');
    return NextResponse.redirect(newUrl);
  }

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Redirect to default locale if not present
  if (!pathnameHasLocale) {
    const acceptLanguage = request.headers.get('Accept-Language');
    let detectedLocale = defaultLocale;

    if (acceptLanguage) {
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

      for (const { locale } of preferredLocales) {
        if (locales.includes(locale)) {
          detectedLocale = locale;
          break;
        }
      }
    }

    const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // ============================================
  // PART 2: HTML Formatting
  // ============================================
  
  // Get the response
  const response = NextResponse.next();
  
  // Only format HTML responses (skip API, JSON, etc.)
  const accept = request.headers.get('accept') || '';
  if (!accept.includes('text/html')) {
    return response;
  }

  // Clone the response to modify it
  const originalResponse = await fetch(request.url);
  
  // Check if it's HTML
  const contentType = originalResponse.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  try {
    // Get the HTML
    const html = await originalResponse.text();
    
    // Format it
    const formattedHTML = formatHTML(html);
    
    // Return formatted response
    return new NextResponse(formattedHTML, {
      status: originalResponse.status,
      statusText: originalResponse.statusText,
      headers: originalResponse.headers,
    });
  } catch (error) {
    console.error('HTML formatting error:', error);
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};
