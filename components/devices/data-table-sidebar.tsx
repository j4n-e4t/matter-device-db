"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {
  protocolConfig,
  powerSupplyConfig,
  deviceClassConfig,
} from "@/components/badges"
import {
  getUniqueManufacturerIds,
  getUniqueDeviceClasses,
  getUniquePowerSupplies,
  getUniqueProtocols,
  getManufacturerById,
} from "@/lib/devices"
import type { Device } from "@/lib/types"

interface DataTableSidebarProps<TData> {
  table: Table<TData>
  data: TData[]
}

export function DataTableSidebar<TData extends Device>({
  table,
  data,
}: DataTableSidebarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const manufacturerOptions = getUniqueManufacturerIds(data).map((id) => {
    const manufacturer = getManufacturerById(id)
    return {
      label: manufacturer?.name || id,
      value: id,
      icon: manufacturer?.logo ? (
        <img src={manufacturer.logo} alt="" className="h-4 w-4 object-contain rounded" />
      ) : undefined,
    }
  })

  const deviceClassOptions = getUniqueDeviceClasses(data).map((dc) => {
    const config = deviceClassConfig[dc as keyof typeof deviceClassConfig]
    const Icon = config?.icon
    return {
      label: config?.label || dc,
      value: dc,
      icon: Icon ? <Icon className="h-4 w-4" /> : undefined,
      className: config?.className,
    }
  })

  const protocolOptions = getUniqueProtocols(data).map((p) => {
    const config = protocolConfig[p.toLowerCase() as keyof typeof protocolConfig]
    const Icon = config?.icon
    return {
      label: config?.label || p,
      value: p,
      icon: Icon ? <Icon className="h-4 w-4" /> : undefined,
      className: config?.className,
    }
  })

  const powerSupplyOptions = getUniquePowerSupplies(data).map((ps) => {
    const config = powerSupplyConfig[ps as keyof typeof powerSupplyConfig]
    const Icon = config?.icon
    return {
      label: config?.label || ps,
      value: ps,
      icon: Icon ? <Icon className="h-4 w-4" /> : undefined,
      className: config?.className,
    }
  })

  return (
    <div className="w-[220px] shrink-0 space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Filters</div>

      <div className="flex flex-col gap-4">
        {table.getColumn("manufacturer_id") && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Manufacturer</div>
            <DataTableFacetedFilter
              column={table.getColumn("manufacturer_id")}
              title="Manufacturer"
              options={manufacturerOptions}
            />
          </div>
        )}
        {table.getColumn("device_class") && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</div>
            <DataTableFacetedFilter
              column={table.getColumn("device_class")}
              title="Category"
              options={deviceClassOptions}
            />
          </div>
        )}
        {table.getColumn("protocols") && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Protocol</div>
            <DataTableFacetedFilter
              column={table.getColumn("protocols")}
              title="Protocol"
              options={protocolOptions}
            />
          </div>
        )}
        {table.getColumn("powerSupply") && powerSupplyOptions.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Power supply</div>
            <DataTableFacetedFilter
              column={table.getColumn("powerSupply")}
              title="Power supply"
              options={powerSupplyOptions}
            />
          </div>
        )}
      </div>

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 w-full justify-start px-2"
        >
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  )
}
