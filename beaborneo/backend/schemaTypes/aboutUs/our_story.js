import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ourStory',
  type: 'document',
  fields: [
    // English
    defineField({
      name: 'content_en',
      title: 'Content (English)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),

    // Malay
    defineField({
      name: 'content_ms',
      title: 'Content (Malay)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],

  preview: {
    select: {
      content: 'content_en',
    },
    prepare(selection) {
      const { content } = selection
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