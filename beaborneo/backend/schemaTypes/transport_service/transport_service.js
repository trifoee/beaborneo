export default {
  name: 'transportService',
  title: 'Transport Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Self Drive', value: 'self_drive' },
          { title: 'Private Transfer', value: 'private_transfer' },
          { title: 'Private Tour', value: 'private_tour' },
        ],
      },
    },

    // =========================
    // SELF DRIVE
    // =========================
    {
      name: 'category',
      title: 'Vehicle Category',
      type: 'string',
      options: {
        list: [
          { title: 'Economy & Compact', value: 'economy_compact' },
          { title: 'Sedan', value: 'sedan' },
          { title: 'MPV & Family', value: 'mpv_family' },
          { title: 'Pickup & 4WD', value: 'pickup_4wd' },
          { title: 'Van & Group', value: 'van_group' },
          { title: 'Premium', value: 'premium' },
        ],
      },
      hidden: ({ document }) => document?.type !== 'self_drive',
    },
    {
      name: 'vehicles',
      title: 'Vehicles in Category',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'vehicle',
          fields: [
            {
              name: 'model',
              title: 'Car Model',
              type: 'string',
            },
            {
              name: 'dailyPrice',
              title: 'Daily Rental Price',
              type: 'string',
              description: 'Standard daily rate (e.g. RM150)',
            },
            {
              name: 'multiDayPrice',
              title: 'Discounted Rate (3+ Days)',
              type: 'string',
              description: 'Discounted daily rate when booked for 3 days or more',
            },
          ],
          preview: {
            select: {
              title: 'model',
              subtitle: 'dailyPrice',
            },
          },
        },
      ],
      hidden: ({ document }) => document?.type !== 'self_drive',
    },

    // =========================
    // PRIVATE TRANSFER
    // =========================
    {
      name: 'route',
      title: 'Route',
      type: 'string',
      hidden: ({ document }) =>
        document?.type !== 'private_transfer' &&
        document?.type !== 'private_tour',
    },
    {
      name: 'dayTimePrice',
      title: 'Day Rate',
      type: 'string',
      description: 'Day-time price (7:00 AM – 5:00 PM)',
      hidden: ({ document }) => document?.type !== 'private_transfer',
    },
    {
      name: 'nightTimePrice',
      title: 'Night Rate',
      type: 'string',
      description: 'Night-time price (5:30 PM – 12:01 AM)',
      hidden: ({ document }) => document?.type !== 'private_transfer',
    },

    // =========================
    // PRIVATE TOUR
    // =========================
    {
      name: 'packages',
      title: 'Tour Packages',
      type: 'object',
      hidden: ({ document }) => document?.type !== 'private_tour',
      fields: [
        {
          name: 'twoDayOneNight',
          title: '2D1N Price',
          type: 'string',
        },
        {
          name: 'threeDayTwoNight',
          title: '3D2N Price',
          type: 'string',
        },
        {
          name: 'fourDayThreeNight',
          title: '4D3N Price',
          type: 'string',
        },
        {
          name: 'fiveDayFourNight',
          title: '5D4N Price',
          type: 'string',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      route: 'route',
    },
    prepare({ title, subtitle, route }) {
      const labels = {
        self_drive: 'Self Drive',
        private_transfer: 'Private Transfer',
        private_tour: 'Private Tour',
      };
      return {
        title: title || route || 'Untitled',
        subtitle: labels[subtitle] || subtitle,
      };
    },
  },
}
