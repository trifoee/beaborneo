import { defineField, defineType } from 'sanity'

/**
 * Testimonial document.
 *
 * The website fetches the entire collection on each build/revalidation
 * and the homepage component shuffles client-side so visitors see a
 * different set on each visit. To highlight specific reviews, set
 * `featured` — they'll appear first in the SSG'd HTML (good for SEO),
 * then the client randomly shuffles the full pool.
 */
export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'City, country — e.g. "Kuala Lumpur, Malaysia"',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      description: 'Star rating from 1 to 5',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      description: 'Provide at least the English version. Other languages fall back to English.',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'ms', title: 'Bahasa Melayu', type: 'text', rows: 4 },
        { name: 'id', title: 'Bahasa Indonesia', type: 'text', rows: 4 },
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || (!value.en && !value.ms && !value.id)) {
            return 'At least one language version of the quote is required.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar (optional)',
      description: 'Square image works best. If empty, the first letter of the name is shown.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tour',
      title: 'Related Tour (optional)',
      description: 'Link to the tour this review is about, if applicable.',
      type: 'reference',
      to: [{ type: 'tour' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description:
        'Featured testimonials are shown first in the static HTML (visible to search engines). The client shuffles all testimonials on every visit.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Lower numbers appear first among featured testimonials. Optional.',
      type: 'number',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'When the review was given. Used as a tie-breaker for ordering.',
      type: 'date',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'avatar',
      featured: 'featured',
      quoteEn: 'quote.en',
    },
    prepare({ title, subtitle, media, featured, quoteEn }) {
      const snippet = quoteEn ? quoteEn.slice(0, 60) + (quoteEn.length > 60 ? '…' : '') : '';
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: subtitle ? `${subtitle} — ${snippet}` : snippet,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'date', direction: 'desc' },
      ],
    },
    {
      title: 'Most recent',
      name: 'mostRecent',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
