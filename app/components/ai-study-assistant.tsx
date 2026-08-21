'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { RiCloseLine } from 'react-icons/ri'

export function AiStudyAssistant() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className="zeno-ai-launcher">
      {isOpen && (
        <section
          aria-labelledby="zeno-ai-panel-title"
          className="zeno-ai-panel"
          id="zeno-ai-panel"
          role="dialog"
        >
          <div>
            <span className="zeno-ai-kicker">ZENO AI DOCS</span>
            <h2 id="zeno-ai-panel-title">AI 학습 도우미</h2>
          </div>
          <button
            aria-label="AI 학습 도우미 닫기"
            className="zeno-ai-close"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <RiCloseLine aria-hidden="true" />
          </button>
          <p>현재 문서를 바탕으로 질문에 답하는 기능을 준비하고 있습니다.</p>
        </section>
      )}
      <button
        aria-controls="zeno-ai-panel"
        aria-expanded={isOpen}
        aria-label="AI 학습 도우미"
        className="zeno-ai-button"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span className="zeno-ai-tooltip">문서 질문하기</span>
        <Image alt="" aria-hidden="true" className="zeno-ai-button-image" height={34} src="/zeno-chatbot.png" width={34} />
      </button>
    </div>,
    document.body
  )
}