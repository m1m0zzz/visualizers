import { Midi } from "@tonejs/midi"
import { mod } from "@tremolo-ui/functions"
import { AnimationCanvas } from "@tremolo-ui/react"
import { useEffect, useState } from "react"
import { getTransport } from "tone"
import { lerpColor } from "@/util/canvas"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  midiUrl: string
  isPlay?: boolean
  xCount?: number
  yCount?: number
  midiNumberOffset?: number
}

type Note = {
  time: number
  duration: number
  midi: number
  name: string
  velocity: number
}

function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x)
}

export function DrumPad({
  midiUrl,
  isPlay,
  xCount = 4,
  yCount = 4,
  midiNumberOffset = 0,
  ...props
}: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount MIDIView")

  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const load = async () => {
      const _notes: Note[] = []
      const midi = await Midi.fromUrl(midiUrl)
      midi.tracks[0].notes.forEach((note) => {
        if (midiNumberOffset <= note.midi && note.midi < xCount * yCount) {
          _notes.push({
            time: note.time,
            duration: note.duration,
            midi: note.midi,
            name: note.name,
            velocity: note.velocity,
          })
        }
      })
      setNotes(_notes)
    }
    load()
  }, [midiUrl, midiNumberOffset, xCount, yCount])

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          const transport = getTransport()
          const elapsedTime = transport.seconds
          const bpm = transport.bpm.value

          ctx.clearRect(0, 0, w, h)

          if (elapsedTime <= 0.001) return

          const padW = w / xCount
          const padH = h / yCount

          for (const note of notes) {
            const time = note.time * (120 / bpm) // 補正
            const duration = note.duration * (120 / bpm) // 補正
            if (time <= elapsedTime && elapsedTime <= time + duration) {
              const index = note.midi - midiNumberOffset
              const x = mod(index, xCount)
              const y = Math.floor(index / yCount) + 1
              ctx.fillStyle = lerpColor(
                "transparent",
                "#fff",
                getBaseLog(2, 1 + note.velocity) * 100,
              )
              ctx.fillRect(x * padW, h - y * padH, padW, padH)
            }
          }
        }}
      />
    </CanvasWrapper>
  )
}
