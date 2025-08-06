import { useAnimationFrame } from "@tremolo-ui/react"
import { type ComponentProps, useState } from "react"
import { getTransport } from "tone"

export function BeatCount(props: ComponentProps<"div">) {
  const [barCount, setBarCount] = useState(1)
  const [beatCount, setBeatCount] = useState(1)

  useAnimationFrame(() => {
    const transport = getTransport()
    const elapsedTime = transport.seconds
    const spBar = 240 / transport.bpm.value // second per bar
    const spb = 60 / transport.bpm.value // second per beat

    setBeatCount(1 + (Math.floor(elapsedTime / spb) % 4))
    setBarCount(1 + elapsedTime / spBar)
  })

  return (
    <div {...props}>
      {Math.floor(barCount)}.{beatCount}
    </div>
  )
}
