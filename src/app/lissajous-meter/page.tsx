import type { Metadata } from "next"
import { Base, MainContainer } from "@/components/ui/EditorLayout"
import { Editor } from "./Editor"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "Lissajous Meter",
}

export default function LissajousMeter() {
  return (
    <Base>
      <MainContainer heading="Lissajous Meter">
        <Main className="grow shrink h-full" />
      </MainContainer>
      <Editor />
    </Base>
  )
}
