"use client"

import { useState } from "react"

const items = ["light", "dark", "system"] as const
type Item = (typeof items)[number]

export function ThemeDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<Item>(items[2])

  return (
    <div className="relative inline-flex">
      <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white text-gray-700 shadow-sm dark:divide-gray-600 dark:border-gray-600 dark:bg-foreground">
        <button
          type="button"
          className="w-[80px] px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => setIsOpen((t) => !t)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        >
          {mode}
        </button>

        <button
          type="button"
          className="px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Menu"
          onClick={() => setIsOpen((t) => !t)}
        >
          {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
            style={{
              transform: isOpen ? "rotate(180deg)" : undefined,
              transition: "180ms transform",
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </span>

      {isOpen && (
        <div
          role="menu"
          className="absolute end-0 top-12 z-1000 w-full overflow-hidden rounded border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-foreground"
        >
          {items.map((item) => {
            return (
              <div
                key={item}
                className="block px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                role="menuitem"
                onClick={() => {
                  // }
                  if (item == "system") {
                    localStorage.removeItem("theme")
                    document.documentElement.classList.toggle(
                      "dark",
                      window.matchMedia("(prefers-color-scheme: dark)").matches,
                    )
                  } else {
                    document.documentElement.classList.toggle("dark", item == "dark")
                    localStorage.theme = item
                  }

                  setMode(item)
                  setIsOpen(false)
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
