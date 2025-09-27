"use client"

import { useControls } from "leva"
import { type ComponentProps, useEffect, useRef, useState } from "react"
import { getContext, getDestination, getTransport, Player } from "tone"
import { ControlWithoutState } from "@/components/ControlWithoutState"
import { LissajousMeter, type LissajousMeterType } from "@/components/LissajousMeter"
import { useWorklet } from "@/hooks/useWorklet"
import { cn } from "@/lib/cn"
import { colorString } from "@/lib/leva"
import { useObjectUrlStore } from "./store"

export function Main({ className, ...props }: ComponentProps<"div">) {
  const player = useRef<Player>(null)
  const lrBufferProcessor = useRef<AudioWorkletNode>(null)
  const playerUrl = useObjectUrlStore((s) => s.objectUrl)
  const [isLoad, setIsLoad] = useState(false)

  const workletState = useWorklet(undefined, [])

  const { type, color, dotsSize, smooth, circular, size, bg } = useControls("Appearance", {
    type: {
      value: "dots" as LissajousMeterType,
      options: ["dots", "lines"] as LissajousMeterType[],
    },
    color: { r: 255, g: 255, b: 255 },
    dotsSize: {
      value: 1,
      min: 0.5,
      max: 10,
      step: 0.1,
    },
    smooth: {
      value: 0.92,
      min: 0,
      max: 0.99,
      step: 0.01,
    },
    circular: false,
    size: {
      value: 300,
      min: 1,
      step: 1,
    },
    bg: { r: 0, g: 0, b: 0, a: 0 },
  })

  useEffect(() => {
    if (workletState != "ok") return
    if (!playerUrl) return

    player.current = new Player(playerUrl, () => setIsLoad(true))
    lrBufferProcessor.current = getContext().createAudioWorkletNode("lr-buffer-processor", {
      channelCount: 2,
    })
    player.current.chain(lrBufferProcessor.current, getDestination())

    getTransport().seconds = 0

    return () => {
      player.current?.dispose()
      lrBufferProcessor.current?.disconnect()
    }
  }, [playerUrl, workletState])

  return (
    <div className={cn(className, "flex justify-center items-center flex-col")} {...props}>
      <div
        className={cn(circular && "rounded-full")}
        style={{
          backgroundColor: colorString(bg),
          // TODO: clipPath と mixBlendMode の相性が悪い
          // clipPath: !circular ? "polygon(0 50%, 50% 100%, 100% 50%, 50% 0)" : undefined,
        }}
      >
        <LissajousMeter
          lrBufferProcessor={lrBufferProcessor.current}
          type={type}
          color={colorString(color)}
          size={dotsSize}
          smooth={smooth}
          circular={circular}
          width={size}
          height={size}
        />
      </div>
      <ControlWithoutState
        className="mt-4"
        loaded={isLoad}
        onStart={() => {
          player.current?.start(0, getTransport().seconds)
        }}
        onPause={() => player.current?.stop()}
      />
    </div>
  )
}
