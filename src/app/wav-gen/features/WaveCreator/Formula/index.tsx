import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useWavGenStore } from "../../provider"
import { SortableItem } from "./SortableItem"

function getIndex<T extends Record<string, U>, U>(
  target: T[],
  targetProp: keyof T,
  searchValue: U,
) {
  for (let i = 0; i < target.length; i++) {
    if (target[i][targetProp] == searchValue) {
      return i
    }
  }
  return -1
}

export function Formula() {
  const formulas = useWavGenStore((s) => s.formulas)
  const setFormulas = useWavGenStore((s) => s.setFormulas)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    if (active.id != over.id) {
      const oldIndex = getIndex(formulas, "id", active.id)
      const newIndex = getIndex(formulas, "id", over.id)
      setFormulas(arrayMove(formulas, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={formulas} strategy={verticalListSortingStrategy}>
        {formulas.map(({ id, f }) => (
          <SortableItem key={id} id={id} f={f} deletable={formulas.length > 1} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
