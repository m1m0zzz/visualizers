import { Clone, useFBX, useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import { Suspense } from "react"
import { RepeatWrapping, type Texture } from "three"

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

export function setRepeat(texture: Texture, times: number) {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(times, times)
}
