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
// Matter Support Configuration
// =============================================================================

export type MatterSupport = "native" | "bridge"

interface MatterSupportConfig {
  icon: typeof MatterIcon
  label: string
  className: string
}

export const matterSupportConfig: Record<MatterSupport, MatterSupportConfig> = {
  native: {
    icon: MatterIcon,
    label: "Native",
    className: badgeSemanticStyles.matterSupport.native,
  },
  bridge: {
    icon: MatterIcon,
    label: "Bridge",
    className: badgeSemanticStyles.matterSupport.bridge,
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
  const config = capabilityConfig[key]

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {capability}
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

interface MatterSupportBadgeProps {
  matterSupport: string
  showLabel?: boolean
  className?: string
}

export function MatterSupportBadge({ matterSupport, showLabel = true, className }: MatterSupportBadgeProps) {
  const key = matterSupport.toLowerCase() as MatterSupport
  const config = matterSupportConfig[key]

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {matterSupport}
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

interface BrandBadgeProps {
  name: string
  logo?: string
  className?: string
}

export function BrandBadge({ name, logo, className }: BrandBadgeProps) {
  return (
    <Badge variant="outline" className={cn(badgeSemanticStyles.brand, className)}>
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
