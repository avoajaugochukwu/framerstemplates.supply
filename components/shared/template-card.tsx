import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui'
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
    typeof template.previewImage === 'object' ? template.previewImage : null
  const categories =
    template.categories?.filter((cat): cat is Category => typeof cat === 'object') || []
  const firstCategory = categories[0]

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {previewImage?.url && (
          <Image
            src={previewImage.url}
            alt={previewImage.alt || template.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
            {template.title}
          </h3>
          {template.price?.isFree ? (
            <Badge variant="success" className="shrink-0">
              Free
            </Badge>
          ) : template.price?.amount ? (
            <span className="shrink-0 font-semibold text-neutral-900 dark:text-white">
              ${template.price.amount}
            </span>
          ) : null}
        </div>

        {firstCategory && (
          <Badge variant="secondary" className="mt-2">
            {firstCategory.name}
          </Badge>
        )}

        {template.pages && template.pages.length > 0 && (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {template.pages.map((p) => p.pageName).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}
