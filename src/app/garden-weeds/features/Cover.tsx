import clsx from "clsx"
import type { ComponentProps } from "react"
import { usePageStore } from "./provider"

export function Cover({ className, style, ...props }: ComponentProps<"div">) {
  const blur = usePageStore((s) => s.blur)

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
