import type { ComponentProps } from "react"
import styles from "../styles.module.css"
import { useBlurStore } from "./store"

export function Cover({ style, ...props }: ComponentProps<"div">) {
  const blur = useBlurStore((s) => s.blur)

  return (
    <div
      className={styles.absolute}
      style={{
        backdropFilter: `blur(${blur}px)`,
        pointerEvents: "none",
        ...style,
      }}
      {...props}
    ></div>
  )
}
