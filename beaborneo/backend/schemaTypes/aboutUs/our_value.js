import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'coreValues',
  title: 'Core Values',
  type: 'document',
  fields: [
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image / Icon',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              subtitle: 'description',
            },
            prepare({ title, media, subtitle }) {
              return { title, media, subtitle: subtitle && subtitle.slice(0, 50) + '...' }
            },
          },
        },
      ],
    }),
  ],
})