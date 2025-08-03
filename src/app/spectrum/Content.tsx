"use client"

import clsx from "clsx"
import { useControls } from "leva"
import { type ComponentProps, useEffect, useRef } from "react"
import { getDestination, getTransport, Player, type FFT as ToneFFT } from "tone"
import { ControlWithoutState } from "@/components/ControlWithoutState"
import { FFT } from "@/components/FFT"
import { log } from "@/util/util"

type RGBA = { r: number; g: number; b: number; a?: number }

function colorString({ r, g, b, a }: RGBA) {
  if (a != undefined) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export function Content({ className, ...props }: ComponentProps<"div">) {
  const fft = useRef<ToneFFT>(null!)
  const player = useRef<Player>(null)

  const { fftSize, smoothing, slope, lowDb, highDb } = useControls("FFT", {
    fftSize: {
      value: 2 ** 12,
      options: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((v) => 2 ** v),
    },
    smoothing: {
      value: 0.8,
      min: 0,
      max: 0.99,
      step: 0.01,
    },
    slope: {
      value: 0.4,
      min: -1,
      max: 1,
      step: 0.1,
    },
    lowDb: {
      value: -80,
      min: -150,
      max: -20,
    },
    highDb: {
      value: -25,
      min: -50,
      max: 0,
    },
  })

  const { width, height, lineColor, barColorFrom, barColorTo, bg, border } = useControls(
    "Appearance",
    {
      width: {
        value: 400,
        min: 0,
        step: 1,
      },
      height: {
        value: 200,
        min: 0,
        step: 1,
      },
      lineColor: { r: 92, g: 171, b: 222, a: 1 }, // #5cabde
      barColorFrom: { r: 48, g: 45, b: 235, a: 1 }, // #302deb
      barColorTo: { r: 235, g: 30, b: 30, a: 1 }, // #eb1e1e
      bg: "#000",
      border: "#fff",
    },
  )

  useEffect(() => {
    log("content")
    player.current = new Player("/audio/2mix.wav")
    player.current.chain(fft.current, getDestination())
    getTransport().seconds = 0

    return () => {
      player.current?.dispose()
    }
  }, [])

  return (
    <div className={clsx(className, "flex justify-center items-center flex-col")} {...props}>
      <FFT
        fft={fft}
        {...{ fftSize, smoothing, slope, lowDb, highDb }}
        lineColor={colorString(lineColor)}
        barColor={{ from: colorString(barColorFrom), to: colorString(barColorTo) }}
        className="border"
        style={{ width, height, background: bg, borderColor: border }}
      />
      <ControlWithoutState
        className="mt-4"
        onStart={() => {
          player.current?.start(0, getTransport().seconds)
        }}
        onPause={() => player.current?.stop()}
      />
    </div>
  )
}
