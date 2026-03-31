import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: 'Tips, tutorials, and insights on design, development, and building modern websites.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

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
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={`Featured image for ${post.title}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
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
                  {post.publishDate && (
                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
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
