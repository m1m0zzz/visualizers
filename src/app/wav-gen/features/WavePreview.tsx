import { mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas, type AnimationCanvasProps } from "@tremolo-ui/react"
import { useTheme } from "next-themes"
import type { ComponentProps } from "react"
import type { Fn } from "../wavetable"

// 区間数は2以上
// t 0-1
// x 0-1
function lerpFunctions(functions: Fn[], t: number) {
  if (functions.length == 1) return functions[0]

  const segmentCount = functions.length - 1
  const segmentSize = 1 / segmentCount

  // 区間インデックスを求める
  const seg = Math.min(Math.floor(t / segmentSize), segmentCount - 1)
  // 区間内での補間率 0〜1
  const localT = (t - seg * segmentSize) / segmentSize

  const a = functions[seg]
  const b = functions[seg + 1]

  return (x: number) => a(x) * (1 - localT) + b(x) * localT
}

interface Props {
  functions: Fn[]
  color?: string
  pos?: number
}

export function WavePreview({
  functions,
  color,
  pos = 0,
  ...props
}: Props & Omit<ComponentProps<"canvas">, keyof Props>) {
  const { theme } = useTheme()

  const f = lerpFunctions(functions, pos)

  return (
    <AnimationCanvas
      {...props}
      relativeSize
      draw={(ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height)
        ctx.strokeStyle = color || (theme == "light" ? "black" : "white")
        ctx.lineWidth = 2
        const w = Math.floor(width - 2)
        ctx.beginPath()
        for (let x = 1; x < w; x++) {
          const p = x / w
          const y = 1 + mapValue(f(p), -1, 1, 1, 0) * (height - 2)
          if (x == 1) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }}
    />
  )
}
