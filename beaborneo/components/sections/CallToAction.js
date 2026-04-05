/**
 * Call To Action Section Component
 * 
 * Modern CTA with brand colors.
 */

import { getLocalizedValue } from '@/lib/i18n';
import Button from '@/components/ui/Button';

const ctaContent = {
  title: {
    en: 'Ready to Start Your Borneo Adventure?',
    ms: 'Bersedia untuk Memulakan Pengembaraan Borneo Anda?',
    id: 'Siap Memulai Petualangan Borneo Anda?',
  },
  subtitle: {
    en: 'Let our expert team craft the perfect journey for you. From wildlife encounters to mountain conquests, we\'ll make every moment unforgettable.',
    ms: 'Biarkan pasukan pakar kami mereka bentuk perjalanan yang sempurna untuk anda. Dari perjumpaan hidupan liar hingga penaklukan gunung, kami akan menjadikan setiap saat tidak dapat dilupakan.',
    id: 'Biarkan tim ahli kami merancang perjalanan yang sempurna untuk Anda. Dari pertemuan satwa liar hingga penaklukan gunung, kami akan membuat setiap momen tak terlupakan.',
  },
  stats: [
    { value: '10+', label: { en: 'Years Experience', ms: 'Tahun Pengalaman', id: 'Tahun Pengalaman' } },
    { value: '5000+', label: { en: 'Happy Travelers', ms: 'Pengembara Gembira', id: 'Wisatawan Bahagia' } },
    { value: '50+', label: { en: 'Tour Packages', ms: 'Pakej Pelancongan', id: 'Paket Wisata' } },
  ],
};

export default function CallToAction({ locale }) {
  return (
    <section className="cta relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#E31E24]" />
      
      {/* Decorative Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Dream • Explore • Discover
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            {getLocalizedValue(ctaContent.title, locale)}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/85 mb-10 leading-relaxed max-w-2xl mx-auto">
            {getLocalizedValue(ctaContent.subtitle, locale)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              href={`/${locale}/contact`}
              variant="white"
              size="lg"
              className="!bg-white !text-[#E31E24] hover:!bg-gray-100 shadow-xl"
            >
              {locale === 'en' ? 'Plan Your Trip' : locale === 'ms' ? 'Rancang Perjalanan' : 'Rencanakan Perjalanan'}
            </Button>
            <Button
              href={`/${locale}/tours`}
              variant="outline-white"
              size="lg"
              className="!border-white !text-white hover:!bg-white/10"
            >
              {locale === 'en' ? 'Browse Tours' : locale === 'ms' ? 'Lihat Pakej' : 'Lihat Paket'}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {ctaContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">
                  {getLocalizedValue(stat.label, locale)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
