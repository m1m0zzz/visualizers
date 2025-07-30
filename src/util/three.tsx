import { Clone, Environment, useFBX, useGLTF, useHelper } from "@react-three/drei"
import { presetsObj } from "@react-three/drei/helpers/environment-assets"
import type { ThreeElements } from "@react-three/fiber"
import { useControls } from "leva"
import { type RefObject, Suspense, useRef } from "react"
import { type DirectionalLight, DirectionalLightHelper, RepeatWrapping, type Texture } from "three"

export function FBXModel({ path, ...props }: { path: string } & ThreeElements["group"]) {
  const obj = useFBX(path)

  return (
    <group {...props}>
      <Clone object={obj} />
    </group>
  )
}

export function GLTFModel({ path, ...props }: { path: string } & ThreeElements["group"]) {
  const obj = useGLTF(path)

  return (
    <group {...props}>
      <Clone object={obj.scene} />
    </group>
  )
}

function GLTFModelNoGroup({ path }: { path: string }) {
  const obj = useGLTF(path)
  return <Clone object={obj.scene} />
}

export function GLTFModelAsync({ path, ...props }: { path: string } & ThreeElements["group"]) {
  return (
    <group {...props}>
      <Suspense fallback={<Box />}>
        <GLTFModelNoGroup path={path} />
      </Suspense>
    </group>
  )
}

export function SuspenseGroup({ children, ...props }: ThreeElements["group"]) {
  return (
    <group {...props}>
      <Suspense fallback={<Box />}>{children}</Suspense>
    </group>
  )
}

export function Box({ ...props }: ThreeElements["mesh"]) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshLambertMaterial color="white" />
    </mesh>
  )
}

type EnvironmentParams = Parameters<typeof Environment>[0]

const EnvironmentPresetKeys = Object.keys(presetsObj) as EnvironmentParams["preset"][]

export function CustomEnvironment({
  preset: _preset,
  environmentIntensity: envIntensity = 1,
  backgroundIntensity: bgIntensity = 1,
  background: _bg = false,
  blur: _blur = 0,
  ...props
}: EnvironmentParams) {
  const { preset, environmentIntensity, backgroundIntensity, background, blur } = useControls(
    "Environment",
    {
      preset: {
        value: _preset || "none",
        options: EnvironmentPresetKeys,
      },
      environmentIntensity: {
        value: envIntensity,
        min: 0,
        max: 1,
      },
      backgroundIntensity: {
        value: bgIntensity,
        min: 0,
        max: 1,
      },
      background: {
        value: String(_bg),
        options: ["true", "false", "only"],
      },
      blur: {
        value: _blur,
        min: 0,
        max: 1,
      },
    },
  )

  return (
    <Environment
      {...props}
      {...{ environmentIntensity, backgroundIntensity, blur }}
      background={background == "only" ? "only" : background == "true"}
      preset={preset == "none" ? undefined : (preset as EnvironmentParams["preset"])}
    />
  )
}

interface CustomDirectionalLightProps {
  helper?: boolean
  color?: string
  intensity?: number
  position?: [number, number, number]
}

export function CustomDirectionalLight({
  helper = true,
  color: _color = "#fff",
  intensity: _intensity = 1,
  position = [0, 1, 0],
  ...props
}: CustomDirectionalLightProps & ThreeElements["directionalLight"]) {
  const lightRef = useRef<DirectionalLight>(null)
  useHelper(lightRef as RefObject<DirectionalLight>, DirectionalLightHelper)

  const ranges = {
    min: -10,
    max: 10,
    step: 0.1,
  }
  const { color, intensity, x, y, z } = useControls("Directional Light", {
    color: _color,
    intensity: {
      value: _intensity,
      min: 0,
      max: 5,
      step: 0.1,
    },
    x: {
      value: position[0],
      ...ranges,
    },
    y: {
      value: position[1],
      ...ranges,
    },
    z: {
      value: position[2],
      ...ranges,
    },
  })

  return (
    <directionalLight
      ref={lightRef}
      color={color}
      intensity={intensity}
      position={[x, y, z]}
      {...props}
    />
  )
}

export function setRepeat(texture: Texture, times: number) {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(times, times)
}
