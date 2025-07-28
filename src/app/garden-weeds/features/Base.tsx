import { clamp, mapValue } from "@tremolo-ui/functions"
import { AnimationCanvas, type DrawFunction } from "@tremolo-ui/react"
import { useCallback } from "react"
import { getTransport } from "tone"
import { lerpColorByCount } from "@/util/canvas"
import { log } from "@/util/util"
import { useBlurStore, useIsPlayStore } from "./store"

interface Props {
  bpm: number
}

function cMap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return clamp(mapValue(value, inMin, inMax, outMin, outMax), outMin, outMax)
}

// const lerpStart = 2
// const lerpEnd = 4
const lerpStart = 15
const lerpEnd = 17

export function Base({ bpm }: Props) {
  log("mount Base")

  const isPlay = useIsPlayStore((s) => s.isPlay)
  const setIsPlay = useIsPlayStore((s) => s.setIsPlay)
  const setBlur = useBlurStore((s) => s.setBlur)

  const draw = useCallback<DrawFunction>(
    (ctx, width, height) => {
      const w = width.current
      const h = height.current
      const elapsedTime = getTransport().seconds
      const spBar = 240 / bpm // second per bar
      const barCount = 1 + elapsedTime / spBar

      ctx.fillStyle = lerpColorByCount("#82ad8e", "#b2d48c", barCount, lerpStart, lerpEnd)
      ctx.fillRect(0, 0, w, h)

      if (!isPlay) return

      const adjustFocusStart = 16.2
      const d = 0.8
      const maxBlur = 8
      if (adjustFocusStart <= barCount && barCount <= adjustFocusStart + 1) {
        const now = barCount - adjustFocusStart
        if (now <= 0.33 * d) {
          setBlur(mapValue(now, 0, 0.33 * d, 0, maxBlur))
        } else if (now <= 0.5 * d) {
          setBlur(mapValue(now, 0.33 * d, 0.5 * d, maxBlur, 0))
        } else if (now <= 0.66 * d) {
          setBlur(mapValue(now, 0.5 * d, 0.66 * d, 0, maxBlur * 0.5))
        } else {
          setBlur(mapValue(now, 0.66 * d, 1 * d, maxBlur * 0.5, 0))
        }
      }

      if (42 <= barCount) {
        const transport = getTransport()
        transport.stop()
        transport.seconds = 0
        setIsPlay(false)
        // globalThis.location.reload()
      }
    },
    [isPlay, bpm, setBlur, setIsPlay],
  )

  const draNoise = useCallback<DrawFunction>(
    (ctx, _width, _height, count) => {
      const w = ctx.canvas.width
      const h = ctx.canvas.height
      const elapsedTime = getTransport().seconds
      const spBar = 240 / bpm // second per bar
      const barCount = 1 + elapsedTime / spBar

      if ((count - 1) % 3 != 0) return
      const gray = cMap(barCount, lerpStart, lerpEnd, 140, 185)
      const maxAlpha = cMap(barCount, lerpStart, lerpEnd, 0.7, 0.3)
      const scale = 1
      // if (count == 1 || (lerpStart <= barCount && barCount <= lerpEnd)) {
      const imageData = ctx.createImageData(w, h)
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          if (x % scale != 0 || y % scale != 0) continue
          const v = Math.random() * 255 * maxAlpha
          for (let i = 0; i < scale; i++) {
            for (let j = 0; j < scale; j++) {
              imageData.data[(x + j + (y + i) * w) * 4] = gray
              imageData.data[(x + j + (y + i) * w) * 4 + 1] = gray
              imageData.data[(x + j + (y + i) * w) * 4 + 2] = gray
              imageData.data[(x + j + (y + i) * w) * 4 + 3] = v
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
      // }
    },
    [bpm],
  )

  return (
    <>
      <AnimationCanvas style={{ position: "absolute" }} width={1280} height={720} draw={draw} />
      <AnimationCanvas style={{ position: "absolute" }} width={1280} height={720} draw={draNoise} />
    </>
  )
}
