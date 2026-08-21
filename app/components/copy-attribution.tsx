'use client'

import { useEffect } from 'react'

function getAttribution() {
  const title = document.querySelector('h1')?.textContent?.trim() || document.title

  return `\n\n출처: ${title}\n${window.location.href}`
}

function withAttribution(content: string) {
  return content.includes(window.location.href)
    ? content
    : `${content.trimEnd()}${getAttribution()}`
}

export function CopyAttribution() {
  useEffect(() => {
    let isCopyPageAction = false
    const clipboard = navigator.clipboard
    const originalWriteText = clipboard?.writeText

    const handleSelectionCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim()

      if (!selection || !event.clipboardData) return

      event.preventDefault()
      event.clipboardData.setData('text/plain', withAttribution(selection))
    }

    const markCopyPageAction = () => {
      isCopyPageAction = true
      window.setTimeout(() => {
        isCopyPageAction = false
      }, 0)
    }

    const handleClickCapture = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const button = target?.closest('button')

      if (button?.textContent?.includes('Copy page')) {
        markCopyPageAction()
      }
    }

    const handleChangeCapture = (event: Event) => {
      const target = event.target

      if (
        target instanceof HTMLSelectElement &&
        target.selectedOptions[0]?.textContent?.includes('Copy page')
      ) {
        markCopyPageAction()
      }
    }

    document.addEventListener('copy', handleSelectionCopy)
    document.addEventListener('click', handleClickCapture, true)
    document.addEventListener('change', handleChangeCapture, true)

    if (originalWriteText) {
      clipboard.writeText = async (content: string) =>
        originalWriteText.call(
          clipboard,
          isCopyPageAction ? withAttribution(content) : content
        )
    }

    return () => {
      document.removeEventListener('copy', handleSelectionCopy)
      document.removeEventListener('click', handleClickCapture, true)
      document.removeEventListener('change', handleChangeCapture, true)

      if (originalWriteText) {
        clipboard.writeText = originalWriteText
      }
    }
  }, [])

  return null
}