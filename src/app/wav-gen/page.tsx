import type { Metadata } from "next"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "WavGen",
}

export default function WavGen() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6">WavGen</h1>
      <Main />
    </div>
  )
}
