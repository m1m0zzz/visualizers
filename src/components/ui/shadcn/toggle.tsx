"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/cn"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
      activeColor: {
        default: "",
        red: "data-[state=on]:text-red-500 dark:data-[state=on]:text-red-400",
        orange: "data-[state=on]:text-orange-500 dark:data-[state=on]:text-orange-400",
        amber: "data-[state=on]:text-amber-500 dark:data-[state=on]:text-amber-400",
        yellow: "data-[state=on]:text-yellow-500 dark:data-[state=on]:text-yellow-400",
        lime: "data-[state=on]:text-lime-500 dark:data-[state=on]:text-lime-400",
        green: "data-[state=on]:text-green-500 dark:data-[state=on]:text-green-400",
        emerald: "data-[state=on]:text-emerald-500 dark:data-[state=on]:text-emerald-400",
        teal: "data-[state=on]:text-teal-500 dark:data-[state=on]:text-teal-400",
        cyan: "data-[state=on]:text-cyan-500 dark:data-[state=on]:text-cyan-400",
        sky: "data-[state=on]:text-sky-500 dark:data-[state=on]:text-sky-400",
        blue: "data-[state=on]:text-blue-500 dark:data-[state=on]:text-blue-400",
        indigo: "data-[state=on]:text-indigo-500 dark:data-[state=on]:text-indigo-400",
        violet: "data-[state=on]:text-violet-500 dark:data-[state=on]:text-violet-400",
        purple: "data-[state=on]:text-purple-500 dark:data-[state=on]:text-purple-400",
        fuchsia: "data-[state=on]:text-fuchsia-500 dark:data-[state=on]:text-fuchsia-400",
        pink: "data-[state=on]:text-pink-500 dark:data-[state=on]:text-pink-400",
        rose: "data-[state=on]:text-rose-500 dark:data-[state=on]:text-rose-400",
        slate: "data-[state=on]:text-slate-600 dark:data-[state=on]:text-slate-300",
        gray: "data-[state=on]:text-gray-600 dark:data-[state=on]:text-gray-300",
        zinc: "data-[state=on]:text-zinc-600 dark:data-[state=on]:text-zinc-300",
        neutral: "data-[state=on]:text-neutral-600 dark:data-[state=on]:text-neutral-300",
        stone: "data-[state=on]:text-stone-600 dark:data-[state=on]:text-stone-300",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      activeColor: "default",
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
