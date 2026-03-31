import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSiteSettings, getNavigation, getFooter } from '@/lib/data'
import { SITE_NAME } from '@/lib/constants'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = getSiteSettings()
  const navigation = getNavigation()
  const footer = getFooter()

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
