import Link from "next/link"

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-10">
        <h3>List of Content</h3>
        <ul>
          <li>
            <Link href="/garden-weeds">Arnica - Garden Weeds</Link>
          </li>
          <li>
            <Link href="/three-demo">Three Demo</Link>
          </li>
        </ul>
      </main>
    </div>
  )
}
