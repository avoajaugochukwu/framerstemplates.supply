import { getPublishedTemplates, getCategories } from '@/lib/data'
import { Hero, TemplateGrid, BlogSection, FAQSection } from '@/components/home'
import { getAllPosts } from '@/lib/blog'
import type { Category, Media } from '@/lib/data'
import { FAQPageJsonLd } from '@/components/seo/json-ld'
import { faqData } from '@/lib/data/faq'

function getLatestPosts() {
  return getAllPosts().slice(0, 3)
}

export default function HomePage() {
  const templates = getPublishedTemplates()
  const categories = getCategories()
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
      <FAQPageJsonLd faqs={faqData} />
      <Hero />
      <TemplateGrid templates={formattedTemplates} categories={categories} />
      <BlogSection posts={formattedPosts} />
      <FAQSection />
    </>
  )
}
