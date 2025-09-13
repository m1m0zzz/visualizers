import { Midi } from "@tonejs/midi"
import { AnimationCanvas } from "@tremolo-ui/react"
import { useEffect, useState } from "react"
import { getTransport } from "tone"
import { log } from "@/lib/util"
import { CanvasWrapper } from "./ui/CanvasWrapper"

interface Props {
  midiUrls: string[]
  isPlay?: boolean
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
  isPlay,
  colors = [],
  ...props
}: Props & Omit<Parameters<typeof CanvasWrapper>[0], keyof Props>) {
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
            time: note.time,
            duration: note.duration,
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
  }, [midiUrls])

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

          for (const note of notes) {
            const time = note.time * (120 / bpm) // 補正
            const duration = note.duration * (120 / bpm) // 補正
            const x = (time - elapsedTime) * PIXELS_PER_SECOND
            const y = (127 - note.midi) * (NOTE_HEIGHT * 0.8) - 150
            const width = duration * 0.7 * PIXELS_PER_SECOND

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
