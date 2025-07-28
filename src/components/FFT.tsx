import { clamp, mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import type { ComponentPropsWithoutRef } from "react"
import { getContext, type FFT as ToneFFT } from "tone"
import { lerpColor } from "@/util/canvas"
import { log } from "@/util/util"
import { CanvasWrapper } from "./CanvasWrapper"

interface Props {
  fft: ToneFFT | null
}

export function FFT({ fft, ...props }: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount FFT")

  return (
    <CanvasWrapper {...props}>
      <FFTAnimation fft={fft} />
    </CanvasWrapper>
  )
}

export function FFTAnimation({
  fft,
  ...props
}: { fft: ToneFFT | null } & ComponentPropsWithoutRef<"canvas">) {
  log("mount FFTAnimation")

  return (
    <AnimationCanvas
      relativeSize
      draw={(ctx, width, height) => {
        const w = width.current
        const h = height.current
        ctx.clearRect(0, 0, w, h)
        if (!fft) return
        fft.normalRange = false

        const dataArray = fft.getValue()
        const nyquist = getContext().sampleRate / 2

        ctx.fillStyle = "white"
        ctx.strokeStyle = "none"

        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let i = 0; i < fft.size; i++) {
          const freq = (i * nyquist) / fft.size
          const logFreq = Math.log10(freq + 1) // log(0)を防ぐため +1
          const maxLogFreq = Math.log10(nyquist + 1)
          const x = (logFreq / maxLogFreq) * w
          const data = clamp(mapValue(dataArray[i], -100, 0, 0, 1), 0, 1)
          const y = h * data
          ctx.fillStyle = lerpColor("#fff8", "#99b88d", data * 100)
          ctx.fillRect(x, h - y, 1, y)
          ctx.lineTo(x, h - y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        ctx.strokeStyle = "white"
        ctx.stroke()
      }}
      {...props}
    />
  )
}
