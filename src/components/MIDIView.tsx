import { Midi } from "@tonejs/midi"
import { AnimationCanvas } from "@tremolo-ui/react"
import { useEffect, useState } from "react"
import { getTransport } from "tone"
import { log } from "@/util/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  midiUrls: string[]
  bpm: number
  isPlay: boolean
  colors?: string[]
}

const NOTE_HEIGHT = 6
const PIXELS_PER_SECOND = 200

type Note = {
  time: number
  duration: number
  midi: number
  name: string
  velocity: number
  track: number
}

export function MIDIView({
  midiUrls,
  bpm,
  isPlay,
  colors = [],
  ...props
}: Props & Parameters<typeof CanvasWrapper>[0]) {
  log("mount MIDIView")

  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const load = async () => {
      const _notes: Note[] = []
      for (let i = 0; i < midiUrls.length; i++) {
        const midiUrl = midiUrls[i]
        const midi = await Midi.fromUrl(midiUrl)
        midi.tracks[0].notes.forEach((note) => {
          _notes.push({
            time: note.time * (120 / bpm),
            duration: note.duration * (120 / bpm),
            midi: note.midi,
            name: note.name,
            velocity: note.velocity,
            track: i,
          })
        })
      }
      setNotes(_notes)
    }
    load()
  }, [midiUrls, bpm])

  return (
    <CanvasWrapper {...props}>
      <AnimationCanvas
        relativeSize
        draw={(ctx, width, height) => {
          const w = width.current
          const h = height.current
          const elapsedTime = getTransport().seconds

          /// reset
          ctx.clearRect(0, 0, w, h)

          if (!isPlay) return

          for (const note of notes) {
            const x = (note.time - elapsedTime) * PIXELS_PER_SECOND
            const y = (127 - note.midi) * (NOTE_HEIGHT * 0.8) - 150
            const width = note.duration * 0.7 * PIXELS_PER_SECOND

            if (x + width < 0 || x > w) continue

            // ctx.fillStyle = lerpColor("transparent", colors?.[note.track] ?? `#fff`, 60)
            ctx.fillStyle = colors?.[note.track] ?? `#fff`
            // ctx.fillStyle = lerpColor("transparent", `#fff`, 60)
            ctx.fillRect(x, y, width, NOTE_HEIGHT)
          }
        }}
      />
    </CanvasWrapper>
  )
}
