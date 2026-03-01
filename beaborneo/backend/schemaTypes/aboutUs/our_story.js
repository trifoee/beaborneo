import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ourStory',
  title: 'Our Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }], // allows rich text formatting
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare(selection) {
      const { title, content } = selection
      const firstBlock = content && content[0] && content[0].children ? content[0].children.map(c => c.text).join('') : ''
      return {
        title,
        subtitle: firstBlock.slice(0, 50) + '...',
      }
    },
  },
})