import type { CollectionConfig } from 'payload'

export const Colors: CollectionConfig = {
  slug: 'colors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hex', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name (e.g., "Ocean Blue")',
      },
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
      name: 'hex',
      type: 'text',
      required: true,
      admin: {
        description: 'Hex color code (e.g., #3B82F6)',
      },
    },
    {
      name: 'rgb',
      type: 'group',
      fields: [
        {
          name: 'r',
          type: 'number',
          min: 0,
          max: 255,
          required: true,
        },
        {
          name: 'g',
          type: 'number',
          min: 0,
          max: 255,
          required: true,
        },
        {
          name: 'b',
          type: 'number',
          min: 0,
          max: 255,
          required: true,
        },
      ],
    },
    {
      name: 'hsl',
      type: 'group',
      fields: [
        {
          name: 'h',
          type: 'number',
          min: 0,
          max: 360,
        },
        {
          name: 's',
          type: 'number',
          min: 0,
          max: 100,
        },
        {
          name: 'l',
          type: 'number',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'tailwindClass',
      type: 'text',
      admin: {
        description: 'Tailwind color class (e.g., "blue-500")',
        position: 'sidebar',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Accent', value: 'accent' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
          ],
        },
        {
          name: 'warmth',
          type: 'select',
          options: [
            { label: 'Cool', value: 'cool' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Warm', value: 'warm' },
          ],
        },
        {
          name: 'brightness',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Medium', value: 'medium' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
