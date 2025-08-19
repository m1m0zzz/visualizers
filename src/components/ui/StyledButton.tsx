"use client"

import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ComponentProps } from "react"

interface Props {
  text: string
  color?: string
  borderBg?: string
  bg?: string
}

function StyledButtonBase({
  text,
  color = "text-emerald-600",
  borderBg = "bg-emerald-600",
  bg = "bg-white",
}: Props) {
  return (
    <span
      className={clsx(
        "group relative inline-block text-sm font-medium focus:ring-2 focus:outline-hidden",
        color,
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0",
          borderBg,
        )}
      ></span>
      <span className={clsx("relative block border border-current px-8 py-3", bg)}>{text}</span>
    </span>
  )
}

export function StyledButton({
  text,
  color,
  borderBg,
  bg,
  type = "button",
  ...props
}: Props & Omit<ComponentProps<"button">, keyof Props>) {
  return (
    <button type={type} {...props}>
      <StyledButtonBase {...{ text, color, borderBg, bg }} />
    </button>
  )
}

export function StyledLinkButton({ href, ...props }: { href: string } & Props) {
  return (
    <Link href={href}>
      <StyledButton {...props} />
    </Link>
  )
}

export function PrevButton() {
  const router = useRouter()

  ;("use client")

  return (
    <StyledButton
      text="Prev Page"
      onClick={() => {
        router.back()
      }}
    />
  )
}
