import { AnimationCanvas } from "@tremolo-ui/react"
import type { Waveform as ToneWaveform } from "tone"
import { log } from "@/lib/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

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
}: Props & Omit<Parameters<typeof CanvasWrapper>[0], keyof Props>) {
  log("mount Waveform")

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        init={(ctx) => {
          ctx.fillStyle = "none"
          ctx.lineWidth = lineWidth
        }}
        draw={(ctx, { width, height }) => {
          ctx.clearRect(0, 0, width, height)

          if (!waveform) return
          if (isPlay == false) return

          const _ = waveform.getValue()
          const dataArray = (typeof _ == "object" ? _ : _[0]) as Float32Array // L channel only
          const sliceWidth = width / waveform.size

          let x = 0
          ctx.beginPath()
          ctx.moveTo(0, height / 2)
          for (let i = 0; i < waveform.size; i++) {
            const data = dataArray[i] // -1 ~ 1
            const y = height / 2 + (data * height) / 2
            ctx.lineTo(x, y)
            x += sliceWidth
          }
          ctx.lineTo(width, height / 2)
          // ctx.closePath()
          ctx.strokeStyle = color
          ctx.stroke()
        }}
      />
    </CanvasWrapper>
  )
}
