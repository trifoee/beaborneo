/**
 * Home Page Schema
 * 
 * Defines the structure for the home page content.
 * TODO: Complete schema when Sanity is integrated
 */

// import { defineType, defineField } from 'sanity';

/**
 * Home page schema definition
 * 
 * Usage in Sanity Studio:
 * export default defineType({
 *   name: 'home',
 *   title: 'Home Page',
 *   type: 'document',
 *   fields: [...],
 * });
 */

const homeSchema = {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          description: 'Main headline for the hero section',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          description: 'Supporting text below the headline',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'localizedString',
        },
        {
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
        },
      ],
    },
    // Featured Tours
    {
      name: 'featuredToursTitle',
      title: 'Featured Tours Section Title',
      type: 'localizedString',
    },
    {
      name: 'featuredTours',
      title: 'Featured Tours',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tour' }] }],
      validation: (Rule) => Rule.max(6),
    },
    // Testimonials
    {
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'localizedString',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'quote', type: 'localizedText', title: 'Quote' },
            { name: 'location', type: 'string', title: 'Location' },
            { name: 'avatar', type: 'image', title: 'Avatar' },
          ],
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'hero.title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
      };
    },
  },
};

export default homeSchema;
