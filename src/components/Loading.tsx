import type { ComponentProps } from "react"

export function Loading({ style, ...props }: ComponentProps<"div">) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      Loading...
    </div>
  )
}
