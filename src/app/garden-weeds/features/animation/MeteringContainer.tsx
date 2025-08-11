import { type ThreeElements, useFrame } from "@react-three/fiber"
import { type RefObject, useRef } from "react"
import type { Mesh } from "three"
import { dbToGain, type Meter } from "tone"
import { average } from "@/util/util"

interface MeteringBoxProps {
  meter: RefObject<Meter | null>
}

export function MeteringContainer({
  meter: _meter,
  children,
  ...props
}: MeteringBoxProps & ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    const meter = _meter.current
    const mesh = meshRef.current
    if (!mesh || !meter) return
    const _ = meter.getValue()
    const gain = dbToGain(typeof _ == "number" ? _ : average(_))
    mesh.scale.set(gain, gain, gain)
  })

  return (
    <mesh ref={meshRef} {...props}>
      {children || (
        <>
          <boxGeometry />
          <meshLambertMaterial color="white" />
        </>
      )}
    </mesh>
  )
}
