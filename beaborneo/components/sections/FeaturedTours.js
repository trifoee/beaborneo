'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  if (!tours || tours.length === 0) return null;

  const filteredTours =
    activeCategory === 'all'
      ? tours
      : tours.filter((tour) => tour.tourType?.includes(activeCategory));

  const activeCategoryIds = new Set(tours.flatMap((t) => t.tourType || []));
  const visibleCategories = categories.filter(
    (c) => c.id === 'all' || activeCategoryIds.has(c.id),
  );

  // Check scroll position
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  // Scroll functions
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !filteredTours || filteredTours.length === 0) return;

    let animationFrameId;
    let scrollSpeed = 1.5; // Faster scroll speed (pixels per frame at 60fps)
    let isUserInteracting = false;
    let interactionTimeout;

    const autoScroll = () => {
      if (container && !isUserInteracting) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
        checkScroll();
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const handleInteraction = () => {
      isUserInteracting = true;
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 3000);
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(autoScroll);
    }, 1000);

    container.addEventListener('mouseenter', handleInteraction);
    container.addEventListener('scroll', () => {
      handleInteraction();
      checkScroll();
    });
    container.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(interactionTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mouseenter', handleInteraction);
        container.removeEventListener('scroll', handleInteraction);
        container.removeEventListener('touchstart', handleInteraction);
      }
    };
  }, [filteredTours, activeCategory]);

  return (
    <section className="featured-tours py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
            {locale === 'en' ? '• Tour Packages' : '• Pakej Pelancongan'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Our Tour Package Ensures A ' : 'Pakej Pelancongan Kami Menjamin '}
            <span className="text-[#E31E24]">
              {locale === 'en' ? 'Seamless' : 'Pengalaman'}
            </span>
            <br />
            {locale === 'en' ? 'And Memorable Adventure.' : 'Yang Lancar Dan Tidak Dapat Dilupakan.'}
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

        {/* Horizontal Scrolling Tours */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 hover:bg-[#E31E24] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 lg:-mx-8 lg:px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Render tours twice for seamless loop */}
            {[...filteredTours, ...filteredTours].map((tour, index) => {
              const startingPrice = getStartingPrice(tour);

              return (
                <Link
                  key={`${tour._id}-${index}`}
                  href={`/${locale}/tours/${tour.slug?.current}`}
                  className="group relative rounded-3xl overflow-hidden flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px]"
                >
                  <div className="relative overflow-hidden bg-gray-100 h-[320px] md:h-[360px]">
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

                      <h3 className="font-heading font-bold text-white mb-2 group-hover:text-red-200 transition-colors text-xl">
                        {tour.title}
                      </h3>

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

          {/* Right Button */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 hover:bg-[#E31E24] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all group"
          >
            {locale === 'en' ? 'View All Tour Packages' : 'Lihat Semua Pakej'}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
