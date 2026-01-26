'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/lib/constants'

interface NavItem {
  label: string
  link: string
  newTab?: boolean
  children?: {
    label: string
    link: string
    description?: string
    icon?: string
    newTab?: boolean
  }[]
}

interface HeaderProps {
  navigation?: {
    mainNav?: NavItem[]
    ctaButton?: {
      show?: boolean
      label?: string
      link?: string
    }
  }
  siteName?: string
}

export function Header({ navigation, siteName = SITE_NAME }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  const mainNav = navigation?.mainNav?.length ? navigation.mainNav : [
    { label: 'Templates', link: '/templates' },
    { label: 'Tools', link: '/tools' },
    { label: 'Blog', link: '/blog' },
    { label: 'Gradient Backgrounds', link: '/gradient-backgrounds' },
  ]

  const ctaButton = navigation?.ctaButton || {
    show: true,
    label: 'Get Started',
    link: '/templates',
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
            <Image src="/logo.svg" alt={siteName} width={32} height={32} />
            <span className="hidden sm:inline">{siteName}</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.link}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
                    item.children && 'pr-2'
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.link}
                          target={child.newTab ? '_blank' : undefined}
                          rel={child.newTab ? 'noopener noreferrer' : undefined}
                          className="block rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <div className="font-medium text-neutral-900 dark:text-white">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {ctaButton.show && (
            <Link href={ctaButton.link || '/templates'} className="hidden md:block">
              <Button>{ctaButton.label || 'Get Started'}</Button>
            </Link>
          )}

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-neutral-900 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-900 dark:text-white" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
          <div className="flex flex-col gap-2">
            {mainNav.map((item) => (
              <React.Fragment key={item.label}>
                <Link
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-6 py-2 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {child.label}
                  </Link>
                ))}
              </React.Fragment>
            ))}
            {ctaButton.show && (
              <Link
                href={ctaButton.link || '/templates'}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2"
              >
                <Button className="w-full">{ctaButton.label || 'Get Started'}</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
