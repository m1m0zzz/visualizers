import { createContext, type ReactNode, useContext, useRef } from "react"
import { createStore, useStore } from "zustand"

type State = {
  blur: number
  // isPlay: boolean
}

type Action = {
  setBlur: (count: number) => void
  // setIsPlay: (isPlay: boolean) => void
  // toggleIsPlay: () => void
}

type PageStore = State & Action

const defaultInitState: State = {
  blur: 0,
  // isPlay: false,
}

const createPageStore = (initState: State = defaultInitState) => {
  return createStore<PageStore>()((set) => ({
    ...initState,
    setBlur: (blur: number) => set(() => ({ blur })),
    // setIsPlay: (isPlay: boolean) => set(() => ({ isPlay })),
    // toggleIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
  }))
}

type PageStoreApi = ReturnType<typeof createPageStore>

const PageStoreContext = createContext<PageStoreApi | undefined>(undefined)

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<PageStoreApi | null>(null)
  if (storeRef.current == null) {
    storeRef.current = createPageStore()
  }

  return <PageStoreContext.Provider value={storeRef.current}>{children}</PageStoreContext.Provider>
}

export const usePageStore = <T,>(selector: (store: PageStore) => T): T => {
  const counterStoreContext = useContext(PageStoreContext)

  if (!counterStoreContext) {
    throw new Error(`usePageStore must be used within PageProvider`)
  }

  return useStore(counterStoreContext, selector)
}
