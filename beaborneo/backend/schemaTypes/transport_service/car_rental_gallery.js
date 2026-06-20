export default {
  name: 'carRentalGallery',
  title: 'Car Rental Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title / Caption',
      type: 'string',
      description: 'Short label for this image (e.g. "Toyota Fortuner 4WD")',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to use upload order.',
    },
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title: title || 'Untitled',
        subtitle: order != null ? `Order: ${order}` : '',
        media,
      };
    },
  },
}
