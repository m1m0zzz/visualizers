"use client"

import { Leva } from "leva"
import { useEffect, useRef } from "react"
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
// midi
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
import { useEffectAsync } from "@/hooks/useEffectAsync"
import { isDev, log } from "@/util/util"
// import lrBufferProcessorUrl from "@/processors/lr-buffer-processor.worklet"
// import lrBufferWorkerUrl from "@/processors/lr-buffer-processor?worker&url"
import { Animation } from "./features/Animation"
import { Base } from "./features/Base"
import { Cover } from "./features/Cover"
import { useIsPlayStore } from "./features/store"
import { Waveforms } from "./features/Waveforms"
// css
import styles from "./styles.module.css"

// const lrBufferProcessorUrl = import.meta.env.PROD ? lrBufferWorkerUrl : lrBufferUrl

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
const bpm = 110

const lrBufferProcessorUrl = new URL("@/processors/lr-buffer-processor", import.meta.url).href
log(lrBufferProcessorUrl)

export default function Visualizer() {
  const isPlay = useIsPlayStore((s) => s.isPlay)
  const toggleIsPlay = useIsPlayStore((s) => s.toggleIsPlay)

  const waveforms = useRef<ToneWaveform[]>([])
  const players = useRef<Player[]>([])
  const volumes = useRef<Volume[]>([])

  const lrBufferProcessor = useRef<AudioWorkletNode>(null)
  const masterPlayer = useRef<Player>(null)
  const masterFft = useRef<FFT>(null!)
  const filter = useRef<Filter>(null)
  const masterVolume = useRef<Volume>(null)
  const masterWaveform = useRef<ToneWaveform>(null)
  const masterMeter = useRef<ToneMeter>(null)

  const count = useRef(0)

  const { state } = useEffectAsync(
    new Promise((resolve) => {
      if (count.current == 0) {
        log("added worklet module")
        count.current += 1
        resolve(getContext().addAudioWorkletModule(lrBufferProcessorUrl))
      } else {
        resolve(() => {})
      }
    }),
    null,
    [],
  )

  useEffect(() => {
    if (state != "ok") return
    log("on update")
    masterPlayer.current = new Player("/audio/2mix.wav")
    // masterFft.current = new FFT(4096)
    filter.current = new Filter(440, "bandpass", -12)
    masterVolume.current = new Volume(0)
    masterWaveform.current = new ToneWaveform(8192)
    masterMeter.current = new ToneMeter({ channelCount: 2, smoothing: 0.95 })

    lrBufferProcessor.current = getContext().createAudioWorkletNode("lr-buffer-processor", {
      channelCount: 2,
    })
    // const transport = getTransport()

    masterPlayer.current.connect(filter.current)
    filter.current.chain(
      masterVolume.current,
      masterFft.current,
      lrBufferProcessor.current,
      masterWaveform.current,
      masterMeter.current,
      getDestination(),
    )

    for (let i = 0; i < sources.length; i++) {
      const wf = new ToneWaveform(1024)
      const player = new Player(sources[i])
      const volume = new Volume(-100)
      player.chain(
        wf,
        volume,
        masterFft.current,
        lrBufferProcessor.current,
        masterWaveform.current,
        masterMeter.current,
        getDestination(),
      )
      players.current.push(player)
      waveforms.current.push(wf)
      volumes.current.push(volume)
    }
  }, [state])

  return (
    <>
      <div
        className="relative text-white select-none"
        style={{
          width: 1280,
          height: 720,
        }}
      >
        <div className={styles.absolute}>
          <Base bpm={bpm} />
        </div>
        <div className={styles.absolute}>
          <div
            style={{
              padding: 20,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                gap: 32,
              }}
            >
              <Waveforms
                waveforms={waveforms.current}
                volumes={volumes.current}
                masterVolume={masterVolume.current}
                width={380}
                height={80}
                style={{
                  flex: "1 0 auto",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              />
              {/* <div
                style={{
                  flex: "1 1 auto",
                }}
              >
                drum
              </div> */}
              <Animation
                style={{
                  // border: "1px solid white",
                  aspectRatio: 1,
                }}
              />
              <div
                style={{
                  height: `calc(100% + 120px - 200px )`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 24,
                }}
              >
                <MIDIView
                  midiUrls={midiUrls}
                  // colors={midiColors}
                  bpm={bpm}
                  isPlay={isPlay}
                  // width={466 - 80}
                  // height={466 - 80}
                  width={320}
                  height={320}
                  style={{ border: "1px solid white" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "0 32px",
                  }}
                >
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: 120,
                gap: 16,
                marginTop: 32,
              }}
            >
              <FilterFFT
                style={{
                  flex: "1 0 auto",
                  border: "1px solid white",
                  // borderRadius: 12,
                }}
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
              <Waveform waveform={masterWaveform.current} style={{ flex: "1 1 auto" }} />
              <Meter meter={masterMeter.current} width={30} />

              <LissajousMeter
                lrBufferProcessor={lrBufferProcessor.current}
                style={{
                  flex: "0 0 auto",
                  transform: "translateY(calc(120px - 200px))",
                  // border: "1px solid white",
                  borderRadius: 9999,
                }}
                width={200}
                height={200}
              />
            </div>
            <div
              style={{
                height: 30,
                marginTop: 32,
                display: "grid",
                gridTemplateColumns: "15px 1fr",
                gridTemplateRows: "1fr 4px",
                columnGap: 8,
                rowGap: 4,
              }}
            >
              <BeatLamp style={{ gridRow: "1 / span 2" }} bpm={bpm} isPlay={isPlay} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  // fontSize: 14,
                  lineHeight: 1,
                }}
              >
                <BeatCount bpm={bpm} isPlay={isPlay} />
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
              <BeatBar bpm={bpm} isPlay={isPlay} />
            </div>
          </div>
        </div>
        <Cover />
      </div>
      <Leva hidden={!isDev()} />
    </>
  )
}
