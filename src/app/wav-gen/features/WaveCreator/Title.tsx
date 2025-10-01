import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"

export function Title({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(className, "text-sm font-mono font-bold text-stone-500 dark:text-stone-300")}
      {...props}
    >
      {children}
    </div>
  )
}
