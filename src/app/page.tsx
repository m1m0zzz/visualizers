import type { Metadata } from "next"
import Link from "next/link"
import spectrumGif from "@/app/assets/spectrum.gif"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {}

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl">
          <a href="https://m1m0zzz.github.io/" className="text-cyan-200">
            MIMOZ
          </a>{" "}
          COMPONENTS
        </h1>
        <p className="mt-1 text-gray-400 xl:text-2xl">
          Exploring the Visual Representation of Sound and its Programming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <Link href="/garden-weeds">
            <Card title="Arnica - Garden Weeds" type="visualizer" />
          </Link>
          <Link href="/three-demo">
            <Card title="Three.js" type="demo" />
          </Link>
          <Link href="/spectrum">
            <Card title="Spectrum" type="component" imageSrc={spectrumGif} />
          </Link>
        </div>
      </main>
    </div>
  )
}
