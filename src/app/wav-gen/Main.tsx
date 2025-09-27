"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select"
import { PreviewCard } from "./features/PreviewCard"
import {
  DEFAULT_NUM_FRAMES,
  type Fn,
  generateFrame,
  generateWavetable,
  generateWavetableLerp,
  saw,
  sawDown,
  sawUp,
  sine,
  square,
  triangle,
} from "./wavetable"

const basicShapes = [sine, triangle, saw, square]
const frameSizeMap: Record<number, string> = {
  1024: "1024 (Ableton Wavetable)",
  2048: "2048 (Vital, Xfer Serum)",
}

function filenameUtil(name: string, frameSize: number) {
  return `${name}${frameSize == 1024 ? " (Live)" : ""}.wav`
}

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

export type FrameSize = 1024 | 2048

export type GenerateFunction = (frameSize: FrameSize) => void

export type PresetItem =
  | {
      title: string
      functions: Fn[]
      func: GenerateFunction
    }
  | {
      title: string
      functions: Fn[]
      options: {
        title: string
        func: GenerateFunction
      }[]
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

  console.log("a")

  return (
    <div>
      <h2 className="text-2xl md:text-3xl mb-2 md:mb-4">wavetable</h2>
      <section className="mb-6">
        <div className="text-stone-600 dark:text-stone-300 mb-8">
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
        <div className="mt-4">
          {presetItems.map((item) => (
            <PreviewCard key={item.title} item={item} frameSize={frameSize} />
          ))}
        </div>
      </section>
    </div>
  )
}
