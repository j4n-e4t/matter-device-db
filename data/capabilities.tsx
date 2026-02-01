import {
  Lightbulb,
  PlugIcon,
  ToggleLeft,
  Lock,
  Thermometer,
  Camera,
  Box,
  Blinds,
  Speaker,
  Snowflake,
  Package,
  Activity,
  Droplets,
  DoorOpen,
  Sun,
  Wind,
  Gamepad2,
  type LucideIcon,
} from "lucide-react"
import { badgeSemanticStyles } from "@/components/ui/badge"

export type Capability =
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
  | "temperature"
  | "humidity"
  | "motion"
  | "water_leak"
  | "contact"
  | "brightness"
  | "air_quality"
  | "other"

export interface CapabilityConfig {
  icon: LucideIcon
  label: string
  className: string
}

export const capabilityConfig: Record<Capability, CapabilityConfig> = {
  light: {
    icon: Lightbulb,
    label: "Light",
    className: badgeSemanticStyles.category.light,
  },
  plug: {
    icon: PlugIcon,
    label: "Plug",
    className: badgeSemanticStyles.category.plug,
  },
  switch: {
    icon: ToggleLeft,
    label: "Switch",
    className: badgeSemanticStyles.category.switch,
  },
  lock: {
    icon: Lock,
    label: "Lock",
    className: badgeSemanticStyles.category.lock,
  },
  thermostat: {
    icon: Thermometer,
    label: "Thermostat",
    className: badgeSemanticStyles.category.thermostat,
  },
  camera: {
    icon: Camera,
    label: "Camera",
    className: badgeSemanticStyles.category.camera,
  },
  hub: {
    icon: Box,
    label: "Hub",
    className: badgeSemanticStyles.category.hub,
  },
  bridge: {
    icon: Box,
    label: "Bridge",
    className: badgeSemanticStyles.category.bridge,
  },
  blind: {
    icon: Blinds,
    label: "Blind",
    className: badgeSemanticStyles.category.blind,
  },
  speaker: {
    icon: Speaker,
    label: "Speaker",
    className: badgeSemanticStyles.category.speaker,
  },
  climate: {
    icon: Snowflake,
    label: "Climate",
    className: badgeSemanticStyles.category.climate,
  },
  remote: {
    icon: Gamepad2,
    label: "Remote",
    className: badgeSemanticStyles.category.remote,
  },
  temperature: {
    icon: Thermometer,
    label: "Temperature",
    className: badgeSemanticStyles.category.temperature,
  },
  humidity: {
    icon: Droplets,
    label: "Humidity",
    className: badgeSemanticStyles.category.humidity,
  },
  motion: {
    icon: Activity,
    label: "Motion",
    className: badgeSemanticStyles.category.motion,
  },
  water_leak: {
    icon: Droplets,
    label: "Water Leak",
    className: badgeSemanticStyles.category.water_leak,
  },
  contact: {
    icon: DoorOpen,
    label: "Contact",
    className: badgeSemanticStyles.category.contact,
  },
  brightness: {
    icon: Sun,
    label: "Brightness",
    className: badgeSemanticStyles.category.brightness,
  },
  air_quality: {
    icon: Wind,
    label: "Air Quality",
    className: badgeSemanticStyles.category.air_quality,
  },
  other: {
    icon: Package,
    label: "Other",
    className: badgeSemanticStyles.category.other,
  },
}
