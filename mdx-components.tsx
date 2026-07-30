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

const themeComponents = getThemeComponents()
const Tabs = Object.assign((props: Parameters<typeof DocsTabs>[0]) => {
  return <DocsTabs {...props} />
}, {
  Tab: DocsTab,
})

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
    Search,
    Select,
    Steps,
    Table,
    Tabs,
    'Tabs.Tab': Tabs.Tab,

    ...components,
  }
}
