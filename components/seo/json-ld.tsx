import { SITE_NAME } from '@/lib/constants'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://framertemplates.supply'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/android-chrome-512x512.png`,
        sameAs: [],
      }}
    />
  )
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteUrl,
        description:
          'Free, polished Framer templates for SaaS, portfolios, and agencies. Remix in one click, customize in minutes, and launch a site that converts.',
      }}
    />
  )
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  image,
  publishDate,
  author,
}: {
  title: string
  description: string
  url: string
  image?: string
  publishDate: string
  author: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url,
        ...(image ? { image } : {}),
        datePublished: publishDate,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/android-chrome-512x512.png`,
          },
        },
      }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  url,
  image,
  isFree,
  price,
  currency,
}: {
  name: string
  description: string
  url: string
  image?: string
  isFree?: boolean
  price?: number
  currency?: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        url,
        ...(image ? { image } : {}),
        offers: {
          '@type': 'Offer',
          price: isFree ? 0 : (price || 0),
          priceCurrency: currency || 'USD',
          availability: 'https://schema.org/InStock',
        },
      }}
    />
  )
}
