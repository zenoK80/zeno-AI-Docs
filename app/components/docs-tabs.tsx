'use client'

import { Children, ReactNode, useEffect, useState } from 'react'

type TabItem =
  | ReactNode
  | {
      label: ReactNode
      disabled?: boolean
    }

type DocsTabsProps = {
  items: TabItem[]
  children: ReactNode
  defaultIndex?: number
  selectedIndex?: number
  storageKey?: string
  onChange?: (index: number) => void
}

type DocsTabProps = {
  children: ReactNode
}

function getLabel(item: TabItem) {
  return item && typeof item === 'object' && 'label' in item ? item.label : item
}

function isDisabled(item: TabItem) {
  return Boolean(item && typeof item === 'object' && 'disabled' in item && item.disabled)
}

export function DocsTab({ children }: DocsTabProps) {
  return <>{children}</>
}

export function DocsTabs({
  items,
  children,
  defaultIndex = 0,
  selectedIndex,
  storageKey,
  onChange,
}: DocsTabsProps) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const panels = Children.toArray(children)
  const activeIndex = selectedIndex ?? currentIndex

  useEffect(() => {
    if (!storageKey) {
      return
    }

    const storedIndex = Number(localStorage.getItem(storageKey))
    if (!Number.isNaN(storedIndex)) {
      setCurrentIndex(storedIndex)
    }
  }, [storageKey])

  function selectTab(index: number) {
    if (isDisabled(items[index])) {
      return
    }

    if (storageKey) {
      localStorage.setItem(storageKey, String(index))
    }

    setCurrentIndex(index)
    onChange?.(index)
  }

  return (
    <div className="docs-tabs">
      <div className="docs-tabs-list" role="tablist">
        {items.map((item, index) => {
          const selected = index === activeIndex
          const disabled = isDisabled(item)

          return (
            <button
              aria-selected={selected}
              className="docs-tabs-trigger"
              disabled={disabled}
              key={index}
              onClick={() => selectTab(index)}
              role="tab"
              type="button"
            >
              {getLabel(item)}
            </button>
          )
        })}
      </div>
      <div className="docs-tabs-panel" role="tabpanel">
        {panels[activeIndex]}
      </div>
    </div>
  )
}
