import type { Metadata } from "next"
import { Content } from "./Content"
import { Editor } from "./Editor"

export const metadata: Metadata = {
  title: "Noise",
}

export default function Noise() {
  return (
    <div className="w-full h-screen overflow-y-hidden p-4 flex">
      <main className="grow flex flex-col">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl shrink">Noise</h1>
        <div className="overflow-auto h-full">
          <Content className="grow shrink h-full" />
        </div>
      </main>
      <Editor />
    </div>
  )
}
