"use client"

import { Table } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters: TableFilters
  setFilters: SetTableFilters
}

export function DataTableToolbar<TData extends Device>({
  table,
  filters,
  setFilters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search devices..."
          value={filters.search}
          onChange={(event) =>
            setFilters({ search: event.target.value || null })
          }
          className="pl-9"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
