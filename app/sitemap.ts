import { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getAllPosts } from '@/lib/blog'

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

  // Blog pages from local files
  const posts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  try {
    const payload = await getPayloadClient()

    const [templates, tools] = await Promise.all([
      payload.find({
        collection: 'templates',
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

    const toolPages: MetadataRoute.Sitemap = tools.docs.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt ? new Date(tool.updatedAt as string) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...templatePages, ...blogPages, ...toolPages]
  } catch {
    console.warn('sitemap: Database unavailable, returning static + blog pages only')
    return [...staticPages, ...blogPages]
  }
}
