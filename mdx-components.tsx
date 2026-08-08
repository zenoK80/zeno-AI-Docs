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

const themeComponents = getThemeComponents()
const ThemeWrapper = themeComponents.wrapper
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
    wrapper: (props: Parameters<typeof ThemeWrapper>[0]) => (
      <ThemeWrapper {...props}>
        <DocsBreadcrumb />
        {props.children}
      </ThemeWrapper>
    ),

    ...components,
  }
}
