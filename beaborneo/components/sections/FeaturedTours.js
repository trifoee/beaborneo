/**
 * Featured Tours Section Component
 * 
 * Modern tour cards with filter tabs inspired by the reference design.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getLocalizedValue } from '@/lib/i18n';
import { formatPrice, cn } from '@/lib/utils';
import ImageBlock from '@/components/ui/ImageBlock';

/**
 * Tour categories
 */
const categories = [
  { id: 'all', label: { en: 'All Tours', ms: 'Semua Pakej', id: 'Semua Paket' } },
  { id: 'wildlife', label: { en: 'Wildlife Safari', ms: 'Safari Hidupan Liar', id: 'Safari Satwa Liar' } },
  { id: 'adventure', label: { en: 'Adventure', ms: 'Pengembaraan', id: 'Petualangan' } },
  { id: 'cultural', label: { en: 'Cultural Tours', ms: 'Lawatan Budaya', id: 'Tur Budaya' } },
  { id: 'nature', label: { en: 'Nature Escape', ms: 'Pelarian Alam', id: 'Pelarian Alam' } },
];

export default function FeaturedTours({ locale, title, tours }) {
  const [activeCategory, setActiveCategory] = useState('all');

  if (!tours || tours.length === 0) {
    return null;
  }

  const filteredTours = activeCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

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
              {locale === 'en' ? 'Seamless' : locale === 'ms' ? 'Pengalaman' : 'Pengalaman'}
            </span>
            <br />
            {locale === 'en' ? 'And Memorable Adventure.' : locale === 'ms' ? 'Yang Lancar Dan Tidak Dapat Dilupakan.' : 'Yang Lancar Dan Tak Terlupakan.'}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn('filter-tab', activeCategory === category.id && 'active')}
            >
              {getLocalizedValue(category.label, locale)}
            </button>
          ))}
        </div>

        {/* Tours Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTours.slice(0, 6).map((tour, index) => (
            <Link
              key={tour._id}
              href={`/${locale}/tours/${tour.slug.current}`}
              className={cn(
                'group relative rounded-3xl overflow-hidden',
                // First item spans 2 columns on large screens
                index === 0 && 'lg:col-span-2 lg:row-span-2'
              )}
            >
              {/* Card */}
              <div className={cn(
                'relative overflow-hidden bg-gray-100',
                index === 0 ? 'aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]' : 'aspect-[4/3]'
              )}>
                {/* Image */}
                <ImageBlock
                  src={tour.mainImageUrl}
                  alt={getLocalizedValue(tour.title, locale)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                  {tour.duration}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Location */}
                  <span className="location-badge mb-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Sabah, Borneo
                  </span>
                  
                  {/* Title */}
                  <h3 className={cn(
                    'font-heading font-bold text-white mb-2 group-hover:text-red-200 transition-colors',
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  )}>
                    {getLocalizedValue(tour.title, locale)}
                  </h3>
                  
                  {/* Description - only for featured card */}
                  {index === 0 && (
                    <p className="text-white/80 mb-4 line-clamp-2 max-w-lg">
                      {getLocalizedValue(tour.shortDescription, locale)}
                    </p>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/60 text-sm">
                        {locale === 'en' ? 'From' : locale === 'ms' ? 'Dari' : 'Dari'}
                      </span>
                      <span className="text-white font-bold text-xl ml-2">
                        {formatPrice(tour.price, locale)}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      {locale === 'en' ? 'View Details' : locale === 'ms' ? 'Lihat' : 'Lihat'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
