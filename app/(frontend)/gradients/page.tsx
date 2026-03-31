import type { Metadata } from 'next'
import Link from 'next/link'
import { getGradients } from '@/lib/data'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Gradients | ${SITE_NAME}`,
  description: 'Browse our collection of beautiful CSS gradients — linear, radial, and conic.',
  alternates: {
    canonical: '/gradients',
  },
}

export default function GradientsPage() {
  const gradients = getGradients()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Gradients
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            A collection of beautiful CSS gradients ready to use in your projects.
          </p>
        </div>

        {gradients.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gradients.map((gradient) => (
              <Link
                key={gradient.id}
                href={`/gradients/${gradient.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div
                  className="h-40 w-full"
                  style={{ background: gradient.cssCode }}
                />
                <div className="p-4">
                  <h2 className="font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                    {gradient.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{gradient.gradientType}</Badge>
                    {gradient.colorPalette?.slice(0, 3).map((stop, i) => (
                      <span
                        key={i}
                        className="inline-block h-5 w-5 rounded-full border border-neutral-200 dark:border-neutral-700"
                        style={{ backgroundColor: stop.hex }}
                        title={stop.hex}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No gradients available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
