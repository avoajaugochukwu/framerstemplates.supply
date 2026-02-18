import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

// 1. Load the environment IMMEDIATELY
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

interface CsvRecord {
  web_scraper_order: string
  web_scraper_start_url: string
  links: string
  title: string
  'Written by': string
  'read time': string
  posts: string
  image: string
}

const extractSlug = (url: string) => {
  if (!url) return ''
  const parts = url.split('/').filter(part => !!part)
  return parts[parts.length - 1]
}

const lexicalPlaceholder: any = {
  root: {
    type: 'root',
    format: '',
    direction: null,
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text: 'MIGRATION PLACEHOLDER: Copy content from Framer here.',
            version: 1,
          },
        ],
      },
    ],
  },
}

async function migrate() {
  console.log('Starting Migration...')
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL not loaded.')
    process.exit(1)
  }

  const { getPayload } = await import('payload')
  const configModule = await import('../payload.config')
  const config = await configModule.default
  const payload = await getPayload({ config })

  // 2. VERIFY USER 2 EXISTS
  const authorId = 2; // Updated to 2
  const userCheck = await payload.findByID({
    collection: 'users',
    id: authorId,
  }).catch(() => null)

  if (!userCheck) {
    console.error(`❌ ERROR: User with ID ${authorId} not found in Supabase. Please check the Users collection in your dashboard.`)
    process.exit(1)
  }

  console.log(`✅ Verified Author: ${userCheck.email} (ID: ${authorId})`)

  const csvPath = path.resolve(process.cwd(), 'framerblogs.csv')
  const csvFile = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
    bom: true, 
  }) as CsvRecord[]

  console.log(`Found ${records.length} records. Processing...`)

  for (const record of records) {
    try {
      const slug = extractSlug(record.links)

      // Check for existing slug
      const existing = await payload.find({
        collection: 'blog',
        where: { slug: { equals: slug } },
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping: ${slug} (Already exists)`)
        continue
      }

      await payload.create({
        collection: 'blog',
        data: {
          title: record.title,
          slug: slug,
          content: lexicalPlaceholder,
          author: authorId, 
          status: 'published',
          publishedDate: new Date().toISOString(),
          excerpt: record.posts ? record.posts.substring(0, 160).replace(/\n/g, ' ') : '', 
        },
      })

      console.log(`✅ Created: ${record.title}`)
    } catch (error) {
      console.error(`❌ Failed: ${record.title}`, error)
    }
  }

  console.log('🎉 Migration completed successfully!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('❌ Fatal Migration Error:', err)
  process.exit(1)
})