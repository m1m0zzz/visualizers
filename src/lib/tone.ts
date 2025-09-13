import { useEffect, useRef } from "react"
import { Oscillator, Player } from "tone"

export function getBarCount(currentTime: number, bpm: number) {
  // TODO
  const secondPerBar = 240 / bpm
  return 1 + currentTime / secondPerBar
}

export function useOscillator(options: ConstructorParameters<typeof Oscillator>[0]) {
  const ref = useRef(new Oscillator(options))
  return ref.current
}

export function usePlayer(options: ConstructorParameters<typeof Player>[0]) {
  const ref = useRef<Player>(null)
  useEffect(() => {
    ref.current = new Player(options)
  }, [options])
  return ref
}
