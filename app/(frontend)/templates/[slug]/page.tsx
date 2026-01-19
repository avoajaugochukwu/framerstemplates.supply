import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Check, Clock, Server, FileText, Copy } from 'lucide-react'

interface Media {
  id: string
  url: string
  alt: string
  width: number
  height: number
  filename: string
}

interface PreviewImageItem {
  image: Media
  caption?: string
}
import { getPayloadClient } from '@/lib/payload'
import { Button, Badge } from '@/components/ui'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

async function getTemplate(slug: string) {
  const payload = await getPayloadClient()
  const templates = await payload.find({
    collection: 'templates',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return templates.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplate(slug)

  if (!template) {
    return {
      title: 'Template Not Found',
    }
  }

  return {
    title: `${template.title} | Framer Templates Supply`,
    description: template.description,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const templates = await payload.find({
      collection: 'templates',
      where: {
        status: { equals: 'published' },
      },
      limit: 1000,
      select: { slug: true },
    })

    return templates.docs.map((template) => ({
      slug: template.slug,
    }))
  } catch (error) {
    // Database unavailable at build time - pages will be generated on-demand
    console.warn('generateStaticParams: Database unavailable, falling back to on-demand generation')
    return []
  }
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = await getTemplate(slug)

  if (!template) {
    notFound()
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/templates"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Preview Area */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
              {typeof template.previewImage === 'object' && template.previewImage?.url && (
                <Image
                  src={template.previewImage.url}
                  alt={template.previewImage.alt || template.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {template.previewImages && template.previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {template.previewImages.map((item: PreviewImageItem, i: number) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    {typeof item.image === 'object' && item.image?.url && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.caption || `Preview ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                {template.title}
              </h1>
              {template.price?.isFree ? (
                <Badge variant="success" className="text-base">
                  Free
                </Badge>
              ) : (
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${template.price?.amount} {template.price?.currency}
                </span>
              )}
            </div>

            {template.tagline && (
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                {template.tagline}
              </p>
            )}

            {!template.tagline && (
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                {template.description}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {template.downloadLink && (
                <a
                  href={template.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full gap-2 sm:w-auto">
                    {template.price?.isFree ? 'Download Free' : 'Get Template'}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {template.livePreviewLink && (
                <a
                  href={template.livePreviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                    Live Preview
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {template.remixLink && (
                <a
                  href={template.remixLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                    Remix in Framer
                    <Copy className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>

            {template.customizationLink && (
              <div className="mt-4">
                <a
                  href={template.customizationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Want more customization?
                </a>
              </div>
            )}

            {/* Sidebar Info */}
            <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              {template.pages && template.pages.length > 0 && (
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    <FileText className="h-4 w-4" />
                    Pages Included
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {template.pages.map((p: { pageName: string }, i: number) => (
                      <Badge key={i} variant="secondary">
                        {p.pageName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(template.hostingInfo?.hostingCost || template.hostingInfo?.deployTime) && (
                <div className="space-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                  {template.hostingInfo?.hostingCost && (
                    <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                      <Server className="h-4 w-4 flex-shrink-0" />
                      {template.hostingInfo.hostingCost}
                    </div>
                  )}
                  {template.hostingInfo?.deployTime && (
                    <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      {template.hostingInfo.deployTime}
                    </div>
                  )}
                </div>
              )}
            </div>

            {template.features && template.features.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Features
                </h2>
                <ul className="mt-4 space-y-3">
                  {template.features.map((f: { feature: string }, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                    >
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      {f.feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selling Points - Why Choose Section */}
            {template.sellingPoints && template.sellingPoints.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Why Choose {template.title}?
                </h2>
                <div className="mt-6 space-y-6">
                  {template.sellingPoints.map((point: { title: string; description: string }, i: number) => (
                    <div key={i}>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
