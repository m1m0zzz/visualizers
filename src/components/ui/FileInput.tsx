import type { ChangeEventHandler, ReactNode } from "react"

interface Props {
  children?: ReactNode
  accept?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function FileInput({ children = "Upload audio file", accept = "audio/*", onChange }: Props) {
  return (
    <label
      htmlFor="File"
      className="block rounded border border-gray-300 p-2 shadow-sm sm:p-4 mb-6 cursor-pointer"
    >
      <div className="flex items-center justify-center gap-4">
        <span className="font-medium">{children}</span>
        <svg
          role="img"
          aria-label="upload icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
          />
        </svg>
      </div>
      <input type="file" accept={accept} id="File" className="sr-only" onChange={onChange} />
    </label>
  )
}
