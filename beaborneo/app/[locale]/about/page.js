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
    en: 'Carrying the beauty, culture, and hospitality of Borneo to the world',
    ms: 'Membawa keindahan, budaya, dan keramahan Borneo ke dunia',
    id: 'Membawa keindahan, budaya, dan keramahan Borneo ke dunia',
  },
  story: {
    en: `Bea Borneo Travel & Tours Sdn. Bhd. is a licensed and registered travel agency under the Ministry of Tourism, Arts and Culture Malaysia (MOTAC), proudly headquartered in Penampang, Sabah.

Founded by a group of young, visionary Sabahan professionals with extensive experience in the tourism and hospitality industry, Bea Borneo Travel was established with a strong determination to elevate Sabah's tourism potential to the global stage. The founders share one common vision — to represent Sabah with authenticity, professionalism, and a deep sense of pride in their homeland.

As a homegrown travel company, we are committed to showcasing the natural beauty, cultural richness, and adventure spirit of Sabah through genuine and well-crafted travel experiences. We believe that travel is not just about visiting destinations, but about creating meaningful connections that reflect the true heart of Borneo.

Today, our market reach extends well beyond Malaysia, establishing a strong presence across Indonesia, Singapore, Brunei, and the wider Southeast Asian region, while steadily building recognition among international travellers worldwide.`,
    ms: `Bea Borneo Travel & Tours Sdn. Bhd. ialah agensi pelancongan berlesen dan berdaftar di bawah Kementerian Pelancongan, Seni dan Budaya Malaysia (MOTAC), yang beribu pejabat dengan bangganya di Penampang, Sabah.

Diasaskan oleh sekumpulan profesional muda Sabah yang berwawasan dengan pengalaman luas dalam industri pelancongan dan hospitaliti, Bea Borneo Travel ditubuhkan dengan keazaman untuk mengangkat potensi pelancongan Sabah ke pentas global. Para pengasas berkongsi satu visi — untuk mewakili Sabah dengan keaslian, profesionalisme, dan rasa bangga terhadap tanah air mereka.

Sebagai syarikat pelancongan tempatan, kami komited untuk mempamerkan keindahan alam semula jadi, kekayaan budaya, dan semangat pengembaraan Sabah melalui pengalaman pelancongan yang tulen dan direka dengan baik. Kami percaya bahawa pelancongan bukan sekadar melawat destinasi, tetapi tentang mencipta hubungan bermakna yang mencerminkan hati sebenar Borneo.

Hari ini, jangkauan pasaran kami melampaui Malaysia, dengan kehadiran kukuh di Indonesia, Singapura, Brunei, dan rantau Asia Tenggara yang lebih luas, sambil terus membina pengiktirafan di kalangan pelancong antarabangsa.`,
    id: `Bea Borneo Travel & Tours Sdn. Bhd. adalah agen perjalanan berlisensi dan terdaftar di bawah Kementerian Pariwisata, Seni dan Budaya Malaysia (MOTAC), yang berkantor pusat dengan bangga di Penampang, Sabah.

Didirikan oleh sekelompok profesional muda Sabah yang visioner dengan pengalaman luas di industri pariwisata dan perhotelan, Bea Borneo Travel didirikan dengan tekad kuat untuk mengangkat potensi pariwisata Sabah ke panggung global. Para pendiri berbagi satu visi — mewakili Sabah dengan keaslian, profesionalisme, dan rasa bangga yang mendalam terhadap tanah air mereka.

Sebagai perusahaan perjalanan lokal, kami berkomitmen untuk menampilkan keindahan alam, kekayaan budaya, dan semangat petualangan Sabah melalui pengalaman perjalanan yang tulus dan dirancang dengan baik. Kami percaya bahwa perjalanan bukan hanya tentang mengunjungi destinasi, tetapi tentang menciptakan koneksi bermakna yang mencerminkan hati sejati Borneo.

Saat ini, jangkauan pasar kami melampaui Malaysia, dengan kehadiran kuat di Indonesia, Singapura, Brunei, dan kawasan Asia Tenggara yang lebih luas, sambil terus membangun pengakuan di kalangan wisatawan internasional.`,
  },
  vision: {
    en: 'To be a leading Sabah-based travel company that connects the world to the true essence of Borneo, through professional, sustainable, and inspiring tourism experiences.',
    ms: 'Menjadi syarikat pelancongan terkemuka berasaskan Sabah yang menghubungkan dunia dengan intipati sebenar Borneo, melalui pengalaman pelancongan yang profesional, lestari, dan memberi inspirasi.',
    id: 'Menjadi perusahaan perjalanan terkemuka berbasis Sabah yang menghubungkan dunia dengan esensi sejati Borneo, melalui pengalaman pariwisata yang profesional, berkelanjutan, dan menginspirasi.',
  },
  mission: [
    {
      en: 'To position Sabah as a world-class tourism destination.',
      ms: 'Meletakkan Sabah sebagai destinasi pelancongan bertaraf dunia.',
      id: 'Memposisikan Sabah sebagai destinasi pariwisata kelas dunia.',
    },
    {
      en: 'To deliver professional, authentic, and responsible travel experiences.',
      ms: 'Menyampaikan pengalaman pelancongan yang profesional, autentik, dan bertanggungjawab.',
      id: 'Memberikan pengalaman perjalanan yang profesional, autentik, dan bertanggung jawab.',
    },
    {
      en: 'To empower local communities and promote sustainable tourism practices.',
      ms: 'Memperkasakan komuniti tempatan dan mempromosikan amalan pelancongan lestari.',
      id: 'Memberdayakan komunitas lokal dan mempromosikan praktik pariwisata berkelanjutan.',
    },
    {
      en: 'To expand Sabah\'s tourism visibility through digital innovation and international collaboration.',
      ms: 'Meluaskan keterlihatan pelancongan Sabah melalui inovasi digital dan kerjasama antarabangsa.',
      id: 'Memperluas visibilitas pariwisata Sabah melalui inovasi digital dan kolaborasi internasional.',
    },
  ],
  values: [
    {
      icon: 'integrity',
      title: { en: 'Integrity', ms: 'Integriti', id: 'Integritas' },
      description: {
        en: 'Conducting business transparently and ethically in everything we do.',
        ms: 'Menjalankan perniagaan secara telus dan beretika dalam semua yang kami lakukan.',
        id: 'Menjalankan bisnis secara transparan dan etis dalam segala hal yang kami lakukan.',
      },
    },
    {
      icon: 'excellence',
      title: { en: 'Excellence', ms: 'Kecemerlangan', id: 'Keunggulan' },
      description: {
        en: 'Delivering high-quality, reliable services to every client we serve.',
        ms: 'Menyampaikan perkhidmatan berkualiti tinggi dan boleh dipercayai kepada setiap pelanggan.',
        id: 'Memberikan layanan berkualitas tinggi dan andal kepada setiap klien yang kami layani.',
      },
    },
    {
      icon: 'sustainability',
      title: { en: 'Sustainability', ms: 'Kelestarian', id: 'Keberlanjutan' },
      description: {
        en: 'Promoting responsible tourism that protects nature and preserves cultural heritage.',
        ms: 'Mempromosikan pelancongan bertanggungjawab yang melindungi alam semula jadi dan memelihara warisan budaya.',
        id: 'Mempromosikan pariwisata bertanggung jawab yang melindungi alam dan melestarikan warisan budaya.',
      },
    },
    {
      icon: 'innovation',
      title: { en: 'Innovation', ms: 'Inovasi', id: 'Inovasi' },
      description: {
        en: 'Utilizing creative digital strategies and new media to enhance the travel experience.',
        ms: 'Menggunakan strategi digital kreatif dan media baharu untuk meningkatkan pengalaman pelancongan.',
        id: 'Memanfaatkan strategi digital kreatif dan media baru untuk meningkatkan pengalaman perjalanan.',
      },
    },
    {
      icon: 'commitment',
      title: { en: 'Commitment', ms: 'Komitmen', id: 'Komitmen' },
      description: {
        en: 'Dedicated to showcasing the very best of Sabah to the world with passion and pride.',
        ms: 'Berdedikasi untuk mempamerkan yang terbaik dari Sabah kepada dunia dengan semangat dan kebanggaan.',
        id: 'Berdedikasi untuk menampilkan yang terbaik dari Sabah kepada dunia dengan semangat dan kebanggaan.',
      },
    },
  ],
  services: [
    {
      icon: 'tours',
      title: { en: 'Inbound Tourism', ms: 'Pelancongan Masuk', id: 'Pariwisata Masuk' },
      description: {
        en: 'Exclusive Sabah travel packages covering Kota Kinabalu, Kundasang, Semporna, Sandakan, and beyond. Adventure, eco, and cultural tourism with authentic local experiences. Muslim-friendly and family-oriented arrangements available.',
        ms: 'Pakej pelancongan eksklusif Sabah meliputi Kota Kinabalu, Kundasang, Semporna, Sandakan, dan banyak lagi. Pelancongan pengembaraan, eko, dan budaya dengan pengalaman tempatan yang autentik. Susunan mesra Muslim dan berorientasikan keluarga tersedia.',
        id: 'Paket wisata eksklusif Sabah meliputi Kota Kinabalu, Kundasang, Semporna, Sandakan, dan sekitarnya. Wisata petualangan, eko, dan budaya dengan pengalaman lokal yang autentik. Tersedia pengaturan ramah Muslim dan berorientasi keluarga.',
      },
    },
    {
      icon: 'custom',
      title: { en: 'Custom Packages', ms: 'Pakej Khas', id: 'Paket Kustom' },
      description: {
        en: 'Customised packages for private groups, corporate retreats, educational tours, and incentive travel programs tailored to your specific needs.',
        ms: 'Pakej khas untuk kumpulan persendirian, percutian korporat, lawatan pendidikan, dan program pelancongan insentif yang disesuaikan dengan keperluan anda.',
        id: 'Paket khusus untuk grup pribadi, retret korporat, tur pendidikan, dan program perjalanan insentif yang disesuaikan dengan kebutuhan spesifik Anda.',
      },
    },
    {
      icon: 'transport',
      title: { en: 'Transportation', ms: 'Pengangkutan', id: 'Transportasi' },
      description: {
        en: 'VIP transfers, tourist vans, coaches, and chauffeured services. Full coordination for airport pickups and multi-day transfers across Sabah.',
        ms: 'Pemindahan VIP, van pelancong, bas, dan perkhidmatan pemandu. Penyelarasan penuh untuk pengambilan di lapangan terbang dan pemindahan pelbagai hari di seluruh Sabah.',
        id: 'Transfer VIP, van wisata, bus, dan layanan sopir. Koordinasi penuh untuk penjemputan bandara dan transfer multi-hari di seluruh Sabah.',
      },
    },
    {
      icon: 'accommodation',
      title: { en: 'Accommodation', ms: 'Penginapan', id: 'Akomodasi' },
      description: {
        en: 'Partnerships with top resorts, hotels, and glamping providers in Sabah. Customised stays for comfort, budget, and theme preferences.',
        ms: 'Perkongsian dengan resort, hotel, dan penyedia glamping teratas di Sabah. Penginapan khas untuk keselesaan, bajet, dan pilihan tema.',
        id: 'Kemitraan dengan resort, hotel, dan penyedia glamping terbaik di Sabah. Akomodasi khusus untuk kenyamanan, anggaran, dan preferensi tema.',
      },
    },
  ],
  advantages: [
    {
      en: 'Licensed by the Ministry of Tourism, Arts and Culture Malaysia (MOTAC)',
      ms: 'Berlesen di bawah Kementerian Pelancongan, Seni dan Budaya Malaysia (MOTAC)',
      id: 'Berlisensi oleh Kementerian Pariwisata, Seni dan Budaya Malaysia (MOTAC)',
    },
    {
      en: 'Strong operational base and deep expertise in Sabah destinations',
      ms: 'Pangkalan operasi kukuh dan kepakaran mendalam dalam destinasi Sabah',
      id: 'Basis operasional yang kuat dan keahlian mendalam dalam destinasi Sabah',
    },
    {
      en: 'Proven track record handling diverse tour programs',
      ms: 'Rekod prestasi terbukti mengendalikan pelbagai program pelancongan',
      id: 'Rekam jejak terbukti menangani berbagai program tur',
    },
    {
      en: 'Professional and multilingual team',
      ms: 'Pasukan profesional dan pelbagai bahasa',
      id: 'Tim profesional dan multibahasa',
    },
    {
      en: 'Deep local partnerships with community operators',
      ms: 'Perkongsian tempatan mendalam dengan pengendali komuniti',
      id: 'Kemitraan lokal yang mendalam dengan operator komunitas',
    },
    {
      en: 'Commitment to sustainable, responsible tourism',
      ms: 'Komitmen kepada pelancongan lestari dan bertanggungjawab',
      id: 'Komitmen terhadap pariwisata berkelanjutan dan bertanggung jawab',
    },
  ],
  directorMessage: {
    quote: {
      en: 'Sabah is not just a destination on the map — it is a living experience, a harmony between nature, culture, and adventure. Every visitor who comes here leaves with a story to tell, a memory that lasts a lifetime. And that is what Bea Borneo Travel stands for — turning every journey into a meaningful connection.',
      ms: 'Sabah bukan sekadar destinasi di peta — ia adalah pengalaman hidup, keharmonian antara alam semula jadi, budaya, dan pengembaraan. Setiap pelawat yang datang ke sini pergi dengan cerita untuk diceritakan, memori yang kekal seumur hidup. Dan itulah yang diperjuangkan oleh Bea Borneo Travel — menjadikan setiap perjalanan sebagai hubungan bermakna.',
      id: 'Sabah bukan sekadar destinasi di peta — ia adalah pengalaman hidup, harmoni antara alam, budaya, dan petualangan. Setiap pengunjung yang datang ke sini pergi dengan cerita untuk diceritakan, kenangan yang bertahan seumur hidup. Dan itulah yang diperjuangkan Bea Borneo Travel — mengubah setiap perjalanan menjadi koneksi yang bermakna.',
    },
    name: 'Marlina Binti Murphy',
    title: {
      en: 'Managing Director',
      ms: 'Pengarah Urusan',
      id: 'Direktur Utama',
    },
  },
  stats: [
    { value: 'MOTAC', label: { en: 'Licensed Agency', ms: 'Agensi Berlesen', id: 'Agen Berlisensi' } },
    { value: '5+', label: { en: 'Regions Covered', ms: 'Wilayah Diliputi', id: 'Wilayah Tercakup' } },
    { value: '50+', label: { en: 'Tour Packages', ms: 'Pakej Pelancongan', id: 'Paket Wisata' } },
    { value: '5+', label: { en: 'Countries Served', ms: 'Negara Dilayan', id: 'Negara Dilayani' } },
  ],
  seo: {
    title: { en: 'About Us', ms: 'Tentang Kami', id: 'Tentang Kami' },
    description: {
      en: 'Learn about Bea Borneo Travel & Tours — a MOTAC-licensed Sabah travel agency delivering authentic Borneo adventures with professionalism and passion.',
      ms: 'Ketahui tentang Bea Borneo Travel & Tours — agensi pelancongan Sabah berlesen MOTAC yang menyampaikan pengembaraan Borneo autentik dengan profesionalisme dan semangat.',
      id: 'Pelajari tentang Bea Borneo Travel & Tours — agen perjalanan Sabah berlisensi MOTAC yang menghadirkan petualangan Borneo otentik dengan profesionalisme dan semangat.',
    },
  },
};

