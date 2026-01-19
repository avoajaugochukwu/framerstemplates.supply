import { BlogCard } from '@/components/shared'
import type { Media, Category } from '@/lib/types'

interface Post {
  id: string
  title: string
  slug: string
  featuredImage?: Media | string | null
  categories?: (Category | string)[] | null
}

interface BlogSectionProps {
  posts: Post[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) return null

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Recent blog posts
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
