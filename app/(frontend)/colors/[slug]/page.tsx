import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Copy } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

async function getColor(slug: string) {
  const payload = await getPayloadClient()
  const colors = await payload.find({
    collection: 'colors',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return colors.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const color = await getColor(slug)

  if (!color) {
    return { title: 'Color Not Found' }
  }

  return {
    title: `${color.name} (${color.hex}) | ${SITE_NAME}`,
    description: color.description || `${color.name} color — hex: ${color.hex}, RGB: ${color.rgb?.r}, ${color.rgb?.g}, ${color.rgb?.b}. Explore values and usage.`,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const colors = await payload.find({
      collection: 'colors',
      limit: 1000,
      select: { slug: true },
    })

    return colors.docs.map((color) => ({
      slug: color.slug,
    }))
  } catch {
    console.warn('generateStaticParams: Database unavailable, falling back to on-demand generation')
    return []
  }
}

function ColorValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">{value}</span>
    </div>
  )
}

export default async function ColorPage({ params }: Props) {
  const { slug } = await params
  const color = await getColor(slug)

  if (!color) {
    notFound()
  }

  const rgbString = color.rgb ? `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` : null
  const hslString = color.hsl ? `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)` : null

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/colors"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Colors
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Color Preview */}
          <div>
            <div
              className="aspect-square w-full rounded-2xl border border-neutral-200 dark:border-neutral-800"
              style={{ backgroundColor: color.hex }}
            />
          </div>

          {/* Color Details */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {color.name}
            </h1>

            {color.description && (
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                {color.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {color.metadata?.category && (
                <Badge variant="secondary">{color.metadata.category}</Badge>
              )}
              {color.metadata?.warmth && (
                <Badge variant="secondary">{color.metadata.warmth}</Badge>
              )}
              {color.metadata?.brightness && (
                <Badge variant="secondary">{color.metadata.brightness}</Badge>
              )}
            </div>

            {/* Color Values */}
            <div className="mt-8 space-y-3">
              <ColorValue label="HEX" value={color.hex} />
              {rgbString && <ColorValue label="RGB" value={rgbString} />}
              {hslString && <ColorValue label="HSL" value={hslString} />}
              {color.tailwindClass && (
                <ColorValue label="Tailwind" value={color.tailwindClass} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
