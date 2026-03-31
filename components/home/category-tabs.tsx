'use client'

import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryTabsProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (slug: string | null) => void
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-all',
          selectedCategory === null
            ? 'bg-accent text-white shadow-sm'
            : 'bg-accent-subtle/50 text-muted hover:text-foreground hover:bg-accent-subtle'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            selectedCategory === category.slug
              ? 'bg-accent text-white shadow-sm'
              : 'bg-accent-subtle/50 text-muted hover:text-foreground hover:bg-accent-subtle'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
