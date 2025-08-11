import {
  Handle,
  type NodeProps,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react"
import { memo, useEffect } from "react"

import { isTextNode, type MyNode } from "../types"

function UppercaseNode({ id }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const connections = useNodeConnections({
    handleType: "target",
  })
  const nodesData = useNodesData<MyNode>(connections[0]?.source)
  const textNode = isTextNode(nodesData) ? nodesData : null

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateNodeData(id, { text: textNode?.data.text.toUpperCase() })
  }, [textNode])

  return (
    <div>
      <Handle type="target" position={Position.Left} isConnectable={connections.length === 0} />
      <div>uppercase transform</div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(UppercaseNode)
