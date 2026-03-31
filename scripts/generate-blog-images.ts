import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { fal } from '@fal-ai/client'
import fs from 'fs'
import matter from 'gray-matter'
import https from 'https'
import http from 'http'
import sharp from 'sharp'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const IMAGE_DIR = path.join(process.cwd(), 'public/blog')

fal.config({ credentials: process.env.FAL_API_KEY })

// Map article topics to vibrant visual concepts
function getVisualConcept(title: string, excerpt: string): string {
  const text = `${title} ${excerpt}`.toLowerCase()

  if (text.includes('portfolio'))
    return 'a floating gallery of colorful abstract art canvases arranged in a dynamic 3D grid, with light rays passing through translucent panels, neon accents'
  if (text.includes('seo') || text.includes('search'))
    return 'a glowing search magnifying glass hovering over a vibrant digital landscape of data streams and colorful network nodes, aurora-like light effects'
  if (text.includes('animation') || text.includes('interaction') || text.includes('motion'))
    return 'dynamic swirling ribbons of light in electric blue, hot pink, and gold creating flowing motion trails through space, particles and energy waves'
  if (text.includes('landing page') || text.includes('conversion'))
    return 'a vibrant isometric floating island with glowing UI elements, colorful buttons and forms arranged like a miniature city, warm sunset lighting'
  if (text.includes('mobile') || text.includes('app'))
    return 'colorful smartphone silhouettes floating in space with vibrant app interfaces bursting out as abstract 3D shapes, holographic effects'
  if (text.includes('blog') || text.includes('writing') || text.includes('content'))
    return 'an open book with colorful abstract shapes, geometric patterns, and light beams flowing out of its pages into the air, magical realism'
  if (text.includes('template'))
    return 'a mosaic of colorful overlapping browser windows and UI components floating in space, with vivid gradients of coral, teal, and violet'
  if (text.includes('photography') || text.includes('photographer'))
    return 'a vibrant camera lens with colorful light refractions creating a rainbow spectrum, bokeh effects and floating geometric prisms'
  if (text.includes('ecommerce') || text.includes('shop') || text.includes('store'))
    return 'floating colorful shopping bags and product boxes arranged in an abstract spiral pattern with golden light particles and holographic surfaces'
  if (text.includes('freelance') || text.includes('agency'))
    return 'a vibrant collaborative workspace with floating colorful screens, design tools, and abstract creative elements in warm orange, magenta, and cyan'
  if (text.includes('color') || text.includes('design') || text.includes('creative'))
    return 'an explosion of colorful paint splashes and geometric shapes forming an abstract composition, with gradient orbs and prismatic light effects'
  if (text.includes('speed') || text.includes('performance') || text.includes('fast'))
    return 'streaks of neon light racing through a futuristic tunnel with speed lines, electric blue and hot pink energy trails, motion blur'
  if (text.includes('code') || text.includes('developer') || text.includes('programming'))
    return 'floating lines of colorful abstract code blocks transforming into vibrant 3D geometric structures, matrix-like but colorful, cyan and magenta'
  if (text.includes('beginner') || text.includes('guide') || text.includes('learn'))
    return 'a colorful stepping-stone path leading through a vibrant abstract landscape with glowing waypoints, warm inviting colors of coral, amber, and teal'
  if (text.includes('free') || text.includes('cheap') || text.includes('budget'))
    return 'a treasure chest overflowing with colorful glowing gems, abstract shapes, and light particles in vibrant gold, emerald, and sapphire tones'
  if (text.includes('comparison') || text.includes('alternative') || text.includes('vs'))
    return 'two vibrant abstract structures facing each other with colorful energy bridges connecting them, in electric purple, coral, and cyan'
  if (text.includes('sitemap') || text.includes('structure') || text.includes('architecture'))
    return 'a colorful interconnected network of glowing nodes and pathways forming a tree-like structure, vibrant neon connections on a deep background'
  if (text.includes('responsive') || text.includes('layout'))
    return 'abstract device silhouettes morphing into each other with colorful fluid shapes flowing between them, gradient mesh effects'
  if (text.includes('brand') || text.includes('identity'))
    return 'a bold abstract logo-like composition of overlapping geometric shapes with strong gradients in coral, indigo, and gold, dimensional depth'

  // Default: vibrant abstract tech/design concept
  return 'an abstract composition of colorful geometric shapes, gradient orbs, and flowing light ribbons in vibrant coral, electric blue, violet, and gold'
}

function buildPrompt(title: string, excerpt: string): string {
  const visual = getVisualConcept(title, excerpt)
  return [
    `A stunning, vibrant wide-angle digital artwork depicting ${visual}.`,
    'Style: modern digital art with rich saturated colors, bold gradients, dimensional depth, and dramatic lighting.',
    'Color palette: vibrant and energetic — use rich corals, electric blues, vivid purples, warm ambers, emerald greens, hot pinks.',
    'ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO TITLES, NO WATERMARKS, NO LOGOS.',
    'No people, no faces, no characters, no human figures.',
    'Wide 16:9 landscape composition with cinematic framing.',
    'Ultra high quality, sharp details, professional digital illustration.',
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

  const result = await fal.subscribe('fal-ai/flux/dev', {
    input: {
      prompt,
      image_size: 'landscape_16_9',
      num_inference_steps: 28,
      num_images: 1,
      output_format: 'png',
      guidance_scale: 3.5,
      enable_safety_checker: true,
    },
  })

  const imageUrl = (result.data as any).images[0].url
  const filename = `${slug}.webp`
  const destPath = path.join(IMAGE_DIR, filename)
  const tmpPath = path.join(IMAGE_DIR, `${slug}.tmp.png`)

  await download(imageUrl, tmpPath)
  await sharp(tmpPath).webp({ quality: 85 }).toFile(destPath)
  fs.unlinkSync(tmpPath)
  console.log(`  Saved: public/blog/${filename}`)

  return `/blog/${filename}`
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true })
  }

  const args = process.argv.slice(2)
  const forceAll = args.includes('--force-all')
  const dryRun = args.includes('--dry-run')
  const targetSlug = args.find((a) => !a.startsWith('--'))

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = file.replace(/\.md$/, '')

    if (targetSlug && slug !== targetSlug) continue

    if (data.featuredImage && !targetSlug && !forceAll) {
      const imgPath = path.join(process.cwd(), 'public', data.featuredImage)
      if (fs.existsSync(imgPath)) {
        console.log(`Skipping ${slug} (already has image)`)
        continue
      }
    }

    if (dryRun) {
      const prompt = buildPrompt(data.title, data.excerpt)
      console.log(`\n[${slug}]\n  ${prompt}\n`)
      continue
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
      console.error(`  Failed for ${slug}: ${err.message}`)
      if (err.body) console.error(`  Details: ${JSON.stringify(err.body)}`)
      console.error()
    }
  }

  console.log('Done!')
}

main()
