import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: 'Tips, tutorials, and insights on design, development, and building modern websites.',
}

export const revalidate = 3600

async function getBlogPosts() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'blog',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit: 100,
    depth: 1,
  })
  return posts.docs
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Tips, tutorials, and insights on design and building modern websites.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                  {typeof post.featuredImage === 'object' && post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedDate && (
                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
