import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

const CSV_PATH = path.join(process.cwd(), 'framerblogs.csv')
const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function slugify(url: string): string {
  const parts = url.split('/blog/')
  return parts[1] || ''
}

function cleanContent(raw: string): string {
  if (!raw) return ''

  // The CSV has plain text content that was scraped from Framer
  // Convert it to proper markdown with paragraphs and headings
  let content = raw

  // Try to detect heading patterns (common patterns from the scraped content)
  // Lines that are short and followed by longer text are likely headings
  const lines = content.split(/(?<=[.!?])\s+(?=[A-Z])/)

  // Simple heuristic: split into paragraphs at sentence boundaries
  // and try to identify section headings
  const paragraphs: string[] = []
  const sectionKeywords = [
    'Introduction', 'Conclusion', 'Key Features', 'Top Features',
    'Benefits', 'How to', 'Why', 'What is', 'Getting Started',
    'Final Thoughts', 'Summary', 'Overview', 'Comparison',
    'Pros and Cons', 'Pricing', 'Features', 'The Bottom Line',
  ]

  // Split content into rough paragraphs
  const chunks = content.split(/\n+/).filter(c => c.trim())

  for (const chunk of chunks) {
    const trimmed = chunk.trim()
    if (!trimmed) continue

    // Check if this looks like a heading
    const isShort = trimmed.length < 100
    const startsWithKeyword = sectionKeywords.some(kw =>
      trimmed.toLowerCase().startsWith(kw.toLowerCase())
    )

    if (isShort && startsWithKeyword && !trimmed.endsWith('.')) {
      paragraphs.push(`## ${trimmed}`)
    } else {
      paragraphs.push(trimmed)
    }
  }

  return paragraphs.join('\n\n')
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }

  const csv = fs.readFileSync(CSV_PATH, 'utf-8')
  const records = parse(csv, { columns: true, skip_empty_lines: true })

  console.log(`Found ${records.length} posts in CSV\n`)

  let created = 0
  let skipped = 0

  for (const record of records as Record<string, string>[]) {
    const slug = slugify(record.links || '')
    if (!slug) {
      console.log(`Skipping record with no slug`)
      skipped++
      continue
    }

    const title = (record.title || '').trim()
    const author = (record['Written by'] || 'Charles Ugo').trim()
    const content = cleanContent(record.posts || '')
    const excerpt = content
      .replace(/^#+\s+.*\n/gm, '') // remove headings
      .replace(/[#*]/g, '')
      .trim()
      .substring(0, 160)
      .trim() + '...'

    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `slug: ${slug}`,
      `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
      `author: ${author}`,
      `publishDate: '2025-02-01'`,
      `status: published`,
      '---',
      '',
      content,
    ].join('\n')

    const filePath = path.join(BLOG_DIR, `${slug}.md`)

    // Don't overwrite existing files
    if (fs.existsSync(filePath)) {
      console.log(`Exists: ${slug}`)
      skipped++
      continue
    }

    fs.writeFileSync(filePath, frontmatter)
    console.log(`Created: ${slug}`)
    created++
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`)
}

main()
