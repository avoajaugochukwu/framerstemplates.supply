import { MetadataRoute } from 'next'
import { getPublishedTemplates, getActiveTools, getColors, getGradients } from '@/lib/data'
import { getAllPosts } from '@/lib/blog'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${siteUrl}/colors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gradients`,
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

  const posts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const templates = getPublishedTemplates()
  const templatePages: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${siteUrl}/templates/${template.slug}`,
    lastModified: template.updatedAt ? new Date(template.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const tools = getActiveTools().filter((t) => t.status === 'active')
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt ? new Date(tool.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const colors = getColors()
  const colorPages: MetadataRoute.Sitemap = colors.map((color) => ({
    url: `${siteUrl}/colors/${color.slug}`,
    lastModified: color.updatedAt ? new Date(color.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const gradients = getGradients()
  const gradientPages: MetadataRoute.Sitemap = gradients.map((gradient) => ({
    url: `${siteUrl}/gradients/${gradient.slug}`,
    lastModified: gradient.updatedAt ? new Date(gradient.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...templatePages, ...blogPages, ...toolPages, ...colorPages, ...gradientPages]
}
