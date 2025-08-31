import type { Metadata } from "next"
import { Main } from "./Main"
import { Editor } from "./Editor"

export const metadata: Metadata = {
  title: "Spectrum",
}

export default function Spectrum() {
  return (
    <div className="w-full h-screen overflow-y-hidden p-4 flex">
      <main className="grow flex flex-col">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl shrink">Spectrum</h1>
        <div className="overflow-auto h-full">
          <Main className="grow shrink h-full" />
        </div>
      </main>
      <Editor />
    </div>
  )
}
