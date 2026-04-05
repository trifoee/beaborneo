/**
 * SEO Schema
 * 
 * Reusable SEO fields for pages and documents.
 */

const seoSchema = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Meta Title',
      type: 'localizedString',
      description: 'Title shown in search results and browser tabs (50-60 characters recommended)',
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'localizedText',
      description: 'Description shown in search results (150-160 characters recommended)',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image shown when sharing on social media (1200x630 pixels recommended)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent this page from appearing in search results',
      initialValue: false,
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the default canonical URL (leave empty for auto-generated)',
    },
  ],
};

export default seoSchema;
