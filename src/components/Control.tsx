"use client"

import { type ComponentProps, useMemo } from "react"
import { CgPlayButton, CgPlayPause, CgPlayTrackPrev } from "react-icons/cg"
import * as Tone from "tone"
import { getContext, getTransport } from "tone"

interface Props {
  isPlay: boolean
  toggleIsPlay: () => void
  onStart?: () => void
  onPause?: () => void
  onPrev?: () => void
}

export function Control({
  isPlay,
  toggleIsPlay,
  onStart,
  onPause,
  onPrev,
  style,
  ...props
}: Props & ComponentProps<"div">) {
  const iconSize = 24

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", ...style }}
      {...props}
    >
      <button
        className="icon-button"
        type="button"
        // disabled={isPlay || getTransport().seconds == 0}
        onClick={() => {
          getTransport().seconds = 0
          onPrev?.()
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
          toggleIsPlay()
        }}
      >
        {isPlay ? <CgPlayPause size={iconSize} /> : <CgPlayButton size={iconSize} />}
      </button>
    </div>
  )
}
