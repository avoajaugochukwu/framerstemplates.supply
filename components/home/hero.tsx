import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { SocialProof } from './social-proof'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white px-4 py-24 dark:from-neutral-950 dark:to-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl">
          Launch{' '}
          <span className="text-blue-600 dark:text-blue-400">
            High-Converting Websites Fast
          </span>{' '}
          with Framer Templates
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Easy customization, lightning-fast performance, and SEO optimization built in.
          Start building your perfect website today.
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
        <div className="mt-12 flex justify-center">
          <SocialProof />
        </div>
      </div>
    </section>
  )
}
