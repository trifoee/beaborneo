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
  ],

  preview: {
    select: {
      title: 'email',
      subtitle: 'phone',
    },
  },
})