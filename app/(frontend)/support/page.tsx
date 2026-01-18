import type { Metadata } from 'next'
import { Mail, MessageCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Support | Framer Templates Supply',
  description: 'Get help with our templates and tools. Contact our support team.',
}

export default function SupportPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Support
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Need help? We&apos;re here to assist you with any questions or issues.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <Mail className="h-6 w-6 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
              Email Support
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Send us an email and we&apos;ll get back to you within 24 hours.
            </p>
            <a href="mailto:support@framertemplates.supply" className="mt-4 block">
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </a>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <MessageCircle className="h-6 w-6 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
              Community
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Join our community to connect with other users and get help.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Join Discord
            </Button>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
              <FileText className="h-6 w-6 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
              Documentation
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Browse our guides and documentation for detailed instructions.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              View Docs
            </Button>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">
                How do I download a template?
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                After purchasing, you&apos;ll receive a download link via email. You can also access
                your purchases from your account dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">
                Can I use templates for client projects?
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Yes! All our templates come with a license that allows you to use them in
                unlimited personal and client projects.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">
                Do you offer refunds?
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                We offer a 14-day money-back guarantee. If you&apos;re not satisfied, contact us
                for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
