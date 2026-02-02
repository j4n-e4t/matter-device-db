"use client"

import { Table } from "@tanstack/react-table"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {
  protocolConfig,
  powerSupplyConfig,
  capabilityConfig,
} from "@/components/badges"
import {
  getUniqueManufacturerIds,
  getUniqueCapabilities,
  getUniquePowerSupplies,
  getUniqueProtocols,
  getManufacturerById,
} from "@/lib/devices"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableFilterDrawerProps<TData> {
  table: Table<TData>
  data: TData[]
  filters: TableFilters
  setFilters: SetTableFilters
}

export function DataTableFilterDrawer<TData extends Device>({
  table,
  data,
  filters,
  setFilters,
}: DataTableFilterDrawerProps<TData>) {
  const isFiltered =
    filters.manufacturer.length > 0 ||
    filters.category.length > 0 ||
    filters.protocol.length > 0 ||
    filters.power.length > 0

  const activeFilterCount =
    filters.manufacturer.length +
    filters.category.length +
    filters.protocol.length +
    filters.power.length

  const manufacturerOptions = getUniqueManufacturerIds(data).map((id) => {
    const manufacturer = getManufacturerById(id)
    return {
      label: manufacturer?.name || id,
      value: id,
      icon: manufacturer?.logo ? (
        <img
          src={manufacturer.logo}
          alt=""
          className="h-4 w-4 object-contain rounded"
        />
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="space-y-6">
          {table.getColumn("manufacturer_id") && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Manufacturer
              </div>
              <DataTableFacetedFilter
                column={table.getColumn("manufacturer_id")}
                title="Manufacturer"
                options={manufacturerOptions}
                value={filters.manufacturer}
                onChange={(value) =>
                  setFilters({ manufacturer: value.length > 0 ? value : null })
                }
              />
            </div>
          )}
          {table.getColumn("capabilities") && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Capabilities
              </div>
              <DataTableFacetedFilter
                column={table.getColumn("capabilities")}
                title="Capabilities"
                options={capabilityOptions}
                value={filters.category}
                onChange={(value) =>
                  setFilters({ category: value.length > 0 ? value : null })
                }
              />
            </div>
          )}
          {table.getColumn("protocols") && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Protocol
              </div>
              <DataTableFacetedFilter
                column={table.getColumn("protocols")}
                title="Protocol"
                options={protocolOptions}
                value={filters.protocol}
                onChange={(value) =>
                  setFilters({ protocol: value.length > 0 ? value : null })
                }
              />
            </div>
          )}
          {table.getColumn("powerSupply") && powerSupplyOptions.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Power supply
              </div>
              <DataTableFacetedFilter
                column={table.getColumn("powerSupply")}
                title="Power supply"
                options={powerSupplyOptions}
                value={filters.power}
                onChange={(value) =>
                  setFilters({ power: value.length > 0 ? value : null })
                }
              />
            </div>
          )}
        </DrawerBody>
        {isFiltered && (
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  manufacturer: null,
                  category: null,
                  protocol: null,
                  power: null,
                })
              }
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Clear all filters
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
