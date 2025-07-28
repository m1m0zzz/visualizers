import { AnimationCanvas } from "@tremolo-ui/react"
import type { Waveform as ToneWaveform } from "tone"
import { log } from "@/util/util"
import { CanvasWrapper } from "./CanvasWrapper"

interface Props {
  waveform: ToneWaveform | null
  isPlay?: boolean
  color?: string
  lineWidth?: number
}

export function Waveform({
  waveform,
  isPlay,
  color = "white",
  lineWidth = 1,
  ...props
}: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount Waveform")

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        init={(ctx) => {
          ctx.fillStyle = "none"
          ctx.lineWidth = lineWidth
        }}
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          ctx.clearRect(0, 0, w, h)

          if (!waveform) return
          if (isPlay == false) return

          const _ = waveform.getValue()
          const dataArray = (typeof _ == "object" ? _ : _[0]) as Float32Array // L channel only
          const sliceWidth = w / waveform.size

          let x = 0
          ctx.beginPath()
          ctx.moveTo(0, h / 2)
          for (let i = 0; i < waveform.size; i++) {
            const data = dataArray[i] // -1 ~ 1
            const y = h / 2 + (data * h) / 2
            ctx.lineTo(x, y)
            x += sliceWidth
          }
          ctx.lineTo(w, h / 2)
          ctx.closePath()
          ctx.strokeStyle = color
          ctx.stroke()
        }}
      />
    </CanvasWrapper>
  )
}
