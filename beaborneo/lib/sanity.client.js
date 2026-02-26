/**
 * Sanity Client Configuration
 * 
 * This file sets up the Sanity client for fetching content.
 * TODO: Install @sanity/client package when ready to integrate CMS
 * npm install @sanity/client
 */

// Uncomment and configure when Sanity is set up:
// import { createClient } from '@sanity/client';

/**
 * Sanity client configuration
 * These values should come from environment variables
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use a date string for API versioning
  useCdn: process.env.NODE_ENV === 'production', // CDN for faster reads in production
};

/**
 * Create Sanity client instance
 * TODO: Uncomment when @sanity/client is installed
 */
// export const sanityClient = createClient(sanityConfig);

/**
 * Preview client (no CDN, for draft content)
 * TODO: Uncomment when @sanity/client is installed
 */
// export const previewClient = createClient({
//   ...sanityConfig,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// });

/**
 * Get the appropriate client based on preview mode
 * @param {boolean} preview - Whether to use preview mode
 * @returns {Object} - Sanity client
 */
// export function getClient(preview = false) {
//   return preview ? previewClient : sanityClient;
// }

/**
 * Placeholder client for development without Sanity
 * Returns mock data until CMS is integrated
 */
export const mockClient = {
  fetch: async (query, params = {}) => {
    console.log('Mock Sanity fetch:', { query, params });
    return null;
  },
};

// Export mock client as default until Sanity is set up
export default mockClient;
