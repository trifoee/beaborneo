/**
 * Car Rental & Transport Services Page
 *
 * Self-drive rental fleet, private transfers, and private tours
 * with driver-guide. All pricing is sourced from Sanity CMS via
 * `getTransportServices()` — only the static page chrome
 * (hero copy, "Why us" cards, CTA) lives in this file.
 */

import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getLocalizedValue } from '@/lib/i18n';
import { getTransportServices } from '@/lib/sanity.queries';
import Button from '@/components/ui/Button';

/* ------------------------------------------------------------------ */
/*  Static content / labels                                            */
/* ------------------------------------------------------------------ */

const pageContent = {
  title: {
    en: 'Car Rental & Transport',
    ms: 'Sewa Kereta & Pengangkutan',
    id: 'Sewa Mobil & Transportasi',
  },
  subtitle: {
    en: 'With our car rental services, the adventure begins as soon as you hit the ignition',
    ms: 'Dengan perkhidmatan sewa kereta kami, pengembaraan bermula sebaik sahaja anda menghidupkan enjin',
    id: 'Dengan layanan sewa mobil kami, petualangan dimulai begitu Anda menyalakan mesin',
  },
  highlights: [
    { en: 'Competitive Pricing', ms: 'Harga Kompetitif', id: 'Harga Kompetitif' },
    { en: 'Quality Assurance', ms: 'Jaminan Kualiti', id: 'Jaminan Kualitas' },
    { en: 'Convenient Booking', ms: 'Tempahan Mudah', id: 'Pemesanan Mudah' },
    { en: 'Professional Drivers', ms: 'Pemandu Profesional', id: 'Sopir Profesional' },
  ],
  seo: {
    title: { en: 'Car Rental & Transport Services in Sabah', ms: 'Sewa Kereta & Perkhidmatan Pengangkutan di Sabah', id: 'Sewa Mobil & Layanan Transportasi di Sabah' },
    description: {
      en: 'Self-drive car rental, airport transfers, and private tours with driver-guide in Kota Kinabalu and Sabah. Bea Borneo Travel.',
      ms: 'Sewa kereta pandu sendiri, pemindahan lapangan terbang, dan lawatan persendirian dengan pemandu di Kota Kinabalu dan Sabah. Bea Borneo Travel.',
      id: 'Sewa mobil lepas kunci, transfer bandara, dan tur privat dengan sopir-pemandu di Kota Kinabalu dan Sabah. Bea Borneo Travel.',
    },
  },
};

/* CMS category value → localized label + display order */
const CATEGORY_META = {
  economy_compact: {
    order: 1,
    label: { en: 'Economy & Compact', ms: 'Ekonomi & Kompak', id: 'Ekonomi & Kompak' },
  },
  sedan: {
    order: 2,
    label: { en: 'Sedan', ms: 'Sedan', id: 'Sedan' },
  },
  mpv_family: {
    order: 3,
    label: { en: 'MPV & Family', ms: 'MPV & Keluarga', id: 'MPV & Keluarga' },
  },
  pickup_4wd: {
    order: 4,
    label: { en: 'Pickup & 4WD', ms: 'Pickup & 4WD', id: 'Pickup & 4WD' },
  },
  van_group: {
    order: 5,
    label: { en: 'Van & Group', ms: 'Van & Kumpulan', id: 'Van & Grup' },
  },
  premium: {
    order: 6,
    label: { en: 'Premium', ms: 'Premium', id: 'Premium' },
  },
};

