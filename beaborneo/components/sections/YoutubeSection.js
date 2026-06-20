'use client';

const YOUTUBE_ID = 'P1ksAopgTS8';
const YOUTUBE_URL = `https://www.youtube.com/embed/${YOUTUBE_ID}?si=0FWax_Fr0KXk4sQL&rel=0&modestbranding=1`;
const YOUTUBE_WATCH = `https://youtu.be/${YOUTUBE_ID}?si=0FWax_Fr0KXk4sQL`;

export default function YoutubeSection({ locale }) {
  return (
    <section className="py-20 md:py-28 bg-earth-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
            {locale === 'en' ? '• Watch Our Story' : '• Tonton Kisah Kami'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Experience Borneo Like ' : 'Rasai Borneo Seperti '}
            <span className="text-[#E31E24]">
              {locale === 'en' ? 'Never Before' : 'Tidak Pernah Sebelum Ini'}
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {locale === 'en'
              ? "See what awaits you — from lush rainforests to pristine islands. Your Borneo adventure starts here."
              : 'Lihat apa yang menanti anda — dari hutan hujan yang subur hingga pulau-pulau yang indah. Pengembaraan Borneo anda bermula di sini.'}
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-gray-200 ring-1 ring-gray-200">
            {/* 16:9 aspect ratio wrapper */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={YOUTUBE_URL}
                title={locale === 'en' ? 'Bea Borneo Travel Video' : 'Video Bea Borneo Travel'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Watch on YouTube link */}
          <div className="text-center mt-6">
            <a
              href={YOUTUBE_WATCH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium group"
            >
              {/* YouTube icon */}
              <svg
                className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {locale === 'en' ? 'Watch on YouTube' : 'Tonton di YouTube'}
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
