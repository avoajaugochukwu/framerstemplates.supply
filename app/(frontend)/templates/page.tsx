import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

interface Media {
  id: string
  url: string
  alt: string
  width: number
  height: number
  filename: string
}

export const metadata: Metadata = {
  title: `Templates | ${SITE_NAME}`,
  description: 'Browse our collection of premium Framer templates for modern websites.',
}

export const revalidate = 3600

async function getTemplates() {
  const payload = await getPayloadClient()
  const templates = await payload.find({
    collection: 'templates',
    where: {
      status: { equals: 'published' },
    },
    sort: '-createdAt',
    limit: 100,
  })
  return templates.docs
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Templates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Browse our collection of premium Framer templates designed for modern websites.
          </p>
        </div>

        {templates.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-900">
                  {typeof template.previewImage === 'object' && (template.previewImage as Media)?.url && (
                    <Image
                      src={(template.previewImage as Media).url}
                      alt={(template.previewImage as Media).alt || template.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                      {template.title}
                    </h2>
                    {template.price?.isFree ? (
                      <Badge variant="success">Free</Badge>
                    ) : (
                      <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                        ${template.price?.amount}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {template.description}
                  </p>
                  {template.pages && template.pages.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {template.pages.map((p: { pageName: string }, i: number) => (
                        <Badge key={i} variant="secondary">
                          {p.pageName}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No templates available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
