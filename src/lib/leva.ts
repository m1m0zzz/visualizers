export type RGBA = { r: number; g: number; b: number; a?: number }

export function colorString({ r, g, b, a }: RGBA) {
  if (a != undefined) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}
