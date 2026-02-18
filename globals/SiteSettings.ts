import type { GlobalConfig } from 'payload'
import { SITE_NAME } from '../lib/constants'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: SITE_NAME,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Premium Framer templates for modern websites',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'Default meta description for SEO',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Default Open Graph image',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            description: 'Google Analytics 4 Measurement ID (G-XXXXXXX)',
          },
        },
        {
          name: 'plausibleDomain',
          type: 'text',
          admin: {
            description: 'Plausible Analytics domain',
          },
        },
      ],
    },
  ],
}
