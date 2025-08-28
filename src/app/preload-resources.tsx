"use client"

import type { ReactNode } from "react"
import ReactDOM from "react-dom"

export function PreloadResources({ children }: { children: ReactNode }) {
  // ReactDOM.preload("...", { as: "..." })
  // ReactDOM.preconnect("...", { crossOrigin: "..." })
  ReactDOM.prefetchDNS("https://www.google-analytics.com")

  return children
}
