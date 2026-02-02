import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

// Amazon icon
export function AmazonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
    >
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.13.12.2.036.4-.218.6l-.089.07c-.27.2-.56.41-.87.63-.89.6-1.85 1.07-2.89 1.42-1.02.35-2.08.6-3.18.76-.53.08-1.06.12-1.6.14-.52.02-1.04.02-1.55 0-1.04-.04-2.07-.16-3.1-.36-1.02-.2-2.02-.49-3-.87-1.97-.76-3.78-1.85-5.42-3.27-.182-.161-.188-.3-.02-.42zm21.32-3.24c.14-.13.27-.2.39-.22.12-.02.23.02.33.12.3.3.57.61.81.93.25.33.44.65.58.96.14.32.2.6.2.85.01.25-.04.5-.14.74-.11.24-.28.47-.52.68-.24.2-.49.36-.75.49-.2.09-.4.17-.6.23-.17.05-.34.09-.51.12l-.14.02-.24.02c-.28 0-.52-.05-.73-.16-.21-.11-.35-.27-.42-.49-.07-.23-.04-.48.09-.75.12-.24.35-.49.67-.75.23-.18.48-.36.75-.53.28-.18.52-.35.73-.53.21-.17.35-.34.42-.5.07-.17.05-.33-.06-.49-.08-.1-.2-.17-.36-.22-.16-.05-.35-.08-.57-.08-.39 0-.78.07-1.17.22-.4.15-.77.35-1.14.6-.36.24-.71.5-1.05.76-.07.05-.15.11-.23.16-.09.06-.18.08-.27.06-.09-.02-.16-.08-.21-.18-.04-.1-.04-.22 0-.36.04-.15.13-.31.27-.49.15-.19.29-.35.43-.49.27-.26.56-.5.87-.7.32-.2.65-.35.99-.45.34-.1.66-.15.96-.15z" />
      <path d="M13.772 11.154c-.096-.076-.216-.068-.36.024l-.3.234c-.09.07-.18.15-.26.24-.09.09-.16.21-.21.35-.05.14-.08.29-.08.45 0 .16.03.31.1.45.06.14.15.27.27.38.1.09.22.17.36.24.14.07.28.13.43.19.15.06.3.12.45.18.14.06.27.13.39.22.12.08.22.17.3.27.08.11.14.23.17.37.04.14.05.3.04.49-.02.19-.07.37-.16.55-.08.17-.21.32-.37.46-.17.14-.37.25-.6.34-.24.09-.51.14-.82.14-.22 0-.44-.02-.65-.07-.2-.04-.39-.1-.55-.17-.16-.06-.31-.13-.44-.2-.14-.08-.25-.15-.34-.22-.09-.06-.18-.1-.25-.14-.07-.04-.13-.04-.18 0-.06.04-.07.12-.05.25.02.12.07.25.16.38.09.14.21.27.35.4.15.13.32.25.52.36.2.11.42.2.67.28.25.07.52.11.81.11.28 0 .56-.04.84-.12.27-.08.52-.21.74-.39.22-.17.4-.4.53-.67.14-.28.21-.6.21-.97 0-.27-.04-.5-.11-.7-.07-.19-.17-.36-.3-.5-.12-.14-.27-.26-.44-.36-.17-.1-.35-.19-.54-.27-.19-.08-.38-.15-.57-.22-.19-.07-.36-.14-.51-.21-.16-.08-.29-.16-.39-.26-.11-.1-.16-.22-.16-.35 0-.16.05-.3.16-.41.11-.12.24-.22.4-.3.16-.08.33-.15.51-.19.18-.04.34-.06.48-.06.15 0 .31.02.48.06.17.04.33.1.48.18.15.07.28.15.4.24.11.09.2.18.27.27.07.1.1.19.1.27 0 .08-.04.15-.11.21-.08.07-.18.09-.32.06-.14-.03-.27-.11-.38-.22-.11-.12-.24-.22-.39-.29-.14-.08-.29-.12-.43-.12-.14 0-.28.02-.42.06-.14.04-.26.1-.37.18-.11.08-.2.17-.28.27-.07.1-.11.21-.11.33 0 .12.05.22.14.3z" />
    </svg>
  )
}

// IKEA icon
export function IkeaIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <text x="12" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">IKEA</text>
    </svg>
  )
}

// Best Buy icon
export function BestBuyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8h8v8H8z" fill="white" />
    </svg>
  )
}

export interface StoreConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
}

// Known store configurations with brand colors
export const storeConfig: Record<string, StoreConfig> = {
  amazon: {
    icon: AmazonIcon,
    label: "Amazon",
    color: "bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20 border-[#FF9900]/30",
  },
  "amazon.com": {
    icon: AmazonIcon,
    label: "Amazon",
    color: "bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20 border-[#FF9900]/30",
  },
  "amazon.de": {
    icon: AmazonIcon,
    label: "Amazon DE",
    color: "bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20 border-[#FF9900]/30",
  },
  "amazon.co.uk": {
    icon: AmazonIcon,
    label: "Amazon UK",
    color: "bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900]/20 border-[#FF9900]/30",
  },
  ikea: {
    icon: IkeaIcon,
    label: "IKEA",
    color: "bg-[#0058A3]/10 text-[#0058A3] hover:bg-[#0058A3]/20 border-[#0058A3]/30 dark:text-[#FFDA1A] dark:bg-[#FFDA1A]/10 dark:hover:bg-[#FFDA1A]/20 dark:border-[#FFDA1A]/30",
  },
  "ikea.com": {
    icon: IkeaIcon,
    label: "IKEA",
    color: "bg-[#0058A3]/10 text-[#0058A3] hover:bg-[#0058A3]/20 border-[#0058A3]/30 dark:text-[#FFDA1A] dark:bg-[#FFDA1A]/10 dark:hover:bg-[#FFDA1A]/20 dark:border-[#FFDA1A]/30",
  },
  bestbuy: {
    icon: BestBuyIcon,
    label: "Best Buy",
    color: "bg-[#0046BE]/10 text-[#0046BE] hover:bg-[#0046BE]/20 border-[#0046BE]/30",
  },
  "bestbuy.com": {
    icon: BestBuyIcon,
    label: "Best Buy",
    color: "bg-[#0046BE]/10 text-[#0046BE] hover:bg-[#0046BE]/20 border-[#0046BE]/30",
  },
}

// Default configuration for unknown stores
export const defaultStoreConfig: StoreConfig = {
  icon: ShoppingCart,
  label: "Store",
  color: "bg-muted text-foreground hover:bg-muted/80 border-border",
}

// Helper to get store config from URL
export function getStoreConfigFromUrl(url: string): StoreConfig {
  try {
    const hostname = new URL(url).hostname.toLowerCase()

    // Check for known stores in the hostname
    for (const [key, config] of Object.entries(storeConfig)) {
      if (hostname.includes(key.replace('.com', '').replace('.de', '').replace('.co.uk', ''))) {
        return config
      }
    }
  } catch {
    // Invalid URL, return default
  }

  return defaultStoreConfig
}

// Helper to get store config by name
export function getStoreConfigByName(name: string): StoreConfig {
  const normalizedName = name.toLowerCase().replace(/\s+/g, '')

  for (const [key, config] of Object.entries(storeConfig)) {
    if (normalizedName.includes(key.replace('.com', '').replace('.de', '').replace('.co.uk', ''))) {
      return config
    }
  }

  return defaultStoreConfig
}
