/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    // Remote patterns for CMS images (Sanity)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Placeholder images for development
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Enable experimental features if needed
  // experimental: {
  //   serverActions: true,
  // },

  // Redirects
  async redirects() {
    return [
      // Add any custom redirects here
      // Example: Redirect old URLs to new ones
      // {
      //   source: '/old-page',
      //   destination: '/en/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
