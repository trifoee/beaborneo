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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // Pricing & Duration
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
            title: 'Group Size',
            type: 'string',
            description: 'Example: "10 pax and above" or "3-4 pax"',
          },
          {
            name: 'adultPrice',
            title: 'Adult Price (RM)',
            type: 'number',
          },
          {
            name: 'childPrice',
            title: 'Child Price (RM)',
            type: 'number',
            description: 'For children aged 3–11',
          },
        ],
        preview: {
          select: {
            groupSize: 'groupSize',
            adultPrice: 'adultPrice',
            childPrice: 'childPrice',
          },
          prepare({ groupSize, adultPrice, childPrice }) {
            return {
              title: `${groupSize} - Adult: RM${adultPrice}, Child: RM${childPrice}`,
            };
          },
        },
      },
    ],
  }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Example: 3 Days / 2 Nights',
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
          type: 'string',
          description: 'Short title of the day, e.g., "Jakarta Arrival & Bandung"',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Detailed activities for the day',
        },
        {
          name: 'meals',
          title: 'Meals',
          type: 'string',
          description: 'B = Breakfast, L = Lunch, D = Dinner (Example: "B, L, D")',
        },
      ],
      preview: {
        select: {
          day: 'day',
          title: 'title',
          meals: 'meals',
        },
        prepare({ day, title, meals }) {
          return {
            title: `${day}: ${title}`,
            subtitle: meals,
          };
        },
      },
    },
  ],
}),

    // Overview
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // Highlights
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Included
    defineField({
      name: 'included',
      title: 'Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Not Included
    defineField({
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Gallery
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
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