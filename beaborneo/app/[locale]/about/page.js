/**
 * About Page
 * 
 * Company information with modern design.
 * TODO: Replace hardcoded content with CMS data when Sanity is integrated
 */

import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getLocalizedValue } from '@/lib/i18n';
import ImageBlock from '@/components/ui/ImageBlock';
import Button from '@/components/ui/Button';

const aboutContent = {
  title: {
    en: 'About Bea Borneo',
    ms: 'Tentang Bea Borneo',
    id: 'Tentang Bea Borneo',
  },
  subtitle: {
    en: 'Your Gateway to Borneo\'s Wonders',
    ms: 'Pintu Masuk Anda ke Keajaiban Borneo',
    id: 'Gerbang Anda ke Keajaiban Borneo',
  },
  story: {
    en: `Founded in 2015, Bea Borneo Travel was born from a deep passion for sharing the natural wonders and cultural richness of Borneo with the world. Our founders, native to Sabah, grew up exploring the rainforests, rivers, and mountains that make this island so extraordinary.

We believe that travel should be transformative—not just for the traveler, but for the communities and environments we visit. That's why we're committed to sustainable tourism practices that protect Borneo's incredible biodiversity while supporting local communities.

Our team consists of experienced local guides, naturalists, and travel experts who are dedicated to creating authentic, immersive experiences. Whether you're watching orangutans swing through the canopy, summiting Mount Kinabalu at dawn, or sharing a meal with an indigenous family, we ensure every moment is meaningful.`,
    ms: `Ditubuhkan pada 2015, Bea Borneo Travel lahir daripada minat yang mendalam untuk berkongsi keajaiban alam semula jadi dan kekayaan budaya Borneo dengan dunia. Pengasas kami, yang berasal dari Sabah, membesar dengan meneroka hutan hujan, sungai, dan gunung yang menjadikan pulau ini begitu luar biasa.

Kami percaya bahawa perjalanan harus membawa perubahan—bukan sahaja untuk pengembara, tetapi juga untuk komuniti dan persekitaran yang kami lawati. Itulah sebabnya kami komited kepada amalan pelancongan lestari yang melindungi biodiversiti Borneo yang luar biasa sambil menyokong komuniti tempatan.

Pasukan kami terdiri daripada pemandu tempatan yang berpengalaman, naturalis, dan pakar perjalanan yang berdedikasi untuk mencipta pengalaman yang autentik dan mendalam.`,
    id: `Didirikan pada tahun 2015, Bea Borneo Travel lahir dari hasrat yang mendalam untuk berbagi keajaiban alam dan kekayaan budaya Borneo dengan dunia. Para pendiri kami, yang berasal dari Sabah, tumbuh dengan menjelajahi hutan hujan, sungai, dan pegunungan yang membuat pulau ini begitu luar biasa.

Kami percaya bahwa perjalanan harus transformatif—tidak hanya bagi wisatawan, tetapi juga bagi komunitas dan lingkungan yang kami kunjungi. Itulah mengapa kami berkomitmen pada praktik pariwisata berkelanjutan yang melindungi keanekaragaman hayati Borneo yang luar biasa sambil mendukung komunitas lokal.

Tim kami terdiri dari pemandu lokal berpengalaman, naturalis, dan ahli perjalanan yang berdedikasi untuk menciptakan pengalaman yang otentik dan mendalam.`,
  },
  values: [
    {
      icon: '🌿',
      title: { en: 'Sustainability', ms: 'Kelestarian', id: 'Keberlanjutan' },
      description: {
        en: 'We minimize our environmental impact and support conservation efforts across Borneo.',
        ms: 'Kami meminimumkan kesan alam sekitar dan menyokong usaha pemuliharaan di seluruh Borneo.',
        id: 'Kami meminimalkan dampak lingkungan dan mendukung upaya konservasi di seluruh Borneo.',
      },
    },
    {
      icon: '🤝',
      title: { en: 'Community', ms: 'Komuniti', id: 'Komunitas' },
      description: {
        en: 'We partner with local communities, ensuring tourism benefits those who call Borneo home.',
        ms: 'Kami bekerjasama dengan komuniti tempatan, memastikan pelancongan memberi manfaat kepada penduduk tempatan.',
        id: 'Kami bermitra dengan komunitas lokal, memastikan pariwisata menguntungkan penduduk lokal.',
      },
    },
    {
      icon: '✨',
      title: { en: 'Authenticity', ms: 'Keaslian', id: 'Keaslian' },
      description: {
        en: 'We create genuine experiences that connect travelers with the real Borneo.',
        ms: 'Kami mencipta pengalaman tulen yang menghubungkan pengembara dengan Borneo sebenar.',
        id: 'Kami menciptakan pengalaman asli yang menghubungkan wisatawan dengan Borneo yang sebenarnya.',
      },
    },
  ],
  stats: [
    { value: '10+', label: { en: 'Years Experience', ms: 'Tahun Pengalaman', id: 'Tahun Pengalaman' } },
    { value: '5000+', label: { en: 'Happy Travelers', ms: 'Pengembara Gembira', id: 'Wisatawan Bahagia' } },
    { value: '50+', label: { en: 'Tour Packages', ms: 'Pakej Pelancongan', id: 'Paket Wisata' } },
    { value: '100%', label: { en: 'Satisfaction', ms: 'Kepuasan', id: 'Kepuasan' } },
  ],
  seo: {
    title: { en: 'About Us', ms: 'Tentang Kami', id: 'Tentang Kami' },
    description: {
      en: 'Learn about Bea Borneo Travel, your trusted partner for authentic Borneo adventures since 2015.',
      ms: 'Ketahui tentang Bea Borneo Travel, rakan kongsi dipercayai anda untuk pengembaraan Borneo sejak 2015.',
      id: 'Pelajari tentang Bea Borneo Travel, mitra terpercaya Anda untuk petualangan Borneo sejak 2015.',
    },
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateSeoMetadata({
    title: aboutContent.seo.title,
    description: aboutContent.seo.description,
    locale,
    path: '/about',
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#E31E24]/30" />
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-40" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#E31E24] rounded-full" />
            Dream • Explore • Discover
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {getLocalizedValue(aboutContent.title, locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {getLocalizedValue(aboutContent.subtitle, locale)}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#E31E24] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {getLocalizedValue(stat.label, locale)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                    <ImageBlock
                      src="/images/about/team-1.jpg"
                      alt="Bea Borneo Team"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <ImageBlock
                      src="/images/about/nature.jpg"
                      alt="Borneo Nature"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <ImageBlock
                      src="/images/about/wildlife.jpg"
                      alt="Borneo Wildlife"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                    <ImageBlock
                      src="/images/about/team-2.jpg"
                      alt="Local Guide"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#E31E24] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">
                  {locale === 'en' ? 'Years of Excellence' : 'Tahun Kecemerlangan'}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? '• Our Story' : '• Cerita Kami'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Passionate About Borneo' : 'Passionate Tentang Borneo'}
              </h2>
              <div className="prose prose-lg text-gray-600">
                {getLocalizedValue(aboutContent.story, locale)
                  .split('\n\n')
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
              <div className="mt-8">
                <Button href={`/${locale}/contact`} variant="primary" size="lg">
                  {locale === 'en' ? 'Get in Touch' : 'Hubungi Kami'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Our Values' : '• Nilai Kami'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {locale === 'en' ? 'What We Stand For' : 'Apa Yang Kami Perjuangkan'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {aboutContent.values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl mb-6">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                  {getLocalizedValue(value.title, locale)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedValue(value.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#E31E24]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {locale === 'en' ? 'Ready to Explore Borneo?' : 'Bersedia untuk Meneroka Borneo?'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'Let us help you plan the adventure of a lifetime.' 
              : 'Biar kami membantu anda merancang pengembaraan seumur hidup.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${locale}/tours`} variant="white" size="lg">
              {locale === 'en' ? 'View Our Tours' : 'Lihat Pakej Kami'}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline-white" size="lg">
              {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
