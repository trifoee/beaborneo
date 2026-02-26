/**
 * Localized Text Schema
 * 
 * A text field (multiline) with support for multiple languages.
 * Used for descriptions, paragraphs, and longer content.
 */

const localizedTextSchema = {
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 5,
    },
    {
      name: 'ms',
      title: 'Bahasa Melayu',
      type: 'text',
      rows: 5,
    },
    {
      name: 'id',
      title: 'Bahasa Indonesia',
      type: 'text',
      rows: 5,
    },
  ],
  preview: {
    select: {
      en: 'en',
      ms: 'ms',
      id: 'id',
    },
    prepare({ en, ms, id }) {
      const text = en || ms || id || 'No text';
      return {
        title: text.length > 50 ? `${text.substring(0, 50)}...` : text,
      };
    },
  },
};

export default localizedTextSchema;
