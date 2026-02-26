/**
 * Single Tour Page
 * 
 * Displays detailed information about a specific tour.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getLocalizedValue, t } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import ImageBlock from '@/components/ui/ImageBlock';
import Button from '@/components/ui/Button';

/**
 * Hardcoded tour data
 * TODO: Replace with Sanity CMS data
 * Usage: const tour = await getTourBySlug(slug);
 */
const toursData = {
  'kinabatangan-river-safari': {
    _id: '1',
    title: {
      en: 'Kinabatangan River Safari',
      ms: 'Safari Sungai Kinabatangan',
      id: 'Safari Sungai Kinabatangan',
    },
    slug: { current: 'kinabatangan-river-safari' },
    description: {
      en: `The Kinabatangan River is Sabah's longest river and one of the best places in Southeast Asia to spot wildlife in their natural habitat. This immersive 3-day safari takes you deep into the heart of Borneo's wilderness.

Each day begins with early morning river cruises when wildlife is most active. Watch as proboscis monkeys leap between trees, pygmy elephants gather at the riverbank, and hornbills soar overhead. Your expert naturalist guide will share insights about the ecosystem and help you spot even the most elusive creatures.

Stay in comfortable eco-lodges nestled along the riverbank, falling asleep to the sounds of the jungle and waking to the calls of gibbons. Evening cruises offer opportunities to spot crocodiles and nocturnal wildlife.`,
      ms: `Sungai Kinabatangan adalah sungai terpanjang Sabah dan salah satu tempat terbaik di Asia Tenggara untuk melihat hidupan liar di habitat semula jadi mereka. Safari 3 hari yang mendalam ini membawa anda jauh ke dalam hati belantara Borneo.

Setiap hari bermula dengan pelayaran sungai awal pagi apabila hidupan liar paling aktif. Saksikan monyet belanda melompat antara pokok, gajah pygmy berkumpul di tebing sungai, dan enggang terbang di atas kepala. Pemandu naturalis pakar anda akan berkongsi pandangan tentang ekosistem dan membantu anda melihat makhluk yang paling sukar dikesan.

Menginap di pondok eko yang selesa terletak di sepanjang tebing sungai, tertidur dengan bunyi hutan dan terjaga dengan panggilan ungka. Pelayaran malam menawarkan peluang untuk melihat buaya dan hidupan liar malam.`,
      id: `Sungai Kinabatangan adalah sungai terpanjang Sabah dan salah satu tempat terbaik di Asia Tenggara untuk melihat satwa liar di habitat alaminya. Safari 3 hari yang mendalam ini membawa Anda jauh ke jantung hutan belantara Borneo.

Setiap hari dimulai dengan pelayaran sungai pagi-pagi ketika satwa liar paling aktif. Saksikan monyet bekantan melompat di antara pohon, gajah pygmy berkumpul di tepi sungai, dan rangkong terbang di atas kepala. Pemandu naturalis ahli Anda akan berbagi wawasan tentang ekosistem dan membantu Anda melihat makhluk yang paling sulit ditemukan.

Menginap di eco-lodge yang nyaman terletak di sepanjang tepi sungai, tertidur dengan suara hutan dan terbangun dengan panggilan owa. Pelayaran malam menawarkan kesempatan untuk melihat buaya dan satwa liar malam.`,
    },
    shortDescription: {
      en: 'Cruise through Borneo\'s longest river and spot proboscis monkeys, pygmy elephants, and exotic birds.',
      ms: 'Pelayaran melalui sungai terpanjang Borneo dan lihat monyet belanda, gajah pygmy, dan burung eksotik.',
      id: 'Berlayar melalui sungai terpanjang Borneo dan lihat monyet bekantan, gajah pygmy, dan burung eksotis.',
    },
    duration: '3 Days / 2 Nights',
    price: 850,
    mainImageUrl: '/images/tours/kinabatangan.jpg',
    highlights: [
      { en: 'Multiple wildlife river cruises', ms: 'Pelayaran hidupan liar berkali-kali', id: 'Pelayaran satwa liar berkali-kali' },
      { en: 'Proboscis monkeys & pygmy elephants', ms: 'Monyet belanda & gajah pygmy', id: 'Monyet bekantan & gajah pygmy' },
      { en: 'Eco-lodge accommodation', ms: 'Penginapan pondok eko', id: 'Penginapan eco-lodge' },
      { en: 'Expert naturalist guide', ms: 'Pemandu naturalis pakar', id: 'Pemandu naturalis ahli' },
      { en: 'Night wildlife spotting', ms: 'Pencarian hidupan liar malam', id: 'Pencarian satwa liar malam' },
    ],
    inclusions: [
      { en: 'Return transfers from Sandakan', ms: 'Pemindahan pulang pergi dari Sandakan', id: 'Transfer pulang pergi dari Sandakan' },
      { en: '2 nights accommodation', ms: '2 malam penginapan', id: '2 malam akomodasi' },
      { en: 'All meals', ms: 'Semua hidangan', id: 'Semua makanan' },
      { en: 'River cruise activities', ms: 'Aktiviti pelayaran sungai', id: 'Aktivitas pelayaran sungai' },
      { en: 'English-speaking guide', ms: 'Pemandu berbahasa Inggeris', id: 'Pemandu berbahasa Inggris' },
    ],
    exclusions: [
      { en: 'Flights to Sandakan', ms: 'Penerbangan ke Sandakan', id: 'Penerbangan ke Sandakan' },
      { en: 'Travel insurance', ms: 'Insurans perjalanan', id: 'Asuransi perjalanan' },
      { en: 'Personal expenses', ms: 'Perbelanjaan peribadi', id: 'Pengeluaran pribadi' },
      { en: 'Tips and gratuities', ms: 'Tip dan ganjaran', id: 'Tip dan gratifikasi' },
    ],
    seo: {
      title: {
        en: 'Kinabatangan River Safari - Bea Borneo Travel',
        ms: 'Safari Sungai Kinabatangan - Bea Borneo Travel',
        id: 'Safari Sungai Kinabatangan - Bea Borneo Travel',
      },
      description: {
        en: 'Experience a 3-day wildlife safari on Borneo\'s longest river. Spot proboscis monkeys, pygmy elephants, and more.',
        ms: 'Alami safari hidupan liar 3 hari di sungai terpanjang Borneo. Lihat monyet belanda, gajah pygmy, dan banyak lagi.',
        id: 'Rasakan safari satwa liar 3 hari di sungai terpanjang Borneo. Lihat monyet bekantan, gajah pygmy, dan banyak lagi.',
      },
    },
  },
  // Add more tours as needed
};

