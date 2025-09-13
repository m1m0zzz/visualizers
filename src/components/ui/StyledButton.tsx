"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ComponentProps, ReactNode } from "react"
import { FiArrowLeft } from "react-icons/fi"
import { cn } from "@/lib/util"

interface Props {
  children: ReactNode
  backIcon?: boolean
  color?: string
  borderBg?: string
  bg?: string
}

function StyledButtonBase({
  children,
  backIcon = false,
  color = "text-emerald-600",
  borderBg = "bg-emerald-600",
  bg = "bg-white",
}: Props) {
  return (
    <span
      className={cn(
        "group relative inline-block text-sm font-medium focus:ring-2 focus:outline-hidden",
        color,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 translate-x-0.5 translate-y-0.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0",
          borderBg,
        )}
      ></span>
      <span className={cn("relative flex items-center gap-1 border border-current px-6 py-2", bg)}>
        {backIcon && <FiArrowLeft />}
        {children}
      </span>
    </span>
  )
}

export function StyledButton({
  children,
  backIcon,
  color,
  borderBg,
  bg,
  type = "button",
  ...props
}: Props & Omit<ComponentProps<"button">, keyof Props>) {
  return (
    <button type={type} {...props}>
      <StyledButtonBase {...{ children, backIcon, color, borderBg, bg }} />
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

export function PrevButton({
  children = "Prev Page",
  backIcon = true,
  color = "text-gray-50",
  borderBg = "bg-gray-50",
  bg = "bg-emerald-600",
  ...props
}: Partial<Parameters<typeof StyledButton>[0]>) {
  const router = useRouter()

  return (
    <StyledButton
      {...{ children, backIcon, color, borderBg, bg }}
      onClick={() => {
        router.back()
      }}
      {...props}
    />
  )
}
