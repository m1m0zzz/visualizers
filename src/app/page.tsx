import type { Metadata } from "next"
import Link from "next/link"
import gardenWeedsGit from "@/app/assets/garden-weeds.gif"
import noiseGif from "@/app/assets/noise.gif"
import spectrumGif from "@/app/assets/spectrum.gif"
import threeDemoGif from "@/app/assets/three-demo.gif"
import { Card } from "@/components/ui/Card"
import { ThemeDropdown } from "@/components/ui/ThemeDropdown"

export const metadata: Metadata = {}

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-10">
        <div className="flex justify-between items-center gap-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl">
            <a href="https://m1m0zzz.github.io/" className="text-cyan-500 dark:text-cyan-200">
              MIMOZ
            </a>{" "}
            COMPONENTS
          </h1>
          <ThemeDropdown />
        </div>
        <p className="mt-1 text-gray-400 xl:text-2xl">
          Exploring the Visual Representation of Sound and its Programming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <Link href="/garden-weeds">
            <Card title="Arnica - Garden Weeds" type="visualizer" bg={{ src: gardenWeedsGit }} />
          </Link>
          <Link href="/three-demo">
            <Card title="Three.js" type="demo" bg={{ src: threeDemoGif }} />
          </Link>
          <Link href="/spectrum">
            <Card title="Spectrum" type="component" bg={{ src: spectrumGif }} />
          </Link>
          <Link href="/noise">
            <Card title="Noise" type="component" bg={{ src: noiseGif }} />
          </Link>
          {/* <Link href="/audio-nodes">
            <Card title="Audio Nodes" type="component" bg="oklch(68.5% 0.169 237.323)" />
          </Link> */}
        </div>
      </main>
    </div>
  )
}
