/**
 * Contact Page
 * 
 * Modern contact page with form and information.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getLocalizedValue } from '@/lib/i18n';
import ContactForm from '@/components/sections/ContactForm';

const contactContent = {
  title: {
    en: 'Get in Touch',
    ms: 'Hubungi Kami',
    id: 'Hubungi Kami',
  },
  subtitle: {
    en: 'Have questions about our tours? We\'d love to hear from you.',
    ms: 'Ada soalan tentang pakej kami? Kami ingin mendengar daripada anda.',
    id: 'Ada pertanyaan tentang paket kami? Kami ingin mendengar dari Anda.',
  },
  info: {
    address: {
      label: { en: 'Address', ms: 'Alamat', id: 'Alamat' },
      value: {
        en: 'Lot B13-2A-2, Block B, 1st Floor,\nKepayan Perdana, 88300\nPenampang, Sabah, Malaysia',
        ms: 'Lot B13-2A-2, Blok B, Tingkat 1,\nKepayan Perdana, 88300\nPenampang, Sabah, Malaysia',
        id: 'Lot B13-2A-2, Blok B, Lantai 1,\nKepayan Perdana, 88300\nPenampang, Sabah, Malaysia',
      },
    },
    phone: {
      label: { en: 'Phone', ms: 'Telefon', id: 'Telepon' },
      value: '+60 88 212 982',
      mobile: '+60 18 210 3921',
    },
    email: {
      label: { en: 'Email', ms: 'Emel', id: 'Email' },
      value: 'beaborneo@gmail.com',
    },
    hours: {
      label: { en: 'Office Hours', ms: 'Waktu Operasi', id: 'Jam Operasional' },
      value: {
        en: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
        ms: 'Isnin - Jumaat: 9:00 PG - 6:00 PTG\nSabtu: 9:00 PG - 1:00 PTG\nAhad: Tutup',
        id: 'Senin - Jumat: 9:00 - 18:00\nSabtu: 9:00 - 13:00\nMinggu: Tutup',
      },
    },
    social: {
      label: { en: 'Social Media', ms: 'Media Sosial', id: 'Media Sosial' },
      handle: '@beaborneotravel',
    },
  },
  seo: {
    title: { en: 'Contact Us', ms: 'Hubungi Kami', id: 'Hubungi Kami' },
    description: {
      en: 'Contact Bea Borneo Travel & Tours for tour inquiries, custom packages, and bookings. MOTAC-licensed travel agency in Penampang, Sabah.',
      ms: 'Hubungi Bea Borneo Travel & Tours untuk pertanyaan pelancongan, pakej khas, dan tempahan. Agensi pelancongan berlesen MOTAC di Penampang, Sabah.',
      id: 'Hubungi Bea Borneo Travel & Tours untuk pertanyaan wisata, paket khusus, dan pemesanan. Agen perjalanan berlisensi MOTAC di Penampang, Sabah.',
    },
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateSeoMetadata({
    title: contactContent.seo.title,
    description: contactContent.seo.description,
    locale,
    path: '/contact',
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            {locale === 'en' ? 'We\'re Here to Help' : 'Kami Sedia Membantu'}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {getLocalizedValue(contactContent.title, locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {getLocalizedValue(contactContent.subtitle, locale)}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  {locale === 'en' ? 'Send us a Message' : 'Hantar Mesej'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {locale === 'en' 
                    ? 'Fill out the form below and we\'ll get back to you within 24 hours.' 
                    : 'Isi borang di bawah dan kami akan menghubungi anda dalam masa 24 jam.'}
                </p>
                <ContactForm locale={locale} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                {/* Info Cards */}
                <div className="bg-earth-50 rounded-3xl p-8">
                  <h3 className="font-heading text-xl font-bold mb-6">
                    {locale === 'en' ? 'Contact Information' : 'Maklumat Hubungan'}
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {getLocalizedValue(contactContent.info.email.label, locale)}
                        </div>
                        <a 
                          href={`mailto:${contactContent.info.email.value}`}
                          className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors"
                        >
                          {contactContent.info.email.value}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {getLocalizedValue(contactContent.info.phone.label, locale)}
                        </div>
                        <a 
                          href={`tel:${contactContent.info.phone.value}`}
                          className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors block"
                        >
                          {contactContent.info.phone.value}
                        </a>
                        <a 
                          href={`tel:${contactContent.info.phone.mobile}`}
                          className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors block"
                        >
                          {contactContent.info.phone.mobile}
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {getLocalizedValue(contactContent.info.address.label, locale)}
                        </div>
                        <p className="text-gray-900 font-semibold whitespace-pre-line">
                          {getLocalizedValue(contactContent.info.address.value, locale)}
                        </p>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {getLocalizedValue(contactContent.info.social.label, locale)}
                        </div>
                        <div className="flex items-center gap-3">
                          <a 
                            href="https://facebook.com/beaborneotravel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors"
                            aria-label="Facebook"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                            </svg>
                          </a>
                          <a 
                            href="https://instagram.com/beaborneotravel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors"
                            aria-label="Instagram"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                          </a>
                          <a 
                            href="https://tiktok.com/@beaborneotravel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 font-semibold hover:text-[#E31E24] transition-colors"
                            aria-label="TikTok"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.28 6.28 0 001.88-4.49V8.76a8.26 8.26 0 004.84 1.56v-3.5a4.84 4.84 0 01-1.14-.13z" />
                            </svg>
                          </a>
                          <span className="text-gray-600 text-sm ml-1">{contactContent.info.social.handle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {getLocalizedValue(contactContent.info.hours.label, locale)}
                        </div>
                        <p className="text-gray-900 font-semibold whitespace-pre-line">
                          {getLocalizedValue(contactContent.info.hours.value, locale)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-[#25D366] rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <h3 className="font-bold text-xl">WhatsApp</h3>
                  </div>
                  <p className="text-white/90 mb-4">
                    {locale === 'en' 
                      ? 'Chat with us directly for quick responses!' 
                      : 'Berbual dengan kami secara langsung!'}
                  </p>
                  <a 
                    href="https://wa.me/60182103921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#25D366] rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {locale === 'en' ? 'Start Chat' : 'Mula Berbual'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <div className="bg-stone-50 px-8 py-6 flex items-center gap-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#E31E24]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#E31E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900">
                  {locale === 'en' ? 'Find Us' : 'Cari Kami'}
                </h3>
                <p className="text-sm text-gray-500">
                  Kepayan Perdana, 88300 Penampang, Sabah, Malaysia
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/Kepayan+Perdana+88300+Penampang+Sabah+Malaysia"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E31E24] text-white text-sm font-semibold rounded-full hover:bg-[#c41a1f] transition-colors"
              >
                {locale === 'en' ? 'Get Directions' : 'Dapatkan Arah'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9!2d116.0533!3d5.9714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323b69e0aa1234%3A0x0!2sKepayan+Perdana%2C+88300+Penampang%2C+Sabah!5e0!3m2!1sen!2smy!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bea Borneo Travel & Tours Location"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
