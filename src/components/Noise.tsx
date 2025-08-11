import { AnimationCanvas, type DrawFunction } from "@tremolo-ui/react"
import { useCallback } from "react"
import { randRange } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface NoiseProps {
  /** rgb or gray */
  color: { r: number; g: number; b: number } | number
  /** 0 <= minAlpha < maxAlpha */
  minAlpha?: number
  /** minAlpha < maxAlpha <= 1 */
  maxAlpha?: number
  /** 1 <= noiseSize */
  noiseSize?: number
  /** 1 <= frameLimit */
  frameLimit?: number
}

export function Noise({
  color,
  minAlpha = 0,
  maxAlpha = 1,
  noiseSize = 1,
  frameLimit = 5,
  style,
  ...props
}: NoiseProps & Omit<Parameters<typeof CanvasWrapper>[0], keyof NoiseProps>) {
  const draNoise = useCallback<DrawFunction>(
    (ctx, _width, _height, count) => {
      const w = ctx.canvas.width
      const h = ctx.canvas.height
      if (w <= 0 || h <= 0) return

      if ((count - 1) % frameLimit != 0) return
      const c = typeof color == "number" ? { r: color, g: color, b: color } : color
      const imageData = ctx.createImageData(w, h)
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          if (x % noiseSize != 0 || y % noiseSize != 0) continue
          const v = randRange(minAlpha, maxAlpha) * 255
          for (let i = 0; i < noiseSize; i++) {
            for (let j = 0; j < noiseSize; j++) {
              imageData.data[(x + j + (y + i) * w) * 4] = c.r
              imageData.data[(x + j + (y + i) * w) * 4 + 1] = c.g
              imageData.data[(x + j + (y + i) * w) * 4 + 2] = c.b
              imageData.data[(x + j + (y + i) * w) * 4 + 3] = v
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
    },
    [color, minAlpha, maxAlpha, noiseSize, frameLimit],
  )

  return (
    <CanvasWrapper style={{ ...style }} {...props}>
      <AnimationCanvas relativeSize draw={draNoise} />
    </CanvasWrapper>
  )
}
