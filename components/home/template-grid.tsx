'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CategoryTabs } from './category-tabs'
import { TemplateCard } from '@/components/shared'
import type { Category, Media } from '@/lib/types'

interface Template {
  id: string
  title: string
  slug: string
  previewImage: Media | string
  categories?: (Category | string)[] | null
  price?: {
    amount?: number | null
    currency?: string | null
    isFree?: boolean | null
  } | null
  pages?: { pageName: string }[] | null
}

interface TemplateGridProps {
  templates: Template[]
  categories: Category[]
}

export function TemplateGrid({ templates, categories }: TemplateGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    if (!selectedCategory) return templates

    return templates.filter((template) => {
      const templateCategories = template.categories || []
      return templateCategories.some((cat) => {
        if (typeof cat === 'object') {
          return cat.slug === selectedCategory
        }
        return false
      })
    })
  }, [templates, selectedCategory])

  return (
    <section className="px-4 pt-8 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Start with a Head Start
            </h2>
            <p className="mt-1 text-sm text-muted">
              Every template is responsive, SEO-ready, and one click from your Framer dashboard
            </p>
          </div>
          <Link
            href="/templates"
            className="group hidden items-center gap-1 text-sm font-medium text-accent sm:inline-flex"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-6">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted">
              No templates found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
