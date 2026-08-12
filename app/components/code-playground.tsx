'use client'

import {
  Sandpack,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react'
import styles from './code-playground.module.css'

type CodePlaygroundProps = {
  files: SandpackFiles
  template?: SandpackPredefinedTemplate
  activeFile?: string
  showConsole?: boolean
  label?: string
}

export function CodePlayground({
  files,
  template = 'vanilla',
  activeFile,
  showConsole = false,
  label = '코드 실습',
}: CodePlaygroundProps) {
  return (
    <section aria-label={label} className={styles.playground}>
      <Sandpack
        files={files}
        options={{
          activeFile,
          editorHeight: 360,
          initMode: 'user-visible',
          resizablePanels: true,
          showConsole,
          showConsoleButton: true,
          showInlineErrors: true,
          showLineNumbers: true,
          showNavigator: false,
          showTabs: Object.keys(files).length > 1,
          wrapContent: true,
        }}
        template={template}
        theme="auto"
      />
    </section>
  )
}