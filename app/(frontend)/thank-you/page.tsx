import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Thank You | Framer Templates Supply',
  description: 'Thank you for your purchase!',
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Your purchase was successful. You&apos;ll receive a confirmation email shortly with
          download instructions.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/templates">
            <Button className="gap-2">
              Browse More Templates <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="outline">
              Need Help?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
