"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import {
  ProtocolBadge,
  CapabilityBadge,
  PowerSupplyBadge,
  MatterSupportBadge,
  capabilityConfig,
} from "@/components/badges"
import { getBrandById } from "@/lib/devices"
import type { Device } from "@/lib/types"

// Re-export capability icons for use in sidebar filters
export const capabilityIcons = Object.fromEntries(
  Object.entries(capabilityConfig).map(([key, config]) => [key, config.icon])
) as Record<string, typeof capabilityConfig[keyof typeof capabilityConfig]["icon"]>

// Mobile column IDs for visibility management
export const mobileColumnIds = ["device"] as const
export const desktopColumnIds = ["imageUrl", "name", "brand_id", "capabilities", "protocols", "powerSupply", "matterSupport"] as const

export const columns: ColumnDef<Device>[] = [
  // Mobile-only combined column (image + name)
  {
    id: "device",
    header: "Device",
    cell: ({ row }) => {
      const device = row.original
      return (
        <Link
          href={`/device/${device.id}`}
          className="flex items-center gap-3 py-1"
        >
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src={device.imageUrl || ""}
              alt={device.name}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <span className="font-medium text-primary break-words min-w-0">
            {device.name}
          </span>
        </Link>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
  // Desktop columns
  {
    accessorKey: "imageUrl",
    header: "",
    cell: ({ row }) => {
      const device = row.original
      return (
        <div className="w-12 h-12 relative flex items-center justify-center">

          <Image
            src={device.imageUrl || ''}
            alt={device.name}
            fill
            className="object-contain"
            sizes="48px"
          />

        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const device = row.original
      return (
        <Link
          href={`/device/${device.id}`}
          className="font-medium hover:underline text-primary"
        >
          {device.name}
        </Link>
      )
    },
    filterFn: (row, id, value) => {
      return row.getValue<string>(id).toLowerCase().includes(value.toLowerCase())
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand_id",
    header: "Brand",
    cell: ({ row }) => {
      const brand = getBrandById(row.getValue("brand_id"))
      return (
        <div className="flex items-center gap-2">
          {brand?.logo && (
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-5 h-5 object-contain rounded"
            />
          )}
          <span>{brand?.name || row.getValue("brand_id")}</span>
        </div>
      )
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "capabilities",
    header: "Capabilities",
    cell: ({ row }) => {
      const capabilities = row.getValue("capabilities") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {capabilities.map((capability) => (
            <CapabilityBadge key={capability} capability={capability} />
          ))}
        </div>
      )
    },
    filterFn: (row, id, value: string[]) => {
      const capabilities = row.getValue(id) as string[]
      return value.some((v) => capabilities.includes(v))
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "protocols",
    header: "Protocols",
    cell: ({ row }) => {
      const protocols = row.getValue("protocols") as string[]

      return (
        <div className="flex flex-wrap gap-1">
          {protocols.map((protocol) => (
            <ProtocolBadge key={protocol} protocol={protocol} />
          ))}
        </div>
      )
    },
    filterFn: (row, id, value: string[]) => {
      const protocols = row.getValue(id) as string[]
      return value.some((v) => protocols.includes(v))
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "powerSupply",
    header: "Power supply",
    cell: ({ row }) => {
      const powerSupply = row.getValue("powerSupply") as string | undefined
      if (!powerSupply) return null
      return <PowerSupplyBadge powerSupply={powerSupply} />
    },
    filterFn: (row, id, value: string[]) => {
      const ps = row.getValue(id) as string | undefined
      return ps ? value.includes(ps) : false
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "matterSupport",
    header: "Matter Support",
    cell: ({ row }) => {
      const matterSupport = row.getValue("matterSupport") as string | undefined
      if (!matterSupport) return null
      return <MatterSupportBadge matterSupport={matterSupport} />
    },
    filterFn: (row, id, value: string[]) => {
      const ms = row.getValue(id) as string | undefined
      return ms ? value.includes(ms) : false
    },
    enableSorting: false,
    enableHiding: true,
  },
]
