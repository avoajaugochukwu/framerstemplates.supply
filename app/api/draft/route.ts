import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug || !collection) {
    return new Response('Missing slug or collection', { status: 400 })
  }

  const payload = await getPayloadClient()

  try {
    const { docs } = await payload.find({
      collection: collection as 'blog' | 'templates' | 'gradients' | 'tools' | 'colors',
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: true,
      limit: 1,
    })

    if (!docs.length) {
      return new Response('Document not found', { status: 404 })
    }

    const draft = await draftMode()
    draft.enable()

    const pathMap: Record<string, string> = {
      blog: '/blog',
      templates: '/templates',
      gradients: '/background',
      tools: '/tools',
      colors: '/colors',
    }

    const basePath = pathMap[collection] || `/${collection}`
    redirect(`${basePath}/${slug}`)
  } catch (error) {
    return new Response(`Error enabling draft mode: ${String(error)}`, {
      status: 500,
    })
  }
}

export async function POST(_req: NextRequest) {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode disabled', { status: 200 })
}
