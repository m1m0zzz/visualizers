/** biome-ignore-all lint: このファイルはOGP画像生成のためのものなので */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { LuBlocks } from "react-icons/lu"

export const alt = "MIMOZ COMPONENTS"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const interSemiBold = await readFile(
    join(process.cwd(), "src/app/assets/fonts/Inter_18pt-SemiBold.ttf"),
  )

  const fontSize = 50

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <LuBlocks size={fontSize * 0.9} />
        <div
          style={{
            fontSize: fontSize,
            lineHeight: 1,
          }}
        >
          MIMOZ COMPONENTS
        </div>
      </div>
      <div style={{ marginTop: 16, fontSize: 16 }}>
        Exploring the Visual Representation of Sound and its Programming.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
