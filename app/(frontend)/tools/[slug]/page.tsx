import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getToolBySlug, getActiveTools } from '@/lib/data'
import { SITE_NAME } from '@/lib/constants'

type Props = {
  params: Promise<{ slug: string }>
}

interface ToolComponentProps {
  config?: unknown
}

const toolComponents: Record<string, ComponentType<ToolComponentProps>> = {
  'gradient-generator': dynamic(() => import('@/components/tools/gradient-generator')),
  'color-picker': dynamic(() => import('@/components/tools/color-picker')),
  'contrast-checker': dynamic(() => import('@/components/tools/contrast-checker')),
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: `${tool.name} | ${SITE_NAME}`,
    description: tool.metaDescription || tool.shortDescription,
    alternates: {
      canonical: `/tools/${slug}`,
    },
  }
}

export function generateStaticParams() {
  return getActiveTools()
    .filter((t) => t.status === 'active')
    .map((tool) => ({ slug: tool.slug }))
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const ToolComponent = toolComponents[tool.slug] || null

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/tools"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {tool.shortDescription}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          {ToolComponent ? (
            <ToolComponent config={tool.customConfig} />
          ) : (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              This tool is currently under development.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
