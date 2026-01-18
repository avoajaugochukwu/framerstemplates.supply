import Link from 'next/link'
import { ArrowRight, Palette, Layout, Code, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui'
import { getPayloadClient } from '@/lib/payload'

async function getFeaturedTemplates() {
  try {
    const payload = await getPayloadClient()
    const templates = await payload.find({
      collection: 'templates',
      where: {
        status: { equals: 'published' },
        featured: { equals: true },
      },
      limit: 3,
      sort: '-createdAt',
    })
    return templates.docs
  } catch {
    return []
  }
}

async function getLatestPosts() {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'blog',
      where: {
        status: { equals: 'published' },
      },
      limit: 3,
      sort: '-publishedDate',
    })
    return posts.docs
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [templates, posts] = await Promise.all([
    getFeaturedTemplates(),
    getLatestPosts(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white px-4 py-24 dark:from-neutral-950 dark:to-neutral-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl">
            Premium Framer Templates
            <span className="block text-neutral-500 dark:text-neutral-400">for Modern Websites</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Beautiful, responsive templates and design tools to help you build stunning websites faster.
            Crafted with attention to detail and optimized for performance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/templates">
              <Button size="lg" className="gap-2">
                Browse Templates <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-neutral-200 bg-white px-4 py-24 dark:border-neutral-800 dark:bg-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Everything you need to build
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
              From beautiful templates to powerful design tools, we&apos;ve got you covered.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Templates
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Professionally designed Framer templates ready for your next project.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Gradients
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Beautiful gradient backgrounds for your designs and projects.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Tools
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Helpful design tools including gradient generators and color pickers.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Blog
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Tips, tutorials, and insights on design and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      {templates.length > 0 && (
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Featured Templates
                </h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Our most popular and recently updated templates.
                </p>
              </div>
              <Link href="/templates" className="hidden sm:block">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Link
                  key={template.id}
                  href={`/templates/${template.slug}`}
                  className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900">
                    {/* Template preview image would go here */}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                      {template.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {template.description}
                    </p>
                    {template.price && (
                      <p className="mt-4 font-semibold text-neutral-900 dark:text-white">
                        {template.price.isFree
                          ? 'Free'
                          : `$${template.price.amount} ${template.price.currency}`}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/templates" className="mt-8 block text-center sm:hidden">
              <Button variant="outline" className="gap-2">
                View All Templates <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Blog Posts Section */}
      {posts.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-24 dark:border-neutral-800 dark:bg-neutral-900 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Latest from the Blog
                </h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Tips, tutorials, and design inspiration.
                </p>
              </div>
              <Link href="/blog" className="hidden sm:block">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                    {/* Blog post image would go here */}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                        {post.excerpt}
                      </p>
                    )}
                    {post.publishedDate && (
                      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/blog" className="mt-8 block text-center sm:hidden">
              <Button variant="outline" className="gap-2">
                View All Posts <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Ready to build something amazing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
            Browse our collection of templates and start building your next project today.
          </p>
          <div className="mt-8">
            <Link href="/templates">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
