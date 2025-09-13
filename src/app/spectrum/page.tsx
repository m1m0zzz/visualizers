import type { Metadata } from "next"
import { Base, MainContainer } from "@/components/ui/EditorLayout"
import { Editor } from "./Editor"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "Spectrum",
}

export default function Spectrum() {
  return (
    <Base>
      <MainContainer heading="Spectrum">
        <Main className="grow shrink h-full" />
      </MainContainer>
      <Editor />
    </Base>
  )
}
