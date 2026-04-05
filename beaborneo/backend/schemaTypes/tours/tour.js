import { defineField, defineType } from 'sanity'

const dualString = (name, title, description = '') => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'string', description },
    { name: 'ms', title: 'Malay', type: 'string', description },
  ],
})

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
      name: 'tourType',
      title: 'Tour Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Island Hopping', value: 'island-hopping' },
          { title: 'Island Stay', value: 'island-stay' },
          { title: 'Scuba Diving', value: 'scuba-diving' },
          { title: 'Snorkeling', value: 'snorkeling' },
          { title: 'Nature & Wildlife', value: 'nature-wildlife' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Leisure', value: 'leisure' },
        ],
      },
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

    // =========================
    // 🎯 PRICING TYPE
    // =========================
    defineField({
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Package Pricing (Adult / Child)', value: 'package' },
          { title: 'Group Pricing (Pax Based)', value: 'group' },
          { title: 'Market Pricing (MY / International)', value: 'market' },
          { title: 'Accommodation Pricing', value: 'accommodation' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),

    // =========================
    // ✅ PACKAGE PRICING
    // =========================
    defineField({
      name: 'packagePricing',
      title: 'Package Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'package',
      of: [
        {
          type: 'object',
          fields: [
            dualString('package', 'Package', 'Example: 2D1N / 3D2N'),

            { name: 'adult', title: 'Adult Rate', type: 'string' },
            { name: 'child', title: 'Child Rate', type: 'string' },
          ],
          preview: {
            select: {
              title: 'package.en',
              adult: 'adult',
              child: 'child',
            },
            prepare({ title, adult, child }) {
              return {
                title: title || 'Package',
                subtitle: `${adult || ''} | ${child || ''}`,
              }
            },
          },
        },
      ],
    }),

    // =========================
    // ✅ GROUP PRICING
    // =========================
    defineField({
      name: 'groupPricing',
      title: 'Group Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'group',
      of: [
        {
          type: 'object',
          fields: [
            dualString('groupPax', 'Group Pax', 'Example: 10 pax and above'),

            { name: 'adult', title: 'Adult Rate', type: 'string' },
            { name: 'child', title: 'Child Rate', type: 'string' },
          ],
          preview: {
            select: {
              title: 'groupPax.en',
              adult: 'adult',
              child: 'child',
            },
            prepare({ title, adult, child }) {
              return {
                title: title || 'Group',
                subtitle: `${adult || ''} | ${child || ''}`,
              }
            },
          },
        },
      ],
    }),

    // =========================
    // ✅ MARKET PRICING
    // =========================
    defineField({
      name: 'marketPricing',
      title: 'Market Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'market',
      of: [
        {
          type: 'object',
          fields: [
            dualString('groupPax', 'Group Pax'),

            { name: 'malaysian', title: 'Malaysian Rate', type: 'string' },
            { name: 'international', title: 'International Rate', type: 'string' },
          ],
          preview: {
            select: {
              title: 'groupPax.en',
              malaysian: 'malaysian',
              international: 'international',
            },
            prepare({ title, malaysian, international }) {
              return {
                title: title || 'Market',
                subtitle: `${malaysian || ''} | ${international || ''}`,
              }
            },
          },
        },
      ],
    }),

    // =========================
    // ✅ ACCOMMODATION PRICING
    // =========================
    defineField({
      name: 'accommodationPricingSimple',
      title: 'Accommodation Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'accommodation',
      of: [
        {
          type: 'object',
          fields: [
            dualString(
              'accommodation',
              'Accommodation',
              'Example: Deluxe Room / Chalet'
            ),

            {
              name: 'price',
              title: 'Price Per Person',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'accommodation.en',
              price: 'price',
            },
            prepare({ title, price }) {
              return {
                title: title || 'Accommodation',
                subtitle: price || '',
              }
            },
          },
        },
      ],
    }),

    // =========================
    // 📝 NOTES (SHARED)
    // =========================

   defineField({
      name: 'notes',
      title: 'Pricing Notes / Details (Optional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'English',
              type: 'text',
              rows: 2,
              description: 'Extra info about pricing or special conditions, e.g., child rate',
            },
            {
              name: 'ms',
              title: 'Malay',
              type: 'text',
              rows: 2,
              description: 'Maklumat tambahan tentang harga atau syarat khas, contohnya kadar kanak-kanak',
            },
          ],
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
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', description: 'example: DAY 1' },
                { name: 'ms', title: 'Malay', type: 'string', description: 'contoh : HARI 1' },
              ],
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
              dayEn: 'day.en',
              titleEn: 'title.en',
            },
            prepare({ dayEn, titleEn }) {
              return {
                title: `${dayEn}: ${titleEn}`,
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