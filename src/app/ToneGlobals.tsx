"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { getTransport } from "tone"
import { log } from "@/lib/util"

export function ToneGlobals() {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      log("page transitioned:", pathname)
      const transport = getTransport()
      transport.cancel()
      transport.stop()
      transport.seconds = 0

      prevPathRef.current = pathname
    }
  }, [pathname])

  return null
}
