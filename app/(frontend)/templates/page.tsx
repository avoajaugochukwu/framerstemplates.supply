import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Layers } from 'lucide-react'
import { getPublishedTemplates } from '@/lib/data'
import type { Media } from '@/lib/data'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Free Framer Templates | ${SITE_NAME}`,
  description: 'Browse free, polished Framer templates for SaaS, agencies, portfolios, and more. Remix in one click and launch your site today.',
  alternates: {
    canonical: '/templates',
  },
}

export default function TemplatesPage() {
  const templates = getPublishedTemplates()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Templates
          </h1>
          <p className="mt-4 text-lg text-muted">
            Every template is free, responsive, and ready to remix into your Framer
            dashboard. Pick one and make it yours.
          </p>
        </div>

        {/* Template Count */}
        {templates.length > 0 && (
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
            <Layers className="h-3.5 w-3.5" />
            {templates.length} {templates.length === 1 ? 'template' : 'templates'} available
          </div>
        )}

        {templates.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const imageUrl = typeof template.previewImage === 'string'
                ? template.previewImage
                : (template.previewImage as Media)?.url
              const imageAlt = typeof template.previewImage === 'object'
                ? ((template.previewImage as Media)?.alt || template.title)
                : template.title

              return (
                <Link
                  key={template.id}
                  href={`/templates/${template.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-accent-subtle/30">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Hover icon */}
                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-black/70 dark:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    {/* Price badge overlay */}
                    {template.price?.isFree && (
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="success" className="shadow-sm backdrop-blur-sm">
                          Free
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                      {template.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {template.description}
                    </p>

                    {/* Footer meta */}
                    {template.pages && template.pages.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border-subtle pt-4">
                        {template.pages.slice(0, 4).map((p: { pageName: string }, i: number) => (
                          <span
                            key={i}
                            className="rounded-md bg-accent-subtle/40 px-2 py-0.5 text-xs text-muted"
                          >
                            {p.pageName}
                          </span>
                        ))}
                        {template.pages.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{template.pages.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-subtle">
              <Layers className="h-5 w-5 text-accent" />
            </div>
            <p className="text-muted">
              No templates available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
