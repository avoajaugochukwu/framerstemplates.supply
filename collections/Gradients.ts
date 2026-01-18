import type { CollectionConfig } from 'payload'

export const Gradients: CollectionConfig = {
  slug: 'gradients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'gradientType', 'updatedAt'],
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
      name: 'cssCode',
      type: 'code',
      required: true,
      admin: {
        language: 'css',
        description: 'Full CSS gradient syntax (e.g., linear-gradient(...))',
      },
    },
    {
      name: 'gradientType',
      type: 'select',
      options: [
        { label: 'Linear', value: 'linear' },
        { label: 'Radial', value: 'radial' },
        { label: 'Conic', value: 'conic' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'angle',
      type: 'number',
      min: 0,
      max: 360,
      admin: {
        description: 'Angle in degrees (for linear gradients)',
        condition: (data) => data?.gradientType === 'linear',
      },
    },
    {
      name: 'colorPalette',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'hex',
          type: 'text',
          required: true,
          admin: {
            description: 'Color in hex format (#RRGGBB)',
          },
        },
        {
          name: 'position',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Position in gradient (0-100%)',
          },
        },
      ],
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional preview image for the gradient',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
