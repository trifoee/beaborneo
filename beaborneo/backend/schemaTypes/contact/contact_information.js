import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'object',
      fields: [
        {
          name: 'mondayToFriday',
          title: 'Monday - Friday',
          type: 'string',
          description: 'Example: 9:00 AM - 6:00 PM',
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          description: 'Example: 9:00 AM - 1:00 PM',
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          description: 'Example: Closed',
        },
      ],
    }),

    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'International format preferred, e.g. +60182103921 (no spaces)',
      type: 'string',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'handle', title: 'Handle (optional)', type: 'string' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),

    defineField({
      name: 'map',
      title: 'Map',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          description: 'Short line shown under “Find Us” (e.g. Kepayan Perdana, Penampang)',
          type: 'string',
        },
        {
          name: 'addressLine',
          title: 'Address Line',
          description: 'One-line address for the “Find Us” header area.',
          type: 'string',
        },
        {
          name: 'googleMapsUrl',
          title: 'Google Maps URL',
          description: 'Opens when user clicks “Get Directions”.',
          type: 'url',
        },
        {
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          description:
            'The iframe src. Use the full https://www.google.com/maps/embed?... URL.',
          type: 'url',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'email',
      subtitle: 'phone',
    },
  },
})