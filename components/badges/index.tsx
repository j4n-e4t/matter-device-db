"use client"

import * as React from "react"
import {
  BluetoothIcon,
  WifiIcon,
  PlugIcon,
  Battery,
  Lightbulb,
  ToggleLeft,
  Lock,
  Thermometer,
  Camera,
  Box,
  Blinds,
  Speaker,
  Snowflake,
  Package,
  Radio,
  Activity,
  Droplets,
  DoorOpen,
  Sun,
  Wind,
  Gamepad2,
  Cable,
  Usb,
  type LucideIcon,
} from "lucide-react"
import { Badge, badgeSemanticStyles, type BadgeGenericColor } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Thread icon (custom SVG)
function ThreadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 165"
      className={cn("size-3", className)}
      fill="currentColor"
    >
      <path d="M82.498,0C37.008,0,0,37.008,0,82.496c0,45.181,36.51,81.977,81.573,82.476V82.569l-27.002-0.002
        c-8.023,0-14.554,6.53-14.554,14.561c0,8.023,6.531,14.551,14.554,14.551v17.98c-17.939,0-32.534-14.595-32.534-32.531
        c0-17.944,14.595-32.543,32.534-32.543l27.002,0.004v-9.096c0-14.932,12.146-27.08,27.075-27.08
        c14.932,0,27.082,12.148,27.082,27.08c0,14.931-12.15,27.08-27.082,27.08l-9.097-0.001v80.641
        C136.889,155.333,165,122.14,165,82.496C165,37.008,127.99,0,82.498,0z" />
      <path d="M117.748,55.493c0-5.016-4.082-9.098-9.1-9.098c-5.015,0-9.097,4.082-9.097,9.098v9.097l9.097,0.001
        C113.666,64.591,117.748,60.51,117.748,55.493z" />
    </svg>
  )
}

// Matter icon (custom SVG)
function MatterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-3", className)}
      fill="currentColor"
    >
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
    </svg>
  )
}

// =============================================================================
// Protocol Configuration
// =============================================================================

export type Protocol = "thread" | "bluetooth" | "wifi" | "zigbee" | "zwave" | "matter"

interface ProtocolConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  className: string
}

export const protocolConfig: Record<Protocol, ProtocolConfig> = {
  thread: {
    icon: ThreadIcon,
    label: "Thread",
    className: badgeSemanticStyles.protocol.thread,
  },
  bluetooth: {
    icon: BluetoothIcon,
    label: "Bluetooth",
    className: badgeSemanticStyles.protocol.bluetooth,
  },
  wifi: {
    icon: WifiIcon,
    label: "WiFi",
    className: badgeSemanticStyles.protocol.wifi,
  },
  zigbee: {
    icon: Radio,
    label: "Zigbee",
    className: badgeSemanticStyles.protocol.zigbee,
  },
  zwave: {
    icon: Radio,
    label: "Z-Wave",
    className: badgeSemanticStyles.protocol.zwave,
  },
  matter: {
    icon: MatterIcon,
    label: "Matter",
    className: badgeSemanticStyles.protocol.matter,
  },
}

// =============================================================================
// Device Class Configuration
// =============================================================================

export type DeviceClass =
  | "light"
  | "plug"
  | "switch"
  | "lock"
  | "thermostat"
  | "camera"
  | "hub"
  | "bridge"
  | "blind"
  | "speaker"
  | "climate"
  | "remote"
  | "temperature_sensor"
  | "motion_sensor"
  | "water_leak_sensor"
  | "contact_sensor"
  | "light_sensor"
  | "air_quality_sensor"
  | "other"

interface DeviceClassConfig {
  icon: LucideIcon
  label: string
  className: string
}

export const deviceClassConfig: Record<DeviceClass, DeviceClassConfig> = {
  light: {
    icon: Lightbulb,
    label: "Lights",
    className: badgeSemanticStyles.category.light,
  },
  plug: {
    icon: PlugIcon,
    label: "Plugs",
    className: badgeSemanticStyles.category.plug,
  },
  switch: {
    icon: ToggleLeft,
    label: "Switches",
    className: badgeSemanticStyles.category.switch,
  },
  lock: {
    icon: Lock,
    label: "Locks",
    className: badgeSemanticStyles.category.lock,
  },
  thermostat: {
    icon: Thermometer,
    label: "Thermostats",
    className: badgeSemanticStyles.category.thermostat,
  },
  camera: {
    icon: Camera,
    label: "Cameras",
    className: badgeSemanticStyles.category.camera,
  },
  hub: {
    icon: Box,
    label: "Hubs",
    className: badgeSemanticStyles.category.hub,
  },
  bridge: {
    icon: Box,
    label: "Bridges",
    className: badgeSemanticStyles.category.bridge,
  },
  blind: {
    icon: Blinds,
    label: "Blinds",
    className: badgeSemanticStyles.category.blind,
  },
  speaker: {
    icon: Speaker,
    label: "Speakers",
    className: badgeSemanticStyles.category.speaker,
  },
  climate: {
    icon: Snowflake,
    label: "Climate",
    className: badgeSemanticStyles.category.climate,
  },
  remote: {
    icon: Gamepad2,
    label: "Remotes",
    className: badgeSemanticStyles.category.remote,
  },
  temperature_sensor: {
    icon: Thermometer,
    label: "Temperature",
    className: badgeSemanticStyles.category.temperature_sensor,
  },
  motion_sensor: {
    icon: Activity,
    label: "Motion",
    className: badgeSemanticStyles.category.motion_sensor,
  },
  water_leak_sensor: {
    icon: Droplets,
    label: "Water Leak",
    className: badgeSemanticStyles.category.water_leak_sensor,
  },
  contact_sensor: {
    icon: DoorOpen,
    label: "Contact",
    className: badgeSemanticStyles.category.contact_sensor,
  },
  light_sensor: {
    icon: Sun,
    label: "Light",
    className: badgeSemanticStyles.category.light_sensor,
  },
  air_quality_sensor: {
    icon: Wind,
    label: "Air Quality",
    className: badgeSemanticStyles.category.air_quality_sensor,
  },
  other: {
    icon: Package,
    label: "Other",
    className: badgeSemanticStyles.category.other,
  },
}

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

interface DeviceClassBadgeProps {
  deviceClass: string
  showLabel?: boolean
  className?: string
}

export function DeviceClassBadge({ deviceClass, showLabel = true, className }: DeviceClassBadgeProps) {
  const key = deviceClass.toLowerCase() as DeviceClass
  const config = deviceClassConfig[key] || deviceClassConfig.other

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
