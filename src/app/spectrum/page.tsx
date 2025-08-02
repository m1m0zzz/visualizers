import type { Metadata } from "next"
import { Content } from "./Content"

export const metadata: Metadata = {
  title: "Spectrum",
}

export default function Spectrum() {
  return (
    <main className="w-full h-screen overflow-y-hidden p-8 flex flex-col">
      <h1 className="text-2xl lg:text-3xl xl:text-4xl shrink">Spectrum</h1>
      <Content className="grow" />
    </main>
  )
}
