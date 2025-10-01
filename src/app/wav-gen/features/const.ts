export type Fn = (t: number) => number
export type FrameSize = 1024 | 2048

export const MIN_FRAMES = 32
export const MAX_FRAMES = 256

export const frameSizeMap: Record<FrameSize, string> = {
  1024: "1024 (Ableton Wavetable)",
  2048: "2048 (Vital, Xfer Serum)",
}

export function filenameUtil(name: string, frameSize: number) {
  return `${name}${frameSize == 1024 ? " (Live)" : ""}.wav`
}
