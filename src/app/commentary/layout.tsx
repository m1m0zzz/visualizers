import Link from "next/link"
import type { ReactNode } from "react"
import { LuBlocks } from "react-icons/lu"

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="h-[50px] flex justify-between items-center px-8">
        <div>
          <Link href="/">
            <LuBlocks size={24} />
          </Link>
        </div>
      </header>
      <main className="prose mx-auto p-4 md:prose-lg lg:prose-xl dark:prose-invert">
        {children}
      </main>
    </div>
  )
}
