'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getLocalizedField, getStartingPrice } from '@/lib/sanity.utils';
import ImageBlock from '@/components/ui/ImageBlock';

const categories = [
  { id: 'all', label: { en: 'All Tours', ms: 'Semua Pakej', id: 'Semua Paket' } },
  { id: 'island-hopping', label: { en: 'Island Hopping', ms: 'Jelajah Pulau', id: 'Jelajah Pulau' } },
  { id: 'island-stay', label: { en: 'Island Stay', ms: 'Penginapan Pulau', id: 'Penginapan Pulau' } },
  { id: 'scuba-diving', label: { en: 'Scuba Diving', ms: 'Selam Skuba', id: 'Selam Skuba' } },
  { id: 'snorkeling', label: { en: 'Snorkeling', ms: 'Snorkeling', id: 'Snorkeling' } },
  { id: 'nature-wildlife', label: { en: 'Nature & Wildlife', ms: 'Alam & Hidupan Liar', id: 'Alam & Satwa Liar' } },
  { id: 'adventure', label: { en: 'Adventure', ms: 'Pengembaraan', id: 'Petualangan' } },
  { id: 'leisure', label: { en: 'Leisure', ms: 'Santai', id: 'Santai' } },
];

export default function FeaturedTours({ locale, tours }) {
  const [activeCategory, setActiveCategory] = useState('all');

  if (!tours || tours.length === 0) return null;

  const filteredTours =
    activeCategory === 'all'
      ? tours
      : tours.filter((tour) => tour.tourType?.includes(activeCategory));

  const activeCategoryIds = new Set(tours.flatMap((t) => t.tourType || []));
  const visibleCategories = categories.filter(
    (c) => c.id === 'all' || activeCategoryIds.has(c.id),
  );

  return (
    <section className="featured-tours py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
            {locale === 'en' ? '• Tour Packages' : locale === 'ms' ? '• Pakej Pelancongan' : '• Paket Wisata'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Our Tour Package Ensures A ' : locale === 'ms' ? 'Pakej Pelancongan Kami Menjamin ' : 'Paket Wisata Kami Menjamin '}
            <span className="text-[#E31E24]">
              {locale === 'en' ? 'Seamless' : 'Pengalaman'}
            </span>
            <br />
            {locale === 'en' ? 'And Memorable Adventure.' : locale === 'ms' ? 'Yang Lancar Dan Tidak Dapat Dilupakan.' : 'Yang Lancar Dan Tak Terlupakan.'}
          </h2>
        </div>

        {/* Filter Tabs — only show categories that have tours */}
        {visibleCategories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn('filter-tab', activeCategory === category.id && 'active')}
              >
                {getLocalizedField(category.label, locale)}
              </button>
            ))}
          </div>
        )}

        {/* Tours Grid — Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTours.slice(0, 6).map((tour, index) => {
            const startingPrice = getStartingPrice(tour);

            return (
              <Link
                key={tour._id}
                href={`/${locale}/tours/${tour.slug?.current}`}
                className={cn(
                  'group relative rounded-3xl overflow-hidden',
                  index === 0 && 'lg:col-span-2 lg:row-span-2',
                )}
              >
                <div
                  className={cn(
                    'relative overflow-hidden bg-gray-100',
                    index === 0
                      ? 'aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]'
                      : 'aspect-[4/3]',
                  )}
                >
                  <ImageBlock
                    src={tour.mainImageUrl}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Duration Badge */}
                  {tour.duration && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                      {tour.duration}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {tour.location && (
                      <span className="location-badge mb-3">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {tour.location}
                      </span>
                    )}

                    <h3
                      className={cn(
                        'font-heading font-bold text-white mb-2 group-hover:text-red-200 transition-colors',
                        index === 0 ? 'text-2xl md:text-3xl' : 'text-xl',
                      )}
                    >
                      {tour.title}
                    </h3>

                    {/* Tagline — only for the featured (first) card */}
                    {index === 0 && tour.tagline && (
                      <p className="text-white/80 mb-4 line-clamp-2 max-w-lg">
                        {getLocalizedField(tour.tagline, locale)}
                      </p>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      {startingPrice && (
                        <div>
                          <span className="text-white/60 text-sm">
                            {locale === 'en' ? 'From' : 'Dari'}
                          </span>
                          <span className="text-white font-bold text-xl ml-2">
                            {startingPrice}
                          </span>
                        </div>
                      )}
                      <span className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 ml-auto">
                        {locale === 'en' ? 'View Details' : 'Lihat'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all group"
          >
            {locale === 'en' ? 'View All Tour Packages' : locale === 'ms' ? 'Lihat Semua Pakej' : 'Lihat Semua Paket'}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
