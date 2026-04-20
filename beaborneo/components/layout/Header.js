/**
 * Header Component
 * 
 * Modern navigation header with Bea Borneo branding.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { t } from '@/lib/i18n';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';

export default function Header({ locale }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'header fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/bea_borneo_logo.png"
                alt="BEA Borneo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                BEA BORNEO
              </div>
              <div className={cn(
                "text-[10px] tracking-[0.2em] uppercase transition-colors",
                isScrolled ? "text-gray-500" : "text-white/70"
              )}>
                Dream • Explore • Discover
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Navigation locale={locale} isScrolled={isScrolled} />
            <div className="flex items-center gap-4">
              <LanguageSwitcher locale={locale} isScrolled={isScrolled} />
              <Link
                href={`/${locale}/contact`}
                className="px-6 py-2.5 bg-[#E31E24] text-white rounded-full font-semibold text-sm hover:bg-[#c41a1f] transition-all hover:shadow-lg hover:shadow-red-500/25"
              >
                {locale === 'en' ? 'Book Now' : locale === 'ms' ? 'Tempah' : 'Pesan'}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
          )}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <Navigation locale={locale} isMobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
              <LanguageSwitcher locale={locale} />
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-5 py-2 bg-[#E31E24] text-white rounded-full font-semibold text-sm"
              >
                {locale === 'en' ? 'Book Now' : locale === 'ms' ? 'Tempah' : 'Pesan'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