const valueIcons = {
  integrity: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  excellence: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
  sustainability: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.592L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
    </svg>
  ),
  innovation: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  commitment: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
};

const serviceIcons = {
  tours: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  custom: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  transport: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  accommodation: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
    </svg>
  ),
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
            Dream &bull; Explore &bull; Discover
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            {getLocalizedValue(aboutContent.title, locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {getLocalizedValue(aboutContent.subtitle, locale)}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#E31E24] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">
                    {getLocalizedValue(stat.label, locale)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <ImageBlock
                  src="/images/about/team_ai.png"
                  alt="Bea Borneo Travel Team"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* <div className="absolute -bottom-8 -right-4 md:-right-8 w-48 md:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <ImageBlock
                  src="/images/about/logo.png"
                  alt="Teamwork and collaboration"
                  fill
                  className="object-cover"
                />
              </div> */}
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? '• Our Story' : '• Cerita Kami'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Born in Sabah, Built for the World' : 'Lahir di Sabah, Dibina untuk Dunia'}
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

      {/* Vision & Mission Section */}
      <section className="py-20 md:py-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31E24]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Vision */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
                {locale === 'en' ? '• Our Vision' : '• Visi Kami'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                {locale === 'en' ? 'Vision' : 'Visi'}
              </h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                &ldquo;{getLocalizedValue(aboutContent.vision, locale)}&rdquo;
              </p>
            </div>

            {/* Mission */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#E31E24]/20 text-[#ff6b6f] rounded-full text-sm font-semibold mb-6">
                {locale === 'en' ? '• Our Mission' : '• Misi Kami'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                {locale === 'en' ? 'Mission' : 'Misi'}
              </h2>
              <ul className="space-y-5">
                {aboutContent.mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E31E24] flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {getLocalizedValue(item, locale)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold">
                {locale === 'en' ? "• Director's Message" : '• Pesan Pengarah'}
              </span>
            </div>
            <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-16 items-center">
              <div className="flex flex-col items-center">
                <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-[#E31E24]/10 mx-auto">
                  <ImageBlock
                    src="/images/about/director-marlina.jpeg"
                    alt="Marlina Binti Murphy - Managing Director"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-center mt-6">
                  <p className="font-heading font-bold text-gray-900 text-lg">
                    {aboutContent.directorMessage.name}
                  </p>
                  <p className="text-[#E31E24] font-medium text-sm">
                    {getLocalizedValue(aboutContent.directorMessage.title, locale)}
                  </p>
                  <p className="text-gray-500 text-sm">Bea Borneo Travel & Tours</p>
                </div>
              </div>
              <div className="relative">
                <svg className="w-14 h-14 text-[#E31E24]/10 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed italic">
                  {getLocalizedValue(aboutContent.directorMessage.quote, locale)}
                </blockquote>
                <div className="w-16 h-[3px] bg-[#E31E24] mt-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Our Values' : '• Nilai Kami'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'What Drives Us' : 'Apa yang Mendorong Kami'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Our core values guide every experience we create and every relationship we build.'
                : 'Nilai teras kami membimbing setiap pengalaman yang kami cipta dan setiap hubungan yang kami bina.'}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.values.map((value, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 ${
                  index >= 3 ? 'lg:col-span-1 sm:col-span-1' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E31E24] flex items-center justify-center mb-6">
                  {valueIcons[value.icon]}
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

      {/* What We Offer Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
              {locale === 'en' ? '• Our Services' : '• Perkhidmatan Kami'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'What We Offer' : 'Apa yang Kami Tawarkan'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {locale === 'en'
                ? 'From curated tour packages to VIP transfers, we handle every detail of your Sabah adventure.'
                : 'Dari pakej pelancongan yang dikurasi hingga pemindahan VIP, kami menguruskan setiap butiran pengembaraan Sabah anda.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {aboutContent.services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 md:p-10 border border-gray-100 hover:border-[#E31E24]/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-50 text-[#E31E24] flex items-center justify-center group-hover:bg-[#E31E24] group-hover:text-white transition-colors duration-300">
                    {serviceIcons[service.icon]}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      {getLocalizedValue(service.title, locale)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {getLocalizedValue(service.description, locale)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
                {locale === 'en' ? '• Why Choose Us' : '• Mengapa Pilih Kami'}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Your Trusted Sabah Travel Partner' : 'Rakan Pelancongan Sabah yang Dipercayai'}
              </h2>
              <p className="text-gray-600 text-lg mb-10">
                {locale === 'en'
                  ? 'With deep roots in Sabah and a commitment to excellence, we bring you closer to the authentic heart of Borneo.'
                  : 'Dengan akar yang mendalam di Sabah dan komitmen terhadap kecemerlangan, kami membawa anda lebih dekat dengan hati sebenar Borneo.'}
              </p>
              
              <div className="space-y-4">
                {aboutContent.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E31E24]/10 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-[#E31E24]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {getLocalizedValue(advantage, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <ImageBlock
                  src="/images/about/beaborneo_motac_license.png"
                  alt="Professional partnership and trust"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#E31E24] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">MOTAC</div>
                <div className="text-sm opacity-90">
                  {locale === 'en' ? 'Licensed Agency' : 'Agensi Berlesen'}
                </div>
              </div>
            </div>
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
              ? 'Let us craft your perfect Sabah adventure — from island hopping in Semporna to conquering Mount Kinabalu.' 
              : 'Biar kami mencipta pengembaraan Sabah sempurna anda — dari melompat pulau di Semporna hingga menakluki Gunung Kinabalu.'}
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
