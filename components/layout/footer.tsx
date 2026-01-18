import Link from 'next/link'

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

export function Footer({ footer, siteName = 'Framer Templates Supply' }: FooterProps) {
  const columns = footer?.columns || [
    {
      title: 'Product',
      links: [
        { label: 'Templates', link: '/templates' },
        { label: 'Backgrounds', link: '/background' },
        { label: 'Tools', link: '/tools' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', link: '/blog' },
        { label: 'Support', link: '/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', link: '/privacy' },
        { label: 'Terms of Service', link: '/terms' },
      ],
    },
  ]

  const bottomText = footer?.bottomText || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-neutral-900 dark:text-white">
              {siteName}
            </Link>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Premium templates and tools for modern web design.
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
              {bottomText}
            </p>
            {footer?.bottomLinks && (
              <div className="flex gap-6">
                {footer.bottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.link}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
