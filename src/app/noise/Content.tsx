"use client"

import clsx from "clsx"
import { useControls } from "leva"
import type { ComponentProps } from "react"
import { Noise } from "@/components/Noise"

type RGBA = { r: number; g: number; b: number; a?: number }

function colorString({ r, g, b, a }: RGBA) {
  if (a != undefined) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export function Content({ className, ...props }: ComponentProps<"div">) {
  const { color, minAlpha, maxAlpha, noiseSize, frameLimit } = useControls("Noise", {
    color: { r: 128, g: 128, b: 128 },
    minAlpha: {
      value: 0,
      min: 0,
      max: 1,
    },
    maxAlpha: {
      value: 1,
      min: 0,
      max: 1,
    },
    noiseSize: {
      value: 1,
      min: 1,
    },
    frameLimit: {
      value: 5,
      min: 1,
      step: 1,
    },
  })

  const { width, height, overlay, blur, bg, fontColor } = useControls("Appearance", {
    width: {
      value: 300,
      min: 1,
      step: 1,
    },
    height: {
      value: 300,
      min: 1,
      step: 1,
    },
    overlay: false,
    blur: {
      value: 0,
      min: 0,
      max: 10,
      step: 0.01,
    },
    bg: { r: 0, g: 0, b: 0 },
    fontColor: "#fff",
  })

  return (
    <div className={clsx(className, "flex justify-center items-center flex-col")} {...props}>
      <div
        className="relative"
        style={{ width, height, background: colorString(bg), overflow: "hidden" }}
      >
        {overlay && (
          <div
            className="absolute inset-0 m-auto w-fit h-fit text-4xl"
            style={{ color: fontColor }}
          >
            Sample Text
          </div>
        )}
        <Noise
          className="absolute"
          {...{ color, minAlpha, maxAlpha, noiseSize, frameLimit }}
          style={{
            width,
            height,
            mixBlendMode: overlay ? "overlay" : undefined,
            filter: `blur(${blur}px)`,
          }}
        />
      </div>
    </div>
  )
}
