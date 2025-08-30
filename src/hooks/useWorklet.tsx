import { type DependencyList, useRef } from "react"
import { getContext } from "tone"
import { log } from "@/util/util"
import { useEffectAsync } from "./useEffectAsync"

const lrBufferProcessorUrl = new URL("@/processors/lr-buffer-processor", import.meta.url).href

export function useWorklet(urls: string[] = [lrBufferProcessorUrl], deps?: DependencyList) {
  const count = useRef(0)

  const { state } = useEffectAsync(
    new Promise((resolve) => {
      if (count.current == 0) {
        log("added worklet module")
        log(urls)
        count.current += 1
        resolve(Promise.all(urls.map((url) => getContext().addAudioWorkletModule(url))))
      }
    }),
    null,
    deps,
  )
  return state
}
