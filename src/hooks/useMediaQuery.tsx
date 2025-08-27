"use client"

import { useEffect, useState } from "react"

// NOTE: window.getComputedStyle によるスタイルの取得が出来ないため、一時的な処置
// ref: https://tailwindcss.com/docs/theme#referencing-in-javascript
const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
}

type Breakpoint = keyof typeof breakpoints

const createMediaQueryList = <T extends Breakpoint>(breakpoint: T) => {
  return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`)
}

export const useMediaQuery = <T extends Breakpoint>(breakpoint: T) => {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQueryList = createMediaQueryList(breakpoint)
    setMatches(mediaQueryList.matches) // for first time
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQueryList.addEventListener("change", handler)
    return () => {
      mediaQueryList.removeEventListener("change", handler)
    }
  }, [breakpoint])
  return matches
}
