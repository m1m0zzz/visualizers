import { clamp } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import clsx from "clsx"
import { useEffect, useRef } from "react"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export type LissajousMeterType = "dots" | "lines"
interface Props {
  lrBufferProcessor: AudioWorkletNode | null
  type?: LissajousMeterType
  color?: string
  /** dot size or line width */
  size?: number
  smooth?: number
  circular?: boolean
}

export function LissajousMeter({
  lrBufferProcessor,
  type = "dots",
  color = "white",
  size = 1,
  smooth = 0.92,
  circular = true,
  className,
  ...props
}: Props & Omit<Parameters<typeof CanvasWrapper>[0], keyof Props>) {
  log("mount LissajousMeter", lrBufferProcessor)

  const leftData = useRef(new Float32Array())
  const rightData = useRef(new Float32Array())

  useEffect(() => {
    if (!lrBufferProcessor) return
    lrBufferProcessor.port.onmessage = (e) => {
      leftData.current = new Float32Array(e.data.left)
      rightData.current = new Float32Array(e.data.right)
    }
  }, [lrBufferProcessor])

  return (
    <CanvasWrapper className={clsx(className, circular && "rounded-full")} {...props}>
      <AnimationCanvas
        relativeSize
        style={{
          mixBlendMode: "screen",
        }}
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          ctx.fillStyle = `rgba(0, 0, 0, ${1 - clamp(smooth, 0, 1)})`
          ctx.fillRect(0, 0, w, h)

          if (type == "lines") ctx.beginPath()
          ctx.strokeStyle = color
          ctx.fillStyle = color
          ctx.lineWidth = size

          for (let i = 0; i < leftData.current.length; i += 1) {
            const m = clamp((leftData.current[i] + rightData.current[i]) / 2, -1, 1)
            const s = clamp((leftData.current[i] - rightData.current[i]) / 2, -1, 1)
            let x = ((1 + s) / 2) * w
            let y = ((1 + m) / 2) * h

            if (circular) {
              // TODO
              const theta = Math.atan2(m, s)
              const r = Math.min(Math.sqrt(s ** 2 + m ** 2), 1)
              x = (0.5 + r * Math.cos(theta)) * w
              y = (0.5 + r * Math.sin(theta)) * h
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
