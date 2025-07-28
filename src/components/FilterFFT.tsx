import { clamp } from "@tremolo-ui/functions"
import { memo, type PointerEventHandler, useCallback, useEffect } from "react"
import { useScratch } from "react-use"
import { type Filter, getContext, type FFT as ToneFFT } from "tone"
import { log } from "@/util/util"
import { CanvasWrapper } from "./CanvasWrapper"
import { FFTAnimation } from "./FFT"

interface Props {
  fft: ToneFFT | null
  filter: Filter | null
}

export function FilterFFT({ fft, filter, ...props }: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount FilterFFT")
  const [ref, state] = useScratch()

  useEffect(() => {
    if (!filter) return
    if (state.isScratching) {
      const x = (state.x ?? 0) + (state.dx ?? 0)
      const p = clamp(x / (state.elW ?? 1), 0, 1)
      const nyquist = getContext().sampleRate / 2
      const hz = nyquist ** p
      filter.set({ type: "bandpass", frequency: hz })
    } else {
      filter.set({ type: "allpass" })
    }
  }, [state, filter])

  const onPointerUp = useCallback(() => {
    if (!filter) return
    setTimeout(() => filter.set({ type: "allpass" }), 100)
  }, [filter])

  return (
    <CanvasWrapper ref={ref} {...props}>
      <Memorized fft={fft} onPointerUp={onPointerUp} />
    </CanvasWrapper>
  )
}

const Memorized = memo(
  ({ fft, onPointerUp }: { fft: ToneFFT | null; onPointerUp: PointerEventHandler<HTMLCanvasElement> }) => (
    <FFTAnimation fft={fft} onPointerUp={onPointerUp} />
  ),
)
