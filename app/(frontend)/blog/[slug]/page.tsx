import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { MarkdownContent } from '@/components/shared/markdown-content'
import { SITE_NAME } from '@/lib/constants'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'blog',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })
  return posts.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.metaDescription || post.excerpt,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'blog',
      where: {
        status: { equals: 'published' },
      },
      limit: 1000,
      select: { slug: true },
    })

    return posts.docs.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    // Database unavailable at build time - pages will be generated on-demand
    console.warn('generateStaticParams: Database unavailable, falling back to on-demand generation')
    return []
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const author = typeof post.author === 'object' ? post.author : null

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              {post.publishedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              )}
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {author.name}
                </div>
              )}
            </div>
          </header>

          {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div className="text-neutral-700 dark:text-neutral-300">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}
