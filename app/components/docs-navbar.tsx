'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'nextra/components'
import { ThemeSwitch } from 'nextra-theme-docs'
import { FocusEvent, MouseEvent, useState } from 'react'

const navGroups = [
  {
    title: 'Javascript',
    href: '/javascript/Browser/01_browser-javascript-soft-final',
    section: '/javascript',
    items: [
      {
        title: 'Browser',
        href: '/javascript/Browser/01_browser-javascript-soft-final',
      },
      {
        title: 'ECMAScript',
        href: '/javascript/ECMAscript/01_the-javascript-language',
      },
    ],
  },
  {
    title: 'React',
    href: '/React/Basic/01_react-intro',
    section: '/React',
    items: [
      {
        title: 'Basic',
        href: '/React/Basic/01_react-intro',
      },
    ],
  },
  {
    title: 'CSS',
    href: '/css/01_what-is-css',
    section: '/css',
    items: [
      {
        title: 'css',
        href: '/css/01_what-is-css',
      },
    ],
  },
  {
    title: 'HTML',
    href: '/html/01_introduction-to-modern-html',
    section: '/html',
    items: [
      {
        title: 'html',
        href: '/html/01_introduction-to-modern-html',
      },
    ],
  },
]

export function DocsNavbar() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  function closeMenu(event?: MouseEvent<HTMLAnchorElement>) {
    event?.currentTarget.blur()
    setOpenMenu(null)
  }

  function closeMenuAfterFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenMenu(null)
    }
  }

  return (
    <header className="docs-navbar">
      <nav className="docs-navbar-inner" aria-label="Main navigation">
        <Link className="docs-navbar-logo" href="/" aria-label="Home page">
          <img src="/zenoLogo.svg" alt="" width="24" height="24" />
          <b>Zeno Docs</b>
        </Link>

        <div className="docs-navbar-menu">
          {navGroups.map((group) => {
            const active = pathname.startsWith(group.section)

            return (
              <div
                className="docs-navbar-group"
                data-open={openMenu === group.title}
                key={group.title}
                onBlur={closeMenuAfterFocusLeaves}
                onFocus={() => setOpenMenu(group.title)}
                onMouseEnter={() => setOpenMenu(group.title)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={openMenu === group.title}
                  className="docs-navbar-trigger"
                  href={group.href}
                  onClick={closeMenu}
                >
                  {group.title}
                  <span className="docs-navbar-chevron" aria-hidden="true" />
                </Link>
                <div className="docs-navbar-panel">
                  <div className="docs-navbar-panel-inner">
                    <div className="docs-navbar-panel-links">
                      {group.items.map((item) => (
                        <Link
                          className="docs-navbar-panel-link"
                          href={item.href}
                          key={item.href}
                          onClick={closeMenu}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="docs-navbar-tools">
          <Search />
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  )
}
