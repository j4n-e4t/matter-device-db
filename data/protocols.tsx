import { BluetoothIcon, WifiIcon, Radio } from "lucide-react"
import { badgeSemanticStyles } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Thread icon (custom SVG)
export function ThreadIcon({ className }: { className?: string }) {
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
export function MatterIcon({ className }: { className?: string }) {
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

export type Protocol = "thread" | "bluetooth" | "wifi" | "zigbee"

export interface ProtocolConfig {
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
  }
}
