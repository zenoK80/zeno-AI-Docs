'use client'

import JXG from 'jsxgraph'
import { useEffect, useId, useRef } from 'react'
import styles from './learning-visuals.module.css'

export function SetDiagram() {
  const generatedId = useId()
  const boardId = `set-diagram-${generatedId.replace(/:/g, '')}`
  const boardRef = useRef<JXG.Board | null>(null)

  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(boardId, {
      boundingbox: [-5, 3.2, 5, -3.2],
      axis: false,
      showCopyright: false,
      showNavigation: false,
    })

    const aCenter = board.create('point', [-1.25, 0], { visible: false, fixed: true })
    const bCenter = board.create('point', [1.25, 0], { visible: false, fixed: true })

    board.create('circle', [aCenter, 2], {
      fixed: true,
      strokeColor: '#2563eb',
      fillColor: '#60a5fa',
      fillOpacity: 0.3,
    })
    board.create('circle', [bCenter, 2], {
      fixed: true,
      strokeColor: '#dc2626',
      fillColor: '#f87171',
      fillOpacity: 0.3,
    })
    board.create('text', [-2.3, 1.8, 'A'], { fixed: true, fontSize: 18 })
    board.create('text', [2.15, 1.8, 'B'], { fixed: true, fontSize: 18 })
    board.create('text', [-0.35, 0, 'A ∩ B'], { fixed: true, fontSize: 16 })

    boardRef.current = board
    return () => {
      if (boardRef.current) JXG.JSXGraph.freeBoard(boardRef.current)
      boardRef.current = null
    }
  }, [boardId])

  return (
    <figure className={styles.diagram}>
      <div
        id={boardId}
        className={styles.board}
        role="img"
        aria-label="집합 A와 B가 일부 겹치는 벤 다이어그램"
      />
      <figcaption className={styles.caption}>
        겹친 영역은 두 집합에 모두 들어 있는 교집합 A ∩ B입니다.
      </figcaption>
    </figure>
  )
}