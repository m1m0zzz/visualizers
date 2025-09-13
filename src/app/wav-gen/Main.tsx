"use client"

import { useState } from "react"
import { Dropdown } from "@/components/ui/DropDown"
import { StyledButton } from "@/components/ui/StyledButton"
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
} from "./wavetable"

const basicShapes = [sine, triangle, saw, square]
const descriptions: Record<number, string> = {
  1024: "1024 (Ableton Wavetable)",
  2048: "2048 (Vital, Xfer Serum)",
}
const items = Object.values(descriptions)

function filenameUtil(name: string, frameSize: number) {
  return `${name}${frameSize == 1024 ? " (Live)" : ""}.wav`
}

const dcOffset = [(_: number) => -1, (_: number) => 1]

function generatePhaseShiftSaw(frameSize: number, numFrames = DEFAULT_NUM_FRAMES) {
  const phaseShiftSaw = new Array(numFrames).fill(0).map((_, i) => {
    return generateFrame((t) => saw(t, i / numFrames), frameSize)
  })
  return phaseShiftSaw
}

export function Main() {
  type FrameSize = 1024 | 2048
  const [frameSize, setFrameSize] = useState<FrameSize>(1024)

  return (
    <div>
      <h2 className="text-2xl md:text-3xl mb-2 md:mb-4">wavetable</h2>
      <section className="mb-6 md:pl-8">
        <div className="text-stone-600 dark:text-stone-300 mb-8">
          <div className="mt-1">wavetable generator. Creating a wavetable from a function.</div>
          <div className="mt-1">NOTE: Load in RAW mode in Ableton Wavetable.</div>
        </div>
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span>sample: </span>
          <Dropdown
            value={descriptions[frameSize]}
            items={items}
            onChange={(v) => setFrameSize(Number(v.slice(0, 4)) as FrameSize)}
            className="w-[240px] min-w-[200px]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {/* basic shapes */}
          <StyledButton
            onClick={() =>
              generateWavetable(basicShapes, {
                filename: filenameUtil("basic shapes", frameSize),
                frameSize,
              })
            }
          >
            basic shapes (no lerp)
          </StyledButton>
          <StyledButton
            onClick={() =>
              generateWavetableLerp(basicShapes, {
                filename: filenameUtil("basic shapes lerp", frameSize),
                frameSize,
              })
            }
          >
            basic shapes (lerp, 64 frames)
          </StyledButton>
          {/* dc offset */}
          <StyledButton
            onClick={() =>
              generateWavetable(dcOffset, {
                frameSize: frameSize,
                normalize: false,
                filename: filenameUtil("dc offset", frameSize),
              })
            }
          >
            dc offset
          </StyledButton>
          <StyledButton
            disabled
            onClick={() =>
              // TODO
              generateWavetableLerp(dcOffset, {
                frameSize: frameSize,
                numFrames: 128,
                normalize: false,
                filename: filenameUtil("dc offset lerp", frameSize),
              })
            }
          >
            <s>dc offset (lerp, 64 frames)</s>
          </StyledButton>
          {/* phase shift saw */}
          <StyledButton
            onClick={() =>
              generateWavetable(generatePhaseShiftSaw(frameSize, 128), {
                frameSize: frameSize,
                filename: filenameUtil("phase shift saw", frameSize),
              })
            }
          >
            phase shift saw
          </StyledButton>
          <StyledButton
            onClick={() =>
              generateWavetable(generatePhaseShiftSaw(frameSize, 256), {
                frameSize: frameSize,
                filename: filenameUtil("phase shift saw 256", frameSize),
              })
            }
          >
            phase shift saw 256
          </StyledButton>
          {/* saw */}
          <StyledButton
            onClick={() =>
              generateWavetable([sawUp, sawDown], {
                frameSize: frameSize,
                normalize: true,
                filename: filenameUtil("the saw", frameSize),
              })
            }
          >
            the saw
          </StyledButton>
        </div>
      </section>
    </div>
  )
}
