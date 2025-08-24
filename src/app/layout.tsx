import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { ToneGlobals } from "./ToneGlobals"
import "./globals.css"
import "@xyflow/react/dist/style.css"
import "./react-flow.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const title = "MIMOZ COMPONENTS"
const description = "Exploring the Visual Representation of Sound and its Programming."

export const metadata: Metadata = {
  title: { default: title, template: "%s | MIMOZ COMPONENTS" },
  description,
  keywords: ["AudioVisual", "WebDev", "JavaScript", "TypeScript"],
  authors: [{ name: "mimoz", url: "https://m1m0zzz.github.io/" }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: title,
    url: "https://visualizers.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@m1m0zzz",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark:bg-foreground dark:text-background`}
      >
        <ToneGlobals />
        <ThemeProvider attribute="data-theme" enableSystem storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
