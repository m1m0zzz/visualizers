import { Fisheye, OrbitControls, Plane, Sky, useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { type ComponentProps, Suspense } from "react"
import { DoubleSide } from "three"
import { Loading } from "@/components/ui/Loading"
import { Tree } from "@/models/Tree"
import { Box, CustomDirectionalLight, CustomEnvironment, setRepeat } from "@/util/three"
import { isDev, log } from "@/util/util"

function GrassMaterial({ repeat = 1 }: { repeat?: number }) {
  const props = useTexture({
    map: "/textures/leafy_grass_4k/leafy_grass_diff_4k.jpg",
    normalMap: "/textures/leafy_grass_4k/leafy_grass_nor_gl_4k.jpg",
    roughnessMap: "/textures/leafy_grass_4k/leafy_grass_arm_4k.jpg",
  })
  Object.values(props).forEach((texture) => setRepeat(texture, repeat))

  return <meshStandardMaterial {...props} side={DoubleSide} />
}

function Impl() {
  const { camera } = useThree()

  useFrame(() => {
    camera.lookAt(0, 1, 0)
  })

  return (
    <>
      {/* camera and lighting */}
      <CustomEnvironment preset="forest" blur={1} environmentIntensity={0.5} />
      {/* <Environment  /> */}
      <ambientLight color={"#fff"} intensity={0.6} />

      <CustomDirectionalLight
        helper={isDev()}
        color={"#688c55"}
        intensity={0.7}
        position={[-0.5, 3, -0.5]}
      />

      {/* models */}
      <Suspense fallback={<Box position={[0, 0.5, 0]} />}>
        <Tree position={[0, 0, 0]} scale={0.5} />
      </Suspense>

      <Plane position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={100}>
        <GrassMaterial repeat={10} />
      </Plane>

      <Sky
        inclination={0.6}
        turbidity={0.1}
        rayleigh={0.246}
        mieCoefficient={0.01}
        mieDirectionalG={0.99}
        azimuth={0}
      />

      {/* helpers */}
      <OrbitControls
        // makeDefault
        minPolarAngle={(Math.PI / 2) * 0.4}
        maxPolarAngle={(Math.PI / 2) * 0.95}
        // enableZoom={false}
        autoRotate
        autoRotateSpeed={-10}
        enableZoom={isDev()}
        enableDamping={false}
        enablePan={false}
      />
    </>
  )
}

export function Animation({ style, ...props }: ComponentProps<"div">) {
  log("mount Animation")

  const { fisheye } = useControls("previews", { fisheye: true })

  return (
    <div
      style={{
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [0.8, 1.4, 0.8] }}>
          {fisheye ? <Fisheye zoom={0.2}>{<Impl />}</Fisheye> : <Impl />}
        </Canvas>
      </Suspense>
    </div>
  )
}
