/**
 * Sanity Studio Configuration
 * 
 * This file configures Sanity Studio.
 * TODO: Complete configuration when Sanity project is created
 */

// import { defineConfig } from 'sanity';
// import { deskTool } from 'sanity/desk';
// import { schemas } from './schemas';

/**
 * Sanity Studio configuration
 * 
 * To set up Sanity:
 * 1. Create a Sanity project at https://www.sanity.io/
 * 2. Install Sanity CLI: npm install -g @sanity/cli
 * 3. Run: sanity init
 * 4. Configure project ID and dataset below
 * 5. Uncomment and complete the configuration
 */

// export default defineConfig({
//   name: 'bea-borneo-studio',
//   title: 'Bea Borneo CMS',
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   plugins: [deskTool()],
//   schema: {
//     types: schemas,
//   },
// });

/**
 * Placeholder export for development
 * Remove this when Sanity is configured
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
};
