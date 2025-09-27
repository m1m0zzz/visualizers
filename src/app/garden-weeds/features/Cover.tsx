import { mapValue } from "@tremolo-ui/functions"
import { useAnimationFrame } from "@tremolo-ui/react"
import { type ComponentProps, useState } from "react"
import { getTransport } from "tone"
import { cn } from "@/lib/cn"

export function Cover({ className, style, ...props }: ComponentProps<"div">) {
  const [blur, setBlur] = useState(0)

  useAnimationFrame(() => {
    const transport = getTransport()
    const elapsedTime = transport.seconds
    const spBar = 240 / transport.bpm.value // second per bar
    const barCount = 1 + elapsedTime / spBar

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
  }, [])

  return (
    <div
      className={cn(className, "absolute w-full h-full pointer-events-none")}
      style={{
        backdropFilter: blur > 0.1 ? `blur(${blur}px)` : undefined,
        ...style,
      }}
      {...props}
    ></div>
  )
}
