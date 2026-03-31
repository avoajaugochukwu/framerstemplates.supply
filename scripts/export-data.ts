import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

async function exportData() {
  const payload = await getPayload({ config: configPromise })
  const dataDir = path.join(process.cwd(), 'content', 'data')

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Export collections
  const collections = ['templates', 'tools', 'colors', 'gradients', 'categories'] as const
  for (const collection of collections) {
    console.log(`Exporting ${collection}...`)
    const result = await payload.find({
      collection,
      limit: 10000,
      depth: 2,
    })
    fs.writeFileSync(
      path.join(dataDir, `${collection}.json`),
      JSON.stringify(result.docs, null, 2)
    )
    console.log(`  → ${result.docs.length} ${collection} exported`)
  }

  // Export globals
  const globals = ['site-settings', 'navigation', 'footer'] as const
  for (const global of globals) {
    console.log(`Exporting global: ${global}...`)
    const result = await payload.findGlobal({ slug: global })
    fs.writeFileSync(
      path.join(dataDir, `${global}.json`),
      JSON.stringify(result, null, 2)
    )
    console.log(`  → ${global} exported`)
  }

  console.log('\nDone! All data exported to content/data/')
  process.exit(0)
}

exportData().catch((err) => {
  console.error('Export failed:', err)
  process.exit(1)
})
