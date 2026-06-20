import Link from 'next/link';
import { getLocalizedField, getStartingPrice } from '@/lib/sanity.utils';
import ImageBlock from './ImageBlock';

/**
 * Presentational tour card. Expects a tour shaped by the card
 * projection (single-object pricing, e.g. `packagePricing[0]`).
 * Mirrors the card used on the tours listing page so the
 * "You May Also Like" section stays visually consistent.
 */
export default function TourCard({ tour, locale }) {
  const startingPrice = getStartingPrice(tour);

  return (
    <Link href={`/${locale}/tours/${tour.slug?.current}`} className="group block">
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

          <h2 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">
            {tour.title}
          </h2>

          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {getLocalizedField(tour.tagline, locale)}
          </p>

          <div className="flex items-center justify-between gap-3">
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
}
