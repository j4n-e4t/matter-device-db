"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {
  protocolConfig,
  powerSupplyConfig,
  capabilityConfig,
  matterSupportConfig,
} from "@/components/badges"
import {
  getUniqueManufacturerIds,
  getUniqueCapabilities,
  getUniquePowerSupplies,
  getUniqueProtocols,
  getUniqueMatterSupport,
  getManufacturerById,
} from "@/lib/devices"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableSidebarProps<TData> {
  table: Table<TData>
  data: TData[]
  filters: TableFilters
  setFilters: SetTableFilters
}

export function DataTableSidebar<TData extends Device>({
  table,
  data,
  filters,
  setFilters,
}: DataTableSidebarProps<TData>) {
  const isFiltered =
    filters.search !== "" ||
    filters.manufacturer.length > 0 ||
    filters.category.length > 0 ||
    filters.protocol.length > 0 ||
    filters.power.length > 0 ||
    filters.matterSupport.length > 0

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

  const capabilityOptions = getUniqueCapabilities(data).map((cap) => {
    const config = capabilityConfig[cap as keyof typeof capabilityConfig]
    const Icon = config?.icon
    return {
      label: config?.label || cap,
      value: cap,
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

  const matterSupportOptions = getUniqueMatterSupport(data).map((ms) => {
    const config = matterSupportConfig[ms as keyof typeof matterSupportConfig]
    const Icon = config?.icon
    return {
      label: config?.label || ms,
      value: ms,
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
              value={filters.manufacturer}
              onChange={(value) => setFilters({ manufacturer: value.length > 0 ? value : null })}
            />
          </div>
        )}
        {table.getColumn("capabilities") && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Capabilities</div>
            <DataTableFacetedFilter
              column={table.getColumn("capabilities")}
              title="Capabilities"
              options={capabilityOptions}
              value={filters.category}
              onChange={(value) => setFilters({ category: value.length > 0 ? value : null })}
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
              value={filters.protocol}
              onChange={(value) => setFilters({ protocol: value.length > 0 ? value : null })}
            />
          </div>
        )}
        {table.getColumn("matterSupport") && matterSupportOptions.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Matter Support</div>
            <DataTableFacetedFilter
              column={table.getColumn("matterSupport")}
              title="Matter Support"
              options={matterSupportOptions}
              value={filters.matterSupport}
              onChange={(value) => setFilters({ matterSupport: value.length > 0 ? value : null })}
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
              value={filters.power}
              onChange={(value) => setFilters({ power: value.length > 0 ? value : null })}
            />
          </div>
        )}
      </div>

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => setFilters({
            search: null,
            manufacturer: null,
            category: null,
            protocol: null,
            power: null,
            matterSupport: null,
          })}
          className="h-8 w-full justify-start px-2"
        >
          <X className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  )
}
