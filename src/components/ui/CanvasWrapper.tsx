import type { ComponentProps } from "react"

interface CanvasWrapperProps {
  width?: number | string
  height?: number | string
}

export function CanvasWrapper({
  width = "100%",
  height = "100%",
  style,
  children,
  ...props
}: CanvasWrapperProps & ComponentProps<"div">) {
  return (
    <div
      style={{
        width: width,
        height: height,
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
