"use client"

import { Table } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import type { Device } from "@/lib/types"

interface DataTableMobileProps<TData> {
  table: Table<TData>
}

export function DataTableMobile<TData extends Device>({
  table,
}: DataTableMobileProps<TData>) {
  const rows = table.getRowModel().rows

  if (!rows.length) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        No devices found.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {rows.map((row) => {
        const device = row.original
        return (
          <Link
            key={row.id}
            href={`/device/${device.id}`}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={device.imageUrl || ""}
                alt={device.name}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span className="text-sm font-medium leading-snug break-words min-w-0">
              {device.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
