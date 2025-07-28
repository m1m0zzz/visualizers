import { useCallback, useState } from "react"
import type { Waveform as ToneWaveform, Volume } from "tone"
import { Edge } from "@/components/Edge"
import { Waveform } from "@/components/Waveform"

interface Props {
  waveforms: ToneWaveform[]
  volumes: Volume[]
  masterVolume: Volume | null
}

export function Waveforms({
  waveforms,
  volumes,
  masterVolume,
  width,
  height,
  isPlay,
  ...props
}: Props & Omit<Parameters<typeof Waveform>[0], "waveform">) {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const onMouseEnter = useCallback(
    (i: number) => {
      if (!masterVolume) return
      volumes[i].volume.value = 0
      masterVolume.volume.value = -100
      setHoverIndex(i)
    },
    [masterVolume, volumes],
  )

  const onMouseLeave = useCallback(() => {
    if (!masterVolume) return
    volumes.forEach((vol) => {
      vol.volume.value = -100
    })
    masterVolume.volume.value = 0
    setHoverIndex(-1)
  }, [masterVolume, volumes])

  return (
    <div {...props}>
      {waveforms.map((w, i) => (
        <Edge
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={i}
          onMouseEnter={() => onMouseEnter(i)}
          onMouseLeave={onMouseLeave}
          edge={{ style: { opacity: i == hoverIndex ? 1 : 0, transition: "opacity 300ms" } }}
        >
          <Waveform
            waveform={w}
            width={width}
            height={height}
            isPlay={isPlay}
            color={hoverIndex == -1 || i == hoverIndex ? "white" : "rgba(255, 255, 255, 0.3)"}
          />
        </Edge>
      ))}
    </div>
  )
}
