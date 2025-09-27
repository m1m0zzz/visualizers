import type { ComponentProps } from "react"
import { LuDownload } from "react-icons/lu"

import { Button } from "@/components/ui/shadcn/button"

interface Props {
  children?: string
}

export function DownloadButton({
  children,
  ...props
}: Props & Omit<ComponentProps<"button">, keyof Props>) {
  return (
    <Button variant="outline" size="sm" {...props}>
      <LuDownload /> {children}
    </Button>
  )
}
