import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    featuredImage?: string | null
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
          {post.title}
        </h3>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-white">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
