import clsx from "clsx"
import type { ComponentProps } from "react"
import { useBlurStore } from "./store"

export function Cover({ className, style, ...props }: ComponentProps<"div">) {
  const blur = useBlurStore((s) => s.blur)

  return (
    <div
      className={clsx(className, "absolute w-full h-full pointer-events-none")}
      style={{
        backdropFilter: `blur(${blur}px)`,
        ...style,
      }}
      {...props}
    ></div>
  )
}
