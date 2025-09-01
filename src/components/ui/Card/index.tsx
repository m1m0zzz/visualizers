import Image from "next/image"
import { cn, filterUndefinedProperties } from "@/util/util"
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

  return (
    <CardBase title={title} type={type} wrapped={false}>
      {(() => {
        if (isImage) {
          const imageOption = { ...defaultImageOption, ...filterUndefinedProperties(bg) }
          return (
            <Image
              alt={imageOption.alt as string}
              src={imageOption.src as string}
              className={cn(
                "absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-110",
                imageOption.className,
              )}
              {...imageOption}
            />
          )
        } else {
          return <div className="absolute inset-0 h-full w-full" style={{ background: bg }}></div>
        }
      })()}
    </CardBase>
  )
}
