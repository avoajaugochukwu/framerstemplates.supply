import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Check, Clock, Server, FileText, Copy, Sparkles } from 'lucide-react'

import { getTemplateBySlug, getPublishedTemplates } from '@/lib/data'
import type { Media } from '@/lib/data'
import { Button, Badge } from '@/components/ui'
import { ImageGallery } from '@/components/templates/image-gallery'
import { SITE_NAME } from '@/lib/constants'
import { ProductJsonLd } from '@/components/seo/json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    return { title: 'Template Not Found' }
  }

  return {
    title: `${template.title} | ${SITE_NAME}`,
    description: template.description,
    alternates: {
      canonical: `${siteUrl}/templates/${slug}`,
    },
  }
}

export function generateStaticParams() {
  return getPublishedTemplates().map((template) => ({
    slug: template.slug,
  }))
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const pageCount = template.pages?.length || 0
  const hasLongDescription = typeof template.longDescription === 'string' && template.longDescription.length > 0
  const hasFeatures = template.features && template.features.length > 0
  const hasSellingPoints = template.sellingPoints && template.sellingPoints.length > 0

  const previewImageUrl = typeof template.previewImage === 'string'
    ? template.previewImage
    : (template.previewImage as Media)?.url

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <ProductJsonLd
        name={template.title}
        description={template.description}
        url={`${siteUrl}/templates/${slug}`}
        image={previewImageUrl || undefined}
        isFree={template.price?.isFree ?? undefined}
        price={template.price?.amount ?? undefined}
        currency={template.price?.currency ?? undefined}
      />
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <Link
          href="/templates"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Templates
        </Link>

        {/* Two-column layout: Image left, everything else right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: Gallery only */}
          <div>
            <ImageGallery
              mainImage={
                typeof template.previewImage === 'string' && template.previewImage
                  ? { url: template.previewImage, alt: template.title }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  : typeof template.previewImage === 'object' && (template.previewImage as any)?.url
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ? { url: (template.previewImage as any).url, alt: (template.previewImage as any)?.alt || template.title }
                    : null
              }
              thumbnails={
                (template.previewImages || [])
                  .map((item, i) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const url = typeof item.image === 'string' ? item.image : (item.image as any)?.url
                    const alt = typeof item.image === 'object'
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ? ((item.image as any)?.alt || item.caption || `Preview ${i + 1}`)
                      : (item.caption || `Preview ${i + 1}`)
                    return url ? { url, alt } : null
                  })
                  .filter((img): img is { url: string; alt: string } => img !== null)
              }
            />
          </div>

          {/* Right: All details */}
          <div>
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {template.title}
              </h1>
              {template.price?.isFree ? (
                <Badge variant="success" className="mt-1 shrink-0 text-sm">
                  Free
                </Badge>
              ) : template.price?.amount ? (
                <span className="mt-1 shrink-0 text-xl font-bold text-foreground">
                  ${template.price.amount} {template.price.currency}
                </span>
              ) : null}
            </div>

            {/* Tagline / Description */}
            <p className="mt-3 text-base leading-relaxed text-muted">
              {template.tagline || template.description}
            </p>

            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap gap-3">
              {pageCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-lg bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-muted">
                  <FileText className="h-3.5 w-3.5" />
                  {pageCount} {pageCount === 1 ? 'page' : 'pages'}
                </div>
              )}
              {template.hostingInfo?.deployTime && (
                <div className="flex items-center gap-1.5 rounded-lg bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {template.hostingInfo.deployTime} to deploy
                </div>
              )}
              {template.hostingInfo?.hostingCost && (
                <div className="flex items-center gap-1.5 rounded-lg bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-muted">
                  <Server className="h-3.5 w-3.5" />
                  {template.hostingInfo.hostingCost} hosting
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              {template.remixLink && (
                <a
                  href={template.remixLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full gap-2">
                    <Copy className="h-4 w-4" />
                    Remix in Framer
                  </Button>
                </a>
              )}
              <div className="flex gap-3">
                {template.livePreviewLink && (
                  <a
                    href={template.livePreviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Preview
                    </Button>
                  </a>
                )}
                {template.downloadLink && (
                  <a
                    href={template.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {template.price?.isFree ? 'Download Free' : 'Get Template'}
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {template.customizationLink && (
              <a
                href={template.customizationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Need custom work? Book a session
              </a>
            )}

            {/* Pages included */}
            {template.pages && template.pages.length > 0 && (
              <div className="mt-8 rounded-xl border border-border bg-surface-elevated p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
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

            {/* Features */}
            {hasFeatures && (
              <div className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Features
                </h2>
                <ul className="mt-4 space-y-3">
                  {template.features!.map((f: { feature: string }, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {f.feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selling Points */}
            {hasSellingPoints && (
              <div className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Why {template.title}?
                </h2>
                <div className="mt-4 space-y-5">
                  {template.sellingPoints!.map((point: { title: string; description: string }, i: number) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Long Description (full width below) */}
        {hasLongDescription && (
          <div className="mt-16 mx-auto max-w-3xl">
            <div
              className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: template.longDescription as string }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
