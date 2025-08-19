import Image from "next/image"
import mimozImage from "@/app/assets/09f40c235addfdcc.png"
import { PrevButton, StyledLinkButton } from "@/components/ui/StyledButton"

export default function NotFound() {
  return (
    <div className="font-sans min-h-screen relative">
      <div className="absolute top-10 left-4">
        <h1 className="text-9xl">
          404
          <br />
          Not
          <br />
          Found
        </h1>
        <div className="mt-10 flex gap-4">
          <StyledLinkButton href="/" text="Go Top Page" />
          <PrevButton />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gray-800/10"></div>
      <div className="absolute inset-10 pointer-events-none">
        <div className="mt-20" style={{ height: "calc(100% - 20 * var(--spacing))" }}>
          <Image
            src={mimozImage}
            alt="not found image"
            objectFit="contain"
            // sizes="calc(100vh - 10rem)"
            className="h-full ml-auto mr-10"
          />
        </div>
      </div>
    </div>
  )
}
