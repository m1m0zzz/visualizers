"use client"

import { useEffect } from "react"

export function ThemeDetector() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    )
  }, [])

  return null
}
