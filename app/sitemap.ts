import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/background`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    const payload = await getPayloadClient()

    const [templates, posts, tools] = await Promise.all([
      payload.find({
        collection: 'templates',
        where: { status: { equals: 'published' } },
        limit: 1000,
      }),
      payload.find({
        collection: 'blog',
        where: { status: { equals: 'published' } },
        limit: 1000,
      }),
      payload.find({
        collection: 'tools',
        where: { status: { equals: 'active' } },
        limit: 100,
      }),
    ])

    const templatePages: MetadataRoute.Sitemap = templates.docs.map((template) => ({
      url: `${siteUrl}/templates/${template.slug}`,
      lastModified: template.updatedAt ? new Date(template.updatedAt as string) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const blogPages: MetadataRoute.Sitemap = posts.docs.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt as string) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const toolPages: MetadataRoute.Sitemap = tools.docs.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt ? new Date(tool.updatedAt as string) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...templatePages, ...blogPages, ...toolPages]
  } catch {
    // Database unavailable at build time - return only static pages
    console.warn('sitemap: Database unavailable, returning static pages only')
    return staticPages
  }
}
