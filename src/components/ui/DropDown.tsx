import { type ComponentProps, useState } from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/util"

interface Props<T extends string | number> {
  value: T
  items: T[]
  icons?: { [k in T]: IconType }
  onChange?: (value: T) => void
}

export function Dropdown<T extends string | number>({
  value,
  items,
  onChange,
  className,
  ...props
}: Props<T> & Omit<ComponentProps<"div">, keyof Props<T>>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("relative inline-flex w-full", className)} {...props}>
      <button
        type="button"
        className="inline-flex w-full overflow-hidden rounded border justify-between items-center px-3 py-2 gap-2 border-gray-300 bg-white text-gray-700 shadow-sm dark:divide-gray-600 dark:border-gray-600 dark:bg-foreground transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="Menu"
        onClick={() => setIsOpen((t) => !t)}
      >
        <span className="flex gap-1 items-center text-sm font-medium">{value}</span>
        <span className="text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute end-0 top-12 z-1000 w-full overflow-hidden rounded border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-foreground"
        >
          {items.map((item) => {
            return (
              <div
                key={item.toString()}
                // TODO
                className="flex gap-1 items-center px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  onChange?.(item)
                  setIsOpen(false)
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    onChange?.(item)
                    setIsOpen(false)
                  }
                }}
              >
                {item}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
