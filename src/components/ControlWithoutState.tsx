"use client"

import { type ComponentProps, useCallback, useState } from "react"
import { CgPlayButton, CgPlayPause, CgPlayTrackPrev } from "react-icons/cg"
import * as Tone from "tone"
import { getContext, getTransport } from "tone"

interface Props {
  iconSize?: number
  onStart?: () => void
  onPause?: () => void
  onPrev?: () => void
}

export function ControlWithoutState({
  iconSize = 24,
  onStart,
  onPause,
  onPrev,
  style,
  ...props
}: Props & ComponentProps<"div">) {
  const [isPlay, setIsPlay] = useState(false)

  const toggleIsPlay = useCallback(() => setIsPlay((s) => !s), [])

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", ...style }}
      {...props}
    >
      <button
        className="icon-button"
        type="button"
        disabled={isPlay /* || sec == 0 */}
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
