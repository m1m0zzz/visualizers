import { clamp } from "@tremolo-ui/functions"
import type { ReadonlyURLSearchParams } from "next/navigation"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { createStore, useStore } from "zustand"
import { MAX_FRAMES, MIN_FRAMES } from "./const"

type Formula = {
  id: number
  f: string
}

type State = {
  lerp: boolean
  normalize: boolean
  frames: number
  filename: string
  formulas: Formula[]
}

type Action = {
  setLerp: (lerp: boolean) => void
  setNormalize: (normalize: boolean) => void
  setFrames: (frames: number) => void
  setFilename: (filename: string) => void
  setFormulas: (formulas: Formula[]) => void
  addFormula: () => void
  updateFormulaAt: (value: string, id: number) => void
  deleteFormulaAt: (id: number) => void
}

type WavGenStore = State & Action

export const defaultFilename = "wavetable"
export const defaultFormula = "Math.sin(2 * Math.PI * t)"
export const MAX_FORMULAS = 16

const defaultInitState: State = {
  lerp: false,
  normalize: false,
  frames: 64,
  filename: defaultFilename,
  formulas: [
    { id: 0, f: "Math.sin(2 * Math.PI * t)" }, // sine
    { id: 1, f: "t < 0.5 ? 1 - 4 * Math.abs(t - 0.25) : -1 + 4 * Math.abs(t - 0.75)" }, // triangle
    { id: 2, f: "2 * (t + 0.5 - Math.floor(t + 0.5)) - 1" }, // saw
    { id: 3, f: "t < 0.5 ? 1 : -1" }, // pulse
  ],
}

let nextId = 4

const createWavGenStore = (
  searchParams: ReadonlyURLSearchParams,
  initState: State = defaultInitState,
) => {
  function validateLerp(lerp: string | null) {
    if (lerp == null) return
    return { lerp: lerp == "true" }
  }
  function validateNormalize(normalize: string | null) {
    if (normalize == null) return
    return { normalize: normalize == "true" }
  }
  function validateFrames(frames: string | null) {
    if (frames == null || frames == "" || Number.isNaN(frames)) return
    const normed = 2 ** Math.round(Math.log2(Number(frames)))
    const clamped = clamp(normed, MIN_FRAMES, MAX_FRAMES)
    return { frames: clamped }
  }
  function validateFilename(filename: string | null) {
    if (filename == null || filename == "") return
    return { filename }
  }
  function validateFormulas(formulas: string | null) {
    if (formulas == null || formulas == "") return
    const fs = formulas.split(",").map((f, index) => ({ id: index, f: f.trim() }))
    nextId = fs.length
    return { formulas: fs }
  }

  return createStore<WavGenStore>()((set) => ({
    ...initState,
    ...validateLerp(searchParams.get("lerp")),
    ...validateNormalize(searchParams.get("normalize")),
    ...validateFrames(searchParams.get("frames")),
    ...validateFilename(searchParams.get("filename")),
    ...validateFormulas(searchParams.get("formulas")),
    setLerp: (lerp: boolean) => set(() => ({ lerp })),
    setNormalize: (normalize: boolean) => set(() => ({ normalize })),
    setFrames: (frames: number) => set(() => ({ frames })),
    setFilename: (filename: string) => set(() => ({ filename })),
    setFormulas: (formulas: Formula[]) => set(() => ({ formulas })),
    addFormula: () =>
      set(({ formulas }) => {
        if (formulas.length >= MAX_FORMULAS) return {}
        const newFormula = {
          id: nextId++,
          f: defaultFormula,
        }
        return { formulas: [...formulas, newFormula] }
      }),
    updateFormulaAt: (value: string, id: number) =>
      set(({ formulas }) => ({
        formulas: formulas.map((prev) => (prev.id == id ? { id, f: value } : prev)),
      })),
    deleteFormulaAt: (id: number) =>
      set(({ formulas }) => ({ formulas: formulas.filter(({ id: _id }) => _id != id) })),
  }))
}

type WavGenStoreApi = ReturnType<typeof createWavGenStore>

const WavGenStoreContext = createContext<WavGenStoreApi | undefined>(undefined)

interface WavGenProviderProps {
  searchParams: ReadonlyURLSearchParams
  children: ReactNode
}

export const WavGenProvider = ({ searchParams, children }: WavGenProviderProps) => {
  const storeRef = useRef<WavGenStoreApi | null>(null)
  if (storeRef.current == null) {
    storeRef.current = createWavGenStore(searchParams)
  }

  return (
    <WavGenStoreContext.Provider value={storeRef.current}>{children}</WavGenStoreContext.Provider>
  )
}

export const useWavGenStore = <T,>(selector: (store: WavGenStore) => T): T => {
  const counterStoreContext = useContext(WavGenStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useWavGenStore must be used within WavGenProvider`)
  }

  return useStore(counterStoreContext, selector)
}
