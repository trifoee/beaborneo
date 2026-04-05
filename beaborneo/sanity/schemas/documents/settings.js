/**
 * Site Settings Schema
 * 
 * Global settings for the site (logo, contact info, social links, etc.)
 * TODO: Complete schema when Sanity is integrated
 */

const settingsSchema = {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'localizedText', title: 'Address' },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'platform', 
              type: 'string', 
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'localizedString', title: 'Title' },
            { name: 'link', type: 'string', title: 'Link' },
            { name: 'isExternal', type: 'boolean', title: 'External Link?', initialValue: false },
          ],
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        { name: 'description', type: 'localizedText', title: 'Description' },
        { name: 'copyright', type: 'localizedString', title: 'Copyright Text' },
      ],
    },
    {
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'seo',
      description: 'Default SEO values used when page-specific SEO is not set',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
};

export default settingsSchema;
