import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  publishDate: string
  status: string
  featuredImage?: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        author: data.author ?? '',
        publishDate: data.publishDate ?? '',
        status: data.status ?? 'published',
        featuredImage: data.featuredImage,
        content: '',
      }
    })
    .filter((post) => post.status === 'published')
    .sort((a, b) => (a.publishDate > b.publishDate ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContents)

  if (data.status === 'draft') return null

  const processed = await remark().use(html).process(content)

  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    author: data.author ?? '',
    publishDate: data.publishDate ?? '',
    status: data.status ?? 'published',
    featuredImage: data.featuredImage,
    content: processed.toString(),
  }
}
