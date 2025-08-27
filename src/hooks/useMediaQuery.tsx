"use client"

import { useEffect, useState } from "react"

const breakpoints = ["sm", "md", "lg", "xl", "2xl"] as const
type Breakpoint = (typeof breakpoints)[number]

const createMediaQueryList = <T extends Breakpoint>(breakpoint: T) => {
  const width = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--breakpoint-${breakpoint}`)
  return window.matchMedia(`(min-width: ${width})`)
}

export const useMediaQuery = <T extends Breakpoint>(breakpoint: T) => {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    console.log("a")
    const mediaQueryList = createMediaQueryList(breakpoint)
    // for first time
    setMatches(mediaQueryList.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQueryList.addEventListener("change", handler)
    return () => {
      mediaQueryList.removeEventListener("change", handler)
    }
  }, [breakpoint])
  return matches
}
