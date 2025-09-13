/**
 * wavetable-browser.ts
 *
 * ブラウザ上で Ableton Wavetable 用の wavetable を生成してダウンロードする
 * - 2048 samples per frame
 * - up to 256 frames
 * - mono 16-bit PCM
 */

import { downloadBlob } from "@/lib/util"
import { encodeWAVBlob } from "@/lib/web-audio"

const DEFAULT_SAMPLE_RATE = 48000
const DEFAULT_FRAME_SIZE = 2048
const MAX_FRAMES = 256

export function sine(t: number) {
  return Math.sin(t * 2 * Math.PI)
}

export function triangle(t: number) {
  return t < 0.5 ? 1 - 4 * Math.abs(t - 0.25) : -1 + 4 * Math.abs(t - 0.75)
}

export function saw(t: number, phase = 0.5) {
  const x = t + phase
  const frac = x - Math.floor(x) // 小数部分
  return 2 * frac - 1
}

// 右肩上がりののこぎり波
export function sawUp(t: number) {
  return -1 + 2 * t
}

// 右肩下がりののこぎり波
export function sawDown(t: number) {
  return 1 - 2 * t
}

export function square(t: number) {
  return t % 1 < 0.5 ? 1 : -1
}

export function none(_t: number) {
  return 0
}

export type Fn = (p: number) => number

/* ---------- 1フレーム生成 ---------- */
export function generateFrame(fn: Fn, frameSize: number, normalize = true) {
  const frame = new Float32Array(frameSize)
  for (let i = 0; i < frameSize; i++) {
    const t = i / frameSize
    frame[i] = fn(t)
  }
  if (normalize) {
    const mean = frame.reduce((a, b) => a + b, 0) / frameSize
    let max = Math.max(...frame.map((v) => Math.abs(v - mean)))
    if (max == 0) max = 1
    for (let i = 0; i < frameSize; i++) {
      frame[i] = (frame[i] - mean) / max
    }
  }
  return frame
}

/* ---------- 線形補間 ---------- */
export function lerpFrame(a: Float32Array<ArrayBuffer>, b: Float32Array<ArrayBuffer>, t: number) {
  if (a.length != b.length) throw new Error("長さの異なる配列を補間することはできません")
  const frameSize = a.length
  const out = new Float32Array(frameSize)
  for (let i = 0; i < frameSize; i++) {
    out[i] = a[i] * (1 - t) + b[i] * t
  }
  // normalize
  let max = Math.max(...out.map((v) => Math.abs(v)))
  if (max == 0) max = 1
  for (let i = 0; i < frameSize; i++) {
    out[i] /= max
  }
  return out
}

type Option = Partial<{
  sampleRate: number
  bitDepth: 16 | 32
  frameSize: number // フレームのサンプル数 Ableton = 1024, Serum,Vital = 2048
  normalize: boolean
  filename: string
}>

const DEFAULT_OPTION = {
  sampleRate: DEFAULT_SAMPLE_RATE,
  frameSize: DEFAULT_FRAME_SIZE,
  normalize: true,
  filename: "wavetable.wav",
}

export function generateWavetable(frames: (Float32Array<ArrayBuffer> | Fn)[], option: Option = {}) {
  const opt = { ...DEFAULT_OPTION, ...option }
  const numFrames = frames.length
  if (numFrames > MAX_FRAMES) throw new Error("Max 256 frames")

  const flatFrames = new Float32Array(opt.frameSize * numFrames)
  for (let i = 0; i < numFrames; i++) {
    const frame = frames[i]
    if (typeof frame == "function") {
      flatFrames.set(generateFrame(frame, opt.frameSize, opt.normalize), opt.frameSize * i)
    } else {
      flatFrames.set(frame, opt.frameSize * i)
    }
  }

  const wavBlob = encodeWAVBlob([flatFrames], opt.sampleRate, opt.bitDepth)
  downloadBlob(wavBlob, opt.filename)
}

export const DEFAULT_NUM_FRAMES = 64 // 補間後のサイズ

export function generateWavetableLerp(
  frames: (Float32Array<ArrayBuffer> | Fn)[],
  option: Option & { numFrames?: number } = {},
) {
  const opt = { ...DEFAULT_OPTION, numFrames: DEFAULT_NUM_FRAMES, ...option }
  if (opt.numFrames > MAX_FRAMES) throw new Error("Max 256 frames")
  if (frames.length < 2) throw new Error("2つ以上のフレームを設定してください")
  if (opt.numFrames < frames.length)
    throw new Error("frames.length より小さい numFrames は設定できません")

  const segmentCount = frames.length - 1 // 区間数
  const segmentSize = 1 / segmentCount // 各区間の幅

  const flatFrames = new Float32Array(opt.frameSize * opt.numFrames)
  for (let i = 0; i < opt.numFrames; i++) {
    const r = i / (opt.numFrames - 1 || 1) // 0〜1
    // 区間インデックスを求める
    const seg = Math.min(Math.floor(r / segmentSize), segmentCount - 1)
    // 区間内での補間率 0〜1
    const localT = (r - seg * segmentSize) / segmentSize

    let a = frames[seg]
    let b = frames[seg + 1]
    if (typeof a == "function") a = generateFrame(a, opt.frameSize, opt.normalize)
    if (typeof b == "function") b = generateFrame(b, opt.frameSize, opt.normalize)
    flatFrames.set(lerpFrame(a, b, localT), opt.frameSize * i)
  }

  const wavBlob = encodeWAVBlob([flatFrames], opt.sampleRate, opt.bitDepth)
  downloadBlob(wavBlob, opt.filename)
}
