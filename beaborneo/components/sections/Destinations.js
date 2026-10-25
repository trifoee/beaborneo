'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getLocalizedValue } from '@/lib/i18n';
import ImageBlock from '@/components/ui/ImageBlock';

const fallbackDestinations = [
  { id: 1, name: 'Kinabatangan', image: '/images/destinations/kinabatangan.jpg', tours: 5 },
  { id: 2, name: 'Kota Kinabalu', image: '/images/destinations/kota-kinabalu.jpg', tours: 8 },
  { id: 3, name: 'Sepilok', image: '/images/destinations/sepilok.jpg', tours: 3 },
  { id: 4, name: 'Danum Valley', image: '/images/destinations/danum-valley.jpg', tours: 4 },
  { id: 5, name: 'Mount Kinabalu', image: '/images/destinations/kinabalu.jpg', tours: 6 },
];

function deriveDestinations(tours) {
  if (!tours || tours.length === 0) return null;

  const map = {};
  for (const tour of tours) {
    if (!tour.location) continue;

    const raw = tour.location.trim();
    const key = raw.toLowerCase().replace(/\s+/g, '');

    if (!map[key]) {
      map[key] = {
        id: key,
        name: raw,
        image: tour.mainImageUrl || null,
        tours: 0,
      };
    }
    map[key].tours += 1;
    if (!map[key].image && tour.mainImageUrl) {
      map[key].image = tour.mainImageUrl;
    }
  }

  const destinations = Object.values(map).sort((a, b) => b.tours - a.tours);
  return destinations.length > 0 ? destinations : null;
}

export default function Destinations({ locale, tours }) {
  const destinations = deriveDestinations(tours) || fallbackDestinations;
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    if (!container || !destinations || destinations.length === 0) return;

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
  }, [destinations]);

  const title = {
    en: 'Discover the Touch of Nature',
    ms: 'Temui Sentuhan Alam Semula Jadi',
    id: 'Temukan Sentuhan Alam',
  };

  const subtitle = {
    en: "Explore Borneo's most breathtaking destinations",
    ms: 'Terokai destinasi paling menakjubkan di Borneo',
    id: 'Jelajahi destinasi paling menakjubkan di Borneo',
  };

  return (
    <section className="destinations py-12 md:py-16 bg-earth-50">
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
            {locale === 'en'
              ? 'View All Destinations'
              : locale === 'bm'
                ? 'Lihat Semua Destinasi'
                : 'Lihat Semua Destinasi'}
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

        {/* Destinations with Navigation Buttons */}
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

          {/* Destinations Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 lg:-mx-8 lg:px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Render destinations twice for seamless loop */}
            {[...destinations, ...destinations].map((destination, index) => (
              <Link
                key={`${destination.id}-${index}`}
                href={`/${locale}/tours`}
                className="group relative w-64 md:w-72 flex-shrink-0"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <ImageBlock
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 location-badge">
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
                    {destination.name}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {destination.tours}{' '}
                      {locale === 'en'
                        ? 'Tours Available'
                        : locale === 'bm'
                          ? 'Pakej Tersedia'
                          : 'Paket Tersedia'}
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-[#E31E24]">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                </div>
              </Link>
            ))}
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
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
