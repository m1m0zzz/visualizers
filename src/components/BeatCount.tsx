import { useAnimationFrame } from "@tremolo-ui/react"
import { type ComponentProps, useState } from "react"
import { getTransport } from "tone"

interface Props {
  bpm: number
  isPlay: boolean
}

export function BeatCount({ bpm, isPlay, ...props }: Props & ComponentProps<"div">) {
  const [barCount, setBarCount] = useState(1)
  const [beatCount, setBeatCount] = useState(1)

  useAnimationFrame(() => {
    if (!isPlay) return
    const spb = 60 / bpm // second per beat
    const spBar = 240 / bpm // second per bar
    const elapsedTime = getTransport().seconds
    // log(elapsedTime)

    setBeatCount(1 + (Math.floor(elapsedTime / spb) % 4))
    setBarCount(1 + elapsedTime / spBar)
  })

  return (
    <div {...props}>
      {Math.floor(barCount)}.{beatCount}
    </div>
  )
}
