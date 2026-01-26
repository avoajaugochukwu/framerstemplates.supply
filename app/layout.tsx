import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { SITE_NAME } from '@/lib/constants'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Premium Framer Templates`,
    template: `%s | ${SITE_NAME}`,
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
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Framer Templates`,
    description:
      'Premium Framer templates for modern websites. Beautiful, responsive templates and design tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Premium Framer Templates`,
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
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
