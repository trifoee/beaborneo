export default {
  name: 'transportService',
  title: 'Trasport Service',
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
    // 🚗 SELF DRIVE
    // =========================
    {
      name: 'carModel',
      title: 'Car Model',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'self_drive',
    },
    {
      name: 'dailyPrice',
      title: 'Daily Rental Price',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'self_drive',
    },
    {
      name: 'discount3Days',
      title: 'Discount (3 Days & Above)',
      type: 'string',
      description: 'Enter percentage (%)',
      hidden: ({ document }) => document?.type !== 'self_drive',
    },

    // =========================
    // 🚐 PRIVATE TRANSFER
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
      title: 'Price (7:00 AM - 5:00 PM)',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'private_transfer',
    },
    {
      name: 'nightTimePrice',
      title: 'Price (5:30 PM - 12:00 AM)',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'private_transfer',
    },

    // =========================
    // 🏝️ PRIVATE TOUR
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
}