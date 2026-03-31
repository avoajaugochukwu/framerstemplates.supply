export type { Media, Category, Template } from '@/lib/data'

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: string | null
  categories?: string[] | null
  publishedDate?: string | null
  status?: string
}
