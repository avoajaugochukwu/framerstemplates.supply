import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

async function test() {
  const url = 'https://comprehensive-center-833901.framer.app/blog/framer-vs-webflow-which-website-builder-should-you-use-in-2025'
  
  console.log(`🧪 Testing Scrape on: ${url}`)
  
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

  await page.goto(url, { waitUntil: 'networkidle2' })
  
  // Wait a bit for React to finish
  await new Promise(res => setTimeout(res, 5000))

  // 1. Take a screenshot to see if we are seeing a "Bot Challenge" or the real site
  await page.screenshot({ path: 'scrape-test.png' })
  console.log('📸 Screenshot saved to scrape-test.png')

  // 2. Identify all "data-framer-name" values on the page
  const names = await page.evaluate(() => {
    const tags = Array.from(document.querySelectorAll('[data-framer-name]'))
    return tags.map(t => ({
        name: t.getAttribute('data-framer-name'),
        textSnippet: t.textContent?.substring(0, 50).trim(),
        htmlSnippet: t.innerHTML.substring(0, 100)
    }))
  })

  console.log('🔍 Found these Framer Containers:')
  console.table(names)

  // 3. Save the full HTML of the page to a file for manual inspection
  const html = await page.content()
  fs.writeFileSync('page-debug.html', html)
  console.log('📄 Full HTML saved to page-debug.html')

  await browser.close()
  console.log('\n✅ Test complete. Check the files created in your folder.')
}

test()