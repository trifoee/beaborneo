/**
 * Navigation Component
 * 
 * Modern navigation links with active state.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function Navigation({ locale, isMobile = false, isScrolled = false, onLinkClick }) {
  const pathname = usePathname();
  
  const navItems = [
    { label: t(locale, 'navigation.home'), href: `/${locale}` },
    { label: t(locale, 'navigation.tours'), href: `/${locale}/tours` },
    { label: t(locale, 'navigation.carRental'), href: `/${locale}/car-rental` },
    { label: t(locale, 'navigation.events'), href: `/${locale}/events` },
    { label: t(locale, 'navigation.about'), href: `/${locale}/about` },
    { label: t(locale, 'navigation.contact'), href: `/${locale}/contact` },
  ];

  const isActive = (href) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              'py-3 px-4 rounded-xl font-medium transition-all',
              isActive(item.href)
                ? 'bg-red-50 text-[#E31E24]'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'relative px-3 py-2 font-medium text-sm transition-all rounded-full whitespace-nowrap',
            isActive(item.href)
              ? isScrolled 
                ? 'text-[#E31E24]' 
                : 'text-white bg-white/20'
              : isScrolled
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                : 'text-white/80 hover:text-white hover:bg-white/10'
          )}
        >
          {item.label}
          {isActive(item.href) && isScrolled && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E31E24] rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  );
}
