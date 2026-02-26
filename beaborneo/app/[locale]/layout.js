/**
 * Locale Layout
 * 
 * Layout for all pages within a specific locale.
 * Features modern typography and Bea Borneo branding.
 */

import { Playfair_Display, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeHtmlLang } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

// Elegant serif for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

// Modern sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
    title: {
      template: '%s | Bea Borneo Travel',
      default: 'Bea Borneo Travel - Dream • Explore • Discover',
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={localeHtmlLang[locale]} className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased bg-white text-gray-900`}>
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
