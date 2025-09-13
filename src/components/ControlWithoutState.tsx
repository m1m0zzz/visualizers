"use client"

import { type ComponentProps, useCallback, useState } from "react"
import { CgPlayButton, CgPlayPause, CgPlayTrackPrev } from "react-icons/cg"
import * as Tone from "tone"
import { getContext, getTransport } from "tone"
import { log } from "@/lib/util"

interface Props {
  loaded?: boolean | null
  iconSize?: number
  onStart?: () => void
  onPause?: () => void
  onPrev?: () => void
}

export function ControlWithoutState({
  loaded = null,
  iconSize = 24,
  onStart,
  onPause,
  onPrev,
  style,
  ...props
}: Props & Omit<ComponentProps<"div">, keyof Props>) {
  log("mount Control")
  const [isPlay, setIsPlay] = useState(false)
  const [isHead, setIsHead] = useState(true)

  const toggleIsPlay = useCallback(() => setIsPlay((s) => !s), [])
  const disabled = loaded == false

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", ...style }}
      {...props}
    >
      <button
        className="icon-button"
        type="button"
        disabled={disabled || isPlay || isHead}
        onClick={() => {
          getTransport().seconds = 0
          onPrev?.()
          setIsHead(true)
        }}
      >
        <CgPlayTrackPrev size={iconSize} />
      </button>
      <button
        className="icon-button"
        type="button"
        disabled={disabled}
        onClick={async () => {
          if (getContext().state == "suspended") await Tone.start()

          if (!isPlay) {
            getTransport().start()
            onStart?.()
          } else {
            getTransport().pause()
            onPause?.()
          }
          setIsHead(getTransport().seconds == 0)
          toggleIsPlay()
        }}
      >
        {isPlay ? <CgPlayPause size={iconSize} /> : <CgPlayButton size={iconSize} />}
      </button>
    </div>
  )
}
