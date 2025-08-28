import type { ReactNode } from "react"

interface Props {
  title: string
  type: string
  children?: ReactNode
  wrapped?: boolean
}

export function CardBase({ title, type, wrapped = true, children }: Props) {
  return (
    <article className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg group text-white/95">
      {wrapped ? <div className="absolute inset-0 h-full w-full">{children}</div> : children}

      {type && <div className="absolute top-4 right-6 font-mono z-10">{type}</div>}

      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48">
        <div className="p-6">
          <p className="line-clamp-3 text-sm/relaxed">{title}</p>
        </div>
      </div>
    </article>
  )
}
