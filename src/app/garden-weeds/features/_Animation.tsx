"use client"

import {
  Environment,
  type EnvironmentProps,
  OrbitControls,
  Plane,
  useEnvironment,
  useTexture,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { type ComponentProps, Suspense } from "react"
import { DoubleSide } from "three"
import { Loading } from "@/components/Loading"
import { CompostBags } from "@/models/CompostBags"
import { MarbleBust } from "@/models/MarbleBust"
import { PlasticMonoblocChair } from "@/models/PlasticMonoblocChair"
import { PottedPlant2 } from "@/models/PottedPlant2"
import { PottedPlant4 } from "@/models/PottedPlant4"
import { Tree } from "@/models/Tree"
import { WateringCanMetal } from "@/models/WateringCanMetal"
import { WoodenStool } from "@/models/WoodenStool"
import { SuspenseGroup, setRepeat } from "@/util/three"
import { log } from "@/util/util"

interface Props {
  width?: number | string
  height?: number | string
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

function GardenEnvironment({ ...props }: Omit<EnvironmentProps, "map">) {
  const texture = useEnvironment({
    files: "/hdr/symmetrical_garden_02_4k.hdr",
  })

  return <Environment map={texture} {...props} />
}

const wallHeight = 0.1

export function Animation({ style, ...props }: Props & ComponentProps<"div">) {
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
        <Canvas camera={{ position: [1.5, 3, 4] }} dpr={globalThis.devicePixelRatio}>
          {/* lighting */}
          <ambientLight color={"#fff"} intensity={1.6} />
          <directionalLight color={"#fff"} intensity={0.8} position={[2, 4, 2]} />

          {/* other */}

          <Plane position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={10}>
            {/* <meshBasicMaterial color="#ccc" side={DoubleSide} /> */}
            <GrassMaterial repeat={4} />
          </Plane>

          {/* models */}
          <SuspenseGroup position={[-1, 0, -0.5]}>
            <Tree />
          </SuspenseGroup>

          <group position={[0, 0, 1.4]} rotation={[0, Math.PI / 8, 0]}>
            <SuspenseGroup position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <PlasticMonoblocChair />
            </SuspenseGroup>
            <SuspenseGroup>
              <WoodenStool position={[0, 0, 0]} scale={1.4} />
            </SuspenseGroup>
            <SuspenseGroup>
              <PlasticMonoblocChair position={[1, 0, 0]} rotation={[0, (-Math.PI / 2) * 0.95, 0]} />
            </SuspenseGroup>
          </group>
          <SuspenseGroup position={[3, 0, -4.5]}>
            <PottedPlant2 position={[-3.5, 0, 0]} scale={0.9} />
            <WateringCanMetal position={[-2.7, 0, 0]} />
            <PottedPlant2 position={[-2, 0, 0]} scale={0.9} />
            <PottedPlant4 position={[-1.4, 0, -0.05]} scale={1.4} />
            <PottedPlant4 position={[-0.9, 0, 0]} scale={1.4} />
          </SuspenseGroup>

          <SuspenseGroup position={[3.5, 0, 3]}>
            <CompostBags />
          </SuspenseGroup>

          <SuspenseGroup position={[1, 0, -2]} scale={2}>
            <MarbleBust />
          </SuspenseGroup>

          {/* <mesh position={[-10, 0, 0]} scale={[10, 12, 16]}>
          <boxGeometry />
          <meshLambertMaterial color="white" />
        </mesh> */}

          <mesh position={[0, wallHeight / 2, -5.5]} scale={[12, wallHeight, 1]}>
            <boxGeometry />
            <meshLambertMaterial color="white" />
          </mesh>
          <mesh position={[0, wallHeight / 2, 5.5]} scale={[12, wallHeight, 1]}>
            <boxGeometry />
            <meshLambertMaterial color="white" />
          </mesh>
          <mesh position={[5.5, wallHeight / 2, 0]} scale={[1, wallHeight, 12]}>
            <boxGeometry />
            <meshLambertMaterial color="white" />
          </mesh>
          <mesh position={[-5.5, wallHeight / 2, 0]} scale={[1, wallHeight, 12]}>
            <boxGeometry />
            <meshLambertMaterial color="white" />
          </mesh>

          {/* <Plane position={[3, 0.01, 3]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
            <meshBasicMaterial color="red" side={DoubleSide} />
          </Plane> */}

          {/* <axesHelper /> */}
          {/* <gridHelper /> */}
          <OrbitControls
            minPolarAngle={(Math.PI / 2) * 0.1}
            maxPolarAngle={(Math.PI / 2) * 0.9}
            minDistance={2}
            maxDistance={8}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
