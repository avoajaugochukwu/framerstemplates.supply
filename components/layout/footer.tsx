'use client'

import Link from 'next/link'
import { useState } from 'react'

interface FooterColumn {
  title: string
  links: {
    label: string
    link: string
    newTab?: boolean
  }[]
}

interface FooterProps {
  footer?: {
    columns?: FooterColumn[]
    bottomText?: string
    bottomLinks?: {
      label: string
      link: string
    }[]
  }
  siteName?: string
}

export function Footer({ siteName = 'FramerTemplates.supply' }: FooterProps) {
  const [copied, setCopied] = useState(false)

  const columns: FooterColumn[] = [
    {
      title: 'Framer Templates',
      links: [
        { label: 'All Templates', link: '/templates' },
        { label: 'SaaS', link: '/templates?category=saas' },
        { label: 'Agency', link: '/templates?category=agency' },
        { label: 'Portfolio', link: '/templates?category=portfolio' },
      ],
    },
    {
      title: 'Tools',
      links: [
        { label: 'Gradient Generator', link: '/tools/gradient-generator' },
        { label: 'Color Picker', link: '/tools/color-picker' },
      ],
    },
    {
      title: 'Gradient Backgrounds',
      links: [
        { label: 'Browse Gradients', link: '/background' },
        { label: 'Create Your Own', link: '/tools/gradient-generator' },
      ],
    },
  ]

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@framertemplates.supply')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'hello@framertemplates.supply'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-neutral-900 dark:text-white">
              {siteName}
            </Link>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Premium Framer templates and design tools to help you launch beautiful,
              high-converting websites faster. Crafted with attention to detail and
              optimized for performance.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.link}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <span>By Ugo Charles</span>
              <span className="hidden sm:inline">|</span>
              <span>Built with Framer</span>
              <span className="hidden sm:inline">|</span>
              <button
                onClick={handleCopyEmail}
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
