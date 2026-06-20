import { generateMetadata as generateSeoMetadata, generateOrganizationSchema } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Destinations from '@/components/sections/Destinations';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import YoutubeSection from '@/components/sections/YoutubeSection';
import { getAllTours, getAllTestimonials } from '@/lib/sanity.queries';

const homeContent = {
  testimonialsTitle: {
    en: 'What Our Travelers Say',
    bm: 'Apa Kata Pengembara Kami',
  },
  seo: {
    title: {
      en: 'Bea Borneo Travel - Dream • Explore • Discover',
      bm: 'Bea Borneo Travel - Impian • Terokai • Temui',
    },
    description: {
      en: 'Explore Borneo with Bea Borneo Travel. Experience wildlife safaris, mountain expeditions, and cultural tours in Sabah and Sarawak.',
      bm: 'Terokai Borneo dengan Bea Borneo Travel. Alami safari hidupan liar, ekspedisi gunung, dan lawatan budaya di Sabah dan Sarawak.',
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

  // Generate organization schema for this locale
  const organizationSchema = generateOrganizationSchema(locale);

  let allTours = [];
  let featuredTours = [];
  try {
    allTours = (await getAllTours()) || [];
    featuredTours = allTours.filter((t) => t.featured);
  } catch (err) {
    console.error('Failed to fetch tours for homepage:', err);
  }

  let testimonials = [];
  try {
    testimonials = (await getAllTestimonials()) || [];
  } catch (err) {
    console.error('Failed to fetch testimonials for homepage:', err);
  }

  const toursForGrid = featuredTours.length > 0 ? featuredTours : allTours;

  return (
    <>
      {/* Organization Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero locale={locale} featuredTours={featuredTours} />

      <YoutubeSection locale={locale} />

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