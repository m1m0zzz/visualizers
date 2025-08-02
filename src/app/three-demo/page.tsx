import type { Metadata } from "next"
import { ThreeCanvas } from "./ThreeCanvas"

export const metadata: Metadata = {
  title: "Three Demo",
}

export default function ThreeDemo() {
  return (
    <div className="w-full h-screen overflow-y-hidden">
      <ThreeCanvas />
    </div>
  )
}
