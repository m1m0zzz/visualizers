"use client"

import { OrbitControls, Stats } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [3, 2, 3] }}>
      {/* <PerspectiveCamera position={[5, 3, 5]} makeDefault />
          <CameraControls makeDefault /> */}
      {/* <ambientLight color={"#fff"} intensity={0.5} />
          <directionalLight color={"#fff"} intensity={0.4} position={[1, 0.55, 5]} /> */}
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>

      {/* <Environment preset="forest" background /> */}
      <axesHelper args={[1]} />
      <gridHelper />
      <OrbitControls makeDefault />
      <Stats />
    </Canvas>
  )
}
