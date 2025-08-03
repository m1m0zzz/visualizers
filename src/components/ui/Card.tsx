import Image from "next/image"

interface Props {
  title: string
  type: string
  imageSrc?: string
  imageAlt?: string
}

export function Card({
  title,
  type,
  imageAlt = title,
  imageSrc = "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
}: Props) {
  return (
    <article className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg group">
      <Image
        fill
        alt={imageAlt}
        src={imageSrc}
        className="absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-110"
      />

      {type && <div className="absolute top-4 right-6 font-mono z-10">{type}</div>}

      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48">
        <div className="p-6">
          <p className="line-clamp-3 text-sm/relaxed text-white/95">{title}</p>
        </div>
      </div>
    </article>
  )
}
