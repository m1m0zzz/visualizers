import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { LuEraser, LuGripVertical } from "react-icons/lu"
import { Button } from "@/components/ui/shadcn/button"
import { useWavGenStore } from "../../provider"
import { FormulaInput } from "./FormulaInput"

interface Props {
  id: number
  f: string
  deletable: boolean
}

export function SortableItem({ id, f, deletable }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({ id })
  const updateFormulaAt = useWavGenStore((s) => s.updateFormulaAt)
  const deleteFormulaAt = useWavGenStore((s) => s.deleteFormulaAt)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      data-active={active && id == active.id}
      style={style}
      className="w-full flex items-center gap-2 p-2 rounded data-[active=true]:bg-stone-50 dark:data-[active=true]:bg-stone-800"
    >
      <FormulaInput value={f} onChange={(v) => updateFormulaAt(v, id)} />
      <Button
        disabled={!deletable}
        variant="destructive"
        size="icon"
        className="size-8"
        onClick={() => deleteFormulaAt(id)}
      >
        <LuEraser />
      </Button>
      <div className="p-1 cursor-grab" {...attributes} {...listeners}>
        <LuGripVertical />
      </div>
    </div>
  )
}
