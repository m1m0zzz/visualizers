import { type DependencyList, useEffect, useRef, useState } from "react"

export function useEffectAsync<T>(
  callback: Promise<T>,
  initialValue?: T,
  deps: DependencyList = [],
) {
  const [state, setState] = useState<"pending" | "ok" | "error">("pending")
  const result = useRef<T>(initialValue ?? null)
  // biome-ignore lint/suspicious/noExplicitAny: error object
  const error = useRef<any>(null)

  useEffect(() => {
    callback
      .then((res) => {
        result.current = res
        setState("ok")
      })
      .catch((e) => {
        error.current = e
        setState("error")
      })
    // biome-ignore lint/correctness/useExhaustiveDependencies: obvious
  }, deps)

  return { state, result: result.current, error: error.current }
}
