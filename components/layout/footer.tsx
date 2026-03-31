'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

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

export function Footer({ siteName = SITE_NAME }: FooterProps) {
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
        { label: 'Randomyl Random Generator', link: 'https://randomyl.com/', newTab: true },
        { label: 'Multiple Calculators', link: 'https://calculatethis.io/', newTab: true },
        { label: 'Daily Affirmation Generator', link: 'https://aurasyncs.com/', newTab: true },
        { label: 'Invoice Generator', link: 'https://invoicepdf.io/', newTab: true },
        { label: 'Coloring Book', link: 'https://scribbloo.com/', newTab: true },
        { label: 'Online Games', link: 'https://www.ventengames.com/', newTab: true },
        { label: 'Field Management System', link: 'https://fieldtics.com/', newTab: true },
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
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Image src="/logo.svg" alt={siteName} width={24} height={24} />
              <span>{siteName}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Free Framer templates and design tools for founders, designers, and
              anyone who wants to ship a polished site without starting from scratch.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.link}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>By Ugo Charles</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <a
              href="https://www.framer.com/?via=charles"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Built with Framer
            </a>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5" />
                  Copy Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
