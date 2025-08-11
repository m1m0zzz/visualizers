import { Handle, Position } from "@xyflow/react"
import { memo } from "react"

interface Props {
  data: {
    onChange: (url: string) => void
  }
  isConnectable?: boolean
}

export default memo(({ data, isConnectable }: Props) => {
  return (
    <>
      <div>Audio In</div>
      <label htmlFor="File">
        <span className="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          Browse files
        </span>
        <input
          className="nodrag sr-only"
          id="File"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.item(0)
            if (!file) return
            const objectUrl = URL.createObjectURL(file)
            data.onChange(objectUrl)
          }}
        />
      </label>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  )
})
