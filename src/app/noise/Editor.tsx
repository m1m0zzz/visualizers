"use client"

import { Leva } from "leva"

export function Editor() {
  return (
    <div className="w-[280px] shrink-0">
      <Leva fill titleBar={false} flat />
    </div>
  )
}
