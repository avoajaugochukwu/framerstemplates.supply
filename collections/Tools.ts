import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'toolType', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
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
        description: 'Maps to React component name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
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
      name: 'toolType',
      type: 'select',
      options: [
        { label: 'Gradient Generator', value: 'gradient-generator' },
        { label: 'Color Picker', value: 'color-picker' },
        { label: 'Contrast Checker', value: 'contrast-checker' },
        { label: 'Font Pairing', value: 'font-pairing' },
        { label: 'Spacing Calculator', value: 'spacing-calculator' },
        { label: 'CSS Generator', value: 'css-generator' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      required: true,
      admin: {
        description: 'Brief description for listings',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'customConfig',
      type: 'json',
      admin: {
        description: 'Tool-specific configuration (JSON)',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'active',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        position: 'sidebar',
        description: 'SEO meta description',
      },
    },
  ],
}
