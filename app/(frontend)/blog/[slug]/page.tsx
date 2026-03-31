import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { SITE_NAME } from '@/lib/constants'
import { BlogPostingJsonLd } from '@/components/seo/json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      ...(post.featuredImage
        ? { images: [{ url: post.featuredImage, width: 1200, height: 675, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage ? { images: [post.featuredImage] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt || ''}
        url={`${siteUrl}/blog/${slug}`}
        image={post.featuredImage || undefined}
        publishDate={post.publishDate}
        author={post.author}
      />
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
              {post.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              )}
            </div>
          </header>

          {post.featuredImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={post.featuredImage}
                alt={`Featured image for ${post.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related posts */}
        {(() => {
          const otherPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3)
          if (otherPosts.length === 0) return null
          return (
            <section className="mt-16 border-t border-neutral-200 pt-12 dark:border-neutral-800">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                More articles
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                    {p.featuredImage && (
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                          src={p.featuredImage}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="mt-3 text-sm font-semibold leading-snug text-neutral-900 group-hover:underline line-clamp-2 dark:text-white">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )
        })()}
      </div>
    </div>
  )
}
