import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * @param ary An array or Float32Array with a length greater than or equal to 1.
 */
export function arrayMax(ary: number[] | Float32Array) {
  if (Array.isArray(ary)) {
    return ary.reduce((a, b) => Math.max(a, b))
  } else {
    return ary.reduce((a, b) => Math.max(a, b))
  }
}

export function arrayMaxSafe(ary: number[] | Float32Array) {
  if (ary.length >= 1) {
    return arrayMax(ary)
  } else {
    return undefined
  }
}

/**
 * @param ary An array or Float32Array with a length greater than or equal to 1.
 */
export function arrayMin(ary: number[] | Float32Array) {
  if (Array.isArray(ary)) {
    return ary.reduce((a, b) => Math.min(a, b))
  } else {
    return ary.reduce((a, b) => Math.min(a, b))
  }
}

export function arrayMinSafe(ary: number[] | Float32Array) {
  if (ary.length >= 1) {
    return arrayMin(ary)
  } else {
    return undefined
  }
}

export function average(ary: number[]) {
  if (ary.length == 0) return 0
  let sum = 0
  ary.forEach((v) => {
    sum += v
  })
  return sum / ary.length
}

export function randRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export const filterProperties = <T extends object>(
  obj: T,
  filterFn: (key: string, value: unknown) => boolean,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => filterFn(key, value)),
  ) as Partial<T>
}

export const filterUndefinedProperties = <T extends object>(obj: T): Partial<T> =>
  filterProperties(obj, (_key, value) => value !== undefined)

export function isDev() {
  return process.env.NODE_ENV == "development"
}

// biome-ignore lint/suspicious/noExplicitAny: Can receive any argument
export function log(...message: any[]) {
  if (isDev()) {
    console.log(...message)
  }
}

// biome-ignore lint/suspicious/noExplicitAny: Can receive any argument
export function warn(...message: any[]) {
  if (isDev()) {
    console.warn(...message)
  }
}

// biome-ignore lint/suspicious/noExplicitAny: Can receive any argument
export function error(...message: any[]) {
  if (isDev()) {
    console.error(...message)
  }
}
