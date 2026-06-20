import ImageBlock from '@/components/ui/ImageBlock';

export default function CarRentalGallery({ locale, images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#E31E24] rounded-full text-sm font-semibold mb-4">
            {locale === 'en' ? '• Our Client' : '• {Pelanggan} Kami'}
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

        {/* Masonry-style responsive grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="break-inside-avoid rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full">
                <ImageBlock
                  src={img.imageUrl}
                  alt={img.imageAlt || img.title || 'Car rental'}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
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
      </div>
    </section>
  );
}
