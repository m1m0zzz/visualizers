import Image from "next/image"

interface Props {
  title: string
  type: string
  bg:
    | string
    | {
        src?: Parameters<typeof Image>[0]["src"]
        alt?: string
      }
}

export function Card({ title, type, bg }: Props) {
  const isImage = typeof bg == "object"
  const defaultImageOption = {
    alt: title,
    src: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  }
  const imageOption = isImage ? { ...defaultImageOption, ...bg } : null
  return (
    <article className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg group text-white/95">
      {isImage ? (
        <Image
          fill={typeof imageOption?.src == "string"}
          alt={imageOption?.alt as string}
          src={imageOption?.src as string}
          className="absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 h-full w-full" style={{ background: bg }}></div>
      )}

      {type && <div className="absolute top-4 right-6 font-mono z-10">{type}</div>}

      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48">
        <div className="p-6">
          <p className="line-clamp-3 text-sm/relaxed">{title}</p>
        </div>
      </div>
    </article>
  )
}
