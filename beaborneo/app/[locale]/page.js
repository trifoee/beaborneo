import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Destinations from '@/components/sections/Destinations';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import { getAllTours } from '@/lib/sanity.queries';

const homeContent = {
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

  let allTours = [];
  let featuredTours = [];
  try {
    allTours = (await getAllTours()) || [];
    featuredTours = allTours.filter((t) => t.featured);
  } catch (err) {
    console.error('Failed to fetch tours for homepage:', err);
  }

  const toursForGrid = featuredTours.length > 0 ? featuredTours : allTours;

  return (
    <>
      <Hero locale={locale} featuredTours={featuredTours} />

      <FeaturedTours locale={locale} tours={toursForGrid} />

      <Destinations locale={locale} tours={allTours} />

      <Testimonials
        locale={locale}
        title={homeContent.testimonialsTitle}
        testimonials={homeContent.testimonials}
      />

      <CallToAction locale={locale} />
    </>
  );
}
