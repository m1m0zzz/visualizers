import { useState } from "react"
import { useDebounce } from "react-use"
import { Input } from "@/components/ui/shadcn/input"
import { cn } from "@/lib/cn"
import { defaultFormula } from "../provider"
import { createFormulaSafe } from "./parser"

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
