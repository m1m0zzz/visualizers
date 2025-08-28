import type { ReactNode } from "react"

/**
 * example:
 * ```
 * <VideoAsGif>
 *   <source src="example.mp4" type="video/mp4" />
 * </VideoAsGif>
 * ```
 */
export function VideoAsGif({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-stretch justify-center overflow-hidden w-full h-full">
      <video autoPlay loop muted playsInline className="block object-cover object-center w-full">
        {children}
      </video>
    </div>
  )
}
