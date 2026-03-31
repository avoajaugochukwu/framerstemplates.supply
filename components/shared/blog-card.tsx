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
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-accent-subtle/30">
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
