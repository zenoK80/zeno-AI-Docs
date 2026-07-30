import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { DocsNavbar } from './components/docs-navbar'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://zeno.it.kr'),
  title: {
    default: 'Zeno Docs',
    template: '%s | Zeno Docs',
  },
  description:
    '웹 개발 기술을 공부하며 정리하는 개인 문서입니다. JavaScript와 React를 중심으로 학습 내용을 기록하고, 관심있는 공부 자료도 함께 정리합니다.',
  openGraph: {
    type: 'website',
    siteName: 'Zeno Docs',
    title: 'Zeno Docs',
    description:
      '웹 개발 기술을 공부하며 정리하는 개인 문서입니다. JavaScript와 React를 중심으로 학습 내용을 기록하고, 관심있는 공부 자료도 함께 정리합니다.',
    url: 'https://zeno.it.kr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zeno Docs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeno Docs',
    description:
      '웹 개발 기술을 공부하며 정리하는 개인 문서입니다. JavaScript와 React를 중심으로 학습 내용을 기록하고, 관심있는 공부 자료도 함께 정리합니다.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={<DocsNavbar key="docs-navbar" pageMap={pageMap} />}
          pageMap={pageMap}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
