import Link from "next/link"
import type { IconType } from "react-icons"
import { LuCloud, LuExternalLink, LuGithub, LuInstagram, LuTwitter } from "react-icons/lu"
// assets
import wavGenPng from "@/app/assets/wav-gen.png"
import { Card } from "@/components/ui/Card/"
import { CardBase } from "@/components/ui/Card/CardBase"
import { ThemeDropdown } from "@/components/ui/ThemeDropdown"
import { VideoAsGif } from "@/components/ui/VideoAsGif"

const footerLinks: {
  href: string
  text: string
  external?: boolean
}[] = [
  { href: "/commentary", text: "Commentary" },
  { href: "https://github.com/m1m0zzz/visualizers", text: "Repository", external: true },
]

const footerSNSLinks: {
  href: string
  Icon: IconType
}[] = [
  { href: "https://github.com/m1m0zzz", Icon: LuGithub },
  { href: "https://soundcloud.com/mimozzz", Icon: LuCloud },
  { href: "https://twitter.com/m1m0zzz", Icon: LuTwitter },
  { href: "https://www.instagram.com/m1m0zzz/", Icon: LuInstagram },
]

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          <Link href="/garden-weeds">
            <CardBase title="Arnica - Garden Weeds" type="visualizer">
              <VideoAsGif>
                <source src="/movie/garden-weeds.mp4" type="video/mp4" />
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
          <Link href="/lissajous-meter">
            <CardBase title="Lissajous Meter" type="component">
              <VideoAsGif>
                <source src="/movie/lissajous-meter.mp4" type="video/mp4" />
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
          <Link href="/three-demo">
            <CardBase title="Three.js" type="demo">
              <VideoAsGif>
                <source src="/movie/three-demo.mp4" type="video/mp4" />
              </VideoAsGif>
            </CardBase>
          </Link>
          <Link href="/wav-gen">
            <Card title="WavGen" type="tool" bg={{ src: wavGenPng, alt: "WavGen Thumbnail" }} />
          </Link>
          {/* <Link href="/audio-nodes">
            <Card title="Audio Nodes" type="component" bg="oklch(68.5% 0.169 237.323)" />
          </Link> */}
        </div>
      </main>
      <footer className="bg-neutral-100 dark:bg-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {footerLinks.map(({ href, text, external }) => {
              const c =
                "text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              return (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                      className={`flex items-center gap-1 ${c}`}
                    >
                      {text}
                      <LuExternalLink />
                    </a>
                  ) : (
                    <Link className={c} href={href}>
                      {text}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            {footerSNSLinks.map(({ href, Icon }) => {
              return (
                <li key={href}>
                  <a
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  >
                    <Icon size={24} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </footer>
    </div>
  )
}
