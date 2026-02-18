import * as dotenv from 'dotenv'
import path from 'path'
import puppeteer from 'puppeteer'
import TurndownService from 'turndown'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const convertToLexical = (markdown: string) => {
  const blocks = markdown.split('\n').filter(line => line.trim() !== '')
  const children = blocks.map(line => {
    let type = 'paragraph'; let tag = ''; let text = line
    if (line.startsWith('# ')) { type = 'heading'; tag = 'h1'; text = line.replace('# ', '') }
    else if (line.startsWith('## ')) { type = 'heading'; tag = 'h2'; text = line.replace('## ', '') }
    else if (line.startsWith('### ')) { type = 'heading'; tag = 'h3'; text = line.replace('### ', '') }
    return {
      type, tag, format: '', indent: 0, version: 1,
      children: [{ type: 'text', text: text, version: 1 }],
    }
  })
  return { root: { type: 'root', format: '', indent: 0, version: 1, children } }
}

async function run() {
  console.log('🚀 Initializing Payload...')
  const { getPayload } = await import('payload')
  const configModule = await import('../payload.config')
  const config = await configModule.default
  const payload = await getPayload({ config })

  const allPosts = await payload.find({ collection: 'blog', limit: 500 })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

  for (const post of allPosts.docs) {
    const url = `https://comprehensive-center-833901.framer.app/blog/${post.slug}`
    console.log(`\n📄 Processing: ${post.title}`)

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
      await page.waitForSelector('[data-framer-name="Main"]', { timeout: 15000 })

      const result = await page.evaluate(() => {
        const main = document.querySelector('[data-framer-name="Main"]');
        if (!main) return null;

        // 1. CLEANUP METADATA AND TITLES
        const junkNames = ['Written by', 'Title', '7 min read', '8 min read', '9 min read', '6 min read', 'Frame 1272637951'];
        junkNames.forEach(name => {
          main.querySelectorAll(`[data-framer-name="${name}"]`).forEach(el => el.remove());
        });
        main.querySelectorAll('h1').forEach(h => h.remove());

        // 2. FIND FEATURED IMAGE URL
        const allImgs = Array.from(main.querySelectorAll('img'));
        const badImgUrl = 'UtwCFs9EUJLEv8fODN3vN0ins.jpg';
        
        // Find the first image that isn't the "bad" logo image and isn't a tiny icon
        const featuredImg = allImgs.find(img => !img.src.includes(badImgUrl) && !img.src.includes('.svg') && img.width > 200);
        const featuredImgUrl = featuredImg ? featuredImg.src : null;

        // Remove the featured image from the body HTML
        if (featuredImg) featuredImg.remove();

        // Remove the specific bad logo image everywhere
        allImgs.forEach(img => { if (img.src.includes(badImgUrl)) img.remove(); });

        // 3. EXTRACT CLEAN CONTENT BLOCKS
        const allBlocks = Array.from(main.querySelectorAll('[data-framer-name^="Content"]'));
        const topLevelBlocks = allBlocks.filter(block => {
            return !allBlocks.some(otherBlock => otherBlock !== block && otherBlock.contains(block));
        });

        const html = topLevelBlocks
            .filter(el => (el.textContent || '').trim().length > 30)
            .map(el => el.innerHTML)
            .join('<br/>');

        return { html, featuredImgUrl };
      })

      if (!result || !result.html) continue;

      // 4. DOWNLOAD AND UPLOAD IMAGE TO PAYLOAD MEDIA
      let mediaId = undefined;
      if (result.featuredImgUrl) {
        try {
            console.log(`📸 Downloading Image...`)
            const imgRes = await fetch(result.featuredImgUrl);
            const arrayBuffer = await imgRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const mediaFile = await payload.create({
                collection: 'media',
                data: { alt: post.title },
                file: {
                    data: buffer,
                    name: `${post.slug}.jpg`,
                    mimetype: 'image/jpeg',
                    size: buffer.length,
                }
            });
            mediaId = mediaFile.id;
        } catch (e) {
            console.error(`❌ Image download failed for ${post.slug}`);
        }
      }

      // 5. UPDATE DB
      const markdown = turndownService.turndown(result.html)
      await payload.update({
        collection: 'blog',
        id: post.id,
        data: {
          content: convertToLexical(markdown) as any,
          featuredImage: mediaId || (post.featuredImage as any)?.id,
          excerpt: markdown.split('\n').find(l => l.length > 50)?.replace(/[#*]/g, '').substring(0, 160) + '...'
        },
      })

      console.log(`✅ Success: ${post.slug}`)
      await delay(2000) 

    } catch (err) {
      console.error(`❌ Error on ${post.slug}:`, err)
    }
  }

  await browser.close();
  process.exit(0);
}

run().catch(console.error)