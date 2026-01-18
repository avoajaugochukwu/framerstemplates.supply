import type { CollectionConfig } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short marketing subtitle shown on detail page',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'previewImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'downloadLink',
      type: 'text',
      admin: {
        description: 'Gumroad or external purchase URL',
      },
    },
    {
      name: 'livePreviewLink',
      type: 'text',
      admin: {
        description: 'Live demo URL',
      },
    },
    {
      name: 'remixLink',
      type: 'text',
      admin: {
        description: 'Direct Framer remix/duplicate link for the template',
      },
    },
    {
      name: 'customizationLink',
      type: 'text',
      admin: {
        description: 'URL for "Want more customization?" button (e.g., contact/services page)',
      },
    },
    {
      name: 'hostingInfo',
      type: 'group',
      admin: {
        description: 'Hosting information displayed in the sidebar',
      },
      fields: [
        {
          name: 'hostingCost',
          type: 'text',
          admin: {
            description: 'e.g., "Framer hosting cost $60 per year"',
          },
        },
        {
          name: 'deployTime',
          type: 'text',
          admin: {
            description: 'e.g., "Deploy in 5 minutes"',
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          min: 0,
        },
        {
          name: 'currency',
          type: 'select',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
          ],
          defaultValue: 'USD',
        },
        {
          name: 'isFree',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pages',
      type: 'array',
      admin: {
        description: 'List of pages included in the template (e.g., Home, About, Contact)',
      },
      fields: [
        {
          name: 'pageName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sellingPoints',
      type: 'array',
      admin: {
        description: 'Detailed selling points for the "Why Choose" section',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
  ],
}
