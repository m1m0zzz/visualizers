"use client"

import { Fisheye, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { type ComponentProps, Suspense, useRef } from "react"
import { Loading } from "@/components/Loading"
import { PottedPlant2 } from "@/models/PottedPlant2"
import { CustomDirectionalLight, CustomEnvironment } from "@/util/three"
import { isDev, log } from "@/util/util"

export function Animation({ style, ...props }: ComponentProps<"div">) {
  log("mount Animation")

  const camera = useRef<typeof PerspectiveCamera>(null)

  return (
    <div
      style={{
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <Suspense fallback={<Loading />}>
        <Canvas>
          <Fisheye zoom={0}>
            {/* camera and lighting */}
            {/* @ts-ignore */}
            <PerspectiveCamera ref={camera} makeDefault position={[1, 1.5, 1]} />
            <CustomEnvironment preset="forest" background blur={1} backgroundIntensity={0.3} />
            {/* <Environment  /> */}
            <ambientLight color={"#fff"} intensity={1} />

            <CustomDirectionalLight
              helper={isDev()}
              color={"#259fef"}
              intensity={1.3}
              position={[-1, 5, -0.5]}
            />

            {/* models */}
            <PottedPlant2 position={[0, 0, 0]} scale={3} />

            {/* <Plane position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={20}>
              <GrassMaterial repeat={4} />
            </Plane> */}

            {/* helpers */}
            {isDev() && <axesHelper />}
            {isDev() && <gridHelper />}
            <OrbitControls
              makeDefault
              minPolarAngle={(Math.PI / 2) * 0.3}
              maxPolarAngle={(Math.PI / 2) * 0.7}
              enableZoom={isDev()}
            />
          </Fisheye>
        </Canvas>
      </Suspense>
    </div>
  )
}
