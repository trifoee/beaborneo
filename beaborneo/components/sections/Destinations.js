/**
 * Destinations Section Component
 * 
 * "Discover the touch of Nature" style section with destination cards.
 */

import Link from 'next/link';
import { getLocalizedValue } from '@/lib/i18n';
import ImageBlock from '@/components/ui/ImageBlock';

/**
 * Destinations data
 * TODO: Replace with CMS data
 */
const destinations = [
  {
    id: 1,
    name: 'Kinabatangan',
    image: '/images/destinations/kinabatangan.jpg',
    tours: 5,
  },
  {
    id: 2,
    name: 'Kota Kinabalu',
    image: '/images/destinations/kota-kinabalu.jpg',
    tours: 8,
  },
  {
    id: 3,
    name: 'Sepilok',
    image: '/images/destinations/sepilok.jpg',
    tours: 3,
  },
  {
    id: 4,
    name: 'Danum Valley',
    image: '/images/destinations/danum-valley.jpg',
    tours: 4,
  },
  {
    id: 5,
    name: 'Mount Kinabalu',
    image: '/images/destinations/kinabalu.jpg',
    tours: 6,
  },
];

export default function Destinations({ locale }) {
  const title = {
    en: 'Discover the Touch of Nature',
    ms: 'Temui Sentuhan Alam Semula Jadi',
    id: 'Temukan Sentuhan Alam',
  };

  const subtitle = {
    en: 'Explore Borneo\'s most breathtaking destinations',
    ms: 'Terokai destinasi paling menakjubkan di Borneo',
    id: 'Jelajahi destinasi paling menakjubkan di Borneo',
  };

  return (
    <section className="destinations py-20 md:py-32 bg-earth-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {getLocalizedValue(title, locale)}
            </h2>
            <p className="text-gray-600 text-lg">
              {getLocalizedValue(subtitle, locale)}
            </p>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 text-[#E31E24] font-semibold hover:gap-3 transition-all shrink-0"
          >
            {locale === 'en' ? 'View All Destinations' : locale === 'ms' ? 'Lihat Semua Destinasi' : 'Lihat Semua Destinasi'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Destinations Horizontal Scroll */}
        <div className="horizontal-scroll pb-4 -mx-4 px-4">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              href={`/${locale}/tours`}
              className="group relative w-64 md:w-72 flex-shrink-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                {/* Image */}
                <ImageBlock
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 location-badge">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {destination.name}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {destination.tours} {locale === 'en' ? 'Tours Available' : locale === 'ms' ? 'Pakej Tersedia' : 'Paket Tersedia'}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-[#E31E24]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
