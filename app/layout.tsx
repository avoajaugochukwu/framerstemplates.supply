import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Framer Templates Supply | Premium Framer Templates',
    template: '%s | Framer Templates Supply',
  },
  description:
    'Premium Framer templates for modern websites. Beautiful, responsive templates and design tools to help you build stunning websites faster.',
  keywords: [
    'Framer templates',
    'website templates',
    'Framer',
    'web design',
    'UI templates',
    'design tools',
  ],
  authors: [{ name: 'Framer Templates Supply' }],
  creator: 'Framer Templates Supply',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Framer Templates Supply',
    title: 'Framer Templates Supply | Premium Framer Templates',
    description:
      'Premium Framer templates for modern websites. Beautiful, responsive templates and design tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Framer Templates Supply | Premium Framer Templates',
    description:
      'Premium Framer templates for modern websites. Beautiful, responsive templates and design tools.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
