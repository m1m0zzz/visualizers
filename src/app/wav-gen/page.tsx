import type { Metadata } from "next"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "WavGen",
}

export default function WavGen() {
  return (
    <div className="min-h-screen prose prose-stone prose-xl xl:prose-2xl dark:prose-invert p-4 sm:p-6 mx-auto">
      <div className="text-foreground text-3xl lg:text-4xl xl:text-5xl mb-6">WavGen</div>
      <Main />
    </div>
  )
}
