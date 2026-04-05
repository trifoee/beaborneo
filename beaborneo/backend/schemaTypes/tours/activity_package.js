import { defineField, defineType } from 'sanity'

// 🔁 reusable dual language field
const dualString = (name, title) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'string' },
    { name: 'ms', title: 'Malay', type: 'string' },
  ],
})

export default defineType({
  name: 'activityPackage',
  title: 'Activity Package',
  type: 'document',
  fields: [

    // =========================
    // BASIC
    // =========================
    defineField({
      name: 'packageId',
      title: 'Package ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),

    defineField({
      name: 'duration',
      title: 'Duration (Optional)',
      type: 'string',
    }),

    // =========================
    // PRICING TYPE SELECTOR
    // =========================
    defineField({
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      options: {
        list: [
          { title: '1. Route (MY / INT)', value: 'p1' },
          { title: '2. Route (Per Pax)', value: 'p2' },
          { title: '3. Item Pricing', value: 'p3' },
          { title: '4. Market Flat', value: 'p4' },
          { title: '5. Group Pax', value: 'p5' },
          { title: '6. Ride Package', value: 'p6' },
          { title: '7. Package Rate', value: 'p7' },
          { title: '8. Package Adult/Child', value: 'p8' },
          { title: '9. Package MY Adult/Child/Infant', value: 'p9' },
          { title: '10. Tour Table', value: 'p10' },
          { title: '11. Activity Simple', value: 'p11' },
          { title: '12. Package MY vs INT', value: 'p12' },
          { title: '13. Package + Transport', value: 'p13' },
        ],
      },
      validation: Rule => Rule.required(),
    }),

    // =========================
    // P1: ROUTE MY / INT
    // =========================
    defineField({
      name: 'routeMarketPricing',
      title: 'Route Market Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p1',
      of: [
        {
          type: 'object',
          fields: [
            dualString('route', 'Route'),
            { name: 'malaysianAdult', title: 'Malaysian Adult', type: 'string' },
            { name: 'malaysianChild', title: 'Malaysian Child', type: 'string' },
            { name: 'internationalAdult', title: 'International Adult', type: 'string' },
            { name: 'internationalChild', title: 'International Child', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P2: ROUTE PER PAX
    // =========================
    defineField({
      name: 'routeSimplePricing',
      title: 'Route Price Per Pax',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p2',
      of: [
        {
          type: 'object',
          fields: [
            dualString('route', 'Route'),
            { name: 'price', title: 'Price Per Pax', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P3: ITEM
    // =========================
    defineField({
      name: 'itemPricing',
      title: 'Item Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p3',
      of: [
        {
          type: 'object',
          fields: [
            dualString('item', 'Item'),
            { name: 'price', title: 'Price', type: 'string' },
            dualString('remark', 'Remark'),
          ],
        },
      ],
    }),

    // =========================
    // P4: MARKET FLAT
    // =========================
    defineField({
      name: 'marketFlatPricing',
      title: 'Market Flat Pricing',
      type: 'object',
      hidden: ({ document }) => document?.pricingType !== 'p4',
      fields: [
        { name: 'malaysianAdult', title: 'MY Adult', type: 'string' },
        { name: 'malaysianChild', title: 'MY Child', type: 'string' },
        { name: 'internationalAdult', title: 'INT Adult', type: 'string' },
        { name: 'internationalChild', title: 'INT Child', type: 'string' },
      ],
    }),

    // =========================
    // P5: GROUP PAX
    // =========================
    defineField({
      name: 'groupPricing',
      title: 'Group Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p5',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'pax', title: 'Number of Pax', type: 'string' },
            { name: 'adult', title: 'Adult Rate', type: 'string' },
            { name: 'child', title: 'Child Rate', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P6: RIDE PACKAGE
    // =========================
    defineField({
      name: 'ridePackage',
      title: 'Ride Package',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p6',
      of: [
        {
          type: 'object',
          fields: [
            dualString('type', 'Type of Package'),
            dualString('route', 'Route'),
            { name: 'duration', title: 'Duration', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P7 / P8 / P9 / P12 / P13 → PACKAGE BASED
    // =========================
    defineField({
      name: 'packageBasedPricing',
      title: 'Package Based Pricing',
      type: 'array',
      hidden: ({ document }) =>
        !['p7','p8','p9','p12','p13'].includes(document?.pricingType),
      of: [
        {
          type: 'object',
          fields: [
            dualString('type', 'Package Type'),

            { name: 'adult', title: 'Adult', type: 'string' },
            { name: 'child', title: 'Child', type: 'string' },
            { name: 'infant', title: 'Infant', type: 'string' },

            { name: 'malaysianAdult', title: 'MY Adult', type: 'string' },
            { name: 'malaysianChild', title: 'MY Child', type: 'string' },
            { name: 'nonMalaysianAdult', title: 'Non-MY Adult', type: 'string' },
            { name: 'nonMalaysianChild', title: 'Non-MY Child', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P10: TOUR TABLE
    // =========================
    defineField({
      name: 'tourTable',
      title: 'Tour Table',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p10',
      of: [
        {
          type: 'object',
          fields: [
            dualString('type', 'Tour Type'),
            dualString('highlights', 'Highlights'),
            { name: 'time', title: 'Time', type: 'string' },
            { name: 'duration', title: 'Duration', type: 'string' },
            { name: 'minPax', title: 'Min Pax', type: 'string' },
            { name: 'price', title: 'Price / Pax', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // P11: ACTIVITY SIMPLE
    // =========================
    defineField({
      name: 'activitySimple',
      title: 'Activity Pricing',
      type: 'array',
      hidden: ({ document }) => document?.pricingType !== 'p11',
      of: [
        {
          type: 'object',
          fields: [
            dualString('activity', 'Activity'),
            { name: 'price', title: 'Price / Pax', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // ADD ON TRANSPORT
    // =========================
    defineField({
      name: 'transportAddOn',
      title: 'Transport Add On',
      type: 'array',
      hidden: ({ document }) =>
        !['p13'].includes(document?.pricingType),
      of: [
        {
          type: 'object',
          fields: [
            dualString('title', 'Pickup Title'),
            { name: 'pax', title: 'Pax', type: 'string' },
            { name: 'price', title: 'Price', type: 'string' },
          ],
        },
      ],
    }),

    // =========================
    // NOTES
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

    // INCLUDED / EXCLUDED
    defineField({
      name: 'included',
      title: 'Included',
      type: 'array',
      of: [dualString('item', 'Item')],
    }),

    defineField({
      name: 'excluded',
      title: 'Excluded',
      type: 'array',
      of: [dualString('item', 'Item')],
    }),

    // GALLERY
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),

  ],
})