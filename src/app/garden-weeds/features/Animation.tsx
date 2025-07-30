"use client"

import {
  CameraControls,
  Environment,
  Fisheye,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { type ComponentProps, Suspense } from "react"
import { Loading } from "@/components/Loading"
import { PottedPlant2 } from "@/models/PottedPlant2"
import { SuspenseGroup } from "@/util/three"
import { log } from "@/util/util"

export function Animation({ style, ...props }: ComponentProps<"div">) {
  log("mount Animation")

  return (
    <div
      style={{
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <Suspense fallback={<Loading />}>
        <Canvas flat>
          <Fisheye>
            {/* camera and lighting */}
            <PerspectiveCamera makeDefault position={[1, 1, 1]} />
            <Environment preset="forest" background blur={1} backgroundIntensity={0.8} />
            <ambientLight color={"#fff"} intensity={1} />
            <directionalLight color={"#fff"} intensity={0.8} position={[2, 4, 2]} />

            {/* models */}
            <PottedPlant2 position={[0, -0.7, 0]} scale={3} />

            {/* helpers */}
            <axesHelper />
            <gridHelper />
            <CameraControls
              minPolarAngle={(Math.PI / 2) * 0.4}
              maxPolarAngle={(Math.PI / 2) * 0.8}
              minDistance={1}
              maxDistance={1.7}
            />
          </Fisheye>
          {/* <OrbitControls
            minPolarAngle={(Math.PI / 2) * 0.4}
            maxPolarAngle={(Math.PI / 2) * 0.8}
            minDistance={0.1}
            maxDistance={2}
          /> */}
        </Canvas>
      </Suspense>
    </div>
  )
}
