import Link from "next/link"
import { Card } from "@/components/ui/Card"

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-10">
        <h1 className="text-4xl">MIMOZ COMPONENTS</h1>
        <p className="mt-1 text-gray-400">Exploring Visual Representations and Coding of Sound.</p>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <Link href="/garden-weeds">
            <Card title="Arnica - Garden Weeds" />
          </Link>
          <Link href="/three-demo">
            <Card title="Three Demo" />
          </Link>
        </div>
      </main>
    </div>
  )
}
