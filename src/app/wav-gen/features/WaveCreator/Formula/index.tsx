import { LuEraser } from "react-icons/lu"
import { Button } from "@/components/ui/shadcn/button"
import { useWavGenStore } from "../../provider"
import { FormulaInput } from "./FormulaInput"

export function Formula() {
  const formulas = useWavGenStore((s) => s.formulas)
  const updateFormulaAt = useWavGenStore((s) => s.updateFormulaAt)
  const deleteFormulaAt = useWavGenStore((s) => s.deleteFormulaAt)

  return (
    <div className="flex flex-col gap-3">
      {formulas.map(({ id, f }) => {
        return (
          <div key={id} className="flex gap-2">
            <FormulaInput value={f} onChange={(v) => updateFormulaAt(v, id)} />
            {formulas.length == 1 ? (
              <Button disabled size="icon" className="size-8 invisible"></Button>
            ) : (
              <Button
                variant="destructive"
                size="icon"
                className="size-8"
                onClick={() => deleteFormulaAt(id)}
              >
                <LuEraser />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
