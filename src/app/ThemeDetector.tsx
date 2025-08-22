"use client"

import { useLayoutEffect } from "react"

export function ThemeDetector() {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    )
  }, [])

  return null
}
