import { clamp, mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import { type ComponentPropsWithoutRef, type RefObject, useEffect } from "react"
import { FFT as ToneFFT } from "tone"
import { lerpColor } from "@/util/canvas"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export interface FFTProps {
  fft: RefObject<ToneFFT | null>
  // fft params
  fftSize?: number
  smoothing?: number
  /** -1 ~ 1 */
  slope?: number
  lowDb?: number
  highDb?: number
  // design
  lineColor?: string
  barColor?: string | { from: string; to: string }
}

export function FFT({
  fft,
  fftSize,
  smoothing,
  slope,
  lowDb,
  highDb,
  lineColor,
  barColor,
  ...props
}: FFTProps & Parameters<typeof CanvasWrapper>[0]) {
  log("mount FFT")
  log(fftSize)

  return (
    <CanvasWrapper {...props}>
      <FFTAnimation {...{ fft, fftSize, smoothing, slope, lineColor, barColor, lowDb, highDb }} />
    </CanvasWrapper>
  )
}

export function FFTAnimation({
  fft: _fft,
  fftSize = ToneFFT.getDefaults().size,
  smoothing = ToneFFT.getDefaults().smoothing,
  slope = 0,
  lowDb = -100,
  highDb = -20,
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
        const sampleRate = fft.context.sampleRate
        const nyquist = sampleRate / 2
        const minHz = sampleRate / fft.size
        const maxHz = nyquist

        ctx.strokeStyle = "none"
        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let i = 0; i < fft.size; i++) {
          const freq = (i * nyquist) / fft.size
          if (freq < minHz) continue
          const logMin = Math.log10(minHz)
          const logMax = Math.log10(maxHz)
          const logFreq = Math.log10(freq)
          const px = (logFreq - logMin) / (logMax - logMin)
          const x = px * w
          const slopeFactor = 1 - slope + 2 * slope * px
          const py = clamp(mapValue(dataArray[i], lowDb, highDb, 0, 1) * slopeFactor, 0, 1)
          const y = h * py
          ctx.fillStyle =
            typeof barColor == "string" ? barColor : lerpColor(barColor.from, barColor.to, py * 100)
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
