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

function getScene(title: string, excerpt: string): string {
  const text = `${title} ${excerpt}`.toLowerCase()

  if (text.includes('portfolio'))
    return 'a designer character with big legs arranging colorful website screens on a large canvas board, paint splashes and browser windows floating around'
  if (text.includes('seo') || text.includes('search engine'))
    return 'a character with oversized legs climbing a giant colorful bar chart while holding a magnifying glass, search icons and upward arrows around them'
  if (text.includes('animation') || text.includes('interaction') || text.includes('motion'))
    return 'a playful character with exaggerated limbs riding a colorful wave of motion lines, sparkles and bouncing shapes trailing behind'
  if (text.includes('landing page') && text.includes('convert'))
    return 'a character with big legs pointing at a giant glowing button on a colorful webpage mockup, confetti and checkmarks flying out'
  if (text.includes('landing page'))
    return 'a character with oversized legs building a colorful webpage with floating UI elements, dragging a hero section into place'
  if (text.includes('mobile') || text.includes('app'))
    return 'a character with big legs holding an oversized smartphone with colorful app screens popping out in 3D, surrounded by notification bubbles'
  if (text.includes('blog') || text.includes('writing') || text.includes('content'))
    return 'a character with exaggerated proportions sitting on a giant pencil, writing on floating colorful blog cards in the sky'
  if (text.includes('photographer') || text.includes('photography'))
    return 'a character with big legs looking through an oversized colorful camera, photos floating out like a fan of bright cards'
  if (text.includes('ecommerce') || text.includes('shop') || text.includes('store') || text.includes('shopify'))
    return 'a character with oversized legs pushing a giant colorful shopping cart filled with floating product boxes and price tags'
  if (text.includes('freelance') || text.includes('agency'))
    return 'two characters with exaggerated proportions high-fiving over a colorful desk filled with design tools, screens, and coffee cups'
  if (text.includes('template'))
    return 'a character with big legs browsing through a carousel of colorful floating website templates, picking one up like a card'
  if (text.includes('color') || text.includes('design') || text.includes('creative') || text.includes('art'))
    return 'a character with exaggerated limbs painting on a giant colorful canvas, surrounded by floating paint buckets, brushes, and color swatches'
  if (text.includes('speed') || text.includes('performance') || text.includes('optimization'))
    return 'a character with oversized legs riding a rocket past a speedometer gauge, speed lines and lightning bolts in bright colors'
  if (text.includes('code') || text.includes('developer') || text.includes('programming'))
    return 'a character with big legs typing on a giant keyboard, colorful code brackets and curly braces floating upward from the screen'
  if (text.includes('comparison') || text.includes('alternative') || text.includes(' vs'))
    return 'two characters with exaggerated proportions standing on opposite colorful platforms connected by a bridge, each holding different tools'
  if (text.includes('wedding'))
    return 'a character with big legs designing a beautiful website on a tablet surrounded by flowers, rings, and colorful wedding decorations'
  if (text.includes('musician') || text.includes('music'))
    return 'a character with oversized legs playing a colorful guitar while musical notes transform into website elements floating upward'
  if (text.includes('booking') || text.includes('schedule') || text.includes('event'))
    return 'a character with exaggerated proportions organizing a giant colorful calendar, dragging event blocks into place with floating clocks'
  if (text.includes('sitemap') || text.includes('structure'))
    return 'a character with big legs connecting colorful nodes on a giant flowchart, drawing lines between floating webpage icons'
  if (text.includes('layout') || text.includes('responsive') || text.includes('hero'))
    return 'a character with oversized legs rearranging colorful UI blocks on different sized screens, from phone to desktop'
  if (text.includes('bookmark') || text.includes('print'))
    return 'a character with big legs crafting colorful paper bookmarks at a table with scissors, ribbons, and decorations'
  if (text.includes('canva'))
    return 'a character with exaggerated proportions dragging colorful design elements from a toolbar onto a bright canvas'
  if (text.includes('webflow'))
    return 'a character with big legs surfing on a colorful wave made of website components and design elements'
  if (text.includes('wix'))
    return 'a character with oversized legs assembling colorful website blocks like building a tower, each block a different bright color'
  if (text.includes('pricing') || text.includes('free') || text.includes('cheap') || text.includes('budget'))
    return 'a character with big legs juggling colorful price tags and coins, a giant gift box with a free label nearby'
  if (text.includes('beginner') || text.includes('guide') || text.includes('learn') || text.includes('getting started'))
    return 'a character with exaggerated proportions stepping onto colorful stepping stones that float upward like a staircase, with a flag at the top'
  if (text.includes('redesign') || text.includes('modern'))
    return 'a character with big legs using a giant paintbrush to repaint a website from gray to vibrant colors, before and after'
  if (text.includes('offline') || text.includes('durable') || text.includes('builder'))
    return 'a character with oversized legs stacking colorful building blocks into a website shape, construction crane and hard hat'
  if (text.includes('cool') || text.includes('discover') || text.includes('fun'))
    return 'a character with big legs looking through binoculars at a landscape of colorful floating websites and apps, stars and sparkles'
  if (text.includes('clickfunnel') || text.includes('funnel'))
    return 'a character with exaggerated proportions pouring colorful leads into a giant funnel that outputs golden conversions'
  if (text.includes('corporate') || text.includes('business'))
    return 'a character with big legs in a suit presenting a colorful dashboard on a giant screen, charts and graphs floating around'
  if (text.includes('organic') || text.includes('natural'))
    return 'a character with oversized legs watering a colorful plant that grows into website shapes, leaves and flowers blooming'
  if (text.includes('drag') || text.includes('drop'))
    return 'a character with big legs picking up colorful UI elements and dropping them into a website layout, sparkles on placement'
  if (text.includes('synonym') || text.includes('word'))
    return 'a character with exaggerated proportions reading a giant colorful book, words and letters floating out in a swirl'
  if (text.includes('border'))
    return 'a character with big legs decorating a giant frame with colorful patterns and ornaments, paint brushes nearby'
  if (text.includes('minimalist'))
    return 'a character with oversized legs carefully placing a single colorful element on a clean white canvas, less is more'
  if (text.includes('ai') || text.includes('durable'))
    return 'a character with big legs high-fiving a friendly colorful robot that is building a website, circuits and sparkles'
  if (text.includes('figma'))
    return 'a character with exaggerated proportions using a giant colorful pen tool to draw vector shapes on a massive artboard'
  if (text.includes('framer'))
    return 'a character with big legs interacting with colorful floating UI components, snapping them together like puzzle pieces'

  // Default
  return 'a character with exaggerated proportions building a colorful website on a giant screen, surrounded by floating design tools and bright UI elements'
}

