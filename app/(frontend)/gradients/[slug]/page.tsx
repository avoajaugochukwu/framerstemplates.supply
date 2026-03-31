import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getGradientBySlug, getGradients } from '@/lib/data'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gradient = getGradientBySlug(slug)

  if (!gradient) {
    return { title: 'Gradient Not Found' }
  }

  return {
    title: `${gradient.name} Gradient | ${SITE_NAME}`,
    description: `${gradient.name} — a ${gradient.gradientType} CSS gradient. Copy the CSS and use it in your projects.`,
    alternates: {
      canonical: `/gradients/${slug}`,
    },
  }
}

export function generateStaticParams() {
  return getGradients().map((gradient) => ({
    slug: gradient.slug,
  }))
}

export default async function GradientPage({ params }: Props) {
  const { slug } = await params
  const gradient = getGradientBySlug(slug)

  if (!gradient) {
    notFound()
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/gradients"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gradients
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div
              className="aspect-square w-full rounded-2xl border border-neutral-200 dark:border-neutral-800"
              style={{ background: gradient.cssCode }}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {gradient.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{gradient.gradientType}</Badge>
              {gradient.angle != null && (
                <Badge variant="secondary">{gradient.angle}deg</Badge>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">CSS</h2>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                <code>{`background: ${gradient.cssCode};`}</code>
              </pre>
            </div>

            {gradient.colorPalette && gradient.colorPalette.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Color Stops
                </h2>
                <div className="mt-3 space-y-2">
                  {gradient.colorPalette.map((stop, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <span
                        className="h-6 w-6 flex-shrink-0 rounded-full border border-neutral-200 dark:border-neutral-700"
                        style={{ backgroundColor: stop.hex }}
                      />
                      <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                        {stop.hex}
                      </span>
                      {stop.position != null && (
                        <span className="ml-auto text-sm text-neutral-500 dark:text-neutral-400">
                          {stop.position}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gradient.tags && gradient.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {gradient.tags.map((t, i) => (
                  <Badge key={i} variant="secondary">
                    {t.tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
