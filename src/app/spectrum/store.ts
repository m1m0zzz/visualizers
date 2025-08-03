import { create } from "zustand"

type ObjectUrl = {
  objectUrl: string | null
  setObjectUrl: (objectUrl: string | null) => void
}

export const useObjectUrlStore = create<ObjectUrl>((set) => ({
  objectUrl: null,
  setObjectUrl: (objectUrl: string | null) => set(() => ({ objectUrl })),
}))
