import type { Metadata } from 'next'
import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap'
import { serverFunctions } from './admin/actions'
import React from 'react'
import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Admin - Framer Templates Supply',
  description: 'Content management dashboard',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunctions}
    >
      {children}
    </RootLayout>
  )
}
