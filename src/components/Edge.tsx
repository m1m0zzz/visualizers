import type { ComponentProps } from "react"

interface Props {
  size?: string | number
  thickness?: string | number
  color?: string
  edge?: ComponentProps<"div">
}

export function Edge({
  size = 10,
  thickness = 1,
  color = "white",
  edge,
  style,
  children,
  ...props
}: Props & ComponentProps<"div">) {
  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        ...style,
      }}
      {...props}
    >
      {children}
      <div
        {...edge}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          borderTopStyle: "solid",
          borderTopWidth: thickness,
          borderTopColor: color,
          borderLeftStyle: "solid",
          borderLeftWidth: thickness,
          borderLeftColor: color,
          ...edge?.style,
        }}
      ></div>
      <div
        {...edge}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: size,
          height: size,
          borderTopStyle: "solid",
          borderTopWidth: thickness,
          borderTopColor: color,
          borderRightStyle: "solid",
          borderRightWidth: thickness,
          borderRightColor: color,
          ...edge?.style,
        }}
      ></div>
      <div
        {...edge}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: size,
          height: size,
          borderBottomStyle: "solid",
          borderBottomWidth: thickness,
          borderBottomColor: color,
          borderLeftStyle: "solid",
          borderLeftWidth: thickness,
          borderLeftColor: color,
          ...edge?.style,
        }}
      ></div>
      <div
        {...edge}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: size,
          height: size,
          borderBottom: "1px solid white",
          borderRight: "1px solid white",
          borderBottomStyle: "solid",
          borderBottomWidth: thickness,
          borderBottomColor: color,
          borderRightStyle: "solid",
          borderRightWidth: thickness,
          borderRightColor: color,
          ...edge?.style,
        }}
      ></div>
    </div>
  )
}
