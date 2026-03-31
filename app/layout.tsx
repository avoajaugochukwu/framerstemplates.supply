import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SITE_NAME } from '@/lib/constants'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Free Framer Templates to Ship Your Site Faster`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free, polished Framer templates for SaaS, portfolios, and agencies. Remix in one click, customize in minutes, and launch a site that converts — no code needed.',
  keywords: [
    'Framer templates',
    'free Framer templates',
    'Framer website templates',
    'no-code website builder',
    'Framer portfolio template',
    'Framer SaaS template',
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Framer Templates to Ship Your Site Faster`,
    description:
      'Free Framer templates for SaaS, portfolios, and agencies. Remix in one click, launch in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Free Framer Templates to Ship Your Site Faster`,
    description:
      'Free Framer templates for SaaS, portfolios, and agencies. Remix in one click, launch in minutes.',
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
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
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
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MH05D85J94"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MH05D85J94');
        `}
      </Script>
    </html>
  )
}
