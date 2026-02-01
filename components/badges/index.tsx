"use client"

import * as React from "react"
import {
  PlugIcon,
  Battery,
  Cable,
  Usb,
  type LucideIcon,
} from "lucide-react"
import { Badge, badgeSemanticStyles, type BadgeGenericColor } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Import configs from data folder
import { protocolConfig, ThreadIcon, MatterIcon, type Protocol } from "@/data/protocols"
import { capabilityConfig, type Capability } from "@/data/capabilities"

// Re-export types and configs
export type { Protocol } from "@/data/protocols"
export type { Capability } from "@/data/capabilities"
export { protocolConfig } from "@/data/protocols"
export { capabilityConfig } from "@/data/capabilities"

// =============================================================================
// Power Supply Configuration
// =============================================================================

export type PowerSupply = "mains" | "battery" | "poe" | "usb"

interface PowerSupplyConfig {
  icon: LucideIcon
  label: string
  className: string
}

export const powerSupplyConfig: Record<PowerSupply, PowerSupplyConfig> = {
  mains: {
    icon: PlugIcon,
    label: "Mains",
    className: badgeSemanticStyles.powerSupply.mains,
  },
  battery: {
    icon: Battery,
    label: "Battery",
    className: badgeSemanticStyles.powerSupply.battery,
  },
  poe: {
    icon: Cable,
    label: "PoE",
    className: badgeSemanticStyles.powerSupply.poe,
  },
  usb: {
    icon: Usb,
    label: "USB",
    className: badgeSemanticStyles.powerSupply.usb,
  },
}

// =============================================================================
// Badge Components
// =============================================================================

interface ProtocolBadgeProps {
  protocol: string
  showLabel?: boolean
  className?: string
}

export function ProtocolBadge({ protocol, showLabel = true, className }: ProtocolBadgeProps) {
  const key = protocol.toLowerCase() as Protocol
  const config = protocolConfig[key]

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {protocol}
      </Badge>
    )
  }

  const Icon = config.icon

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <Icon />
      {showLabel && config.label}
    </Badge>
  )
}

interface CapabilityBadgeProps {
  capability: string
  showLabel?: boolean
  className?: string
}

export function CapabilityBadge({ capability, showLabel = true, className }: CapabilityBadgeProps) {
  const key = capability.toLowerCase() as Capability
  const config = capabilityConfig[key] || capabilityConfig.other

  const Icon = config.icon

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <Icon />
      {showLabel && config.label}
    </Badge>
  )
}

interface PowerSupplyBadgeProps {
  powerSupply: string
  showLabel?: boolean
  className?: string
}

export function PowerSupplyBadge({ powerSupply, showLabel = true, className }: PowerSupplyBadgeProps) {
  const key = powerSupply.toLowerCase() as PowerSupply
  const config = powerSupplyConfig[key]

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {powerSupply}
      </Badge>
    )
  }

  const Icon = config.icon

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      <Icon />
      {showLabel && config.label}
    </Badge>
  )
}

interface ManufacturerBadgeProps {
  name: string
  logo?: string
  className?: string
}

export function ManufacturerBadge({ name, logo, className }: ManufacturerBadgeProps) {
  return (
    <Badge variant="outline" className={cn(badgeSemanticStyles.manufacturer, className)}>
      {logo && (
        <img
          src={logo}
          alt=""
          className="size-3 object-contain rounded-sm"
        />
      )}
      {name}
    </Badge>
  )
}

interface GenericBadgeProps {
  children: React.ReactNode
  icon?: React.ReactNode
  color?: BadgeGenericColor
  className?: string
}

export function GenericBadge({ children, icon, color = "default", className }: GenericBadgeProps) {
  return (
    <Badge variant="outline" className={cn(badgeSemanticStyles.generic[color], className)}>
      {icon}
      {children}
    </Badge>
  )
}

// =============================================================================
// Re-exports for convenience
// =============================================================================

export { Badge } from "@/components/ui/badge"
export { ThreadIcon, MatterIcon }
