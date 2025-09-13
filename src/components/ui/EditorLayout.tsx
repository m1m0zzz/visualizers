import type { ReactNode } from "react"

export function Base({ children }: { children: ReactNode }) {
  return <div className="w-full h-screen overflow-y-hidden p-4 sm:p-6 flex">{children}</div>
}

export function MainContainer({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <main className="grow flex flex-col">
      <h1 className="text-2xl lg:text-3xl xl:text-4xl shrink">{heading}</h1>
      <div className="overflow-auto h-full">{children}</div>
    </main>
  )
}
