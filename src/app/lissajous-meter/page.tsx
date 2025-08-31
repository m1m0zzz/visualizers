import type { Metadata } from "next"
import { Editor } from "./Editor"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "Lissajous Meter",
}

export default function LissajousMeter() {
  return (
    <div className="w-full h-screen overflow-y-hidden p-4 flex">
      <main className="grow flex flex-col">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl shrink">Lissajous Meter</h1>
        <div className="overflow-auto h-full">
          <Main className="grow shrink h-full" />
        </div>
      </main>
      <Editor />
    </div>
  )
}
