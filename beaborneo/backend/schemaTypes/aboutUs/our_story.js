import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ourStory',
  title: 'Our Story',
  type: 'document',
  fields: [
    // English
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content_en',
      title: 'Content (English)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),

    // Malay
    defineField({
      name: 'title_ms',
      title: 'Title (Malay)',
      type: 'string',
    }),
    defineField({
      name: 'content_ms',
      title: 'Content (Malay)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],

  preview: {
    select: {
      title: 'title_en',
      content: 'content_en',
    },
    prepare(selection) {
      const { title, content } = selection
      const firstBlock =
        content && content[0] && content[0].children
          ? content[0].children.map(c => c.text).join('')
          : ''

      return {
        title,
        subtitle: firstBlock.slice(0, 50) + '...',
      }
    },
  },
})