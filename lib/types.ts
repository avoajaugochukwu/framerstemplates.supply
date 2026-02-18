export interface Media {
  id: number
  url: string
  alt: string
  width?: number
  height?: number
  filename?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
}

export interface Template {
  id: number
  title: string
  slug: string
  description: string
  previewImage: Media | string
  categories?: (Category | string)[] | null
  price?: {
    amount?: number | null
    currency?: string | null
    isFree?: boolean | null
  } | null
  pages?: { pageName: string }[] | null
  status?: string
  featured?: boolean
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: Media | string | null
  categories?: (Category | string)[] | null
  publishedDate?: string | null
  status?: string
}
