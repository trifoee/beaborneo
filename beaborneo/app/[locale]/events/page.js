/**
 * Events & Offers Page
 *
 * Showcases current promotions, seasonal deals, and upcoming events.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getLocalizedValue } from '@/lib/i18n';
import Button from '@/components/ui/Button';

const eventsContent = {
  title: {
    en: 'Events & Offers',
    ms: 'Acara & Tawaran',
    id: 'Acara & Promo',
  },
  subtitle: {
    en: 'Exclusive deals, seasonal packages, and exciting events across Sabah',
    ms: 'Tawaran eksklusif, pakej bermusim, dan acara menarik di seluruh Sabah',
    id: 'Penawaran eksklusif, paket musiman, dan acara menarik di seluruh Sabah',
  },
  promotions: [
    {
      badge: { en: 'Limited Time', ms: 'Masa Terhad', id: 'Waktu Terbatas' },
      title: {
        en: 'Early Bird Kinabalu Package',
        ms: 'Pakej Kinabalu Tempahan Awal',
        id: 'Paket Kinabalu Pemesanan Awal',
      },
      description: {
        en: 'Book your Mount Kinabalu expedition 60 days in advance and enjoy 15% off the standard package. Includes permits, guide, accommodation at Laban Rata, and return transfers from Kota Kinabalu.',
        ms: 'Tempah ekspedisi Gunung Kinabalu anda 60 hari lebih awal dan nikmati diskaun 15% daripada pakej standard. Termasuk permit, pemandu, penginapan di Laban Rata, dan pemindahan pergi balik dari Kota Kinabalu.',
        id: 'Pesan ekspedisi Gunung Kinabalu Anda 60 hari sebelumnya dan nikmati diskon 15% dari paket standar. Termasuk izin, pemandu, akomodasi di Laban Rata, dan transfer pulang-pergi dari Kota Kinabalu.',
      },
      discount: '15%',
      validity: { en: 'Valid for bookings made by 30 June 2026', ms: 'Sah untuk tempahan sebelum 30 Jun 2026', id: 'Berlaku untuk pemesanan sebelum 30 Juni 2026' },
      highlight: true,
    },
    {
      badge: { en: 'Group Deal', ms: 'Tawaran Kumpulan', id: 'Penawaran Grup' },
      title: {
        en: 'Semporna Island Group Getaway',
        ms: 'Percutian Kumpulan Pulau Semporna',
        id: 'Liburan Grup Pulau Semporna',
      },
      description: {
        en: 'Gather 6 or more friends and unlock special group pricing for our Semporna island-hopping package. Snorkel crystal-clear waters, visit Bohey Dulang, and enjoy fresh seafood on the beach.',
        ms: 'Kumpulkan 6 orang rakan atau lebih dan buka harga kumpulan istimewa untuk pakej melompat pulau Semporna kami. Snorkel perairan jernih, lawati Bohey Dulang, dan nikmati makanan laut segar di pantai.',
        id: 'Kumpulkan 6 teman atau lebih dan dapatkan harga grup khusus untuk paket island-hopping Semporna kami. Snorkeling di perairan jernih, kunjungi Bohey Dulang, dan nikmati seafood segar di pantai.',
      },
      discount: '20%',
      validity: { en: 'Available year-round for groups of 6+', ms: 'Tersedia sepanjang tahun untuk kumpulan 6+', id: 'Tersedia sepanjang tahun untuk grup 6+' },
      highlight: false,
    },
    {
      badge: { en: 'Seasonal', ms: 'Bermusim', id: 'Musiman' },
      title: {
        en: 'Rainforest & Wildlife Discovery',
        ms: 'Penemuan Hutan Hujan & Hidupan Liar',
        id: 'Penemuan Hutan Hujan & Satwa Liar',
      },
      description: {
        en: 'Experience the magic of Kinabatangan River during peak wildlife season. Spot proboscis monkeys, pygmy elephants, and hornbills with our expert naturalist guides. 3D2N all-inclusive river lodge stay.',
        ms: 'Alami keajaiban Sungai Kinabatangan semasa musim puncak hidupan liar. Temui monyet belanda, gajah kerdil, dan burung enggang dengan pemandu naturalis pakar kami. Penginapan pondok sungai 3H2M semua termasuk.',
        id: 'Rasakan keajaiban Sungai Kinabatangan saat musim puncak satwa liar. Temui monyet belanda, gajah kerdil, dan rangkong bersama pemandu naturalis ahli kami. Menginap 3H2M di pondok sungai all-inclusive.',
      },
      discount: '10%',
      validity: { en: 'March – October 2026', ms: 'Mac – Oktober 2026', id: 'Maret – Oktober 2026' },
      highlight: false,
    },
    {
      badge: { en: 'Family', ms: 'Keluarga', id: 'Keluarga' },
      title: {
        en: 'Family Fun in Kundasang',
        ms: 'Keseronokan Keluarga di Kundasang',
        id: 'Keseruan Keluarga di Kundasang',
      },
      description: {
        en: 'A specially crafted family package in the highlands of Kundasang. Visit Desa Dairy Farm, explore the Kundasang War Memorial, and enjoy breathtaking views of Mount Kinabalu. Kids under 5 stay free.',
        ms: 'Pakej keluarga yang direka khas di tanah tinggi Kundasang. Lawati Ladang Tenusu Desa, teroka Tugu Peringatan Perang Kundasang, dan nikmati pemandangan Gunung Kinabalu yang menakjubkan. Kanak-kanak bawah 5 tahun percuma.',
        id: 'Paket keluarga yang dirancang khusus di dataran tinggi Kundasang. Kunjungi Desa Dairy Farm, jelajahi Kundasang War Memorial, dan nikmati pemandangan Gunung Kinabalu yang menakjubkan. Anak di bawah 5 tahun gratis.',
      },
      discount: null,
      validity: { en: 'Available year-round', ms: 'Tersedia sepanjang tahun', id: 'Tersedia sepanjang tahun' },
      highlight: false,
    },
  ],
  events: [
    {
      title: {
        en: 'Kaamatan Harvest Festival',
        ms: 'Pesta Kaamatan',
        id: 'Festival Panen Kaamatan',
      },
      date: {
        en: 'May 30 – 31, 2026',
        ms: '30 – 31 Mei 2026',
        id: '30 – 31 Mei 2026',
      },
      location: { en: 'Penampang, Sabah', ms: 'Penampang, Sabah', id: 'Penampang, Sabah' },
      description: {
        en: 'Sabah\'s most important cultural celebration. Join the Kadazandusun community in giving thanks for the rice harvest. Experience traditional dances, "tapai" rice wine, beauty pageants, and vibrant cultural performances.',
        ms: 'Perayaan budaya terpenting Sabah. Sertai komuniti Kadazandusun dalam memberi penghargaan untuk penuaian padi. Alami tarian tradisional, tapai, pertandingan ratu cantik, dan persembahan budaya yang meriah.',
        id: 'Perayaan budaya terpenting Sabah. Bergabunglah dengan komunitas Kadazandusun dalam bersyukur atas panen padi. Rasakan tarian tradisional, tapai, kontes kecantikan, dan pertunjukan budaya yang semarak.',
      },
      type: 'cultural',
    },
    {
      title: {
        en: 'Sabah International Regatta',
        ms: 'Regata Antarabangsa Sabah',
        id: 'Regata Internasional Sabah',
      },
      date: {
        en: 'February 2026',
        ms: 'Februari 2026',
        id: 'Februari 2026',
      },
      location: { en: 'Kota Kinabalu, Sabah', ms: 'Kota Kinabalu, Sabah', id: 'Kota Kinabalu, Sabah' },
      description: {
        en: 'An exhilarating maritime event featuring traditional lepa-lepa boat races, sailing competitions, and waterfront festivities along the Kota Kinabalu coast.',
        ms: 'Acara maritim yang mengujakan menampilkan perlumbaan bot lepa-lepa tradisional, pertandingan belayar, dan perayaan persisiran pantai di sepanjang pantai Kota Kinabalu.',
        id: 'Acara maritim yang mendebarkan menampilkan balapan perahu tradisional lepa-lepa, kompetisi berlayar, dan perayaan tepi air di sepanjang pantai Kota Kinabalu.',
      },
      type: 'sports',
    },
    {
      title: {
        en: 'Mount Kinabalu International Climbathon',
        ms: 'Climbathon Antarabangsa Gunung Kinabalu',
        id: 'Climbathon Internasional Gunung Kinabalu',
      },
      date: {
        en: 'October 2026',
        ms: 'Oktober 2026',
        id: 'Oktober 2026',
      },
      location: { en: 'Kinabalu Park, Sabah', ms: 'Taman Kinabalu, Sabah', id: 'Taman Kinabalu, Sabah' },
      description: {
        en: 'One of the toughest mountain races in the world. Watch elite athletes tackle the 4,095m summit in record time, or join as a participant in the amateur category.',
        ms: 'Salah satu perlumbaan gunung paling sukar di dunia. Saksikan atlet elit menawan puncak 4,095m dalam masa rekod, atau sertai sebagai peserta dalam kategori amatur.',
        id: 'Salah satu lomba gunung paling sulit di dunia. Saksikan atlet elit menaklukkan puncak 4.095m dalam waktu rekor, atau bergabung sebagai peserta di kategori amatir.',
      },
      type: 'sports',
    },
    {
      title: {
        en: 'Sabah Fest',
        ms: 'Sabah Fest',
        id: 'Sabah Fest',
      },
      date: {
        en: 'October – November 2026',
        ms: 'Oktober – November 2026',
        id: 'Oktober – November 2026',
      },
      location: { en: 'Various venues, Sabah', ms: 'Pelbagai lokasi, Sabah', id: 'Berbagai lokasi, Sabah' },
      description: {
        en: 'A month-long celebration of Sabah\'s diverse cultures, featuring traditional music performances, culinary festivals, art exhibitions, and ethnic fashion shows from the many indigenous communities of Borneo.',
        ms: 'Perayaan sebulan budaya pelbagai Sabah, menampilkan persembahan muzik tradisional, festival masakan, pameran seni, dan pertunjukan fesyen etnik daripada banyak komuniti pribumi Borneo.',
        id: 'Perayaan sebulan budaya beragam Sabah, menampilkan pertunjukan musik tradisional, festival kuliner, pameran seni, dan pertunjukan mode etnis dari berbagai komunitas pribumi Borneo.',
      },
      type: 'cultural',
    },
  ],
  travelTips: [
    {
      title: { en: 'Best Time to Visit', ms: 'Masa Terbaik untuk Melawat', id: 'Waktu Terbaik untuk Berkunjung' },
      description: {
        en: 'Sabah is a year-round destination, but March to October offers the driest weather — perfect for climbing, diving, and island hopping.',
        ms: 'Sabah ialah destinasi sepanjang tahun, tetapi Mac hingga Oktober menawarkan cuaca paling kering — sempurna untuk mendaki, menyelam, dan melompat pulau.',
        id: 'Sabah adalah destinasi sepanjang tahun, tetapi Maret hingga Oktober menawarkan cuaca paling kering — sempurna untuk mendaki, menyelam, dan island hopping.',
      },
      icon: 'calendar',
    },
    {
      title: { en: 'Book in Advance', ms: 'Tempah Lebih Awal', id: 'Pesan Lebih Awal' },
      description: {
        en: 'Popular experiences like Mount Kinabalu permits and Sipadan diving slots sell out quickly — book at least 2–3 months ahead.',
        ms: 'Pengalaman popular seperti permit Gunung Kinabalu dan slot menyelam Sipadan habis dengan cepat — tempah sekurang-kurangnya 2–3 bulan lebih awal.',
        id: 'Pengalaman populer seperti izin Gunung Kinabalu dan slot menyelam Sipadan cepat habis — pesan setidaknya 2–3 bulan sebelumnya.',
      },
      icon: 'clock',
    },
    {
      title: { en: 'Combine & Save', ms: 'Gabung & Jimat', id: 'Gabungkan & Hemat' },
      description: {
        en: 'Bundle your tours, car rental, and accommodation together for the best value. Ask us about custom multi-destination packages.',
        ms: 'Gabungkan pakej pelancongan, sewa kereta, dan penginapan anda untuk nilai terbaik. Tanya kami tentang pakej pelbagai destinasi khas.',
        id: 'Gabungkan paket wisata, sewa mobil, dan akomodasi Anda untuk nilai terbaik. Tanyakan tentang paket multi-destinasi khusus.',
      },
      icon: 'tag',
    },
  ],
  seo: {
    title: { en: 'Events & Offers', ms: 'Acara & Tawaran', id: 'Acara & Promo' },
    description: {
      en: 'Discover exclusive travel promotions, seasonal packages, and exciting cultural events in Sabah with Bea Borneo Travel. Book early for the best deals on Borneo adventures.',
      ms: 'Temui promosi pelancongan eksklusif, pakej bermusim, dan acara budaya menarik di Sabah bersama Bea Borneo Travel. Tempah awal untuk tawaran terbaik pengembaraan Borneo.',
      id: 'Temukan promosi perjalanan eksklusif, paket musiman, dan acara budaya menarik di Sabah bersama Bea Borneo Travel. Pesan lebih awal untuk penawaran terbaik petualangan Borneo.',
    },
  },
};

const eventTypeIcons = {
  cultural: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Z" />
    </svg>
  ),
  sports: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.02 6.02 0 0 1-7.54 0" />
    </svg>
  ),
};

const tipIcons = {
  calendar: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
  clock: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  tag: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
  ),
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateSeoMetadata({
    title: eventsContent.seo.title,
    description: eventsContent.seo.description,
    locale,
    path: '/events',
  });
}

export default async function EventsPage({ params }) {
  const { locale } = await params;

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            {locale === 'en' ? 'Don\'t Miss Out' : locale === 'ms' ? 'Jangan Terlepas' : 'Jangan Lewatkan'}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {getLocalizedValue(eventsContent.title, locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {getLocalizedValue(eventsContent.subtitle, locale)}
          </p>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Special Offers' : '• Tawaran Istimewa'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Current Promotions' : locale === 'ms' ? 'Promosi Semasa' : 'Promosi Saat Ini'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Take advantage of our limited-time deals and make your Sabah trip even more memorable.'
                : locale === 'ms'
                  ? 'Manfaatkan tawaran masa terhad kami dan jadikan perjalanan Sabah anda lebih berkesan.'
                  : 'Manfaatkan penawaran waktu terbatas kami dan jadikan perjalanan Sabah Anda lebih berkesan.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {eventsContent.promotions.map((promo, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl p-8 md:p-10 border transition-all duration-300 hover:shadow-xl ${
                  promo.highlight
                    ? 'bg-gradient-to-br from-[#E31E24] to-[#c41a1f] text-white border-transparent'
                    : 'bg-white border-gray-100 hover:border-[#E31E24]/20'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    promo.highlight ? 'bg-white/20 text-white' : 'bg-red-50 text-[#E31E24]'
                  }`}>
                    {getLocalizedValue(promo.badge, locale)}
                  </span>
                  {promo.discount && (
                    <span className={`text-3xl font-bold ${promo.highlight ? 'text-white' : 'text-[#E31E24]'}`}>
                      {promo.discount} OFF
                    </span>
                  )}
                </div>

                <h3 className={`font-heading text-xl md:text-2xl font-bold mb-4 ${
                  promo.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  {getLocalizedValue(promo.title, locale)}
                </h3>

                <p className={`leading-relaxed mb-6 ${promo.highlight ? 'text-white/85' : 'text-gray-600'}`}>
                  {getLocalizedValue(promo.description, locale)}
                </p>

                <div className={`flex items-center gap-2 text-sm mb-8 ${promo.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {getLocalizedValue(promo.validity, locale)}
                </div>

                <Button
                  href={`/${locale}/contact`}
                  variant={promo.highlight ? 'white' : 'primary'}
                  size="md"
                >
                  {locale === 'en' ? 'Claim This Offer' : locale === 'ms' ? 'Tebus Tawaran Ini' : 'Klaim Penawaran Ini'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 md:py-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31E24]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E31E24]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Sabah Events' : '• Acara Sabah'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {locale === 'en' ? 'Upcoming Events' : locale === 'ms' ? 'Acara Akan Datang' : 'Acara Mendatang'}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Plan your visit around Sabah\'s vibrant festivals and world-class sporting events.'
                : locale === 'ms'
                  ? 'Rancang lawatan anda sempena festival meriah dan acara sukan bertaraf dunia Sabah.'
                  : 'Rencanakan kunjungan Anda seputar festival meriah dan acara olahraga kelas dunia Sabah.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {eventsContent.events.map((event, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E31E24]/20 text-[#ff6b6f] flex items-center justify-center">
                    {eventTypeIcons[event.type]}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                    {event.type === 'cultural'
                      ? (locale === 'en' ? 'Cultural' : 'Budaya')
                      : (locale === 'en' ? 'Sports' : locale === 'ms' ? 'Sukan' : 'Olahraga')}
                  </span>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                  {getLocalizedValue(event.title, locale)}
                </h3>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60">
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {getLocalizedValue(event.date, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {getLocalizedValue(event.location, locale)}
                  </span>
                </div>

                <p className="text-white/70 leading-relaxed">
                  {getLocalizedValue(event.description, locale)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href={`/${locale}/contact`} variant="outline-white" size="lg">
              {locale === 'en' ? 'Plan Around an Event' : locale === 'ms' ? 'Rancang Sempena Acara' : 'Rencanakan Seputar Acara'}
            </Button>
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Travel Tips' : '• Tips Perjalanan'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Make the Most of Your Trip' : locale === 'ms' ? 'Manfaatkan Sepenuhnya Perjalanan Anda' : 'Maksimalkan Perjalanan Anda'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {eventsContent.travelTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E31E24] flex items-center justify-center mb-6 mx-auto">
                  {tipIcons[tip.icon]}
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  {getLocalizedValue(tip.title, locale)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {getLocalizedValue(tip.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#E31E24]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {locale === 'en' ? 'Ready to Book Your Adventure?' : locale === 'ms' ? 'Bersedia Tempah Pengembaraan Anda?' : 'Siap Memesan Petualangan Anda?'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Don\'t miss these exclusive offers. Contact us today and let us craft your perfect Sabah experience.'
              : locale === 'ms'
                ? 'Jangan lepaskan tawaran eksklusif ini. Hubungi kami hari ini dan biar kami mencipta pengalaman Sabah sempurna anda.'
                : 'Jangan lewatkan penawaran eksklusif ini. Hubungi kami hari ini dan biarkan kami merancang pengalaman Sabah sempurna Anda.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${locale}/contact`} variant="white" size="lg">
              {locale === 'en' ? 'Contact Us' : locale === 'ms' ? 'Hubungi Kami' : 'Hubungi Kami'}
            </Button>
            <Button href={`/${locale}/tours`} variant="outline-white" size="lg">
              {locale === 'en' ? 'Browse Tours' : locale === 'ms' ? 'Lihat Pakej' : 'Lihat Paket'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