function buildPrompt(title: string, excerpt: string): string {
  const scene = getScene(title, excerpt)
  return [
    `Modern flat 2D illustration of ${scene}.`,
    'Style: corporate Memphis / Alegria illustration style with characters that have disproportionately large legs, small heads, elongated limbs, simple dot eyes.',
    'Bold flat colors with no outlines, smooth solid shapes, playful and professional.',
    'Color palette: vibrant saturated colors — coral pink, electric blue, warm yellow, mint green, soft purple, orange. White or very light pastel background.',
    'ABSOLUTELY NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO TITLES, NO WATERMARKS, NO LOGOS.',
    'Clean vector-style flat illustration, no gradients on characters, no 3D effects, no photorealism.',
    'Wide 16:9 landscape composition with balanced layout and plenty of whitespace.',
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

  console.log(`  Generating: ${title}`)

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

  let generated = 0
  let failed = 0

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = file.replace(/\.md$/, '')

    if (targetSlug && slug !== targetSlug) continue

    if (data.featuredImage && !targetSlug && !forceAll) {
      const imgPath = path.join(process.cwd(), 'public', data.featuredImage)
      if (fs.existsSync(imgPath)) {
        continue
      }
    }

    if (dryRun) {
      const prompt = buildPrompt(data.title, data.excerpt || '')
      console.log(`\n[${slug}]\n  ${prompt}\n`)
      continue
    }

    try {
      const imagePath = await generateImage(slug, data.title, data.excerpt || '')

      const updated = matter.stringify(content, {
        ...data,
        featuredImage: imagePath,
      })
      fs.writeFileSync(filePath, updated)

      generated++
      console.log(`  ✓ Saved: public/blog/${slug}.webp\n`)
    } catch (err: any) {
      failed++
      console.error(`  ✗ Failed: ${err.message}`)
      if (err.body) console.error(`    ${JSON.stringify(err.body)}`)
      console.error()
    }
  }

  console.log(`\nDone! Generated: ${generated}, Failed: ${failed}`)
}

main()
