'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getLocalizedField, getStartingPrice } from '@/lib/sanity.utils';
import ImageBlock from '@/components/ui/ImageBlock';

const categories = [
  { id: 'all', label: { en: 'All Tours', ms: 'Semua Pakej' } },
  { id: 'island-hopping', label: { en: 'Island Hopping', ms: 'Jelajah Pulau' } },
  { id: 'island-stay', label: { en: 'Island Stay', ms: 'Penginapan Pulau' } },
  { id: 'scuba-diving', label: { en: 'Scuba Diving', ms: 'Selam Skuba' } },
  { id: 'snorkeling', label: { en: 'Snorkeling', ms: 'Snorkeling' } },
  { id: 'nature-wildlife', label: { en: 'Nature & Wildlife', ms: 'Alam & Hidupan Liar' } },
  { id: 'adventure', label: { en: 'Adventure', ms: 'Pengembaraan' } },
  { id: 'leisure', label: { en: 'Leisure', ms: 'Santai' } },
];

export default function ToursPageClient({ locale, tours }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTours =
    activeCategory === 'all'
      ? tours
      : tours.filter((tour) => tour.tourType?.includes(activeCategory));

  const activeCategoryIds = new Set(tours.flatMap((t) => t.tourType || []));
  const visibleCategories = categories.filter(
    (c) => c.id === 'all' || activeCategoryIds.has(c.id),
  );

  return (
    <div className="tours-page">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            {locale === 'en' ? 'Explore Borneo' : 'Terokai Borneo'}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {locale === 'en'
              ? 'Our Tours & Adventures'
              : locale === 'ms'
                ? 'Pakej Pelancongan Kami'
                : 'Paket Wisata Kami'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Discover handcrafted experiences that showcase the best of Borneo'
              : 'Temui pengalaman yang direka khas untuk mempamerkan yang terbaik dari Borneo'}
          </p>
        </div>
      </section>

      {/* Tours Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filter Tabs — only show categories that have at least one tour */}
          {visibleCategories.length > 2 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'filter-tab',
                    activeCategory === category.id && 'active',
                  )}
                >
                  {getLocalizedField(category.label, locale)}
                </button>
              ))}
            </div>
          )}

          {/* Tours Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => {
              const startingPrice = getStartingPrice(tour);

              return (
                <Link
                  key={tour._id}
                  href={`/${locale}/tours/${tour.slug?.current}`}
                  className="group"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]">
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
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {tour.location}
                        </span>
                      )}

                      <h2 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">
                        {tour.title}
                      </h2>

                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {getLocalizedField(tour.tagline, locale)}
                      </p>

                      <div className="flex items-center justify-between">
                        {startingPrice && (
                          <div>
                            <span className="text-white/60 text-sm">
                              {locale === 'en' ? 'From' : 'Dari'}
                            </span>
                            <span className="text-white font-bold text-lg ml-2">
                              {startingPrice}
                            </span>
                          </div>
                        )}
                        <span className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all ml-auto">
                          {locale === 'en' ? 'View Details' : 'Lihat'}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTours.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {locale === 'en'
                  ? 'No tours found in this category.'
                  : 'Tiada pakej dalam kategori ini.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en'
              ? "Can't Find What You're Looking For?"
              : 'Tidak Jumpa Yang Anda Cari?'}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'We can create custom itineraries tailored to your interests and schedule.'
              : 'Kami boleh mencipta jadual perjalanan khas mengikut minat dan jadual anda.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E31E24] text-white rounded-full font-semibold hover:bg-[#c41a1f] transition-all shadow-lg shadow-red-500/20"
          >
            {locale === 'en' ? 'Request Custom Tour' : 'Minta Pakej Khas'}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
