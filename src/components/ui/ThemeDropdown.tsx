"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu"

export function ThemeDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="inline-flex overflow-hidden rounded border items-center px-3 py-2 gap-2 border-gray-300 bg-white text-gray-700 shadow-sm dark:divide-gray-600 dark:border-gray-600 dark:bg-foreground transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="Menu"
        onClick={() => setIsOpen((t) => !t)}
      >
        <span className="flex gap-1 items-center w-[70px] text-sm font-medium">
          {(() => {
            if (theme == "light") {
              return <LuSun />
            } else if (theme == "dark") {
              return <LuMoon />
            } else {
              return <LuMonitor />
            }
          })()}
          {theme}
        </span>

        <span className="text-sm font-medium">
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
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute end-0 top-12 z-1000 w-full overflow-hidden rounded border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-foreground"
        >
          {themes.map((theme) => {
            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={theme}
                className="flex gap-1 items-center px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  setTheme(theme)
                  setIsOpen(false)
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setTheme(theme)
                    setIsOpen(false)
                  }
                }}
              >
                {(() => {
                  if (theme == "light") {
                    return <LuSun />
                  } else if (theme == "dark") {
                    return <LuMoon />
                  } else {
                    return <LuMonitor />
                  }
                })()}
                {theme}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
