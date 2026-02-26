/**
 * Footer Component
 * 
 * Modern footer with Bea Borneo branding.
 */

import Link from 'next/link';
import { t } from '@/lib/i18n';

const footerContent = {
  description: {
    en: 'Your trusted partner for authentic Borneo adventures. Discover wildlife, culture, and natural wonders with expert local guides.',
    ms: 'Rakan kongsi dipercayai anda untuk pengembaraan Borneo yang autentik. Temui hidupan liar, budaya, dan keajaiban alam dengan pemandu tempatan pakar.',
    id: 'Mitra terpercaya Anda untuk petualangan Borneo yang otentik. Temukan satwa liar, budaya, dan keajaiban alam dengan pemandu lokal ahli.',
  },
  socialLinks: [
    { name: 'Facebook', href: 'https://facebook.com/beaborneo', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com/beaborneo', icon: 'instagram' },
    { name: 'WhatsApp', href: 'https://wa.me/60881234567', icon: 'whatsapp' },
  ],
  contact: {
    email: 'hello@beaborneo.com',
    phone: '+60 88 123 456',
    address: 'Kota Kinabalu, Sabah, Malaysia',
  },
};

export default function Footer({ locale }) {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: t(locale, 'navigation.home'), href: `/${locale}` },
    { label: t(locale, 'navigation.tours'), href: `/${locale}/tours` },
    { label: t(locale, 'navigation.about'), href: `/${locale}/about` },
    { label: t(locale, 'navigation.contact'), href: `/${locale}/contact` },
  ];

  const tourLinks = [
    { label: 'Kinabatangan Safari', href: `/${locale}/tours/kinabatangan-river-safari` },
    { label: 'Mount Kinabalu', href: `/${locale}/tours/mount-kinabalu-expedition` },
    { label: 'Orangutan Discovery', href: `/${locale}/tours/orangutan-discovery` },
  ];

  return (
    <footer className="footer bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E31E24] flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BEA</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">BEA BORNEO</div>
                <div className="text-[10px] tracking-[0.15em] text-gray-400 uppercase">
                  Dream • Explore • Discover
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              {footerContent.description[locale] || footerContent.description.en}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footerContent.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#E31E24] hover:text-white transition-all"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t(locale, 'footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#E31E24] group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {locale === 'en' ? 'Popular Tours' : locale === 'ms' ? 'Pakej Popular' : 'Paket Populer'}
            </h3>
            <ul className="space-y-3">
              {tourLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#E31E24] group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {t(locale, 'footer.contactUs')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a 
                    href={`mailto:${footerContent.contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {footerContent.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{locale === 'en' ? 'Phone' : 'Telefon'}</div>
                  <a 
                    href={`tel:${footerContent.contact.phone}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {footerContent.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{locale === 'en' ? 'Location' : 'Lokasi'}</div>
                  <span className="text-gray-300">{footerContent.contact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Bea Borneo Travel. {locale === 'en' ? 'All rights reserved.' : locale === 'ms' ? 'Hak cipta terpelihara.' : 'Hak cipta dilindungi.'}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-white transition-colors">
                {locale === 'en' ? 'Privacy Policy' : 'Dasar Privasi'}
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                {locale === 'en' ? 'Terms of Service' : 'Syarat Perkhidmatan'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const icons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
