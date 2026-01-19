'use client'

import { useState, useMemo } from 'react'
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
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Browse Templates
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Find the perfect template for your next project.
          </p>
        </div>

        <div className="mt-8">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No templates found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
