'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'nextra/icons'
import { useConfig } from 'nextra-theme-docs'
import type { ReactNode } from 'react'

interface BreadcrumbItem {
  children?: BreadcrumbItem[]
  frontMatter?: unknown
  name: string
  route: string
  title: ReactNode
}

function firstPageRoute(item: BreadcrumbItem): string | undefined {
  if ('frontMatter' in item) return item.route

  for (const child of item.children ?? []) {
    const route = firstPageRoute(child)
    if (route) return route
  }
}

export function DocsBreadcrumb() {
  const { activePath } = useConfig().normalizePagesResult

  return (
    <nav className="docs-breadcrumb" aria-label="Breadcrumb">
      {activePath.map((item, index) => {
        const isCurrent = index === activePath.length - 1
        const activeBranch = activePath[index + 1] ?? item
        const href = isCurrent
          ? undefined
          : firstPageRoute(activeBranch as BreadcrumbItem)

        return (
          <span className="docs-breadcrumb-item" key={`${item.route}-${item.name}`}>
            {index > 0 && (
              <ArrowRightIcon
                aria-hidden="true"
                className="docs-breadcrumb-separator"
                height="14"
              />
            )}
            {href ? (
              <Link href={href} prefetch={false}>
                {item.title}
              </Link>
            ) : (
              <span aria-current={isCurrent ? 'page' : undefined}>
                {item.title}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
