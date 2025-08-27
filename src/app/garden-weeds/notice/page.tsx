import { StyledLinkButton } from "@/components/ui/StyledButton"

export default function Notice() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <p>スマートフォン非推奨のページです。動作が重くフリーズする可能性があります。</p>
      <p>それでも、開きますか？</p>
      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <StyledLinkButton href="/garden-weeds?app=mobile" text="開く" />
        <StyledLinkButton href="/" text="トップページへ" />
      </div>
    </div>
  )
}
