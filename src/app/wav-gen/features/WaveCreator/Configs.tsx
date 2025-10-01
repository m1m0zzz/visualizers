import { useRouter } from "next/navigation"
import { LuDownload, LuMaximize2, LuShare2, LuSquareStack } from "react-icons/lu"
import { toast } from "sonner"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Slider } from "@/components/ui/shadcn/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/shadcn/toggle-group"
import { cn } from "@/lib/cn"
import { setClipboard } from "@/lib/util"
import { type Fn, type FrameSize, filenameUtil, MAX_FRAMES, MIN_FRAMES } from "../const"
import { defaultFilename, useWavGenStore } from "../provider"
import { generateWavetable } from "../wavetable"
import { Title } from "./Title"

interface Props {
  frameSize: FrameSize
  functions: Fn[]
  formulas: string[]
}

export function Configs({ frameSize, functions, formulas }: Props) {
  const lerp = useWavGenStore((s) => s.lerp)
  const setLerp = useWavGenStore((s) => s.setLerp)
  const normalize = useWavGenStore((s) => s.normalize)
  const setNormalize = useWavGenStore((s) => s.setNormalize)
  const frames = useWavGenStore((s) => s.frames)
  const setFrames = useWavGenStore((s) => s.setFrames)
  const filename = useWavGenStore((s) => s.filename)
  const setFilename = useWavGenStore((s) => s.setFilename)

  const router = useRouter()

  const download = () => {
    const fn = filename == "" ? defaultFilename : filename
    generateWavetable(functions, {
      frameSize,
      normalize,
      filename: filenameUtil(fn, frameSize),
    })
  }

  const share = async () => {
    const fn = filename == "" ? defaultFilename : filename
    const params = {
      tab: "formula",
      lerp,
      normalize,
      frames,
      filename: fn,
      formulas: formulas.join(","),
    }
    const usp = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]))
    const query = `?${usp.toString()}`
    const { origin, pathname } = location

    router.replace(pathname + query, { scroll: false })
    await setClipboard(origin + pathname + query)

    toast("Copied to clipboard.", {
      action: {
        label: "OK",
        onClick: () => {},
      },
    })
  }

  return (
    <div className="flex flex-col justify-between gap-5">
      <Title>Config</Title>
      <ToggleGroup
        type="multiple"
        variant="outline"
        activeColor="indigo"
        className="w-full"
        value={[lerp ? "lerp" : "", normalize ? "normalize" : ""]}
        onValueChange={(values) => {
          setLerp(values.includes("lerp"))
          setNormalize(values.includes("normalize"))
        }}
      >
        <ToggleGroupItem value="lerp" aria-label="Toggle lerp">
          <LuSquareStack />
          lerp
        </ToggleGroupItem>
        <ToggleGroupItem value="normalize" aria-label="Toggle normalize">
          <LuMaximize2 className="-rotate-45 scale-75" />
          normalize
        </ToggleGroupItem>
      </ToggleGroup>

      <div>
        <div>
          frames{" "}
          <span className="text-sm font-mono text-stone-700 dark:text-stone-300 ">
            (if lerp == <span className={cn(lerp && "text-orange-300")}>true</span>)
          </span>
        </div>

        <div className="w-[100%] mt-4 mb-2 flex items-center gap-2">
          <Slider
            name="frames"
            disabled={!lerp}
            defaultValue={[Math.log2(frames)]}
            min={Math.log2(MIN_FRAMES)}
            max={Math.log2(MAX_FRAMES)}
            step={1}
            onValueChange={(values) => {
              setFrames(2 ** values[0])
            }}
          />
          <div className="shrink-0 w-[30px] text-sm md:text-base text-stone-700 dark:text-stone-300 flex justify-end">
            {frames}
          </div>
        </div>
      </div>

      <div>
        <div>file name</div>
        <div className="flex gap-2 text-sm mt-2">
          <Input
            type="text"
            name="filename"
            placeholder="wavetable"
            className="grow"
            defaultValue={filename}
            maxLength={255 - 11} // xxx (Live).wav
            onChange={(e) => {
              const { value } = e.currentTarget
              setFilename(value)
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!functions.length}
            onClick={download}
          >
            <LuDownload />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            // disabled={!functions.length}
            onClick={share}
          >
            <LuShare2 />
          </Button>
        </div>
      </div>
    </div>
  )
}
