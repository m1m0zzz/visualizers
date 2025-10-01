"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs"
import { type Fn, type FrameSize, filenameUtil, frameSizeMap } from "./features/const"
import { type PresetItem, PreviewCard } from "./features/PreviewCard"
import { WavGenProvider } from "./features/provider"
import { WaveCreator } from "./features/WaveCreator"
import {
  DEFAULT_NUM_FRAMES,
  generateFrame,
  generateWavetable,
  generateWavetableLerp,
  saw,
  sawDown,
  sawUp,
  sine,
  square,
  triangle,
} from "./features/wavetable"

const basicShapes = [sine, triangle, saw, square]
const dcOffset: Fn[] = [(_: number) => -1, (_: number) => 1]

function generatePhaseShiftSawFrames(numFrames = DEFAULT_NUM_FRAMES) {
  return new Array(numFrames).fill(0).map((_, i) => {
    return (t: number) => saw(t, i / numFrames)
  })
}

function generatePhaseShiftSaw(frameSize: number, numFrames = DEFAULT_NUM_FRAMES) {
  return generatePhaseShiftSawFrames(numFrames).map((f) => {
    return generateFrame(f, frameSize)
  })
}

const presetItems: PresetItem[] = [
  {
    title: `basic shapes`,
    functions: basicShapes,
    options: [
      {
        title: "no lerp",
        func: (frameSize: FrameSize) => {
          generateWavetable(basicShapes, {
            filename: filenameUtil("basic shapes", frameSize),
            frameSize,
          })
        },
      },
      {
        title: `lerp, 64frames`,
        func: (frameSize: FrameSize) => {
          generateWavetableLerp(basicShapes, {
            filename: filenameUtil("basic shapes lerp", frameSize),
            frameSize,
          })
        },
      },
    ],
  },
  {
    title: `dc offset`,
    functions: dcOffset,
    func: (frameSize: FrameSize) => {
      generateWavetable(dcOffset, {
        frameSize: frameSize,
        normalize: false,
        filename: filenameUtil("dc offset", frameSize),
      })
    },
  },
  // {
  //   title: `dc offset (lerp, 64 frames)`,
  //   func: (frameSize: FrameSize) => {
  //     generateWavetableLerp(dcOffset, {
  //       frameSize: frameSize,
  //       numFrames: 128,
  //       normalize: false,
  //       filename: filenameUtil("dc offset lerp", frameSize),
  //     })
  //   },
  // },
  {
    title: `phase shift saw`,
    functions: generatePhaseShiftSawFrames(256),
    func: (frameSize: FrameSize) => {
      generateWavetable(generatePhaseShiftSaw(frameSize, 256), {
        frameSize: frameSize,
        filename: filenameUtil("phase shift saw 256", frameSize),
      })
    },
  },
  {
    title: `the saw`,
    functions: [sawUp, sawDown],
    func: (frameSize: FrameSize) => {
      generateWavetable([sawUp, sawDown], {
        frameSize: frameSize,
        normalize: true,
        filename: filenameUtil("the saw", frameSize),
      })
    },
  },
]

export function Main() {
  const [frameSize, setFrameSize] = useState<FrameSize>(1024)
  const searchParams = useSearchParams()
  const defaultOpen = searchParams.get("tab") == "formula" ? "formula" : "presets"

  return (
    <WavGenProvider searchParams={searchParams}>
      <div className="text-2xl md:text-3xl mb-2 md:mb-4">wavetable</div>
      <section className="mb-6">
        <div className="text-base text-stone-600 dark:text-stone-300 mb-8">
          <div className="mt-1">wavetable generator. Creating a wavetable from a function.</div>
          <div className="mt-1">NOTE: Load in Raw mode in Ableton Wavetable.</div>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span>sample: </span>
          <Select
            value={frameSizeMap[frameSize]}
            onValueChange={(v) => setFrameSize(Number(v.slice(0, 4)) as FrameSize)}
          >
            <SelectTrigger className="w-[240px] min-w-[200px] ml-1">
              <SelectValue placeholder="frame size" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(frameSizeMap).map((size) => {
                return (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue={defaultOpen} className="mt-4">
          <TabsList>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="formula">Create from formula</TabsTrigger>
          </TabsList>
          <TabsContent value="presets">
            <div className="mt-4 flex flex-col gap-6">
              {presetItems.map((item) => (
                <PreviewCard key={item.title} item={item} frameSize={frameSize} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="formula">
            <div className="mt-4 flex flex-col gap-6">
              <WaveCreator frameSize={frameSize} />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </WavGenProvider>
  )
}
