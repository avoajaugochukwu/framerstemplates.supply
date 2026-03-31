import { getPayloadClient } from '@/lib/payload'
import { Hero, TemplateGrid, BlogSection, FAQSection } from '@/components/home'
import { getAllPosts } from '@/lib/blog'
import type { Category, Media } from '@/lib/types'

async function getTemplates() {
  try {
    const payload = await getPayloadClient()
    const templates = await payload.find({
      collection: 'templates',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      depth: 2,
    })
    return templates.docs
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    const payload = await getPayloadClient()
    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
    })
    return categories.docs as Category[]
  } catch {
    return []
  }
}

function getLatestPosts() {
  return getAllPosts().slice(0, 3)
}

export default async function HomePage() {
  const [templates, categories] = await Promise.all([
    getTemplates(),
    getCategories(),
  ])
  const posts = getLatestPosts()

  const formattedTemplates = templates.map((template) => ({
    id: String(template.id),
    title: template.title,
    slug: template.slug,
    previewImage: template.previewImage as Media | string,
    categories: template.categories as (Category | string)[] | null,
    price: template.price,
    pages: template.pages,
  }))

  const formattedPosts = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    slug: post.slug,
    featuredImage: post.featuredImage || null,
  }))

  return (
    <>
      <Hero />
      <TemplateGrid templates={formattedTemplates} categories={categories} />
      <BlogSection posts={formattedPosts} />
      <FAQSection />
    </>
  )
}
