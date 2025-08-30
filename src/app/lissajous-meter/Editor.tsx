"use client"

import { Leva } from "leva"
import { FileInput } from "@/components/ui/FileInput"
import { log } from "@/util/util"
import { useObjectUrlStore } from "./store"

export function Editor() {
  const setObjectUrl = useObjectUrlStore((s) => s.setObjectUrl)

  return (
    <div className="w-[280px] shrink-0">
      <FileInput
        onChange={(e) => {
          const file = e.target.files?.item(0)
          if (!file) return

          const objectUrl = URL.createObjectURL(file)
          log(objectUrl)
          setObjectUrl(objectUrl)
        }}
      />
      <Leva fill titleBar={false} flat />
    </div>
  )
}
