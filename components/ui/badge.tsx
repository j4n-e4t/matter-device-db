import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "h-5 gap-1 rounded-md border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

// =============================================================================
// Semantic badge styles — use with variant="outline" for protocol, category,
// power supply, manufacturer, and generic colored badges.
// =============================================================================

const semanticBase =
  "border [&>svg]:size-3! [&>img]:size-3 [&>img]:object-contain [&>img]:rounded-sm"

export const badgeSemanticStyles = {
  protocol: {
    thread: `${semanticBase} border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400`,
    bluetooth: `${semanticBase} border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400`,
    wifi: `${semanticBase} border-green-500 bg-green-500/10 text-green-600 dark:text-green-400`,
    zigbee: `${semanticBase} border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400`,
    zwave: `${semanticBase} border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400`,
    matter: `${semanticBase} border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400`,
  },
  category: {
    light: `${semanticBase} border-border`,
    sensor: `${semanticBase} border-border`,
    plug: `${semanticBase} border-border`,
    switch: `${semanticBase} border-border`,
    lock: `${semanticBase} border-border`,
    thermostat: `${semanticBase} border-border`,
    camera: `${semanticBase} border-border`,
    hub: `${semanticBase} border-border`,
    bridge: `${semanticBase} border-border`,
    blind: `${semanticBase} border-border`,
    speaker: `${semanticBase} border-border`,
    climate: `${semanticBase} border-border`,
    other: `${semanticBase} border-border`,
  },
  powerSupply: {
    mains: `${semanticBase} border-border`,
    battery: `${semanticBase} border-border`,
  },
  manufacturer: `${semanticBase} border-border gap-1.5`,
  generic: {
    default: "border-border",
    blue: `${semanticBase} border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400`,
    green: `${semanticBase} border-green-500 bg-green-500/10 text-green-600 dark:text-green-400`,
    yellow: `${semanticBase} border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400`,
    red: `${semanticBase} border-red-500 bg-red-500/10 text-red-600 dark:text-red-400`,
    purple: `${semanticBase} border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400`,
    orange: `${semanticBase} border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400`,
    cyan: `${semanticBase} border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400`,
    pink: `${semanticBase} border-pink-500 bg-pink-500/10 text-pink-600 dark:text-pink-400`,
  },
} as const

export type BadgeGenericColor = keyof typeof badgeSemanticStyles.generic

export { Badge, badgeVariants }
