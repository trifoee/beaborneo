'use client';

import { useEffect, useRef } from 'react';
import ImageBlock from '@/components/ui/ImageBlock';

export default function CarRentalGallery({ locale, images }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !images || images.length === 0) return;

    let animationFrameId;
    let scrollSpeed = 1.5; // Faster scroll speed

    const autoScroll = () => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        
        // Reset to start when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling after a short delay
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(autoScroll);
    }, 1000);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
            {locale === 'en' ? '• Our Client' : '• Pelanggan Kami'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Gallery' : 'Galeri'}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {locale === 'en'
              ? 'A look at our well-maintained vehicles ready for your Sabah adventure.'
              : 'Lihat kenderaan kami yang diselenggara dengan baik untuk pengembaraan Sabah anda.'}
          </p>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Render images twice for seamless loop */}
            {[...images, ...images].map((img, index) => (
              <div
                key={`${img._id}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px]">
                  <ImageBlock
                    src={img.imageUrl}
                    alt={img.imageAlt || img.title || 'Car rental'}
                    width={400}
                    height={280}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Caption on hover */}
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">{img.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Hint text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {locale === 'en' 
            ? 'Hover to pause • Scroll to explore'
            : 'Hover untuk jeda • Tatal untuk meneroka'}
        </p>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
