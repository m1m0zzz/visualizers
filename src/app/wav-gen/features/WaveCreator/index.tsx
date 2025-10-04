import { useState } from "react"
import { LuBug, LuPlus } from "react-icons/lu"
import { Button } from "@/components/ui/shadcn/button"
import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Slider } from "@/components/ui/shadcn/slider"
import { warn } from "@/lib/util"
import type { Fn, FrameSize } from "../const"
import { MAX_FORMULAS, useWavGenStore } from "../provider"
import { WavePreview } from "../WavePreview"
import { Configs } from "./Configs"
import { Formula } from "./Formula"
import { createFormula } from "./parser"
import { Title } from "./Title"

interface Props {
  frameSize: FrameSize
}

export function WaveCreator({ frameSize }: Props) {
  const [pos, setPos] = useState(0)
  const formulas = useWavGenStore((s) => s.formulas)
  const addFormula = useWavGenStore((s) => s.addFormula)

  let functions: Fn[]
  try {
    functions = formulas.map(({ f }) => createFormula(f))
    functions.forEach((f) => f(0))
  } catch (e) {
    functions = []
    warn(e)
  }

  return (
    <Card className="px-3 py-6 mb-20 text-base">
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          <div className="flex flex-col gap-5 justify-between">
            <Title>Preview</Title>
            <div className="w-full min-w-[200px] max-w-[300px] h-[100px] mx-auto">
              {functions.length ? (
                <WavePreview
                  color="oklch(67.3% 0.182 276.935)"
                  functions={functions}
                  pos={pos / 100}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center font-mono gap-2">
                  <LuBug />
                  error
                </div>
              )}
            </div>
            <div className="mt-4 min-w-[200px] flex gap-2">
              <Slider
                className="shrink"
                defaultValue={[pos]}
                max={100}
                onValueChange={(v) => setPos(v[0])}
                step={0.1}
              />
              <div className="shrink-0 w-[40px] md:w-[45px] text-sm md:text-base text-stone-700 dark:text-stone-300 flex justify-end">
                {pos.toFixed()} %
              </div>
            </div>
          </div>
          <Configs
            frameSize={frameSize}
            functions={functions}
            formulas={formulas.map(({ id: _, f }) => f)}
          />
        </div>
        <Title className="mt-12 sm:mt-8 mb-5">Formula</Title>
        <Formula />
        <div className="mt-3 mx-auto w-fit">
          <Button
            disabled={formulas.length >= MAX_FORMULAS}
            variant="outline"
            size="sm"
            onClick={addFormula}
          >
            <LuPlus /> Add formula
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
