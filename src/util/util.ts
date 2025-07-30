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

export function isDev() {
  return process.env.NODE_ENV == "development"
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function log(...message: any[]) {
  if (isDev()) {
    console.log(...message)
  }
}
