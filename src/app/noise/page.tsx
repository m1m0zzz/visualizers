import type { Metadata } from "next"
import { Base, MainContainer } from "@/components/ui/EditorLayout"
import { Editor } from "./Editor"
import { Main } from "./Main"

export const metadata: Metadata = {
  title: "Noise",
}

export default function Noise() {
  return (
    <Base>
      <MainContainer heading="Noise">
        <Main className="grow shrink h-full" />
      </MainContainer>
      <Editor />
    </Base>
  )
}
