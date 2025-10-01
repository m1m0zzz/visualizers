import { useState } from "react"
import { useDebounce } from "react-use"
import { Input } from "@/components/ui/shadcn/input"
import { cn } from "@/lib/cn"
import type { Fn } from "../const"
import { defaultFormula } from "../provider"
import { createFormula } from "."

function createFormulaSafe(f: string) {
  const result: {
    ok: boolean
    f?: Fn
    error?: Error
  } = { ok: false }
  try {
    result.f = createFormula(f)
    result.f(0)
    result.ok = true
  } catch (error) {
    result.error = error as Error
  }
  return result
}

interface Props {
  value: string
  onChange: (value: string) => void
  debounceMs?: number
}

export function FormulaInput({ value, onChange, debounceMs = 350 }: Props) {
  const [val, setVal] = useState(value)

  useDebounce(
    () => {
      onChange(val)
    },
    debounceMs,
    [val],
  )

  return (
    <Input
      type="text"
      placeholder={defaultFormula}
      autoComplete="off"
      className={cn(
        "w-full",
        createFormulaSafe(value).ok ||
          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
      )}
      value={val}
      onChange={(e) => {
        setVal(e.currentTarget.value)
      }}
    />
  )
}
