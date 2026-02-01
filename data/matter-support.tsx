import { Cpu, Router } from "lucide-react"
import { badgeSemanticStyles } from "@/components/ui/badge"

export type MatterSupport = "native" | "bridge"

export interface MatterSupportConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
  className: string
}

export const matterSupportConfig: Record<MatterSupport, MatterSupportConfig> = {
  native: {
    icon: Cpu,
    label: "Native",
    description: "Connects directly to Matter controllers",
    className: badgeSemanticStyles.matterSupport.native,
  },
  bridge: {
    icon: Router,
    label: "Bridge",
    description: "Connects to Matter through a bridge device",
    className: badgeSemanticStyles.matterSupport.bridge,
  },
}
