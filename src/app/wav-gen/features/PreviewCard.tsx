import { useState } from "react"
import { Card } from "@/components/ui/shadcn/card"
import { Slider } from "@/components/ui/shadcn/slider"
import type { FrameSize, PresetItem } from "../Main"
import { DownloadButton } from "./DownloadButton"
import { WavePreview } from "./WavePreview"

interface Props {
  item: PresetItem
  frameSize: FrameSize
}

export function PreviewCard({ item, frameSize }: Props) {
  const [pos, setPos] = useState(0)

  return (
    <Card key={item.title} className="px-5 pt-5 pb-2 mb-4 gap-6">
      <div className="w-[100%] min-w-[120px] max-w-[300px] h-[140px] mx-auto">
        <WavePreview functions={item.functions} pos={pos / 100} />
      </div>
      <div className="mt-4 w-[100%] min-w-[120px] max-w-[300px] mx-auto flex gap-2">
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
      <div className="flex flex-row items-center justify-between">
        <div>{item.title}</div>
        {"func" in item && (
          <DownloadButton
            key={item.title}
            className="aspect-square text-sm"
            onClick={() => item.func(frameSize)}
          />
        )}
        {"options" in item && (
          <div className="flex gap-2 text-sm">
            {item.options.map(({ title, func }) => {
              return (
                <DownloadButton key={title} onClick={() => func(frameSize)}>
                  {title}
                </DownloadButton>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
