/**
 * Language Switcher Component
 * 
 * Modern language selector with flag indicators.
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ locale, isScrolled = true }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="language-switcher flex items-center gap-1 p-1 rounded-full bg-gray-100/80">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-full transition-all',
            locale === loc
              ? 'bg-white text-[#E31E24] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
