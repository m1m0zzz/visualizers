"use client"

import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { useCallback } from "react"
import AudioInNode from "./editor/nodes/AudioInNode"

const initBgColor = "#c9f1dd"

const nodeTypes = {
  audioInNode: AudioInNode,
}

const initialNodes = [
  {
    id: "n1",
    type: "audioInNode",
    position: { x: 0, y: 0 },
    data: { label: "Audio In", color: initBgColor },
  },
  { id: "n2", position: { x: 0, y: 200 }, data: { label: "Audio Out" }, animated: true },
]
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2", animated: true }]

export function View() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [],
  )

  return (
    <div className="w-full h-screen flex flex-col">
      <nav className="flex flex-row gap-4 p-1">
        <div>TODO: navigation</div>
        <div>File</div>
        <div>Edit</div>
        <div>Help</div>
      </nav>
      <div className="grow shrink">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div className="h-[120px]">Meters</div>
    </div>
  )
}
