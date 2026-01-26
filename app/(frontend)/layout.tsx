import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getPayloadClient } from '@/lib/payload'
import { SITE_NAME } from '@/lib/constants'

async function getGlobals() {
  try {
    const payload = await getPayloadClient()
    const [siteSettings, navigation, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    return { siteSettings, navigation, footer }
  } catch {
    return { siteSettings: null, navigation: null, footer: null }
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { siteSettings, navigation, footer } = await getGlobals()

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        navigation={navigation as Parameters<typeof Header>[0]['navigation']}
        siteName={siteSettings?.siteName || SITE_NAME}
      />
      <main className="flex-1">{children}</main>
      <Footer
        footer={footer as Parameters<typeof Footer>[0]['footer']}
        siteName={siteSettings?.siteName || SITE_NAME}
      />
    </div>
  )
}
