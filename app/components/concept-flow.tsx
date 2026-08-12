'use client'

import {
  Background,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import styles from './learning-visuals.module.css'

type ConceptFlowProps = {
  nodes: Node[]
  edges: Edge[]
  label: string
}

export function ConceptFlow({ nodes, edges, label }: ConceptFlowProps) {
  return (
    <div className={styles.flow} role="img" aria-label={label}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} />
      </ReactFlow>
    </div>
  )
}