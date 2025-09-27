import { clamp, mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import { type ComponentPropsWithoutRef, type RefObject, useEffect } from "react"
import { FFT as ToneFFT } from "tone"
import { lerpColor } from "@/lib/canvas"
import { log } from "@/lib/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export type FFTDisplayMode = "both" | "line" | "bar" | "raw-lines"

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
  mode?: FFTDisplayMode
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
  mode,
  lineColor,
  barColor,
  ...props
}: FFTProps & Omit<Parameters<typeof CanvasWrapper>[0], keyof FFTProps>) {
  log("mount FFT")
  log(fftSize)

  return (
    <CanvasWrapper {...props}>
      <FFTAnimation
        {...{ fft, fftSize, smoothing, slope, mode, lineColor, barColor, lowDb, highDb }}
      />
    </CanvasWrapper>
  )
}

export function FFTAnimation({
  fft: _fft,
  fftSize = ToneFFT.getDefaults().size,
  smoothing = ToneFFT.getDefaults().smoothing,
  slope = 0,
  lowDb = -80,
  highDb = -20,
  mode = "both",
  lineColor = "white",
  barColor = "white",
  ...props
}: FFTProps & ComponentPropsWithoutRef<"canvas">) {
  log("mount FFTAnimation")

  useEffect(() => {
    const fft = _fft.current
    if (fft) {
      fft.set({ size: fftSize, smoothing })
    } else {
      _fft.current = new ToneFFT({ size: fftSize, smoothing })
    }

    return () => {
      fft?.dispose()
    }
  }, [_fft, fftSize, smoothing])

  return (
    <AnimationCanvas
      relativeSize
      draw={(ctx, { width, height }) => {
        ctx.clearRect(0, 0, width, height)
        ctx.save()
        const fft = _fft.current
        if (!fft) return
        fft.normalRange = false

        const dataArray = fft.getValue()
        const sampleRate = fft.context.sampleRate
        const nyquist = sampleRate / 2
        const minHz = sampleRate / fft.size
        const maxHz = nyquist

        const gradient = ctx.createLinearGradient(0, 0, width, 0)

        gradient.addColorStop(0, "transparent")

        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let i = 0; i < fft.size; i++) {
          const freq = (i * nyquist) / fft.size
          if (freq < minHz) continue
          const logMin = Math.log10(minHz)
          const logMax = Math.log10(maxHz)
          const logFreq = Math.log10(freq)
          const px = (logFreq - logMin) / (logMax - logMin)
          const x = px * width
          const slopeFactor = 1 - slope + 2 * slope * px
          const py = clamp(mapValue(dataArray[i], lowDb, highDb, 0, 1) * slopeFactor, 0, 1)
          const y = height * py
          const color =
            typeof barColor == "string" ? barColor : lerpColor(barColor.from, barColor.to, py * 100)
          if (mode == "raw-lines") {
            ctx.fillStyle = color
            ctx.fillRect(x, height - y, 1, y)
          } else {
            gradient.addColorStop(px, lerpColor("transparent", color, py * 100))
          }
          ctx.lineTo(x, height - y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        if (mode == "both" || mode == "line") ctx.clip()
        ctx.fillStyle = gradient
        if (mode == "both" || mode == "bar") ctx.fillRect(0, 0, width, height)

        ctx.restore()

        ctx.strokeStyle = lineColor
        if (mode == "both" || mode == "line" || mode == "raw-lines") ctx.stroke()
      }}
      {...props}
    />
  )
}
