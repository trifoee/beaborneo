import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { t } from '@/lib/i18n';
import { getTourBySlug, getAllTourSlugs } from '@/lib/sanity.queries';
import { portableTextToPlainText, getLocalizedField } from '@/lib/sanity.utils';
import ImageBlock from '@/components/ui/ImageBlock';
import Button from '@/components/ui/Button';
import TourPricingTable from './TourPricingTable';

// --------------- static params ---------------

export async function generateStaticParams() {
  try {
    const slugs = await getAllTourSlugs();
    return (slugs || []).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// --------------- metadata ---------------

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  let tour;
  try {
    tour = await getTourBySlug(slug);
  } catch {
    return {};
  }

  if (!tour) return {};

  const description = tour.tagline
    ? { en: tour.tagline.en, ms: tour.tagline.ms }
    : undefined;

  return generateSeoMetadata({
    title: { en: tour.title, ms: tour.title },
    description,
    locale,
    path: `/tours/${slug}`,
    image: tour.mainImageUrl,
  });
}

// --------------- page ---------------

export default async function TourPage({ params }) {
  const { locale, slug } = await params;

  let tour;
  try {
    tour = await getTourBySlug(slug);
  } catch (err) {
    console.error('Failed to fetch tour:', err);
  }

  if (!tour) notFound();

  const overviewText = tour.overview
    ? portableTextToPlainText(tour.overview[locale] || tour.overview.en)
    : '';

  return (
    <div className="tour-page">
      {/* Hero */}
      <section className="tour-hero relative h-[50vh] md:h-[60vh] min-h-[400px]">
        <ImageBlock
          src={tour.mainImageUrl}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            {tour.duration && (
              <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary-700 mb-4">
                {tour.duration}
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {tour.title}
            </h1>
            {tour.tagline && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {getLocalizedField(tour.tagline, locale)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="tour-content py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ---- Main Column ---- */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              {overviewText && (
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    {locale === 'en'
                      ? 'Overview'
                      : locale === 'ms'
                        ? 'Gambaran Keseluruhan'
                        : 'Gambaran Umum'}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {overviewText.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {tour.highlights?.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    {locale === 'en' ? 'Highlights' : 'Sorotan'}
                  </h2>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {tour.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary-600 text-xl">&#10003;</span>
                        <span className="text-gray-700">
                          {getLocalizedField(h, locale)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary?.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    {locale === 'en' ? 'Itinerary' : 'Jadual Perjalanan'}
                  </h2>
                  <div className="space-y-6">
                    {tour.itinerary.map((item, i) => (
                      <div
                        key={i}
                        className="relative pl-8 border-l-2 border-[#E31E24]/30 pb-6 last:pb-0"
                      >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E31E24]" />
                        <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
                          {getLocalizedField(item.day, locale)}
                          {item.title && (
                            <>
                              {' — '}
                              {getLocalizedField(item.title, locale)}
                            </>
                          )}
                        </h3>
                        {item.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {getLocalizedField(item.description, locale)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {(tour.included?.length > 0 || tour.notIncluded?.length > 0) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {tour.included?.length > 0 && (
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-4 text-green-700">
                        {locale === 'en' ? 'Included' : 'Termasuk'}
                      </h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-green-600">&#10003;</span>
                            {getLocalizedField(item, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.notIncluded?.length > 0 && (
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-4 text-red-700">
                        {locale === 'en' ? 'Not Included' : 'Tidak Termasuk'}
                      </h3>
                      <ul className="space-y-2">
                        {tour.notIncluded.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-red-600">&#10007;</span>
                            {getLocalizedField(item, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Gallery */}
              {tour.gallery?.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    {locale === 'en' ? 'Gallery' : 'Galeri'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <ImageBlock
                          src={img.url}
                          alt={`${tour.title} - ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---- Sidebar ---- */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Pricing Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <TourPricingTable tour={tour} locale={locale} />

                  {/* Notes */}
                  {tour.notes?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {tour.notes.map((note, i) => {
                        const text = getLocalizedField(note, locale);
                        return text ? (
                          <p key={i} className="text-xs text-gray-500 leading-relaxed">
                            * {text}
                          </p>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-4 mt-6 mb-6">
                    {tour.duration && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          {locale === 'en' ? 'Duration' : 'Tempoh'}
                        </span>
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                    )}
                    {tour.location && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {locale === 'en' ? 'Location' : 'Lokasi'}
                        </span>
                        <span className="font-medium">{tour.location}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    href={`/${locale}/contact?tour=${tour.slug?.current}`}
                    variant="primary"
                    size="lg"
                    className="w-full mb-4"
                  >
                    {t(locale, 'common.bookNow')}
                  </Button>

                  {tour.brochureUrl && (
                    <a
                      href={tour.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm mb-3"
                    >
                      {locale === 'en' ? 'Download Brochure (PDF)' : 'Muat Turun Brosur (PDF)'}
                    </a>
                  )}

                  <Link
                    href={`/${locale}/contact`}
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {locale === 'en'
                      ? 'Have questions? Contact us'
                      : 'Ada soalan? Hubungi kami'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <span className="mr-2">&larr;</span>
            {locale === 'en'
              ? 'Back to All Tours'
              : 'Kembali ke Semua Pakej'}
          </Link>
        </div>
      </section>
    </div>
  );
}
