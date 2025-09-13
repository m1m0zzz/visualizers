import { clamp } from "@tremolo-ui/functions"

export function lerpColorByCount(
  fromColor: string,
  toColor: string,
  barCount: number,
  start: number,
  end: number,
) {
  const p = clamp(((barCount - start) / (end - start)) * 100, 0, 100)
  return `color-mix(in srgb, ${fromColor}, ${toColor} ${p}%)`
}

export function lerpColor(fromColor: string, toColor: string, percent: number) {
  return `color-mix(in srgb, ${fromColor}, ${toColor} ${clamp(percent, 0, 100)}%)`
}
