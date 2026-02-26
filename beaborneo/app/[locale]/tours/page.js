/**
 * Tours Listing Page
 * 
 * Modern tour listing with filters.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { getLocalizedValue } from '@/lib/i18n';
import { formatPrice, cn } from '@/lib/utils';
import ImageBlock from '@/components/ui/ImageBlock';

const categories = [
  { id: 'all', label: { en: 'All Tours', ms: 'Semua Pakej', id: 'Semua Paket' } },
  { id: 'wildlife', label: { en: 'Wildlife Safari', ms: 'Safari Hidupan Liar', id: 'Safari Satwa Liar' } },
  { id: 'adventure', label: { en: 'Adventure', ms: 'Pengembaraan', id: 'Petualangan' } },
  { id: 'cultural', label: { en: 'Cultural', ms: 'Budaya', id: 'Budaya' } },
  { id: 'nature', label: { en: 'Nature', ms: 'Alam', id: 'Alam' } },
];

const tours = [
  {
    _id: '1',
    title: { en: 'Kinabatangan River Safari', ms: 'Safari Sungai Kinabatangan', id: 'Safari Sungai Kinabatangan' },
    slug: { current: 'kinabatangan-river-safari' },
    shortDescription: {
      en: 'Cruise through Borneo\'s longest river and spot proboscis monkeys, pygmy elephants, and exotic birds.',
      ms: 'Pelayaran melalui sungai terpanjang Borneo dan lihat monyet belanda, gajah pygmy, dan burung eksotik.',
      id: 'Berlayar melalui sungai terpanjang Borneo dan lihat monyet bekantan, gajah pygmy, dan burung eksotis.',
    },
    duration: '3 Days / 2 Nights',
    price: 850,
    category: 'wildlife',
    mainImageUrl: '/images/tours/kinabatangan.jpg',
  },
  {
    _id: '2',
    title: { en: 'Mount Kinabalu Expedition', ms: 'Ekspedisi Gunung Kinabalu', id: 'Ekspedisi Gunung Kinabalu' },
    slug: { current: 'mount-kinabalu-expedition' },
    shortDescription: {
      en: 'Conquer Southeast Asia\'s highest peak and witness breathtaking sunrise views above the clouds.',
      ms: 'Takluki puncak tertinggi Asia Tenggara dan saksikan pemandangan matahari terbit di atas awan.',
      id: 'Taklukkan puncak tertinggi Asia Tenggara dan saksikan pemandangan matahari terbit di atas awan.',
    },
    duration: '2 Days / 1 Night',
    price: 1200,
    category: 'adventure',
    mainImageUrl: '/images/tours/kinabalu.jpg',
  },
  {
    _id: '3',
    title: { en: 'Orangutan Discovery', ms: 'Penemuan Orang Utan', id: 'Penemuan Orangutan' },
    slug: { current: 'orangutan-discovery' },
    shortDescription: {
      en: 'Visit Sepilok Rehabilitation Centre and encounter Borneo\'s gentle giants.',
      ms: 'Lawati Pusat Pemulihan Sepilok dan bertemu gergasi lembut Borneo.',
      id: 'Kunjungi Pusat Rehabilitasi Sepilok dan temui raksasa lembut Borneo.',
    },
    duration: '1 Day',
    price: 350,
    category: 'wildlife',
    mainImageUrl: '/images/tours/orangutan.jpg',
  },
  {
    _id: '4',
    title: { en: 'Danum Valley Rainforest', ms: 'Hutan Hujan Lembah Danum', id: 'Hutan Hujan Lembah Danum' },
    slug: { current: 'danum-valley-rainforest' },
    shortDescription: {
      en: 'Immerse yourself in one of the world\'s oldest rainforest ecosystems.',
      ms: 'Tenggelam dalam salah satu ekosistem hutan hujan tertua di dunia.',
      id: 'Benamkan diri dalam salah satu ekosistem hutan hujan tertua di dunia.',
    },
    duration: '4 Days / 3 Nights',
    price: 1500,
    category: 'nature',
    mainImageUrl: '/images/tours/danum-valley.jpg',
  },
  {
    _id: '5',
    title: { en: 'Sabah Cultural Immersion', ms: 'Penyelaman Budaya Sabah', id: 'Penyelaman Budaya Sabah' },
    slug: { current: 'sabah-cultural-immersion' },
    shortDescription: {
      en: 'Experience the rich traditions of Sabah\'s indigenous communities.',
      ms: 'Alami tradisi kaya komuniti orang asli Sabah.',
      id: 'Rasakan tradisi kaya komunitas pribumi Sabah.',
    },
    duration: '3 Days / 2 Nights',
    price: 650,
    category: 'cultural',
    mainImageUrl: '/images/tours/cultural.jpg',
  },
  {
    _id: '6',
    title: { en: 'Island Paradise Escape', ms: 'Pelarian Syurga Pulau', id: 'Pelarian Surga Pulau' },
    slug: { current: 'island-paradise-escape' },
    shortDescription: {
      en: 'Explore pristine islands with crystal-clear waters and white sandy beaches.',
      ms: 'Terokai pulau-pulau asli dengan air jernih dan pantai pasir putih.',
      id: 'Jelajahi pulau-pulau asli dengan air jernih dan pantai pasir putih.',
    },
    duration: '1 Day',
    price: 180,
    category: 'nature',
    mainImageUrl: '/images/tours/islands.jpg',
  },
];

export default function ToursPage({ params }) {
  const { locale } = use(params);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTours = activeCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  return (
    <div className="tours-page">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            {locale === 'en' ? 'Explore Borneo' : 'Terokai Borneo'}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {locale === 'en' ? 'Our Tours & Adventures' : locale === 'ms' ? 'Pakej Pelancongan Kami' : 'Paket Wisata Kami'}
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

          {/* Tours Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <Link
                key={tour._id}
                href={`/${locale}/tours/${tour.slug.current}`}
                className="group"
              >
                <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]">
                  <ImageBlock
                    src={tour.mainImageUrl}
                    alt={getLocalizedValue(tour.title, locale)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                    {tour.duration}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="location-badge mb-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Sabah, Borneo
                    </span>
                    
                    <h2 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">
                      {getLocalizedValue(tour.title, locale)}
                    </h2>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {getLocalizedValue(tour.shortDescription, locale)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white/60 text-sm">
                          {locale === 'en' ? 'From' : 'Dari'}
                        </span>
                        <span className="text-white font-bold text-lg ml-2">
                          {formatPrice(tour.price, locale)}
                        </span>
                      </div>
                      <span className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                        {locale === 'en' ? 'View Details' : 'Lihat'}
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

          {/* Empty State */}
          {filteredTours.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {locale === 'en' ? 'No tours found in this category.' : 'Tiada pakej dalam kategori ini.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Can\'t Find What You\'re Looking For?' : 'Tidak Jumpa Yang Anda Cari?'}
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