const whyUsItems = [
  {
    title: { en: 'Competitive Pricing', ms: 'Harga Kompetitif', id: 'Harga Kompetitif' },
    description: {
      en: 'Transparent rates with multi-day discounts. No hidden charges — the price you see is the price you pay.',
      ms: 'Kadar telus dengan diskaun pelbagai hari. Tiada caj tersembunyi — harga yang anda lihat adalah harga yang anda bayar.',
      id: 'Tarif transparan dengan diskon multi-hari. Tanpa biaya tersembunyi — harga yang Anda lihat adalah harga yang Anda bayar.',
    },
    icon: 'pricing',
  },
  {
    title: { en: 'Quality Assurance', ms: 'Jaminan Kualiti', id: 'Jaminan Kualitas' },
    description: {
      en: 'Every vehicle is regularly serviced, inspected, and sanitised before each rental. Drive with total peace of mind.',
      ms: 'Setiap kenderaan diservis, diperiksa, dan dinyahjangkit secara berkala sebelum setiap sewaan. Pandu dengan ketenangan fikiran.',
      id: 'Setiap kendaraan diservis, diperiksa, dan disanitasi secara berkala sebelum setiap penyewaan. Berkendara dengan tenang.',
    },
    icon: 'quality',
  },
  {
    title: { en: 'Convenient Booking', ms: 'Tempahan Mudah', id: 'Pemesanan Mudah' },
    description: {
      en: 'Book via WhatsApp, email, or our contact form. Flexible pickup from our office, the airport, or your hotel.',
      ms: 'Tempah melalui WhatsApp, emel, atau borang hubungi kami. Pengambilan fleksibel dari pejabat kami, lapangan terbang, atau hotel anda.',
      id: 'Pesan melalui WhatsApp, email, atau formulir kontak kami. Penjemputan fleksibel dari kantor kami, bandara, atau hotel Anda.',
    },
    icon: 'booking',
  },
  {
    title: { en: 'Professional Drivers', ms: 'Pemandu Profesional', id: 'Sopir Profesional' },
    description: {
      en: 'Need a driver? Our experienced, multilingual chauffeurs double as knowledgeable local guides.',
      ms: 'Perlukan pemandu? Pemandu kami yang berpengalaman dan pelbagai bahasa juga berperanan sebagai pemandu pelancong tempatan.',
      id: 'Butuh sopir? Sopir kami yang berpengalaman dan multibahasa juga berperan sebagai pemandu wisata lokal.',
    },
    icon: 'driver',
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing helpers                                                    */
/* ------------------------------------------------------------------ */

/** Strip RM/commas/whitespace and return a number, or null. */
function parsePrice(value) {
  if (!value || typeof value !== 'string') return null;
  const num = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(num) && num > 0 ? num : null;
}

/** Lowest valid daily price across an array of vehicles, or null. */
function lowestDailyPrice(vehicles) {
  if (!Array.isArray(vehicles)) return null;
  const prices = vehicles.map((v) => parsePrice(v?.dailyPrice)).filter(Boolean);
  return prices.length ? Math.min(...prices) : null;
}

/** Largest savings between daily and multi-day across vehicles, or null. */
function maxMultiDaySavings(vehicles) {
  if (!Array.isArray(vehicles)) return null;
  let best = 0;
  for (const v of vehicles) {
    const d = parsePrice(v?.dailyPrice);
    const m = parsePrice(v?.multiDayPrice);
    if (d && m && d - m > best) best = d - m;
  }
  return best > 0 ? best : null;
}

const formatRM = (n) =>
  `RM${Number(n).toLocaleString('en-MY', { maximumFractionDigits: 0 })}`;

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const whyUsIcons = {
  pricing: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
  ),
  quality: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  booking: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
  driver: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
};

const SedanIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const categoryIcons = {
  economy_compact: SedanIcon,
  sedan: SedanIcon,
  mpv_family: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  pickup_4wd: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>
  ),
  van_group: SedanIcon,
  premium: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
};

