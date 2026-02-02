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
  getUniqueBrandIds,
  getUniqueCapabilities,
  getUniquePowerSupplies,
  getUniqueProtocols,
  getUniqueMatterSupport,
  getBrandById,
} from "@/lib/devices"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableFiltersProps<TData> {
  table: Table<TData>
  data: TData[]
  filters: TableFilters
  setFilters: SetTableFilters
  showReset?: boolean
  resetVariant?: "ghost" | "outline"
}

export function useFilterOptions<TData extends Device>(data: TData[]) {
  const brandOptions = getUniqueBrandIds(data).map((id) => {
    const brand = getBrandById(id)
    return {
      label: brand?.name || id,
      value: id,
      icon: brand?.logo ? (
        <img
          src={brand.logo}
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

  return {
    brandOptions,
    capabilityOptions,
    protocolOptions,
    powerSupplyOptions,
    matterSupportOptions,
  }
}

export function DataTableFilters<TData extends Device>({
  table,
  data,
  filters,
  setFilters,
  showReset = true,
  resetVariant = "ghost",
}: DataTableFiltersProps<TData>) {
  const isFiltered =
    filters.brand.length > 0 ||
    filters.category.length > 0 ||
    filters.protocol.length > 0 ||
    filters.power.length > 0 ||
    filters.matter.length > 0

  const {
    brandOptions,
    capabilityOptions,
    protocolOptions,
    powerSupplyOptions,
    matterSupportOptions,
  } = useFilterOptions(data)

  const handleReset = () => {
    setFilters({
      brand: null,
      category: null,
      protocol: null,
      power: null,
      matter: null,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {table.getColumn("brand_id") && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Brand
          </div>
          <DataTableFacetedFilter
            column={table.getColumn("brand_id")}
            title="Brand"
            options={brandOptions}
            value={filters.brand}
            onChange={(value) =>
              setFilters({ brand: value.length > 0 ? value : null })
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
      {table.getColumn("matterSupport") && matterSupportOptions.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Matter support
          </div>
          <DataTableFacetedFilter
            column={table.getColumn("matterSupport")}
            title="Matter support"
            options={matterSupportOptions}
            value={filters.matter}
            onChange={(value) =>
              setFilters({ matter: value.length > 0 ? value : null })
            }
          />
        </div>
      )}

      {showReset && isFiltered && (
        <Button
          variant={resetVariant}
          onClick={handleReset}
          className={resetVariant === "ghost" ? "h-8 w-full justify-start px-2" : "w-full"}
        >
          <X className="mr-2 h-4 w-4" />
          {resetVariant === "ghost" ? "Reset" : "Clear all filters"}
        </Button>
      )}
    </div>
  )
}
