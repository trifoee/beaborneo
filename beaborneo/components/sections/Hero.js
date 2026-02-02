/**
 * Hero Section Component
 * 
 * Modern hero with slide-style design inspired by the reference.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLocalizedValue } from '@/lib/i18n';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Hero slides data
 * TODO: Replace with CMS data
 */
const heroSlides = [
  {
    id: 1,
    title: {
      en: 'Unforgettable Kinabatangan River Safari',
      ms: 'Safari Sungai Kinabatangan Yang Tidak Dapat Dilupakan',
      id: 'Safari Sungai Kinabatangan yang Tak Terlupakan',
    },
    subtitle: {
      en: 'Experience the Magic of Borneo Wildlife',
      ms: 'Alami Keajaiban Hidupan Liar Borneo',
      id: 'Rasakan Keajaiban Satwa Liar Borneo',
    },
    description: {
      en: 'Cruise through pristine waters and encounter proboscis monkeys, pygmy elephants, and exotic birds in their natural habitat.',
      ms: 'Pelayaran melalui perairan asli dan bertemu monyet belanda, gajah pygmy, dan burung eksotik di habitat semula jadi mereka.',
      id: 'Berlayar melalui perairan asli dan temui monyet bekantan, gajah pygmy, dan burung eksotis di habitat alami mereka.',
    },
    image: 'https://www.fakruljamil.com/wp-content/uploads/2016/05/9249333574_71ef5c504f_o.jpg',
    location: 'Kinabatangan, Sabah',
    duration: '3 Days',
    link: '/tours/kinabatangan-river-safari',
  },
  {
    id: 2,
    title: {
      en: 'Conquer Mount Kinabalu at Sunrise',
      ms: 'Takluki Gunung Kinabalu Pada Waktu Matahari Terbit',
      id: 'Taklukkan Gunung Kinabalu Saat Matahari Terbit',
    },
    subtitle: {
      en: 'Southeast Asia\'s Highest Peak Awaits',
      ms: 'Puncak Tertinggi Asia Tenggara Menanti',
      id: 'Puncak Tertinggi Asia Tenggara Menanti',
    },
    description: {
      en: 'Stand at 4,095m above sea level and witness breathtaking sunrise views above the clouds.',
      ms: 'Berdiri pada ketinggian 4,095m di atas paras laut dan saksikan pemandangan matahari terbit yang menakjubkan di atas awan.',
      id: 'Berdiri di ketinggian 4.095m di atas permukaan laut dan saksikan pemandangan matahari terbit yang menakjubkan di atas awan.',
    },
    image: 'https://images.squarespace-cdn.com/content/v1/5f24290fd0d0910ecab2b02e/db034ad1-2b07-4a95-b0a0-2b8760c46ea8/shutterstock_1166918722.jpg',
    location: 'Mount Kinabalu, Sabah',
    duration: '2 Days',
    link: '/tours/mount-kinabalu-expedition',
  },
  {
    id: 3,
    title: {
      en: 'Meet Borneo\'s Gentle Giants',
      ms: 'Bertemu Gergasi Lembut Borneo',
      id: 'Bertemu Raksasa Lembut Borneo',
    },
    subtitle: {
      en: 'Orangutan Discovery Experience',
      ms: 'Pengalaman Penemuan Orang Utan',
      id: 'Pengalaman Penemuan Orangutan',
    },
    description: {
      en: 'Visit the world-famous Sepilok Rehabilitation Centre and watch orangutans swing through the rainforest canopy.',
      ms: 'Lawati Pusat Pemulihan Sepilok yang terkenal di dunia dan saksikan orang utan berayun melalui kanopi hutan hujan.',
      id: 'Kunjungi Pusat Rehabilitasi Sepilok yang terkenal di dunia dan saksikan orangutan berayun melalui kanopi hutan hujan.',
    },
    image: 'https://cdn.thecrazytourist.com/wp-content/uploads/2019/04/ccimage-shutterstock_107783132.jpg',
    location: 'Sepilok, Sabah',
    duration: '1 Day',
    link: '/tours/orangutan-discovery',
  },
];

export default function Hero({ locale }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="hero relative min-h-screen overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={cn(
            'absolute inset-0 transition-all duration-1000 ease-out',
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        >
          {/* Placeholder gradient - replace with actual images */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900"
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full pt-24 pb-16">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Tagline */}
            <div 
              key={`tagline-${currentSlide}`}
              className="animate-fade-in-up opacity-0 mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                <span className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
                {getLocalizedValue(slide.subtitle, locale)}
              </span>
            </div>

            {/* Title */}
            <h1 
              key={`title-${currentSlide}`}
              className="animate-fade-in-up opacity-0 delay-100 font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              {getLocalizedValue(slide.title, locale)}
            </h1>

            {/* Description */}
            <p 
              key={`desc-${currentSlide}`}
              className="animate-fade-in-up opacity-0 delay-200 text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
            >
              {getLocalizedValue(slide.description, locale)}
            </p>

            {/* Meta Info */}
            <div 
              key={`meta-${currentSlide}`}
              className="animate-fade-in-up opacity-0 delay-300 flex flex-wrap items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{slide.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{slide.duration}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div 
              key={`cta-${currentSlide}`}
              className="animate-fade-in-up opacity-0 delay-400 flex flex-wrap gap-4"
            >
              <Button
                href={`/${locale}${slide.link}`}
                variant="primary"
                size="lg"
                className="!bg-[#E31E24] hover:!bg-[#c41a1f] shadow-xl shadow-red-500/20"
              >
                {locale === 'en' ? 'Explore Tour' : locale === 'ms' ? 'Terokai Pakej' : 'Jelajahi Paket'}
              </Button>
              <Button
                href={`/${locale}/tours`}
                variant="outline-white"
                size="lg"
              >
                {locale === 'en' ? 'View All Tours' : locale === 'ms' ? 'Lihat Semua' : 'Lihat Semua'}
              </Button>
            </div>
          </div>

          {/* Right Side - Preview Images */}
          <div className="hidden lg:block relative">
            <div className="flex gap-4 justify-end">
              {/* Main preview card */}
              <div 
                key={`preview-${currentSlide}`}
                className="animate-slide-in-right opacity-0 relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"
                  style={{
                    backgroundImage: `url(${heroSlides[(currentSlide + 1) % heroSlides.length].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="location-badge mb-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {heroSlides[(currentSlide + 1) % heroSlides.length].location}
                  </span>
                  <p className="text-white font-semibold text-lg line-clamp-2">
                    {getLocalizedValue(heroSlides[(currentSlide + 1) % heroSlides.length].title, locale)}
                  </p>
                </div>
              </div>

              {/* Secondary preview */}
              <div 
                className="animate-slide-in-right opacity-0 delay-200 relative w-48 h-64 rounded-2xl overflow-hidden shadow-xl self-center"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"
                  style={{
                    backgroundImage: `url(${heroSlides[(currentSlide + 2) % heroSlides.length].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Slide Counter
            <div className="slide-number text-5xl md:text-6xl">
              <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-white/30">/{String(heroSlides.length).padStart(2, '0')}</span>
            </div> */}

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevSlide}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all disabled:opacity-50"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-[#E31E24] hover:text-white transition-all disabled:opacity-50"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="hidden md:flex items-center gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAnimating(false), 800);
                    }
                  }}
                  className={cn(
                    'h-1 rounded-full transition-all',
                    index === currentSlide 
                      ? 'w-8 bg-[#E31E24]' 
                      : 'w-4 bg-white/30 hover:bg-white/50'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
