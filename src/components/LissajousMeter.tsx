import { clamp } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import { useEffect } from "react"
import { log } from "@/util/util"
import { CanvasWrapper } from "./CanvasWrapper"

interface Props {
  lrBufferProcessor: AudioWorkletNode | null
  type?: "dots" | "lines"
  size?: number // dot size or line width
  circular?: boolean
}

export function LissajousMeter({
  lrBufferProcessor,
  type = "dots",
  size = 1,
  circular = true,
  style,
  ...props
}: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount LissajousMeter")

  let leftData: Float32Array = new Float32Array()
  let rightData: Float32Array = new Float32Array()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!lrBufferProcessor) return
    lrBufferProcessor.port.onmessage = (e) => {
      leftData = new Float32Array(e.data.left)
      rightData = new Float32Array(e.data.right)
    }
  }, [lrBufferProcessor])

  return (
    <CanvasWrapper
      style={{
        border: "1px solid white",
        mixBlendMode: "screen",
        ...style,
      }}
      {...props}
    >
      <AnimationCanvas
        relativeSize
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          // ctx.clearRect(0, 0, w, h)
          ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
          ctx.fillRect(0, 0, w, h)

          if (type == "lines") ctx.beginPath()
          ctx.strokeStyle = "white"
          ctx.fillStyle = "white"
          ctx.lineWidth = size
          for (let i = 0; i < leftData.length; i += 1) {
            const m = clamp((leftData[i] + rightData[i]) / 2, -1, 1)
            const s = clamp((leftData[i] - rightData[i]) / 2, -1, 1)
            let x = ((1 + s) / 2) * w
            let y = ((1 + m) / 2) * h

            if (circular) {
              const theta = Math.atan2(m, s)
              const d = Math.sqrt(s ** 2 + m ** 2 / 2)
              x = w * (0.5 + d * Math.cos(theta))
              y = h * (0.5 + d * Math.sin(theta))
            }
            if (type == "lines") {
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            } else {
              ctx.fillRect(x, y, size, size)
            }
          }
          if (type == "lines") ctx.stroke()
        }}
      />
    </CanvasWrapper>
  )
}
