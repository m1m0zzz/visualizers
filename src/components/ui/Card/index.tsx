/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import clsx from "clsx"
import Image from "next/image"
import { filterUndefinedProperties } from "@/util/util"
import { CardBase } from "./CardBase"

interface Props {
  title: string
  type: string
  bg: string | Partial<Parameters<typeof Image>[0]>
}

export function Card({ title, type, bg }: Props) {
  const isImage = typeof bg == "object"
  const defaultImageOption: Partial<Parameters<typeof Image>[0]> = {
    alt: title,
    src: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    fill: typeof bg == "object" && typeof bg?.src == "string",
  }
  const imageOption = isImage ? { ...defaultImageOption, ...filterUndefinedProperties(bg) } : null

  return (
    <CardBase title={title} type={type} wrapped={false}>
      {isImage ? (
        <Image
          alt={imageOption!.alt as string}
          src={imageOption!.src as string}
          className={clsx(
            "absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-110",
            imageOption!.className,
          )}
          {...imageOption}
        />
      ) : (
        <div className="absolute inset-0 h-full w-full" style={{ background: bg }}></div>
      )}
    </CardBase>
  )
}
