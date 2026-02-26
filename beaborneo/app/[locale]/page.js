/**
 * Home Page
 * 
 * Modern landing page with hero slider, tour packages, destinations, and testimonials.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Destinations from '@/components/sections/Destinations';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';

/**
 * Hardcoded home page content
 * TODO: Replace with Sanity CMS data
 */
const homeContent = {
  featuredToursTitle: {
    en: 'Featured Adventures',
    ms: 'Pengembaraan Pilihan',
    id: 'Petualangan Unggulan',
  },
  featuredTours: [
    {
      _id: '1',
      title: {
        en: 'Kinabatangan River Safari',
        ms: 'Safari Sungai Kinabatangan',
        id: 'Safari Sungai Kinabatangan',
      },
      slug: { current: 'kinabatangan-river-safari' },
      shortDescription: {
        en: 'Cruise through Borneo\'s longest river and spot proboscis monkeys, pygmy elephants, and exotic birds in their natural habitat.',
        ms: 'Pelayaran melalui sungai terpanjang Borneo dan lihat monyet belanda, gajah pygmy, dan burung eksotik di habitat semula jadi mereka.',
        id: 'Berlayar melalui sungai terpanjang Borneo dan lihat monyet bekantan, gajah pygmy, dan burung eksotis di habitat alami mereka.',
      },
      duration: '3 Days / 2 Nights',
      price: 850,
      category: 'wildlife',
      mainImageUrl: '/images/tours/kinabatangan.jpg',
    },
    {
      _id: '2',
      title: {
        en: 'Mount Kinabalu Expedition',
        ms: 'Ekspedisi Gunung Kinabalu',
        id: 'Ekspedisi Gunung Kinabalu',
      },
      slug: { current: 'mount-kinabalu-expedition' },
      shortDescription: {
        en: 'Conquer Southeast Asia\'s highest peak and witness breathtaking sunrise views above the clouds.',
        ms: 'Takluki puncak tertinggi Asia Tenggara dan saksikan pemandangan matahari terbit yang menakjubkan di atas awan.',
        id: 'Taklukkan puncak tertinggi Asia Tenggara dan saksikan pemandangan matahari terbit yang menakjubkan di atas awan.',
      },
      duration: '2 Days / 1 Night',
      price: 1200,
      category: 'adventure',
      mainImageUrl: '/images/tours/kinabalu.jpg',
    },
    {
      _id: '3',
      title: {
        en: 'Orangutan Discovery',
        ms: 'Penemuan Orang Utan',
        id: 'Penemuan Orangutan',
      },
      slug: { current: 'orangutan-discovery' },
      shortDescription: {
        en: 'Visit Sepilok Rehabilitation Centre and encounter Borneo\'s gentle giants in their natural habitat.',
        ms: 'Lawati Pusat Pemulihan Sepilok dan bertemu gergasi lembut Borneo di habitat semula jadi mereka.',
        id: 'Kunjungi Pusat Rehabilitasi Sepilok dan temui raksasa lembut Borneo di habitat alami mereka.',
      },
      duration: '1 Day',
      price: 350,
      category: 'wildlife',
      mainImageUrl: '/images/tours/orangutan.jpg',
    },
    {
      _id: '4',
      title: {
        en: 'Danum Valley Rainforest',
        ms: 'Hutan Hujan Lembah Danum',
        id: 'Hutan Hujan Lembah Danum',
      },
      slug: { current: 'danum-valley-rainforest' },
      shortDescription: {
        en: 'Immerse yourself in one of the world\'s oldest rainforest ecosystems.',
        ms: 'Tenggelam dalam salah satu ekosistem hutan hujan tertua di dunia.',
        id: 'Benamkan diri Anda dalam salah satu ekosistem hutan hujan tertua di dunia.',
      },
      duration: '4 Days / 3 Nights',
      price: 1500,
      category: 'nature',
      mainImageUrl: '/images/tours/danum-valley.jpg',
    },
    {
      _id: '5',
      title: {
        en: 'Sabah Cultural Immersion',
        ms: 'Penyelaman Budaya Sabah',
        id: 'Penyelaman Budaya Sabah',
      },
      slug: { current: 'sabah-cultural-immersion' },
      shortDescription: {
        en: 'Experience the rich traditions of Sabah\'s indigenous communities.',
        ms: 'Alami tradisi kaya komuniti orang asli Sabah.',
        id: 'Rasakan tradisi kaya komunitas pribumi Sabah.',
      },
      duration: '3 Days / 2 Nights',
      price: 650,
      category: 'cultural',
      mainImageUrl: '/images/tours/cultural.jpg',
    },
    {
      _id: '6',
      title: {
        en: 'Island Paradise Escape',
        ms: 'Pelarian Syurga Pulau',
        id: 'Pelarian Surga Pulau',
      },
      slug: { current: 'island-paradise-escape' },
      shortDescription: {
        en: 'Explore pristine islands with crystal-clear waters and white sandy beaches.',
        ms: 'Terokai pulau-pulau asli dengan air yang jernih dan pantai pasir putih.',
        id: 'Jelajahi pulau-pulau asli dengan air yang jernih dan pantai pasir putih.',
      },
      duration: '1 Day',
      price: 180,
      category: 'nature',
      mainImageUrl: '/images/tours/islands.jpg',
    },
  ],
  testimonialsTitle: {
    en: 'What Our Travelers Say',
    ms: 'Apa Kata Pengembara Kami',
    id: 'Apa Kata Wisatawan Kami',
  },
  testimonials: [
    {
      name: 'Sarah Johnson',
      quote: {
        en: 'An absolutely magical experience! The guides were knowledgeable and passionate. Seeing orangutans in the wild was a dream come true.',
        ms: 'Pengalaman yang benar-benar ajaib! Pemandu berpengetahuan dan bersemangat. Melihat orang utan di alam liar adalah impian yang menjadi kenyataan.',
        id: 'Pengalaman yang benar-benar ajaib! Pemandu berpengetahuan dan bersemangat. Melihat orangutan di alam liar adalah impian yang menjadi kenyataan.',
      },
      location: 'United Kingdom',
    },
    {
      name: 'Ahmad Rahman',
      quote: {
        en: 'Bea Borneo made our family trip unforgettable. The attention to detail and local expertise were outstanding.',
        ms: 'Bea Borneo menjadikan perjalanan keluarga kami tidak dapat dilupakan. Perhatian kepada perincian dan kepakaran tempatan adalah luar biasa.',
        id: 'Bea Borneo membuat perjalanan keluarga kami tak terlupakan. Perhatian terhadap detail dan keahlian lokal sangat luar biasa.',
      },
      location: 'Kuala Lumpur, Malaysia',
    },
    {
      name: 'Dewi Kusuma',
      quote: {
        en: 'The river safari exceeded all expectations. We saw elephants, crocodiles, and countless bird species. Highly recommended!',
        ms: 'Safari sungai melebihi semua jangkaan. Kami melihat gajah, buaya, dan pelbagai spesies burung. Sangat disyorkan!',
        id: 'Safari sungai melebihi semua ekspektasi. Kami melihat gajah, buaya, dan berbagai spesies burung. Sangat direkomendasikan!',
      },
      location: 'Jakarta, Indonesia',
    },
  ],
  seo: {
    title: {
      en: 'Bea Borneo Travel - Dream • Explore • Discover',
      ms: 'Bea Borneo Travel - Impian • Terokai • Temui',
      id: 'Bea Borneo Travel - Impian • Jelajahi • Temukan',
    },
    description: {
      en: 'Explore Borneo with Bea Borneo Travel. Experience wildlife safaris, mountain expeditions, and cultural tours in Sabah and Sarawak.',
      ms: 'Terokai Borneo dengan Bea Borneo Travel. Alami safari hidupan liar, ekspedisi gunung, dan lawatan budaya di Sabah dan Sarawak.',
      id: 'Jelajahi Borneo dengan Bea Borneo Travel. Rasakan safari satwa liar, ekspedisi gunung, dan tur budaya di Sabah dan Sarawak.',
    },
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return generateSeoMetadata({
    title: homeContent.seo.title,
    description: homeContent.seo.description,
    locale,
    path: '',
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      
      <FeaturedTours
        locale={locale}
        title={homeContent.featuredToursTitle}
        tours={homeContent.featuredTours}
      />
      
      <Destinations locale={locale} />
      
      <Testimonials
        locale={locale}
        title={homeContent.testimonialsTitle}
        testimonials={homeContent.testimonials}
      />
      
      <CallToAction locale={locale} />
    </>
  );
}
