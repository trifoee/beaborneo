import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Destinations from '@/components/sections/Destinations';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import { getAllTours, getAllTestimonials } from '@/lib/sanity.queries';

const homeContent = {
  testimonialsTitle: {
    en: 'What Our Travelers Say',
    ms: 'Apa Kata Pengembara Kami',
    id: 'Apa Kata Wisatawan Kami',
  },
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

  /* Fetch the entire testimonial pool. The Testimonials component is
     a client component that shuffles and picks 3 on the visitor's
     browser, so each visit gets a fresh random selection while the
     page itself stays statically rendered. The webhook keeps this
     pool fresh whenever editors add/edit reviews in Sanity. */
  let testimonials = [];
  try {
    testimonials = (await getAllTestimonials()) || [];
  } catch (err) {
    console.error('Failed to fetch testimonials for homepage:', err);
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
        testimonials={testimonials}
      />

      <CallToAction locale={locale} />
    </>
  );
}
