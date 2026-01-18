import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidation-secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { collection, slug, global } = body

    if (global) {
      revalidateTag(global)
      revalidatePath('/', 'layout')
      return NextResponse.json({
        revalidated: true,
        global,
        timestamp: Date.now(),
      })
    }

    if (collection) {
      revalidateTag(collection)

      const pathMap: Record<string, string> = {
        blog: '/blog',
        templates: '/templates',
        gradients: '/background',
        tools: '/tools',
        colors: '/colors',
      }

      if (pathMap[collection]) {
        revalidatePath(pathMap[collection])
        if (slug) {
          revalidatePath(`${pathMap[collection]}/${slug}`)
        }
      }

      return NextResponse.json({
        revalidated: true,
        collection,
        slug,
        timestamp: Date.now(),
      })
    }

    return NextResponse.json(
      { error: 'Missing collection or global parameter' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate', details: String(error) },
      { status: 500 }
    )
  }
}
