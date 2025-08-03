"use client"

import { type ComponentProps, useEffect, useLayoutEffect, useState } from "react"
import { CgPlayButton, CgPlayPause, CgPlayTrackPrev } from "react-icons/cg"
import * as Tone from "tone"
import { getContext, getTransport } from "tone"
import { log } from "@/util/util"

interface Props {
  isPlay: boolean
  toggleIsPlay: () => void
  iconSize?: number
  onStart?: () => void
  onPause?: () => void
  onPrev?: () => void
}

export function Control({
  isPlay,
  toggleIsPlay,
  iconSize = 24,
  onStart,
  onPause,
  onPrev,
  style,
  ...props
}: Props & ComponentProps<"div">) {
  log("mount Control")
  const [isHead, setIsHead] = useState(true)

  useEffect(() => {
    setIsHead(getTransport().seconds == 0)
  }, [])

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", ...style }}
      {...props}
    >
      <button
        className="icon-button"
        type="button"
        disabled={isPlay || isHead}
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