// Get all tour slugs for static generation
export async function generateStaticParams() {
  // TODO: Replace with dynamic slug fetching from CMS
  return Object.keys(toursData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const tour = toursData[slug];
  
  if (!tour) {
    return {};
  }
  
  return generateSeoMetadata({
    title: tour.seo?.title || tour.title,
    description: tour.seo?.description || tour.shortDescription,
    locale,
    path: `/tours/${slug}`,
  });
}

export default async function TourPage({ params }) {
  const { locale, slug } = await params;
  const tour = toursData[slug];

  if (!tour) {
    notFound();
  }

  return (
    <div className="tour-page">
      {/* Hero Section */}
      <section className="tour-hero relative h-[50vh] md:h-[60vh] min-h-[400px]">
        <ImageBlock
          src={tour.mainImageUrl}
          alt={getLocalizedValue(tour.title, locale)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary-700 mb-4">
              {tour.duration}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {getLocalizedValue(tour.title, locale)}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {getLocalizedValue(tour.shortDescription, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="tour-content py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  {locale === 'en' ? 'Overview' : locale === 'ms' ? 'Gambaran Keseluruhan' : 'Gambaran Umum'}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {getLocalizedValue(tour.description, locale)
                    .split('\n\n')
                    .map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  {locale === 'en' ? 'Highlights' : locale === 'ms' ? 'Sorotan' : 'Sorotan'}
                </h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 text-xl">✓</span>
                      <span className="text-gray-700">
                        {getLocalizedValue(highlight, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4 text-green-700">
                    {locale === 'en' ? 'Included' : locale === 'ms' ? 'Termasuk' : 'Termasuk'}
                  </h3>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600">✓</span>
                        {getLocalizedValue(item, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4 text-red-700">
                    {locale === 'en' ? 'Not Included' : locale === 'ms' ? 'Tidak Termasuk' : 'Tidak Termasuk'}
                  </h3>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-red-600">✗</span>
                        {getLocalizedValue(item, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 mb-1">
                    {locale === 'en' ? 'From' : locale === 'ms' ? 'Dari' : 'Dari'}
                  </div>
                  <div className="text-4xl font-heading font-bold text-primary-700">
                    {formatPrice(tour.price, locale)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {locale === 'en' ? 'per person' : locale === 'ms' ? 'seorang' : 'per orang'}
                  </div>
                </div>
                
                <div className="border-t border-gray-100 py-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      {locale === 'en' ? 'Duration' : locale === 'ms' ? 'Tempoh' : 'Durasi'}
                    </span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                </div>

                <Button 
                  href={`/${locale}/contact?tour=${tour.slug.current}`}
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                >
                  {t(locale, 'common.bookNow')}
                </Button>
                
                <Link
                  href={`/${locale}/contact`}
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  {locale === 'en' ? 'Have questions? Contact us' : locale === 'ms' ? 'Ada soalan? Hubungi kami' : 'Ada pertanyaan? Hubungi kami'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Tours */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <span className="mr-2">←</span>
            {locale === 'en' ? 'Back to All Tours' : locale === 'ms' ? 'Kembali ke Semua Pakej' : 'Kembali ke Semua Paket'}
          </Link>
        </div>
      </section>
    </div>
  );
}
