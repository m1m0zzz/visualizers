import { clamp } from "@tremolo-ui/functions"
import { memo, type PointerEventHandler, useCallback, useEffect } from "react"
import { useScratch } from "react-use"
import type { Filter } from "tone"
import { log } from "@/util/util"
import { FFTAnimation, type FFTProps } from "./FFT"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  filter: Filter | null
}

export function FilterFFT({
  filter,
  fft: _fft,
  fftSize,
  smoothing,
  slope,
  lowDb,
  highDb,
  mode,
  lineColor,
  barColor,
  ...props
}: Props & FFTProps & Omit<Parameters<typeof CanvasWrapper>[0], keyof Props & FFTProps>) {
  log("mount FilterFFT")
  const [ref, state] = useScratch()

  useEffect(() => {
    const fft = _fft.current
    if (!filter || !fft) return
    if (state.isScratching) {
      const sampleRate = fft.context.sampleRate
      const nyquist = sampleRate / 2
      const minHz = sampleRate / fft.size
      const maxHz = nyquist
      const logMin = Math.log10(minHz)
      const logMax = Math.log10(maxHz)
      const x = (state.x ?? 0) + (state.dx ?? 0)
      const normX = clamp(x / (state.elW ?? 1), 0, 1)
      const logFreq = normX * (logMax - logMin) + logMin
      const freq = 10 ** logFreq
      filter.set({ type: "bandpass", frequency: freq })
    } else {
      filter.set({ type: "allpass" })
    }
  }, [state, _fft, filter])

  const onPointerUp = useCallback(() => {
    if (!filter) return
    setTimeout(() => filter.set({ type: "allpass" }), 100)
  }, [filter])

  return (
    <CanvasWrapper ref={ref} {...props}>
      <Memorized
        fft={_fft}
        {...{ fftSize, smoothing, slope, lowDb, highDb, mode, lineColor, barColor }}
        onPointerUp={onPointerUp}
      />
    </CanvasWrapper>
  )
}

const Memorized = memo(
  ({
    onPointerUp,
    ...props
  }: FFTProps & {
    onPointerUp: PointerEventHandler<HTMLCanvasElement>
  }) => <FFTAnimation onPointerUp={onPointerUp} {...props} />,
)
