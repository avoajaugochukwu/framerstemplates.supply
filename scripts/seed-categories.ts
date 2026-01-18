import { getPayload } from 'payload'
import config from '../payload.config'

const categories = [
  {
    name: 'Mobile App Landing Page',
    slug: 'mobile-app-landing-page',
    description: 'Templates designed for showcasing mobile applications with app store links, feature highlights, and screenshots.',
  },
  {
    name: 'Agency',
    slug: 'agency',
    description: 'Professional templates for digital agencies, creative studios, and marketing firms.',
  },
  {
    name: 'Portfolio',
    slug: 'portfolio',
    description: 'Showcase your work with elegant portfolio templates for designers, developers, and creatives.',
  },
  {
    name: 'SAAS',
    slug: 'saas',
    description: 'Modern templates for software-as-a-service products with pricing tables, feature lists, and signup flows.',
  },
]

async function seed() {
  console.log('Seeding categories...')

  const payload = await getPayload({ config })

  for (const category of categories) {
    try {
      // Check if category already exists
      const existing = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: category.slug },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`Category "${category.name}" already exists, skipping...`)
        continue
      }

      await payload.create({
        collection: 'categories',
        data: category,
      })

      console.log(`Created category: ${category.name}`)
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed()
