import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { Badge } from '@/components/ui'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Tools | ${SITE_NAME}`,
  description: 'Helpful design tools including gradient generators, color pickers, and more.',
}

export const revalidate = 3600

async function getTools() {
  const payload = await getPayloadClient()
  const tools = await payload.find({
    collection: 'tools',
    where: {
      status: { not_equals: 'archived' },
    },
    sort: 'name',
    limit: 100,
  })
  return tools.docs
}

export default async function ToolsPage() {
  const tools = await getTools()

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Design Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Free tools to help you design and build better websites.
          </p>
        </div>

        {tools.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.status === 'coming-soon' ? '#' : `/tools/${tool.slug}`}
                className={`group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all dark:border-neutral-800 dark:bg-neutral-950 ${
                  tool.status === 'coming-soon'
                    ? 'cursor-not-allowed opacity-75'
                    : 'hover:shadow-lg'
                }`}
              >
                {tool.status === 'coming-soon' && (
                  <Badge variant="secondary" className="absolute right-4 top-4">
                    Coming Soon
                  </Badge>
                )}
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {tool.shortDescription}
                </p>
                {tool.status !== 'coming-soon' && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white">
                    Try it now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No tools available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
