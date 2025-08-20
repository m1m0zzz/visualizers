import Image from "next/image"
import mimozImage from "@/app/assets/cry-mimoz-edged.png"
import { PrevButton, StyledLinkButton } from "@/components/ui/StyledButton"

export default function NotFound() {
  return (
    <div className="font-sans min-h-screen px-4 py-8 flex justify-center items-center flex-wrap gap-12">
      <div className="px-4 flex flex-col justify-center items-center">
        <h1 className="text-8xl">404</h1>
        <div className="text-4xl">Not Found</div>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <PrevButton />
          <StyledLinkButton href="/" text="Top Page" />
        </div>
      </div>
      <div className="h-[80%]">
        <Image
          src={mimozImage}
          height={400}
          alt="not found image"
          // sizes="100vh"
          className="h-full object-contain"
        />
      </div>
    </div>
  )
}
