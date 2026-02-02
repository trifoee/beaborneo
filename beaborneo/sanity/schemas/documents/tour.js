/**
 * Tour Schema
 * 
 * Defines the structure for tour/package content.
 * TODO: Complete schema when Sanity is integrated
 */

const tourSchema = {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedText',
      description: 'Brief description for cards and listings',
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'localizedText',
      description: 'Detailed tour description',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 Days / 2 Nights"',
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'number',
      description: 'Price in MYR',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wildlife', value: 'wildlife' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Nature', value: 'nature' },
          { title: 'Beach', value: 'beach' },
        ],
      },
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'localizedString' }],
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'number', title: 'Day' },
            { name: 'title', type: 'localizedString', title: 'Title' },
            { name: 'description', type: 'localizedText', title: 'Description' },
            { name: 'image', type: 'image', title: 'Image' },
          ],
        },
      ],
    },
    {
      name: 'inclusions',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'localizedString' }],
    },
    {
      name: 'exclusions',
      title: 'What\'s Not Included',
      type: 'array',
      of: [{ type: 'localizedString' }],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'localizedString', title: 'Caption' },
          ],
        },
      ],
    },
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Used for sorting tours',
      hidden: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  orderings: [
    {
      title: 'Order Rank',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title: title || 'Untitled Tour',
        subtitle: price ? `MYR ${price}` : '',
        media,
      };
    },
  },
};

export default tourSchema;
