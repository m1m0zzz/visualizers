import type { ComponentProps } from "react"

export function SCEmbed({
  width = 400,
  height = 300,
  ...props
}: Omit<ComponentProps<"iframe">, "src">) {
  return (
    <iframe
      width={width}
      height={height}
      scrolling="no"
      frameBorder="no"
      // allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2089188891&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      {...props}
    ></iframe>
  )
}
