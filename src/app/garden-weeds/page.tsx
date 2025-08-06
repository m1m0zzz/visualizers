"use client"

// 3rd-party
import { Leva } from "leva"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoFlowerOutline } from "react-icons/io5"
import { RiSoundcloudLine } from "react-icons/ri"
import {
  type FFT,
  Filter,
  getContext,
  getDestination,
  getTransport,
  Player,
  Meter as ToneMeter,
  Waveform as ToneWaveform,
  Volume,
} from "tone"
// component
import { BeatBar } from "@/components/BeatBar"
import { BeatCount } from "@/components/BeatCount"
import { BeatLamp } from "@/components/BeatLamp"
import { Control } from "@/components/Control"
import { FilterFFT } from "@/components/FilterFFT"
import { LissajousMeter } from "@/components/LissajousMeter"
import { Meter } from "@/components/Meter"
import { MIDIView } from "@/components/MIDIView"
import { Waveform } from "@/components/Waveform"
// hook and util
import { useWorklet } from "@/hooks/useWorklet"
import { error, isDev } from "@/util/util"
// features
import { Animation } from "./features/Animation"
import { Base } from "./features/Base"
import { Cover } from "./features/Cover"
import { Waveforms } from "./features/Waveforms"

const midiUrls = [
  "/midi/BASS.mid",
  "/midi/TROMBONE.mid",
  "/midi/HORN.mid",
  "/midi/CHORD.mid",
  "/midi/FLUTE.mid",
  "/midi/ARP.mid",
  "/midi/TRUMPET.mid",
  "/midi/MELODY.mid",
]
const sources = ["/audio/drums.wav", "/audio/bass.wav", "/audio/inst.wav", "/audio/vocals.wav"]

export default function Visualizer() {
  const [isPlay, setIsPlay] = useState(false)
  const toggleIsPlay = useCallback(() => setIsPlay((s) => !s), [])

  const waveforms = useRef<ToneWaveform[]>([])
  const players = useRef<Player[]>([])
  const volumes = useRef<Volume[]>([])

  const lrBufferProcessor = useRef<AudioWorkletNode>(null)
  const masterPlayer = useRef<Player>(null)
  const masterFft = useRef<FFT>(null)
  const filter = useRef<Filter>(null)
  const masterVolume = useRef<Volume>(null)
  const masterWaveform = useRef<ToneWaveform>(null)
  const masterMeter = useRef<ToneMeter>(null)

  const { state } = useWorklet(undefined, [])

  useEffect(() => {
    if (state != "ok") return
    if (!masterFft.current) {
      error("Audio node not initialized.")
      return
    }
    const transport = getTransport()
    transport.bpm.set({ value: 110 })
    masterPlayer.current = new Player("/audio/2mix.wav")
    filter.current = new Filter(440, "bandpass", -12)
    masterVolume.current = new Volume(0)
    masterWaveform.current = new ToneWaveform(8192)
    masterMeter.current = new ToneMeter({ channelCount: 2, smoothing: 0.95 })
    lrBufferProcessor.current = getContext().createAudioWorkletNode("lr-buffer-processor", {
      channelCount: 2,
    })

    const masterSection = [
      masterFft.current,
      masterWaveform.current,
      masterMeter.current,
      lrBufferProcessor.current,
      getDestination(),
    ]

    masterPlayer.current.chain(filter.current, masterVolume.current, ...masterSection)

    for (let i = 0; i < sources.length; i++) {
      const wf = new ToneWaveform(1024)
      const player = new Player(sources[i])
      const volume = new Volume(-100)
      player.chain(wf, volume, ...masterSection)
      players.current.push(player)
      waveforms.current.push(wf)
      volumes.current.push(volume)
    }

    return () => {
      masterPlayer.current?.dispose()
      filter.current?.dispose()
      masterVolume.current?.dispose()
      masterWaveform.current?.dispose()
      masterMeter.current?.dispose()
      lrBufferProcessor.current?.disconnect()
      players.current = []
      waveforms.current = []
      volumes.current = []
    }
  }, [state])

  return (
    <>
      <div className="relative w-[1280px] h-[720px] text-white select-none">
        <div className="absolute w-full h-full">
          <Base isPlay={isPlay} setIsPlay={setIsPlay} />
        </div>
        <div className="absolute w-full h-full">
          <div className="p-5 h-full flex flex-col">
            <div className="grow shrink flex flex-row gap-8">
              <Waveforms
                waveforms={waveforms.current}
                volumes={volumes.current}
                masterVolume={masterVolume.current}
                className="grow shrink-0 h-full flex flex-col justify-between gap-2"
                width={380}
                height={80}
              />
              {/* <div>
                drum
              </div> */}
              <Animation className="aspect-square" />
              <div
                className="flex flex-col justify-between gap-6"
                style={{
                  height: `calc(100% + 120px - 200px )`,
                }}
              >
                <MIDIView
                  className="border border-white"
                  midiUrls={midiUrls}
                  // colors={midiColors}
                  isPlay={isPlay}
                  width={320}
                  height={320}
                />
                <div className="flex justify-around items-center py-8">
                  <IoFlowerOutline className="rotate" size={24} />
                  <Control
                    isPlay={isPlay}
                    toggleIsPlay={toggleIsPlay}
                    onStart={() => {
                      const transport = getTransport()
                      players.current.forEach((p) => p.start(0, transport.seconds))
                      masterPlayer.current?.start(0, transport.seconds)
                    }}
                    onPause={() => {
                      players.current.forEach((p) => p.stop())
                      masterPlayer.current?.stop()
                    }}
                  />
                  <a
                    href="https://soundcloud.com/arnicatunes/garden-weeds"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiSoundcloudLine size={24} />
                  </a>
                  {/* <button
                    className="icon-button"
                    type="button"
                    onClick={async () => {
                      const root = rootRef.current
                      if (!root) return
                      await root.requestFullscreen()
                    }}
                  >
                    <CgMaximize size={24} />
                  </button> */}
                </div>
              </div>
            </div>
            <div className="h-[120px] flex justify-between gap-4 mt-8">
              <FilterFFT
                className="grow shrink-0 border border-white"
                fft={masterFft}
                filter={filter.current}
                mode="raw-lines"
                slope={0.4}
                width={460}
                height={120}
                lineColor="white"
                barColor={{ from: "#fff8", to: "#99b88d" }}
              />
              {/* <SCEmbed height={120} /> */}
              <Waveform waveform={masterWaveform.current} className="grow shrink" />
              <Meter meter={masterMeter.current} width={30} />

              <LissajousMeter
                lrBufferProcessor={lrBufferProcessor.current}
                className="grow-0 shrink-0 rounded-full"
                style={{
                  transform: "translateY(calc(120px - 200px))",
                }}
                width={200}
                height={200}
              />
            </div>
            <div
              className="h-[30px] mt-8 grid gap-x-2 gap-y-1"
              style={{
                gridTemplateColumns: "15px 1fr",
                gridTemplateRows: "1fr 4px",
              }}
            >
              <BeatLamp style={{ gridRow: "1 / span 2" }} />
              <div className="flex justify-between leading-none">
                <BeatCount />
                <div>
                  <a
                    className="link"
                    href="https://soundcloud.com/arnicatunes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Arnica
                  </a>{" "}
                  -{" "}
                  <a
                    className="link"
                    href="https://soundcloud.com/arnicatunes/garden-weeds"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Garden Weeds
                  </a>
                </div>
              </div>
              <BeatBar />
            </div>
          </div>
        </div>
        <Cover />
      </div>
      <Leva hidden={!isDev()} />
    </>
  )
}
