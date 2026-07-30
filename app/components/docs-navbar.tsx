'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'nextra/components'
import { ThemeSwitch, setMenu, useMenu } from 'nextra-theme-docs'
import { FocusEvent, MouseEvent, useEffect, useState } from 'react'

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
  const mobileMenuOpen = useMenu()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    // Nextra의 md 브레이크포인트(768px)와 동일하게 맞춘다.
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    // Nextra Collapse(horizontal)는 사이드바 remount 시 inline width를 px로 고정하는데,
    // 모바일 폭에서는 데스크톱 사이드바가 display:none이라 clientWidth가 0으로 측정되어
    // "width: 0px"가 남는다 (열림 상태에서는 height만 제거하고 width는 제거하지 않음).
    // 데스크톱으로 전환될 때 이 잘못된 0px inline width만 걷어내 Nextra 기본 레이아웃을 복원한다.
    function resetStaleSidebarWidth() {
      const sidebar = document.querySelector('aside.nextra-sidebar')
      if (!sidebar) return

      for (const element of sidebar.querySelectorAll<HTMLElement>(
        '[style*="width"]',
      )) {
        if (element.style.width === '0px') {
          element.style.removeProperty('width')
        }
      }
    }

    function handleDesktopChange() {
      if (mediaQuery.matches) {
        setMenu(false)
        resetStaleSidebarWidth()
      }
    }

    handleDesktopChange()
    mediaQuery.addEventListener('change', handleDesktopChange)

    return () => {
      mediaQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  function closeMenu(event?: MouseEvent<HTMLAnchorElement>) {
    event?.currentTarget.blur()
    setOpenMenu(null)
    setMenu(false)
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

        <button
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          className="docs-navbar-mobile-menu-button"
          onClick={() => setMenu((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

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
