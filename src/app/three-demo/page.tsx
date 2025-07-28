"use client"

import { OrbitControls, Stats } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function ThreeDemo() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
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
    </div>
  )
}
