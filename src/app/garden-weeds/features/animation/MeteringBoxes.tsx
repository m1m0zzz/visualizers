import { type ThreeElements, useFrame } from "@react-three/fiber"
import { createRef, type RefObject, useRef } from "react"
import type { Mesh } from "three"
import { dbToGain, type Meter } from "tone"
import { average } from "@/lib/util"

interface MeteringBoxesProps {
  meter: RefObject<Meter | null>
}

export function MeteringBoxes({
  meter: _meter,
  ...props
}: MeteringBoxesProps & ThreeElements["group"]) {
  const xCount = 3
  const yCount = 3
  const zCount = 3
  const meshCount = xCount * yCount * zCount
  const meshRefs = useRef<RefObject<Mesh | null>[]>([])

  for (let i = 0; i < meshCount; i++) {
    meshRefs.current[i] = createRef<Mesh | null>()
  }

  useFrame(() => {
    const meter = _meter.current
    const meshes = meshRefs.current
    if (!meshes || !meter) return
    const _ = meter.getValue()
    const gain = dbToGain(typeof _ == "number" ? _ : average(_))
    meshes.forEach((mesh) => {
      if (mesh.current) {
        mesh.current.scale.set(gain, gain, gain)
      }
    })
  })

  return (
    <group {...props}>
      <group position={[0.5 - xCount / 2, 0.5 - yCount / 2, 0.5 - zCount / 2]}>
        {meshRefs.current.map((meshRef, i) => {
          return (
            <mesh
              key={i.toString()}
              ref={meshRef}
              position={[
                i % xCount,
                Math.floor((i / xCount) % yCount),
                Math.floor(i / (xCount * yCount)),
              ]}
            >
              <boxGeometry />
              <meshLambertMaterial color="white" />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
