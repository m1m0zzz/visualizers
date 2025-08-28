import type { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/Card/"
import { CardBase } from "@/components/ui/Card/CardBase"
import { ThemeDropdown } from "@/components/ui/ThemeDropdown"
import { VideoAsGif } from "@/components/ui/VideoAsGif"

export const metadata: Metadata = {}

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-6 sm:p-8 md:p-10">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <a href="https://m1m0zzz.github.io/" className="text-cyan-500 dark:text-cyan-200">
              MIMOZ
            </a>
            <br />
            COMPONENTS
          </h1>
          <ThemeDropdown />
        </div>
        <p className="mt-1 text-gray-400 xl:text-2xl">
          Exploring the Visual Representation of Sound and its Programming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <Link href="/garden-weeds">
            <CardBase title="Arnica - Garden Weeds" type="visualizer">
              <VideoAsGif>
                <source src="/movie/garden-weeds.mp4" type="video/mp4" />
              </VideoAsGif>
            </CardBase>
          </Link>
          <Link href="/three-demo">
            <CardBase title="Three.js" type="demo">
              <VideoAsGif>
                <source src="/movie/three-demo.mp4" type="video/mp4" />
              </VideoAsGif>
            </CardBase>
          </Link>
          <Link href="/spectrum">
            <CardBase title="Spectrum" type="component">
              <VideoAsGif>
                <source src="/movie/spectrum.mp4" type="video/mp4" />
              </VideoAsGif>
            </CardBase>
          </Link>
          <Link href="/noise">
            <CardBase title="Noise" type="component">
              <VideoAsGif>
                <source src="/movie/noise.mp4" type="video/mp4" />
              </VideoAsGif>
            </CardBase>
          </Link>
          {/* <Link href="/audio-nodes">
            <Card title="Audio Nodes" type="component" bg="oklch(68.5% 0.169 237.323)" />
          </Link> */}
        </div>
      </main>
    </div>
  )
}
