import type { Metadata } from 'next'
import { Copy } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Background Gradients | Framer Templates Supply',
  description: 'Beautiful gradient backgrounds for your designs and projects. Copy CSS with one click.',
}

export const revalidate = 3600

async function getGradients() {
  const payload = await getPayloadClient()
  const gradients = await payload.find({
    collection: 'gradients',
    sort: '-createdAt',
    limit: 100,
  })
  return gradients.docs
}

export default async function BackgroundPage() {
  const gradients = await getGradients()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Background Gradients
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Beautiful gradient backgrounds for your designs. Click to copy the CSS code.
          </p>
        </div>

        {gradients.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gradients.map((gradient) => (
              <div
                key={gradient.id}
                className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
              >
                <div
                  className="aspect-[4/3]"
                  style={{ background: gradient.cssCode }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy CSS
                  </Button>
                </div>
                <div className="bg-white p-4 dark:bg-neutral-950">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {gradient.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {gradient.gradientType}
                    {gradient.angle !== undefined && ` • ${gradient.angle}°`}
                  </p>
                </div>
              </div>
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
