import { AnimationCanvas } from "@tremolo-ui/react"
import { getTransport } from "tone"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  bpm: number
  isPlay: boolean
}

export function BeatLamp({ bpm, isPlay, ...props }: Props & Parameters<typeof CanvasWrapper>[0]) {
  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        init={(ctx) => {
          ctx.fillStyle = "none"
        }}
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          const elapsedTime = getTransport().seconds
          const spb = 60 / bpm // second per beat

          /// reset
          ctx.clearRect(0, 0, w, h)

          if (!isPlay) return

          const a = elapsedTime / spb - Math.floor(elapsedTime / spb)
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - a})`
          ctx.fillRect(0, 0, w, h)
        }}
      />
    </CanvasWrapper>
  )
}
