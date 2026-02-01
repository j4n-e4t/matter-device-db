"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { DataTableColumnHeader } from "./data-table-column-header"
import {
  ProtocolBadge,
  DeviceClassBadge,
  PowerSupplyBadge,
  deviceClassConfig,
} from "@/components/badges"
import { getManufacturerById } from "@/lib/devices"
import type { Device } from "@/lib/types"

// Re-export device class icons for use in sidebar filters
export const deviceClassIcons = Object.fromEntries(
  Object.entries(deviceClassConfig).map(([key, config]) => [key, config.icon])
) as Record<string, typeof deviceClassConfig[keyof typeof deviceClassConfig]["icon"]>

export const columns: ColumnDef<Device>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
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
  },
  {
    accessorKey: "manufacturer_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    cell: ({ row }) => {
      const manufacturer = getManufacturerById(row.getValue("manufacturer_id"))
      return (
        <div className="flex items-center gap-2">
          {manufacturer?.logo && (
            <img
              src={manufacturer.logo}
              alt={manufacturer.name}
              className="w-5 h-5 object-contain rounded"
            />
          )}
          <span>{manufacturer?.name || row.getValue("manufacturer_id")}</span>
        </div>
      )
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "device_class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const deviceClass = row.getValue("device_class") as string
      return <DeviceClassBadge deviceClass={deviceClass} />
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id))
    },
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
    enableSorting: true
  },
]
