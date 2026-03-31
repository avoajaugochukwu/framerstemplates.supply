import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlogCard } from '@/components/shared'

interface Post {
  id: string
  title: string
  slug: string
  featuredImage?: string | null
}

interface BlogSectionProps {
  posts: Post[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) return null

  return (
    <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Learn as You Build
            </h2>
            <p className="mt-1 text-sm text-muted">
              Practical guides on Framer, SEO, and launching sites that actually convert
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden items-center gap-1 text-sm font-medium text-accent sm:inline-flex"
          >
            All posts
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
