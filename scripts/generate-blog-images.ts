import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { fal } from '@fal-ai/client'
import fs from 'fs'
import matter from 'gray-matter'
import https from 'https'
import http from 'http'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const IMAGE_DIR = path.join(process.cwd(), 'public/blog')

fal.config({ credentials: process.env.FAL_API_KEY })

function buildPrompt(title: string, excerpt: string): string {
  return [
    'Professional, modern blog header illustration for a web design and development article.',
    `Topic: "${title}".`,
    'Style: clean flat vector illustration with soft gradients, muted professional color palette (blues, purples, warm grays),',
    'abstract geometric shapes representing design and technology concepts.',
    'No text, no words, no letters, no watermarks.',
    'Wide landscape composition, suitable as a blog featured image.',
    'Minimal, editorial, high quality.',
  ].join(' ')
}

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const client = url.startsWith('https') ? https : http
    client
      .get(url, (res) => {
        res.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {})
        reject(err)
      })
  })
}

async function generateImage(slug: string, title: string, excerpt: string): Promise<string> {
  const prompt = buildPrompt(title, excerpt)

  console.log(`  Generating image for: ${title}`)

  const result = await fal.subscribe('fal-ai/z-image/turbo', {
    input: {
      prompt,
      image_size: 'landscape_16_9',
      num_inference_steps: 8,
      num_images: 1,
      output_format: 'webp',
      enable_safety_checker: true,
    },
  })

  const imageUrl = (result.data as any).images[0].url
  const filename = `${slug}.webp`
  const destPath = path.join(IMAGE_DIR, filename)

  await download(imageUrl, destPath)
  console.log(`  Saved: public/blog/${filename}`)

  return `/blog/${filename}`
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true })
  }

  const targetSlug = process.argv[2]

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = file.replace(/\.md$/, '')

    if (targetSlug && slug !== targetSlug) continue

    if (data.featuredImage && !targetSlug) {
      const imgPath = path.join(process.cwd(), 'public', data.featuredImage)
      if (fs.existsSync(imgPath)) {
        console.log(`Skipping ${slug} (already has image)`)
        continue
      }
    }

    try {
      const imagePath = await generateImage(slug, data.title, data.excerpt)

      const updated = matter.stringify(content, {
        ...data,
        featuredImage: imagePath,
      })
      fs.writeFileSync(filePath, updated)
      console.log(`  Updated frontmatter for ${slug}\n`)
    } catch (err: any) {
      console.error(`  Failed for ${slug}: ${err.message}\n`)
    }
  }

  console.log('Done!')
}

main()
