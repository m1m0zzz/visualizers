"use client"

import { Fisheye, OrbitControls, PerspectiveCamera, Plane, useTexture } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { type ComponentProps, type RefObject, Suspense, useRef } from "react"
import { DoubleSide } from "three"
import type { Meter } from "tone"
import { Loading } from "@/components/ui/Loading"
import { PottedPlant2 } from "@/models/PottedPlant2"
import { CustomDirectionalLight, CustomEnvironment, setRepeat } from "@/util/three"
import { isDev, log } from "@/util/util"

interface Props {
  meter: RefObject<Meter | null>
}

function GrassMaterial({ repeat = 1 }: { repeat?: number }) {
  const props = useTexture({
    map: "/textures/leafy_grass_4k.gltf/textures/leafy_grass_diff_4k.jpg",
    normalMap: "/textures/leafy_grass_4k.gltf/textures/leafy_grass_nor_gl_4k.jpg",
    roughnessMap: "/textures/leafy_grass_4k.gltf/textures/leafy_grass_arm_4k.jpg",
  })
  Object.values(props).forEach((texture) => setRepeat(texture, repeat))

  return <meshStandardMaterial {...props} side={DoubleSide} />
}

export function Animation({ meter, style, ...props }: Props & ComponentProps<"div">) {
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
          {/* <Fisheye zoom={0}> */}
          {/* camera and lighting */}
          {/* @ts-ignore */}
          <PerspectiveCamera ref={camera} makeDefault position={[1, 1.5, 1]} />
          <CustomEnvironment
            preset="forest"
            background
            blur={1}
            environmentIntensity={0.5}
            backgroundIntensity={0.3}
          />
          {/* <Environment  /> */}
          <ambientLight color={"#fff"} intensity={0.3} />

          <CustomDirectionalLight
            helper={isDev()}
            color={"#259fef"}
            intensity={1.3}
            position={[-1, 5, -0.5]}
          />

          {/* models */}
          <PottedPlant2 position={[0, 0, 0]} scale={3} />

          {/* <MeteringContainer meter={meter}>
              <sphereGeometry />
              <meshBasicMaterial color={"lime"} />
            </MeteringContainer> */}

          {/* <Plane position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={100}>
            <GrassMaterial repeat={10} />
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
          {/* </Fisheye> */}
        </Canvas>
      </Suspense>
    </div>
  )
}
