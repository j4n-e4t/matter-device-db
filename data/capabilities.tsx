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
  Brain,
} from "lucide-react"
import { badgeSemanticStyles } from "@/components/ui/badge"

export type Capability =
  | "light"
  | "hub"
  | "bridge"
  | "speaker"
  | "remote"
  | "temperature"
  | "humidity"
  | "motion"
  | "water_leak"
  | "contact"
  | "brightness"

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
  hub: {
    icon: Brain,
    label: "Hub",
    className: badgeSemanticStyles.category.hub,
  },
  bridge: {
    icon: Box,
    label: "Bridge",
    className: badgeSemanticStyles.category.bridge,
  },
  speaker: {
    icon: Speaker,
    label: "Speaker",
    className: badgeSemanticStyles.category.speaker,
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
  }
}
