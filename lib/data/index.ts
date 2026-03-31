import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'content', 'data')

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

// Collections

export function getTemplates() {
  return readJSON<Template[]>('templates.json')
}

export function getTemplateBySlug(slug: string) {
  return getTemplates().find((t) => t.slug === slug) || null
}

export function getPublishedTemplates() {
  return getTemplates().filter((t) => t.status === 'published')
}

export function getTools() {
  return readJSON<Tool[]>('tools.json')
}

export function getToolBySlug(slug: string) {
  return getTools().find((t) => t.slug === slug) || null
}

export function getActiveTools() {
  return getTools().filter((t) => t.status !== 'archived')
}

export function getColors() {
  return readJSON<Color[]>('colors.json')
}

export function getColorBySlug(slug: string) {
  return getColors().find((c) => c.slug === slug) || null
}

export function getGradients() {
  return readJSON<Gradient[]>('gradients.json')
}

export function getGradientBySlug(slug: string) {
  return getGradients().find((g) => g.slug === slug) || null
}

export function getCategories() {
  return readJSON<Category[]>('categories.json')
}

// Globals

export function getSiteSettings() {
  return readJSON<SiteSettings>('site-settings.json')
}

export function getNavigation() {
  return readJSON<Navigation>('navigation.json')
}

export function getFooter() {
  return readJSON<FooterData>('footer.json')
}

// Types

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
  tagline?: string | null
  longDescription?: unknown
  previewImage?: Media | string | null
  previewImages?: { image: Media | string | null; caption?: string }[]
  downloadLink?: string | null
  livePreviewLink?: string | null
  remixLink?: string | null
  customizationLink?: string | null
  hostingInfo?: {
    hostingCost?: string | null
    deployTime?: string | null
  } | null
  price?: {
    amount?: number | null
    currency?: string | null
    isFree?: boolean | null
  } | null
  features?: { feature: string }[] | null
  pages?: { pageName: string }[] | null
  sellingPoints?: { title: string; description: string }[] | null
  categories?: (Category | string)[] | null
  status?: string
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Tool {
  id: number
  name: string
  slug: string
  shortDescription?: string | null
  description?: unknown
  icon?: Media | string | null
  toolType?: string | null
  customConfig?: unknown
  status?: string
  metaDescription?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface Color {
  id: number
  name: string
  slug: string
  hex: string
  rgb?: { r: number; g: number; b: number } | null
  hsl?: { h: number; s: number; l: number } | null
  tailwindClass?: string | null
  metadata?: {
    category?: string | null
    warmth?: string | null
    brightness?: string | null
  } | null
  description?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface Gradient {
  id: number
  name: string
  slug: string
  cssCode: string
  gradientType: string
  angle?: number | null
  colorPalette?: { hex: string; position?: number | null }[] | null
  previewImage?: Media | string | null
  tags?: { tag: string }[] | null
  createdAt?: string
  updatedAt?: string
}

export interface SiteSettings {
  siteName?: string
  tagline?: string
  siteDescription?: string
  socialLinks?: {
    twitter?: string
    github?: string
    instagram?: string
    linkedin?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    plausibleDomain?: string
  }
}

export interface Navigation {
  mainNav?: {
    label: string
    link: string
    newTab?: boolean
    children?: {
      label: string
      link: string
      description?: string
      icon?: string
      newTab?: boolean
    }[]
  }[]
  ctaButton?: {
    show?: boolean
    label?: string
    link?: string
  }
}

export interface FooterData {
  columns?: {
    title: string
    links: { label: string; link: string; newTab?: boolean }[]
  }[]
  bottomText?: string
  bottomLinks?: { label: string; link: string }[]
}
