import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'
import type { Media, Category } from '@/lib/types'

interface TemplateCardProps {
  template: {
    id: string
    title: string
    slug: string
    previewImage: Media | string
    categories?: (Category | string)[] | null
    price?: {
      amount?: number | null
      currency?: string | null
      isFree?: boolean | null
    } | null
    pages?: { pageName: string }[] | null
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  const previewImage =
    typeof template.previewImage === 'object'
      ? template.previewImage
      : typeof template.previewImage === 'string'
        ? { url: template.previewImage, alt: template.title }
        : null
  const categories =
    template.categories?.filter((cat): cat is Category => typeof cat === 'object') || []
  const firstCategory = categories[0]

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-accent-subtle/30">
        {previewImage?.url && (
          <Image
            src={previewImage.url}
            alt={previewImage.alt || template.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-black/70 dark:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
            {template.title}
          </h3>
          {template.price?.isFree ? (
            <Badge variant="success" className="shrink-0">
              Free
            </Badge>
          ) : template.price?.amount ? (
            <span className="shrink-0 text-sm font-semibold text-foreground">
              ${template.price.amount}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {firstCategory && (
            <Badge variant="secondary">
              {firstCategory.name}
            </Badge>
          )}
          {template.pages && template.pages.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {template.pages.length} {template.pages.length === 1 ? 'page' : 'pages'}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
