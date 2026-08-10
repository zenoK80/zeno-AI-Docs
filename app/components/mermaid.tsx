'use client'

import { useEffect, useId, useRef, useState } from 'react'

type MermaidProps = {
  chart: string
}

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

export function Mermaid({ chart }: MermaidProps) {
  const rawId = useId()
  const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render(dark: boolean) {
      const { default: mermaid } = await import('mermaid')
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: dark ? 'dark' : 'default',
        fontFamily: 'inherit',
      })
      try {
        const result = await mermaid.render(diagramId, chart)
        if (!cancelled) {
          setSvg(result.svg)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
        }
      }
    }

    render(isDarkMode())

    const observer = new MutationObserver(() => render(isDarkMode()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [chart, diagramId])

  if (error) {
    return <pre>{`다이어그램을 그리지 못했습니다: ${error}`}</pre>
  }

  return (
    <div
      className="mermaid-diagram"
      ref={containerRef}
      // eslint-disable-next-line react/no-danger -- mermaid.render output is trusted, author-controlled diagram source
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  )
}
