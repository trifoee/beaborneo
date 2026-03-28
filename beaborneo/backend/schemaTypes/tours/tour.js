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
      name: 'packageCategory',
      title: 'Package Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tour Package', value: 'tour' },
          { title: 'Activity Package', value: 'activity' },
        ],
        layout: 'radio', // nice UI
      },
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

    defineField({
      name: 'pricingPax',
      title: 'Pricing Pax',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Group / Package
            {
              name: 'groupSize',
              title: 'Group / Package',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', description: 'Example: "10 pax and above"' },
                { name: 'ms', title: 'Malay', type: 'string', description: 'Contoh: "10 pax dewasa dan ke atas"' },
              ],
            },

            // Adult Price
            {
              name: 'adultPrice',
              title: 'Adult Price',
              type: 'string',
              description: 'Flexible format: RM1,699 or RM1,699/pax',
            },

            // Child Price
            {
              name: 'childPrice',
              title: 'Child Price',
              type: 'string',
              description: 'Flexible format: RM849 or RM849/pax',
            },


            // Notes (optional)
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

          // Preview: show group size + prices
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
                title: groupSizeEn || 'Package',
                subtitle,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'pricingByMarket',
      title: 'Pricing by Market',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'marketType',
              title: 'Market Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Malaysian', value: 'malaysian' },
                  { title: 'International', value: 'international' },
                ],
                layout: 'radio',
              },
            },

            {
              name: 'groupSize',
              title: 'Group / Package',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ms', title: 'Malay', type: 'string' },
              ],
            },

            {
              name: 'adultPrice',
              title: 'Adult Price',
              type: 'string',
            },

            {
              name: 'childPrice',
              title: 'Child Price',
              type: 'string',
            },

            {
              name: 'notes',
              title: 'Notes / Details',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text', rows: 2 },
                { name: 'ms', title: 'Malay', type: 'text', rows: 2 },
              ],
            },
          ],

          preview: {
            select: {
              market: 'marketType',
              groupSizeEn: 'groupSize.en',
              adultPrice: 'adultPrice',
              childPrice: 'childPrice',
            },
            prepare({ market, groupSizeEn, adultPrice, childPrice }) {
              let subtitle = adultPrice || ''
              if (childPrice) subtitle += ` | Child: ${childPrice}`

              return {
                title: `${market ? market.toUpperCase() : ''} - ${groupSizeEn || 'Package'}`,
                subtitle,
              }
            },
          },
        },
      ],
    }),
    
    defineField({
      name: 'accommodationPricing',
      title: 'Accommodation Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'accommodationType',
              title: 'Accommodation Type',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', description: 'Example: "Deluxe King / Cabin / Hostel / Deluxe Queen"' },
                { name: 'ms', title: 'Malay', type: 'string', description: 'Contoh: "Deluxe King / Kabin / Asrama / Deluxe Queen"' },
              ],
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Flexible format: RM price or N/A',
            },
            {
              name: 'notes',
              title: 'Notes / Details',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text', rows: 2, description: 'Extra info for this accommodation' },
                { name: 'ms', title: 'Malay', type: 'text', rows: 2, description: 'Maklumat tambahan untuk penginapan ini' },
              ],
            },
          ],
          preview: {
            select: {
              accommodationEn: 'accommodationType.en',
              price: 'price',
            },
            prepare({ accommodationEn, price }) {
              return {
                title: accommodationEn,
                subtitle: price || '',
              }
            },
          },
        },
      ],
          }),
          
    defineField({
        name: 'pricingpackage',
        title: 'Pricing Package',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              // Package name (dual language)
              {
                name: 'package',
                title: 'Package',
                type: 'object',
                fields: [
                  { name: 'en', title: 'English', type: 'string',  description: 'example: 2 DAY 1 NIGHT' },
                  { name: 'ms', title: 'Malay', type: 'string',  description: 'example: 2 Hari 1 Malam' },
                ],
              },

              // Adult price (single value)
              {
                name: 'adult',
                title: 'Adult Rate',
                type: 'string',
                description: 'Adult rate, e.g., RM1,699',
              },

              // Child price (single value)
              {
                name: 'child',
                title: 'Child Rate',
                type: 'string',
                description: 'Child rate (3–11 Y/O), e.g., RM849',
              },
            ],

            preview: {
              select: {
                pkg: 'package.en',
                adult: 'adult',
                child: 'child',
              },
              prepare({ pkg, adult, child }) {
                return {
                  title: pkg,
                  subtitle: `${adult || ''} | ${child || ''}`,
                }
              },
            },
          },
        ],
      }),

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