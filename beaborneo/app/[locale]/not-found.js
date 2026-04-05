/**
 * 404 Not Found Page
 * 
 * Displayed when a page is not found within a locale.
 */

import Link from 'next/link';
import Button from '@/components/ui/Button';

// Note: not-found.js doesn't receive params in Next.js App Router
// We'll provide a generic multilingual experience
export default function NotFound() {
  return (
    <div className="not-found-page min-h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary-200 mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/en" variant="primary">
            Go to Homepage (EN)
          </Button>
          <Button href="/ms" variant="outline">
            Pergi ke Halaman Utama (MS)
          </Button>
          <Button href="/id" variant="outline">
            Pergi ke Beranda (ID)
          </Button>
        </div>
      </div>
    </div>
  );
}
