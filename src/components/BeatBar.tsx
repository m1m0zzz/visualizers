import { AnimationCanvas } from "@tremolo-ui/react"
import { getTransport } from "tone"
import { log } from "@/lib/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export function BeatBar(props: Parameters<typeof CanvasWrapper>[0]) {
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
          const transport = getTransport()
          const elapsedTime = transport.seconds
          const spBar = 240 / transport.bpm.value // second per bar
          const barPercent = (elapsedTime % spBar) / spBar

          ctx.clearRect(0, 0, w, h)
          ctx.fillRect(0, 0, w * barPercent, h)
        }}
      />
    </CanvasWrapper>
  )
}