const SparkleIcon = (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateSeoMetadata({
    title: pageContent.seo.title,
    description: pageContent.seo.description,
    locale,
    path: '/car-rental',
  });
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function CarRentalPage({ params }) {
  const { locale } = await params;

  let transport = { selfDrive: [], privateTransfer: [], privateTour: [] };
  try {
    transport = (await getTransportServices()) || transport;
  } catch (err) {
    console.error('Failed to fetch transport services:', err);
  }

  /* Sort self-drive groups by our preferred display order */
  const selfDriveGroups = (transport.selfDrive || [])
    .filter((g) => Array.isArray(g.vehicles) && g.vehicles.length > 0)
    .map((g) => ({
      ...g,
      _meta: CATEGORY_META[g.category] || {
        order: 99,
        label: { en: g.title || g.category, ms: g.title || g.category, id: g.title || g.category },
      },
    }))
    .sort((a, b) => a._meta.order - b._meta.order);

  const transfers = transport.privateTransfer || [];
  const privateTours = transport.privateTour || [];

  return (
    <div className="car-rental-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            {locale === 'en' ? 'Self-Drive • Transfers • Private Tours' : locale === 'ms' ? 'Pandu Sendiri • Pemindahan • Lawatan Persendirian' : 'Lepas Kunci • Transfer • Tur Privat'}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {getLocalizedValue(pageContent.title, locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            {getLocalizedValue(pageContent.subtitle, locale)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {pageContent.highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium"
              >
                <svg className="w-4 h-4 text-[#E31E24]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {getLocalizedValue(h, locale)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Self-Drive Fleet (CMS) ───────────────────────────────── */}
      {selfDriveGroups.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? '• Self-Drive Rental' : '• Sewa Pandu Sendiri'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {locale === 'en' ? 'Car Rental Service' : locale === 'ms' ? 'Perkhidmatan Sewa Kereta' : 'Layanan Sewa Mobil'}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Choose from our wide range of well-maintained vehicles, with transparent rates and friendly multi-day discounts.'
                  : locale === 'ms'
                    ? 'Pilih daripada pelbagai kenderaan kami yang diselenggara dengan baik, dengan kadar telus dan diskaun mesra untuk tempoh sewaan panjang.'
                    : 'Pilih dari berbagai kendaraan terawat kami, dengan tarif transparan dan diskon ramah untuk masa sewa lebih panjang.'}
              </p>

              {/* Subtle multi-day savings hint */}
              <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                <span className="text-emerald-500">{SparkleIcon}</span>
                {locale === 'en'
                  ? 'Stay 3 days or more — enjoy a discounted daily rate'
                  : locale === 'ms'
                    ? 'Sewa 3 hari atau lebih — nikmati kadar harian terdiskaun'
                    : 'Sewa 3 hari atau lebih — nikmati tarif harian yang lebih murah'}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selfDriveGroups.map((group) => {
                const startingDaily = lowestDailyPrice(group.vehicles);
                const maxSavings = maxMultiDaySavings(group.vehicles);

                return (
                  <div
                    key={group._id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-3 px-6 md:px-8 py-5 bg-stone-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center">
                          {categoryIcons[group.category] || SedanIcon}
                        </div>
                        <h3 className="font-heading text-lg font-bold text-gray-900">
                          {getLocalizedValue(group._meta.label, locale)}
                        </h3>
                      </div>
                      {startingDaily && (
                        <div className="text-right shrink-0">
                          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                            {locale === 'en' ? 'Starting from' : locale === 'ms' ? 'Bermula dari' : 'Mulai dari'}
                          </div>
                          <div className="text-base md:text-lg font-bold text-[#E31E24]">
                            {formatRM(startingDaily)}
                            <span className="text-xs font-medium text-gray-500 ml-1">
                              /{locale === 'en' ? 'day' : locale === 'ms' ? 'hari' : 'hari'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <ul className="divide-y divide-gray-50 flex-1">
                      {group.vehicles.map((v, vIndex) => {
                        const daily = parsePrice(v?.dailyPrice);
                        return (
                          <li
                            key={`${group._id}-${vIndex}`}
                            className="flex items-center justify-between gap-4 px-6 md:px-8 py-4 hover:bg-red-50/30 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{v?.model}</span>
                            <span className="text-right">
                              <span className="text-xs text-gray-400 mr-1">
                                {locale === 'en' ? 'from' : locale === 'ms' ? 'dari' : 'dari'}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {daily ? formatRM(daily) : v?.dailyPrice || '—'}
                              </span>
                              <span className="text-xs text-gray-500">
                                /{locale === 'en' ? 'day' : 'hari'}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {maxSavings && (
                      <div className="px-6 md:px-8 py-3 bg-emerald-50/60 border-t border-gray-50 text-xs text-emerald-700 font-medium flex items-center gap-2">
                        <span className="text-emerald-500">{SparkleIcon}</span>
                        {locale === 'en'
                          ? `Save up to ${formatRM(maxSavings)}/day on bookings of 3+ days`
                          : locale === 'ms'
                            ? `Jimat sehingga ${formatRM(maxSavings)}/hari untuk tempahan 3+ hari`
                            : `Hemat hingga ${formatRM(maxSavings)}/hari untuk pemesanan 3+ hari`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
              {locale === 'en'
                ? '* Prices are indicative and subject to availability. Terms & conditions apply.'
                : locale === 'ms'
                  ? '* Harga adalah indikatif dan tertakluk kepada ketersediaan. Terma & syarat terpakai.'
                  : '* Harga bersifat indikatif dan tergantung ketersediaan. Syarat & ketentuan berlaku.'}
            </p>
          </div>
        </section>
      )}

      {/* ── Private Transfers (CMS) ──────────────────────────────── */}
      {transfers.length > 0 && (
        <section className="py-20 md:py-32 bg-stone-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
                  {locale === 'en' ? '• Private Transfer' : '• Pemindahan Persendirian'}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {locale === 'en' ? 'Airport & Jetty Transfers' : locale === 'ms' ? 'Pemindahan Lapangan Terbang & Jeti' : 'Transfer Bandara & Dermaga'}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {locale === 'en'
                    ? 'Start or end your Sabah trip stress-free with our reliable point-to-point private transfers. Available day and night with professional, courteous drivers.'
                    : locale === 'ms'
                      ? 'Mulakan atau akhiri perjalanan Sabah anda tanpa tekanan dengan pemindahan persendirian kami yang boleh dipercayai. Tersedia siang dan malam dengan pemandu profesional dan berbudi bahasa.'
                      : 'Mulai atau akhiri perjalanan Sabah Anda tanpa stres dengan transfer privat kami yang andal. Tersedia siang dan malam dengan sopir profesional dan ramah.'}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="font-medium">{locale === 'en' ? 'Day Rate' : locale === 'ms' ? 'Kadar Siang' : 'Tarif Siang'}: 7:00 AM – 5:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="font-medium">{locale === 'en' ? 'Night Rate' : locale === 'ms' ? 'Kadar Malam' : 'Tarif Malam'}: 5:30 PM – 12:01 AM</span>
                </div>
              </div>

              <div className="space-y-4">
                {transfers.map((transfer) => (
                  <div
                    key={transfer._id}
                    className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
                  >
                    <h4 className="font-heading font-bold text-gray-900 mb-5">
                      {transfer.route}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-50 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                            {locale === 'en' ? 'Day' : 'Siang'}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{transfer.dayTimePrice || '—'}</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                            {locale === 'en' ? 'Night' : 'Malam'}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{transfer.nightTimePrice || '—'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Private Tour with Driver-Guide (CMS) ─────────────────── */}
      {privateTours.length > 0 && (
        <section className="py-20 md:py-32 bg-gray-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31E24]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? '• Private Tour' : '• Lawatan Persendirian'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {locale === 'en' ? 'Private Tour with Driver & Guide' : locale === 'ms' ? 'Lawatan Persendirian dengan Pemandu' : 'Tur Privat dengan Sopir & Pemandu'}
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                {locale === 'en'
                  ? 'Sit back and enjoy the scenery while our experienced driver-guide takes you on a personalised multi-day adventure through Sabah.'
                  : locale === 'ms'
                    ? 'Duduk dan nikmati pemandangan sementara pemandu kami yang berpengalaman membawa anda dalam pengembaraan pelbagai hari yang diperibadikan melalui Sabah.'
                    : 'Duduk santai dan nikmati pemandangan sementara sopir-pemandu kami yang berpengalaman membawa Anda dalam petualangan multi-hari yang dipersonalisasi melalui Sabah.'}
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {privateTours.map((tour) => {
                const pkg = tour.packages || {};
                return (
                  <div
                    key={tour._id}
                    className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className="px-6 md:px-8 py-5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E31E24]/20 text-[#ff6b6f] flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                        </div>
                        <h3 className="font-heading text-lg md:text-xl font-bold text-white">
                          {tour.route}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
                      {[
                        { label: '2D1N', value: pkg.twoDayOneNight },
                        { label: '3D2N', value: pkg.threeDayTwoNight },
                        { label: '4D3N', value: pkg.fourDayThreeNight },
                        { label: '5D4N', value: pkg.fiveDayFourNight },
                      ].map(
                        (col) =>
                          col.value && (
                            <div key={col.label} className="px-4 md:px-6 py-5 text-center">
                              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                                {col.label}
                              </div>
                              <div className="text-lg md:text-xl font-bold text-white">
                                {col.value}
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-white/30 mt-8">
              {locale === 'en'
                ? '* Includes vehicle, fuel, driver-guide, and tolls. Accommodation & meals not included unless specified.'
                : locale === 'ms'
                  ? '* Termasuk kenderaan, bahan api, pemandu, dan tol. Penginapan & makanan tidak termasuk melainkan dinyatakan.'
                  : '* Termasuk kendaraan, bahan bakar, sopir-pemandu, dan tol. Akomodasi & makanan tidak termasuk kecuali disebutkan.'}
            </p>
          </div>
        </section>
      )}

      {/* ── Why Rent With Us ─────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Why Bea Borneo' : '• Kenapa Bea Borneo'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Why Choose Us' : locale === 'ms' ? 'Mengapa Pilih Kami' : 'Mengapa Memilih Kami'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E31E24] flex items-center justify-center mb-6 mx-auto">
                  {whyUsIcons[item.icon]}
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  {getLocalizedValue(item.title, locale)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {getLocalizedValue(item.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#E31E24]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {locale === 'en' ? 'Ready to Hit the Road?' : locale === 'ms' ? 'Bersedia untuk Memandu?' : 'Siap untuk Berkendara?'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Book your vehicle or private tour today. Reach out via our contact form or WhatsApp for the fastest response.'
              : locale === 'ms'
                ? 'Tempah kenderaan atau lawatan persendirian anda hari ini. Hubungi kami melalui borang hubungi atau WhatsApp untuk respons terpantas.'
                : 'Pesan kendaraan atau tur privat Anda hari ini. Hubungi kami melalui formulir kontak atau WhatsApp untuk respons tercepat.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${locale}/contact`} variant="white" size="lg">
              {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
            </Button>
            <a
              href="https://wa.me/60182103921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-full font-semibold text-base hover:bg-[#1da851] transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
