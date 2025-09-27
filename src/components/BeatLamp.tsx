import { AnimationCanvas } from "@tremolo-ui/react"
import { getTransport } from "tone"
import { CanvasWrapper } from "./ui/CanvasWrapper"

export function BeatLamp(props: Parameters<typeof CanvasWrapper>[0]) {
  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        init={(ctx) => {
          ctx.fillStyle = "none"
        }}
        draw={(ctx, { width, height }) => {
          const transport = getTransport()
          const elapsedTime = transport.seconds
          const spb = 60 / transport.bpm.value // second per beat

          ctx.clearRect(0, 0, width, height)
          const a = elapsedTime / spb - Math.floor(elapsedTime / spb)
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - a})`
          ctx.fillRect(0, 0, width, height)
        }}
      />
    </CanvasWrapper>
  )
}
