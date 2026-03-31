'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground">
            <Image src="/logo.svg" alt={siteName} width={28} height={28} />
            <span className="hidden sm:inline">{siteName}</span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
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
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground hover:bg-accent-subtle/50',
                    item.children && 'pr-2'
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-64 rounded-xl border border-border bg-surface-elevated p-1.5 shadow-xl shadow-black/5 dark:shadow-black/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.link}
                          target={child.newTab ? '_blank' : undefined}
                          rel={child.newTab ? 'noopener noreferrer' : undefined}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent-subtle/50"
                        >
                          <div className="text-sm font-medium text-foreground">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="mt-0.5 text-xs text-muted">
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

        <div className="flex items-center gap-3">
          {ctaButton.show && (
            <Link
              href={ctaButton.link || '/templates'}
              className="hidden h-9 items-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 md:inline-flex"
            >
              {ctaButton.label || 'Get Started'}
            </Link>
          )}

          <button
            type="button"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-subtle/50 hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-surface px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <React.Fragment key={item.label}>
                <Link
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-accent-subtle/50 hover:text-foreground"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent-subtle/50 hover:text-foreground"
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
                className="mt-2 flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium text-white"
              >
                {ctaButton.label || 'Get Started'}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
