import { create } from "zustand"

type Blur = {
  blur: number
  setBlur: (count: number) => void
}

export const useBlurStore = create<Blur>((set) => ({
  blur: 0,
  setBlur: (blur: number) => set(() => ({ blur })),
}))

type IsPlay = {
  isPlay: boolean
  setIsPlay: (isPlay: boolean) => void
  toggleIsPlay: () => void
}

export const useIsPlayStore = create<IsPlay>((set) => ({
  isPlay: false,
  setIsPlay: (isPlay: boolean) => set(() => ({ isPlay })),
  toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
}))

