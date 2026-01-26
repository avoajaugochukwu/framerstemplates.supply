import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function clear() {
  const { getPayload } = await import('payload')
  const configModule = await import('../payload.config')
  const config = await configModule.default
  const payload = await getPayload({ config })

  console.log('🗑️ Deleting all blog posts...')
  const posts = await payload.find({ collection: 'blog', limit: 1000 })
  
  for (const post of posts.docs) {
    await payload.delete({
      collection: 'blog',
      id: post.id,
    })
  }
  console.log('✅ Blog collection cleared.')
  process.exit(0)
}

clear().catch(console.error)