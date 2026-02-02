/**
 * Localized String Schema
 * 
 * A simple string field with support for multiple languages.
 * Used for titles, labels, and short text.
 */

const localizedStringSchema = {
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'ms',
      title: 'Bahasa Melayu',
      type: 'string',
    },
    {
      name: 'id',
      title: 'Bahasa Indonesia',
      type: 'string',
    },
  ],
  preview: {
    select: {
      en: 'en',
      ms: 'ms',
      id: 'id',
    },
    prepare({ en, ms, id }) {
      return {
        title: en || ms || id || 'No text',
      };
    },
  },
};

export default localizedStringSchema;
