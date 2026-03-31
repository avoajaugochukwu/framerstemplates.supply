import type { Metadata } from 'next'
import Link from 'next/link'
import { getColors } from '@/lib/data'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Colors | ${SITE_NAME}`,
  description: 'Explore our curated collection of colors with hex, RGB, HSL values and Tailwind classes.',
}

export default function ColorsPage() {
  const colors = getColors()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Colors
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            A curated collection of colors with hex, RGB, HSL values and Tailwind classes.
          </p>
        </div>

        {colors.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {colors.map((color) => (
              <Link
                key={color.id}
                href={`/colors/${color.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4">
                  <h2 className="font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                    {color.name}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                    {color.hex}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {color.metadata?.category && (
                      <Badge variant="secondary">{color.metadata.category}</Badge>
                    )}
                    {color.tailwindClass && (
                      <Badge variant="secondary">{color.tailwindClass}</Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No colors available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
