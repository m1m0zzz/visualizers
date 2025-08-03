import { clamp, mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import { type ComponentPropsWithoutRef, type RefObject, useEffect } from "react"
import { getContext, FFT as ToneFFT } from "tone"
import { lerpColor } from "@/util/canvas"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export interface FFTProps {
  fft: RefObject<ToneFFT | null>
  // fft params
  fftSize?: number
  smoothing?: number
  // design
  lineColor?: string
  barColor?: string | { from: string; to: string }
}

export function FFT({
  fft,
  fftSize,
  smoothing,
  lineColor,
  barColor,
  ...props
}: FFTProps & Parameters<typeof CanvasWrapper>[0]) {
  log("mount FFT")
  log(fftSize)

  return (
    <CanvasWrapper {...props}>
      <FFTAnimation {...{ fft, fftSize, smoothing, lineColor, barColor }} />
    </CanvasWrapper>
  )
}

export function FFTAnimation({
  fft: _fft,
  fftSize = ToneFFT.getDefaults().size,
  smoothing = ToneFFT.getDefaults().smoothing,
  lineColor = "white",
  barColor = "white",
  ...props
}: FFTProps & ComponentPropsWithoutRef<"canvas">) {
  log("mount FFTAnimation")

  useEffect(() => {
    const fft = _fft.current
    if (fft) {
      fft.size = fftSize
      fft.smoothing = smoothing
    } else {
      _fft.current = new ToneFFT({ size: fftSize, smoothing })
    }
  }, [_fft, fftSize, smoothing])

  return (
    <AnimationCanvas
      relativeSize
      draw={(ctx, width, height) => {
        const w = width.current
        const h = height.current
        ctx.clearRect(0, 0, w, h)
        const fft = _fft.current
        if (!fft) return
        fft.normalRange = false

        const dataArray = fft.getValue()
        const nyquist = getContext().sampleRate / 2

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
          ctx.fillStyle =
            typeof barColor == "string"
              ? barColor
              : lerpColor(barColor.from, barColor.to, data * 100)
          ctx.fillRect(x, h - y, 1, y)
          ctx.lineTo(x, h - y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        ctx.strokeStyle = lineColor
        ctx.stroke()
      }}
      {...props}
    />
  )
}
