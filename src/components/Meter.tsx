import { AnimationCanvas } from "@tremolo-ui/react"
import type { Meter as ToneMeter } from "tone"
import { dbToGain } from "tone"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  meter: ToneMeter | null
}

export function Meter({ meter, ...props }: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount Meter")

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          ctx.clearRect(0, 0, w, h)
          // fft.normalRange = true

          if (!meter) return

          const _ = meter.getValue()
          const levels = typeof _ == "number" ? [_] : _
          const pad = 2
          const _w = w / levels.length - pad * (levels.length - 1)

          ctx.fillStyle = "white"
          for (let i = 0; i < levels.length; i++) {
            const gain = dbToGain(levels[i])
            const invGain = 1 - gain
            ctx.fillRect((_w + pad) * i, h * invGain, _w, h)
          }
        }}
      />
    </CanvasWrapper>
  )
}
