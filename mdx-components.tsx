import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import {
  Banner,
  Bleed,
  Button,
  Callout,
  Cards,
  Collapse,
  FileTree,
  ImageZoom,
  Playground,
  Popup,
  Search,
  Select,
  Steps,
  Table,
} from 'nextra/components'
import { DocsTab, DocsTabs } from './app/components/docs-tabs'
import { DocsBreadcrumb } from './app/components/docs-breadcrumb'
import { Quiz } from './app/components/quiz'
import { Mermaid } from './app/components/mermaid'

const themeComponents = getThemeComponents()
const ThemeWrapper = themeComponents.wrapper
const ThemePre = themeComponents.pre
const Tabs = Object.assign((props: Parameters<typeof DocsTabs>[0]) => {
  return <DocsTabs {...props} />
}, {
  Tab: DocsTab,
})

function getCodeText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(getCodeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getCodeText(node.props.children)
  }
  return ''
}

function Pre(props: ComponentProps<'pre'>) {
  const child = props.children

  if (
    isValidElement<{ className?: string; children?: ReactNode }>(child) &&
    child.props.className?.includes('language-mermaid')
  ) {
    const chart = getCodeText(child.props.children).replace(/\n$/, '')
    return <Mermaid chart={chart} />
  }

  return ThemePre ? <ThemePre {...props} /> : <pre {...props} />
}

export function useMDXComponents(components = {}) {
  return {
    ...themeComponents,

    Banner,
    Bleed,
    Button,
    Callout,
    Cards,
    Collapse,
    FileTree,
    ImageZoom,
    Playground,
    Popup,
    pre: Pre,
    Quiz,
    Search,
    Select,
    Steps,
    Table,
    Tabs,
    'Tabs.Tab': Tabs.Tab,
    wrapper: (props: Parameters<typeof ThemeWrapper>[0]) => (
      <ThemeWrapper {...props}>
        <DocsBreadcrumb />
        {props.children}
      </ThemeWrapper>
    ),

    ...components,
  }
}
