import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [

    // Basic Info
    defineField({
      name: 'title',
      title: 'Tour Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'location tour',
      type: 'string',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
        
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Short Description',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          description: 'Short description in English',
        },
        {
          name: 'ms',
          title: 'Malay',
          type: 'string',
          description: 'Short description in Malay',
        },
      ],
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // Flexible Dual-Language Pricing
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'groupSize',
              title: 'Group / Package',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', description: 'Example: "10 pax and above"' },
                { name: 'ms', title: 'Malay', type: 'string', description: 'Contoh: "10 pax dewasa dan ke atas"' },
              ],
            },
            {
              name: 'adultPrice',
              title: 'Adult Price',
              type: 'string',
              description: 'Flexible format: RM1,699 or RM1,699/pax',
            },
            {
              name: 'childPrice',
              title: 'Child Price (Optional)',
              type: 'string',
              description: 'Flexible format: RM849 or N/A, age 3–11',
            },
            {
              name: 'notes',
              title: 'Notes / Details',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text', rows: 2, description: 'Extra info like flight excluded, age ranges' },
                { name: 'ms', title: 'Malay', type: 'text', rows: 2, description: 'Maklumat tambahan seperti penerbangan tidak termasuk, umur' },
              ],
            },
          ],
          preview: {
            select: {
              groupSizeEn: 'groupSize.en',
              adultPrice: 'adultPrice',
              childPrice: 'childPrice',
            },
            prepare({ groupSizeEn, adultPrice, childPrice }) {
              let subtitle = adultPrice || ''
              if (childPrice) subtitle += ` | Child: ${childPrice}`
              return {
                title: groupSizeEn,
                subtitle,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Example: 3Days/2Night',
    }),

   defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              description: 'Example: "Day 1"',
            },
            {
              name: 'title',
              title: 'Title / Location',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', description: 'Short title of the day in English' },
                { name: 'ms', title: 'Malay', type: 'string', description: 'Short title of the day in Malay' },
              ],
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text', rows: 3, description: 'Detailed activities in English' },
                { name: 'ms', title: 'Malay', type: 'text', rows: 3, description: 'Detailed activities in Malay' },
              ],
            },
          ],
          preview: {
            select: {
              day: 'day',
              titleEn: 'title.en',
              meals: 'meals',
            },
            prepare({ day, titleEn, meals }) {
              return {
                title: `${day}: ${titleEn}`,
                subtitle: meals,
              }
            },
          },
        },
      ],
    }),

    // Overview
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'ms',
          title: 'Malay',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    }),

    // Highlights
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ms', title: 'Malay', type: 'string' },
          ],
        },
      ],
    }),

    // Included
    defineField({
      name: 'included',
      title: 'Included',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ms', title: 'Malay', type: 'string' },
          ],
        },
      ],
    }),

    // Not Included
    defineField({
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ms', title: 'Malay', type: 'string' },
          ],
        },
      ],
    }),

    // Gallery
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'brochure',
      title: 'Brochure / PDF',
      type: 'file',
      description: 'Optional PDF brochure for the tour',
      options: {
        accept: '.pdf', // restrict to PDF files
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured Tour',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'location',
    },
  },
})