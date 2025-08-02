import { AnimationCanvas } from "@tremolo-ui/react"
import { getTransport } from "tone"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  bpm: number
  isPlay: boolean
}

export function BeatBar({ bpm, isPlay, ...props }: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount BeatBar")

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        init={(ctx) => {
          ctx.fillStyle = "none"
          ctx.fillStyle = "white"
        }}
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          const elapsedTime = getTransport().seconds
          const spBar = 240 / bpm // second per bar
          const barPercent = (elapsedTime % spBar) / spBar

          /// reset
          ctx.clearRect(0, 0, w, h)

          if (!isPlay) return

          ctx.fillRect(0, 0, w * barPercent, h)
        }}
      />
    </CanvasWrapper>
  )
}
